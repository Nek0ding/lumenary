// FILE: app/api/admin/counter/validate-item/route.ts
//
// GET  → Validasi kode_buku yang diinput manual oleh admin.
//        Dipanggil secara real-time (debounced) dari PickupModal.
//
// Query params:
//   kode_buku        — kode fisik buku yang diinput admin (BukuItem.kode_buku)
//   kode_peminjaman  — kode reservasi yang sedang diproses
//
// Validasi (berurutan, berhenti di error pertama):
//   1. BukuItem dengan kode_buku tersebut harus ada
//   2. BukuItem.status harus TERSEDIA
//   3. BukuItem.id_buku harus sama dengan Peminjaman.id_buku
//      (kode buku harus merupakan eksemplar dari judul yang dipesan)
//
// Response:
//   { valid: true,  message: "..." }
//   { valid: false, message: "..." }

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

export async function GET(request: Request) {
    const { error } = await validateAdmin(request);
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const kode_buku       = searchParams.get("kode_buku")?.trim().toUpperCase();
    const kode_peminjaman = searchParams.get("kode_peminjaman")?.trim();

    if (!kode_buku || !kode_peminjaman) {
        return NextResponse.json(
            { valid: false, message: "kode_buku and kode_peminjaman are required." },
            { status: 400 }
        );
    }

    try {
        // Ambil reservasi untuk mendapatkan id_buku yang dipesan
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman },
            select: {
                id_buku: true,
                status: true,
                buku: { select: { judul: true } },
            },
        });

        if (!peminjaman) {
            return NextResponse.json(
                { valid: false, message: "Reservation not found." },
                { status: 404 }
            );
        }

        if (peminjaman.status !== "direservasi") {
            return NextResponse.json({
                valid: false,
                message: `Reservation is no longer active (status: ${peminjaman.status.toUpperCase()}).`,
            });
        }

        // Cari BukuItem berdasarkan kode_buku
        const item = await prisma.bukuItem.findUnique({
            where: { kode_buku },
            select: {
                id_item: true,
                id_buku: true,
                kode_buku: true,
                status: true,
            },
        });

        // Validasi 1: kode_buku harus ada
        if (!item) {
            return NextResponse.json({
                valid: false,
                message: `Book code "${kode_buku}" not found in the system.`,
            });
        }

        // Validasi 2: harus TERSEDIA
        if (item.status !== "TERSEDIA") {
            return NextResponse.json({
                valid: false,
                message: `Book code "${kode_buku}" is not available (current status: ${item.status}).`,
            });
        }

        // Validasi 3: harus eksemplar dari judul yang dipesan
        if (item.id_buku !== peminjaman.id_buku) {
            return NextResponse.json({
                valid: false,
                message: `Book code "${kode_buku}" does not belong to the reserved title "${peminjaman.buku.judul}".`,
            });
        }

        // Semua valid
        return NextResponse.json({
            valid: true,
            message: `"${kode_buku}" is valid and available for "${peminjaman.buku.judul}".`,
            data: {
                id_item: item.id_item,
                kode_buku: item.kode_buku,
            },
        });

    } catch (err: any) {
        return NextResponse.json(
            { valid: false, message: "Server error during validation.", detail: err.message },
            { status: 500 }
        );
    }
}