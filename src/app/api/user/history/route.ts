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
            return NextResponse.json({ success: false, message: "Akses ditolak! Token expired atau tidak valid." }, { status: 401 });
        }

        // ==========================================
        // 2. AMBIL & VALIDASI PARAMETER URL NPM
        // ==========================================
        const { searchParams } = new URL(request.url);
        const requestedNpm = searchParams.get('npm');

        if (!requestedNpm) {
            return NextResponse.json({ success: false, message: "Parameter NPM tidak ditemukan!" }, { status: 400 });
        }

        // ==========================================
        // 3. SECURE CROSS-CHECK (IDOR PROTECTION)
        // ==========================================
        const dbUser = await prisma.user.findUnique({
            where: { email: authUser.email }
        });

        if (!dbUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan di database!" }, { status: 404 });
        }

        // Kunci utama: Pastikan token pemilik email MATCH dengan NPM yang diminta di URL
        if (dbUser.npm !== requestedNpm) {
            return NextResponse.json(
                { success: false, message: "Akses Terlarang! Anda tidak diizinkan melihat data riwayat mahasiswa lain." },
                { status: 403 }
            );
        }

        const userId = dbUser.id_user;

        // ==========================================
        // 4. QUERY DATA PEMINJAMAN
        // ==========================================
        // Ambil semua data peminjaman milik user ini beserta info buku & kategori
        const semuaPeminjaman = await prisma.peminjaman.findMany({
            where: { id_user: userId },
            include: {
                buku: {
                    include: {
                        kategori: {
                            select: { nama_kategori: true }
                        }
                    }
                }
            },
            orderBy: { created_at: 'desc' } // Riwayat terbaru muncul paling atas
        });

        // ==========================================
        // 5. SEPARASI DATA (ACTIVE vs PAST)
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
                status: pinjam.status // 'direservasi', 'dipinjam', 'terlambat', 'dikembalikan', 'dibatalkan'
            };

            // Masuk kategori ACTIVE jika statusnya belum selesai
            if (['direservasi', 'dipinjam', 'terlambat'].includes(pinjam.status)) {
                activeLoans.push(formattedItem);
            } else {
                // Masuk kategori PAST jika sudah 'dikembalikan' atau 'dibatalkan'
                pastLoans.push(formattedItem);
            }
        }

        // ==========================================
        // 6. RESPONSE SUCCESS
        // ==========================================
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