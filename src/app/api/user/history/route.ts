import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        // ==========================================
        // QUERY DATA PEMINJAMAN (+ INCLUDE DENDA)
        // ==========================================
        const semuaPeminjaman = await prisma.peminjaman.findMany({
            where: { id_user: auth.id_user },
            include: {
                buku: {
                    include: {
                        kategori: {
                            select: { nama_kategori: true }
                        }
                    }
                },
                denda: true,
                item_fisik: true
            },
            orderBy: { created_at: 'desc' }
        });

        // ==========================================
        // SEPARASI DATA (ACTIVE vs PAST)
        // ==========================================
        const activeLoans = [];
        const pastLoans = [];

        for (const pinjam of semuaPeminjaman) {
            const formattedItem = {
                id_peminjaman: pinjam.id_peminjaman,
                id_buku: pinjam.buku.id_buku,
                judul: pinjam.buku.judul,
                penulis: pinjam.buku.penulis,
                cover_buku: pinjam.buku.cover_buku,
                kategori: pinjam.buku.kategori.nama_kategori,
                isbn: pinjam.buku.isbn,
                stok: pinjam.buku.stok,
                sinopsis: pinjam.buku.sinopsis,
                rating_rata: Number(pinjam.buku.rating_rata),
                tanggal_pinjam: pinjam.tanggal_pinjam,
                tanggal_kembali: pinjam.tanggal_kembali,
                tanggal_dikembalikan: pinjam.tanggal_dikembalikan,
                kode_peminjaman: pinjam.kode_peminjaman,
                status: pinjam.status,
                created_at: pinjam.created_at,
                kode_buku_fisik: pinjam.item_fisik ? pinjam.item_fisik.kode_buku : null,
                denda: pinjam.denda ? {
                    id_denda: pinjam.denda.id_denda,
                    jumlah_denda: Number(pinjam.denda.jumlah_denda),
                    hari_terlambat: pinjam.denda.hari_terlambat,
                    keterangan_denda: pinjam.denda.keterangan_denda,
                    status_bayar: pinjam.denda.status_bayar,
                    tanggal_bayar: pinjam.denda.tanggal_bayar
                } : null
            };

            if (['direservasi', 'dipinjam', 'terlambat'].includes(pinjam.status)) {
                activeLoans.push(formattedItem);
            } else {
                pastLoans.push(formattedItem);
            }
        }

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data riwayat peminjaman",
            data: {
                active: activeLoans,
                past: pastLoans
            }
        }, { status: 200 });

    } catch (error) {
        console.error("API History Error:", error);
        return NextResponse.json({ success: false, message: "Terjadi kesalahan internal pada server" }, { status: 500 });
    }
}