import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
    try {
        // ==========================================
        // 1. VALIDASI TOKEN JWT (AUTHENTICATION)
        // ==========================================
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak! Token tidak valid." }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user: authUser }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !authUser || !authUser.email) {
            return NextResponse.json({ success: false, message: "Access denied! Token expired or Not valid." }, { status: 401 });
        }

        // ==========================================
        // 2. AMBIL & VALIDASI PARAMETER URL
        // ==========================================
        const { searchParams } = new URL(request.url);
        const requestedNpm = searchParams.get('npm');

        if (!requestedNpm) {
            return NextResponse.json({ success: false, message: "Parameter NPM tidak ditemukan!" }, { status: 400 });
        }

        // ==========================================
        // 3. CEK KEPEMILIKAN DATA (AUTHORIZATION / IDOR PROTECTION)
        // ==========================================
        // Cari data user di database berdasarkan email asli dari token yang sudah tervalidasi
        const dbUser = await prisma.user.findUnique({
            where: { email: authUser.email }
        });

        if (!dbUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan di database!" }, { status: 404 });
        }

        // 🛡️ INI KUNCI KEAMANANNYA:
        // Pastikan NPM yang diminta di URL SAMA PERSIS dengan NPM milik akun yang sedang login
        if (dbUser.npm !== requestedNpm) {
            return NextResponse.json(
                { success: false, message: "Akses Terlarang! Anda tidak diizinkan melihat data milik mahasiswa lain." },
                { status: 403 }
            );
        }

        const userId = dbUser.id_user;

        // ==========================================
        // 4. JALANKAN QUERY DATABASE
        // ==========================================
        const [
            booksHandledCount,
            totalWishlistCount,
            availableWishlistCount,
            reservedCount,
            dendaResult
        ] = await Promise.all([
            prisma.peminjaman.count({ where: { id_user: userId } }),
            prisma.favorit.count({ where: { id_user: userId } }),
            prisma.favorit.count({
                where: {
                    id_user: userId,
                    buku: { stok: { gt: 0 } }
                }
            }),
            prisma.peminjaman.count({
                where: { id_user: userId, status: 'direservasi' }
            }),
            prisma.denda.aggregate({
                _sum: { jumlah_denda: true },
                where: {
                    status_bayar: 'belum_bayar',
                    peminjaman: { id_user: userId }
                }
            })
        ]);

        const totalPenalty = dendaResult._sum.jumlah_denda ? Number(dendaResult._sum.jumlah_denda) : 0;

        const currentReadingRaw = await prisma.peminjaman.findMany({
            where: {
                id_user: userId,
                status: { in: ['dipinjam', 'terlambat'] }
            },
            include: {
                buku: { include: { kategori: true } }
            },
            orderBy: { tanggal_kembali: 'asc' }
        });

        const recommendedRaw = await prisma.buku.findMany({
            take: 4,
            orderBy: { rating_rata: 'desc' },
            include: { kategori: true }
        });

        // ==========================================
        // 5. KEMBALIKAN RESPONSE
        // ==========================================
        return NextResponse.json({
            success: true,
            data: {
                stats: {
                    booksHandled: booksHandledCount,
                    wishlist: { total: totalWishlistCount, available: availableWishlistCount },
                    reserved: reservedCount,
                    totalPenalty: totalPenalty
                },
                currentReading: currentReadingRaw.map(pinjam => ({
                    id: pinjam.id_peminjaman,
                    title: pinjam.buku.judul,
                    author: pinjam.buku.penulis,
                    category: pinjam.buku.kategori.nama_kategori,
                    rating: Number(pinjam.buku.rating_rata),
                    cover: pinjam.buku.cover_buku,
                    dueDate: pinjam.tanggal_kembali,
                    status: pinjam.status,
                    stok: pinjam.buku.stok,
                    isbn: pinjam.buku.isbn,
                    sinopsis: pinjam.buku.sinopsis
                })),
                recommended: recommendedRaw.map(buku => ({
                    id: buku.id_buku,
                    title: buku.judul,
                    author: buku.penulis,
                    cover: buku.cover_buku,
                    category: buku.kategori.nama_kategori,
                    rating: Number(buku.rating_rata),
                    stok: buku.stok,
                    isbn: buku.isbn,
                    sinopsis: buku.sinopsis
                }))
            }
        }, { status: 200 });

    } catch (error) {
        console.error("API Dashboard Error:", error);
        return NextResponse.json({ success: false, message: "Terjadi kesalahan internal pada server" }, { status: 500 });
    }
}