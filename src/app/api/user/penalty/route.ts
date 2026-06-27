import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(request: Request) {
    // 1. Keamanan Ketat: Validasi token menggunakan utility auth
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        const userId = auth.id_user;

        // 2. Ambil semua tagihan denda beserta relasi buku
        const dendaList = await prisma.denda.findMany({
            where: {
                peminjaman: { id_user: userId }
            },
            include: {
                peminjaman: {
                    include: { 
                        buku: { select: { judul: true, penulis: true, cover_buku: true } } 
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        // 3. Pemisahan Data & Normalisasi (Active vs History)
        const activePenalties: any[] = [];
        const penaltyHistory: any[] = [];
        let totalActivePenalty = 0;

        for (const item of dendaList) {
            const mappedItem = {
                id_denda: item.id_denda,
                jumlah_denda: Number(item.jumlah_denda),
                hari_terlambat: item.hari_terlambat,
                keterangan_denda: item.keterangan_denda,
                judul_buku: item.peminjaman.buku.judul,
                penulis: item.peminjaman.buku.penulis,
                cover_buku: item.peminjaman.buku.cover_buku,
                tanggal_bayar: item.tanggal_bayar,
                kode_peminjaman: item.peminjaman.kode_peminjaman || `LUM-${item.id_peminjaman}`
            };

            if (item.status_bayar === 'belum_bayar') {
                activePenalties.push(mappedItem);
                totalActivePenalty += mappedItem.jumlah_denda;
            } else {
                penaltyHistory.push(mappedItem);
            }
        }

        return NextResponse.json({
            success: true,
            data: {
                active: activePenalties,
                history: penaltyHistory,
                total: totalActivePenalty
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching penalty:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}