import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatusPeminjaman } from "@prisma/client";
import { requireAuth } from "@/lib/auth"; // Import utility auth Anda

function generateKodePeminjaman(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function getWIBTime(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

export async function POST(request: Request) {
    // 1. Gunakan requireAuth untuk validasi sesi
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    // ─── PENCEGAHAN AKSES ADMIN ─────────────────────────────────────────────
    // Memastikan akun dengan privilege ADMIN tidak dapat melakukan peminjaman buku
    if (auth.role === 'ADMIN') {
        return NextResponse.json({ 
            success: false, 
            message: "Action Prohibited: Administrators are not allowed to borrow or reserve books." 
        }, { status: 403 });
    }
    // ─────────────────────────────────────────────────────────────────────────

    try {
        const body = await request.json();
        const { id_buku } = body;

        if (!id_buku || typeof id_buku !== 'number') {
            return NextResponse.json({ success: false, message: "Invalid book ID!" }, { status: 400 });
        }

        // 2. Ambil data user dari auth (id_user sudah tersedia di auth)
        const userProfile = await prisma.user.findUnique({
            where: { id_user: auth.id_user },
            select: { id_user: true, nama: true, no_telp: true, alamat: true, jenis_kelamin: true }
        });

        if (!userProfile) return NextResponse.json({ success: false, message: "User not found!" }, { status: 404 });

        // 3. Validasi Kelengkapan Profil
        if (!userProfile.nama || !userProfile.no_telp || !userProfile.alamat || !userProfile.jenis_kelamin) {
            return NextResponse.json({
                success: false,
                code: "INCOMPLETE_PROFILE",
                message: "Please complete your profile before borrowing!"
            }, { status: 403 });
        }

        // 4. Cek Stok & Limit Peminjaman
        const [buku, pinjamanCount, existingLoan, activePenalty] = await Promise.all([
            prisma.buku.findUnique({ where: { id_buku }, select: { id_buku: true, stok: true } }),
            prisma.peminjaman.count({
                where: {
                    id_user: userProfile.id_user,
                    status: { in: [StatusPeminjaman.dipinjam, StatusPeminjaman.direservasi, StatusPeminjaman.terlambat] }
                }
            }),
            prisma.peminjaman.findFirst({
                where: {
                    id_user: userProfile.id_user,
                    id_buku: id_buku,
                    status: { in: [StatusPeminjaman.dipinjam, StatusPeminjaman.direservasi, StatusPeminjaman.terlambat] }
                }
            }),
            prisma.denda.findFirst({
                where: {
                    peminjaman: { id_user: auth.id_user },
                    status_bayar: 'belum_bayar'
                }
            })
        ]);
        if (activePenalty) {
            return NextResponse.json({
                success: false,
                message: "You have outstanding penalty bills. Please settle your payment before borrowing new books."
            }, { status: 403 });
        }

        if (!buku || buku.stok <= 0) return NextResponse.json({ success: false, message: "Book unavailable." }, { status: 400 });
        if (pinjamanCount >= 3) return NextResponse.json({ success: false, message: "Max 3 active loans allowed." }, { status: 400 });

        // ✅ Validasi duplikasi buku
        if (existingLoan) {
            return NextResponse.json({
                success: false,
                message: "You already have an active reservation or loan for this book."
            }, { status: 400 });
        }

        // 5. Transaksi (Kurangi Stok & Create Peminjaman)
        const tanggalPinjamWIB = getWIBTime();
        const tanggalKembaliWIB = new Date(tanggalPinjamWIB);
        tanggalKembaliWIB.setDate(tanggalPinjamWIB.getDate() + 7);

        const result = await prisma.$transaction([
            prisma.buku.update({
                where: { id_buku, stok: { gt: 0 } },
                data: { stok: { decrement: 1 } },
            }),
            prisma.peminjaman.create({
                data: {
                    id_user: userProfile.id_user,
                    id_buku,
                    kode_peminjaman: generateKodePeminjaman(),
                    tanggal_pinjam: tanggalPinjamWIB,
                    tanggal_kembali: tanggalKembaliWIB,
                    status: StatusPeminjaman.direservasi,
                },
            }),
        ]);

        return NextResponse.json({ success: true, message: "Reservation created!", data: result[1] }, { status: 201 });

    } catch (error: any) {
        console.error('Error on peminjaman API:', error);
        if (error.code === 'P2025') return NextResponse.json({ success: false, message: "Book stock mismatch!" }, { status: 400 });
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}