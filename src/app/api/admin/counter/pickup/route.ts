// FILE: app/api/admin/counter/pickup/route.ts
//
// POST  → Konfirmasi handover buku ke peminjam.
//
// Perubahan dari versi sebelumnya:
//   Versi lama: sistem otomatis memilih BukuItem pertama yang TERSEDIA (FIFO).
//   Versi baru: admin menginput kode_buku secara manual (ketik atau scanner).
//               Server memvalidasi ulang kode_buku sebelum commit — tidak
//               mempercayai validasi frontend saja (defense in depth).
//
// Body: { kode_peminjaman: string, kode_buku: string }

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    if (auth.role !== "ADMIN") {
        return {
            error: NextResponse.json(
                { success: false, message: "Access Denied: Admins only." },
                { status: 403 }
            ),
        };
    }
    return { auth };
}

function getClientInfo(request: Request) {
    const ip_address =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "Unknown IP";
    const user_agent = request.headers.get("user-agent") || "Unknown Device";
    return { ip_address, user_agent };
}

export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);

    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid JSON body." },
            { status: 400 }
        );
    }

    const { kode_peminjaman, kode_buku } = body;

    // ─── Validasi input ────────────────────────────────────────────────────
    if (!kode_peminjaman || typeof kode_peminjaman !== "string") {
        return NextResponse.json(
            { success: false, message: "kode_peminjaman is required." },
            { status: 400 }
        );
    }
    if (!kode_buku || typeof kode_buku !== "string") {
        return NextResponse.json(
            { success: false, message: "kode_buku is required. Admin must input the physical book code manually." },
            { status: 400 }
        );
    }

    const kodeBukuNormalized = kode_buku.trim().toUpperCase();

    try {
        // ─── Fetch reservasi ───────────────────────────────────────────────
        const reservasi = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman },
            select: {
                id_peminjaman: true,
                id_buku: true,
                status: true,
                tanggal_kembali: true,
                buku: { select: { judul: true } },
            },
        });

        if (!reservasi) {
            return NextResponse.json(
                { success: false, message: "Reservation not found." },
                { status: 404 }
            );
        }

        // Status harus 'direservasi' — tidak boleh sudah diproses
        if (reservasi.status !== "direservasi") {
            return NextResponse.json(
                {
                    success: false,
                    message: `Cannot process pickup: reservation status is ${reservasi.status.toUpperCase()}.`,
                },
                { status: 409 }
            );
        }

        // ─── Server-side re-validation kode_buku (defense in depth) ───────
        // Tidak mempercayai validasi frontend. Semua cek diulang di sini
        // dalam satu read sebelum transaksi dimulai.
        const itemFisik = await prisma.bukuItem.findUnique({
            where: { kode_buku: kodeBukuNormalized },
            select: {
                id_item: true,
                id_buku: true,
                kode_buku: true,
                status: true,
            },
        });

        // Cek 1: kode_buku harus ada
        if (!itemFisik) {
            return NextResponse.json(
                { success: false, message: `Book code "${kodeBukuNormalized}" not found in the system.` },
                { status: 400 }
            );
        }

        // Cek 2: harus TERSEDIA
        if (itemFisik.status !== "TERSEDIA") {
            return NextResponse.json(
                {
                    success: false,
                    message: `Book code "${kodeBukuNormalized}" is not available (status: ${itemFisik.status}).`,
                },
                { status: 409 }
            );
        }

        // Cek 3: harus eksemplar dari judul yang dipesan
        if (itemFisik.id_buku !== reservasi.id_buku) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Book code "${kodeBukuNormalized}" does not match the reserved title "${reservasi.buku.judul}".`,
                },
                { status: 400 }
            );
        }

        // ─── Atomic transaction ────────────────────────────────────────────
        await prisma.$transaction(async (tx) => {
            // Update Peminjaman: ikat ke item fisik, ubah status, set tanggal_pinjam
            const updatedPeminjaman = await tx.peminjaman.update({
                where: { id_peminjaman: reservasi.id_peminjaman },
                data: {
                    status: "dipinjam",
                    id_item: itemFisik.id_item,
                    tanggal_pinjam: new Date(),
                },
            });

            // Update BukuItem: tandai sebagai DIPINJAM
            await tx.bukuItem.update({
                where: { id_item: itemFisik.id_item },
                data: { status: "DIPINJAM" },
            });

            // Audit log
            await tx.auditLog.create({
                data: {
                    id_user: auth!.id_user,
                    aksi: "PICKUP_RELEASE",
                    entitas: "Peminjaman",
                    id_entitas: reservasi.id_peminjaman.toString(),
                    deskripsi:
                        `Admin ${auth!.nama || "Admin"} released book (Item: ${kodeBukuNormalized}) ` +
                        `for reservation ${kode_peminjaman} — title: "${reservasi.buku.judul}".`,
                    data_lama: reservasi as any,
                    data_baru: updatedPeminjaman as any,
                    ip_address,
                    user_agent,
                },
            });
        });

        return NextResponse.json({
            success: true,
            message: `Book "${kodeBukuNormalized}" successfully handed over to student.`,
        });

    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: "An internal server error occurred.",
                detail: err.message,
            },
            { status: 500 }
        );
    }
}