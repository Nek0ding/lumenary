import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// =======================================================================
// GET: Cek Status Satuan BUKU ATAU Ambil Semua List Koleksi Favorit User
// =======================================================================
export async function GET(request: Request) {
    // requireAuth memvalidasi token dan mengembalikan { id_user, role }
    // Jika token tidak ada atau expired, langsung return 401
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        const { searchParams } = new URL(request.url);
        const id_buku = searchParams.get('id_buku');

        // ── KONDISI A: JIKA ADA ID_BUKU → CEK STATUS SATUAN (Untuk Modal) ──
        if (id_buku) {
            const favorit = await prisma.favorit.findFirst({
                where: {
                    id_user: auth.id_user,
                    id_buku: Number(id_buku)
                }
            });

            return NextResponse.json({
                success: true,
                isFavorited: !!favorit
            }, { status: 200 });
        }

        // ── KONDISI B: TANPA ID_BUKU → AMBIL SEMUA LIST (Untuk Halaman Collection) ──
        const favoritList = await prisma.favorit.findMany({
            where: { id_user: auth.id_user },
            include: {
                buku: {
                    include: {
                        kategori: { select: { nama_kategori: true } }
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        const formattedBooks = favoritList.map(fav => ({
            id_buku: fav.buku.id_buku,
            judul: fav.buku.judul,
            penulis: fav.buku.penulis,
            sinopsis: fav.buku.sinopsis,
            cover_buku: fav.buku.cover_buku,
            isbn: fav.buku.isbn,
            stok: fav.buku.stok,
            rating_rata: Number(fav.buku.rating_rata),
            kategori: { nama_kategori: fav.buku.kategori.nama_kategori }
        }));

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil semua koleksi favorit",
            data: formattedBooks
        }, { status: 200 });

    } catch (error) {
        console.error("Error di GET /api/user/favorit:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// =======================================================================
// POST: Toggle Status Favorite / Unfavorite (Dengan Proteksi Spam)
// =======================================================================
export async function POST(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        const body = await request.json();
        const { id_buku } = body;

        if (!id_buku) {
            return NextResponse.json({ success: false, message: "ID Buku wajib diisi" }, { status: 400 });
        }

        // Validasi buku ada di database
        const buku = await prisma.buku.findUnique({
            where: { id_buku: Number(id_buku) },
            select: { id_buku: true }
        });

        if (!buku) {
            return NextResponse.json({ success: false, message: "Buku tidak ditemukan" }, { status: 404 });
        }

        const existingFavorit = await prisma.favorit.findFirst({
            where: {
                id_user: auth.id_user,
                id_buku: Number(id_buku)
            }
        });

        if (existingFavorit) {
            // Aksi Unfavorite — pastikan hanya pemilik yang bisa hapus
            await prisma.favorit.delete({
                where: { id_favorit: existingFavorit.id_favorit }
            });
            return NextResponse.json({
                success: true,
                isFavorited: false,
                message: "Buku dihapus dari favorit."
            }, { status: 200 });
        }

        // Aksi Favorite (dengan guard P2002 jika terjadi race condition/spam klik)
        try {
            await prisma.favorit.create({
                data: {
                    id_user: auth.id_user,
                    id_buku: Number(id_buku)
                }
            });
            return NextResponse.json({
                success: true,
                isFavorited: true,
                message: "Buku ditambahkan ke favorit."
            }, { status: 201 });
        } catch (dbError: any) {
            if (dbError.code === 'P2002') {
                // Race condition: sudah di-favorite duluan, anggap sukses
                return NextResponse.json({
                    success: true,
                    isFavorited: true,
                    message: "Buku sudah ada di favorit."
                }, { status: 200 });
            }
            throw dbError;
        }

    } catch (error) {
        console.error("Error di POST /api/user/favorit:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}