import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// =======================================================================
// GET: Cek Status Satuan BUKU ATAU Ambil Semua List Koleksi Favorit User
// =======================================================================
export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Sesi kedaluwarsa!" }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true }
        });

        if (!dbUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
        }

        // Ambil query parameter
        const { searchParams } = new URL(request.url);
        const id_buku = searchParams.get('id_buku');

        // ── KONDISI A: JIKA ADA ID_BUKU -> CEK STATUS SATUAN (Untuk Modal) ──
        if (id_buku) {
            const favorit = await prisma.favorit.findFirst({
                where: {
                    id_user: dbUser.id_user,
                    id_buku: Number(id_buku)
                }
            });

            return NextResponse.json({
                success: true,
                isFavorited: !!favorit
            }, { status: 200 });
        }

        // ── KONDISI B: JIKA TIDAK ADA ID_BUKU -> AMBIL SEMUA LIST (Untuk Halaman Collection) ──
        const favoritList = await prisma.favorit.findMany({
            where: { id_user: dbUser.id_user },
            include: {
                buku: {
                    include: {
                        kategori: { select: { nama_kategori: true } }
                    }
                }
            },
            orderBy: { created_at: 'desc' } // Favorit terbaru di atas
        });

        // Normalisasi format data agar strukturnya sama persis dengan Explore/Katalog
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
        console.error("Error di GET /api/buku/favorit:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// =======================================================================
// POST: Toggle Status Favorite / Unfavorite (Dengan Proteksi Spam)
// =======================================================================
export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Sesi kedaluwarsa!" }, { status: 401 });
        }

        const body = await request.json();
        const { id_buku } = body;

        if (!id_buku) {
            return NextResponse.json({ success: false, message: "ID Buku wajib diisi" }, { status: 400 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true }
        });

        if (!dbUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });
        }

        const existingFavorit = await prisma.favorit.findFirst({
            where: {
                id_user: dbUser.id_user,
                id_buku: Number(id_buku)
            }
        });

        if (existingFavorit) {
            // Aksi Unfavorite
            await prisma.favorit.delete({
                where: { id_favorit: existingFavorit.id_favorit }
            });
            return NextResponse.json({ success: true, isFavorited: false, message: "Buku dihapus dari favorit." }, { status: 200 });
        } else {
            // Aksi Favorite (Dengan try-catch menangkap kode P2002 jika terkena spam klik bersamaan)
            try {
                await prisma.favorit.create({
                    data: {
                        id_user: dbUser.id_user,
                        id_buku: Number(id_buku)
                    }
                });
                return NextResponse.json({ success: true, isFavorited: true, message: "Buku ditambahkan ke favorit." }, { status: 201 });
            } catch (dbError: any) {
                if (dbError.code === 'P2002') {
                    return NextResponse.json({ success: true, isFavorited: true, message: "Buku sudah ada di favorit." }, { status: 200 });
                }
                throw dbError;
            }
        }

    } catch (error) {
        console.error("Error di POST /api/buku/favorit:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}