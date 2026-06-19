import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { StatusPeminjaman } from "@prisma/client";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateKodePeminjaman(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// ✅ Helper Waktu WIB
function getWIBTime(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

// GET DATA PINJAMAN AKTIF DAN HISTORY PINJAMAN
export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Expired Token" }, { status: 401 });
        }

        const userProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true }
        });

        if (!userProfile) {
            return NextResponse.json({ success: false, message: "User profile not found!" }, { status: 404 });
        }

        const id_user = userProfile.id_user;

        // LAZY EVALUATION: Cek dan bersihkan reservasi menggantung yang lewat 24 jam
        const reservasiAktif = await prisma.peminjaman.findMany({
            where: { id_user, status: StatusPeminjaman.direservasi }
        });

        const waktuSekarangWIB = getWIBTime();

        for (const res of reservasiAktif) {
            const waktuReservasi = new Date(res.created_at);
            const selisihJam = (waktuSekarangWIB.getTime() - waktuReservasi.getTime()) / (1000 * 60 * 60);

            if (selisihJam > 24) {
                await prisma.$transaction([
                    prisma.peminjaman.update({
                        where: { id_peminjaman: res.id_peminjaman },
                        data: { status: StatusPeminjaman.dibatalkan }
                    }),
                    prisma.buku.update({
                        where: { id_buku: res.id_buku },
                        data: { stok: { increment: 1 } }
                    })
                ]);
            }
        }

        // Ambil semua data sirkulasi milik user ini
        const seluruhPeminjaman = await prisma.peminjaman.findMany({
            where: { id_user },
            include: {
                buku: {
                    select: { judul: true, cover_buku: true, penulis: true }
                },
                denda: {
                    select: { jumlah_denda: true, hari_terlambat: true, keterangan_denda: true, status_bayar: true }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        const peminjamanAktif = seluruhPeminjaman.filter(p => 
            p.status === StatusPeminjaman.direservasi || 
            p.status === StatusPeminjaman.dipinjam || 
            p.status === StatusPeminjaman.terlambat
        ).map(p => ({
            ...p,
            denda: p.denda ? { ...p.denda, jumlah_denda: Number(p.denda.jumlah_denda) } : null
        }));

        const historyPeminjaman = seluruhPeminjaman.filter(p => 
            p.status === StatusPeminjaman.dikembalikan || 
            p.status === StatusPeminjaman.dibatalkan
        ).map(p => ({
            ...p,
            denda: p.denda ? { ...p.denda, jumlah_denda: Number(p.denda.jumlah_denda) } : null
        }));

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data dashboard user",
            data: { aktif: peminjamanAktif, history: historyPeminjaman }
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error("Error fetching user dashboard data:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// POST DATA BUAT RESERVASI PINJAMAN
export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Expired" }, { status: 401 });
        }

        const body = await request.json();
        const { id_buku } = body;

        if (!id_buku || typeof id_buku !== 'number' || !Number.isInteger(id_buku) || id_buku <= 0) {
            return NextResponse.json({ success: false, message: "ID Buku is required and must be a positive integer!" }, { status: 400 });
        }

        const userProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true, nama: true, no_telp: true, alamat: true, jenis_kelamin: true, }
        });

        if (!userProfile) return NextResponse.json({ success: false, message: "User profile not found!" }, { status: 404 });
        
        if (!userProfile.nama || !userProfile.no_telp || !userProfile.alamat || !userProfile.jenis_kelamin) {
            return NextResponse.json({ success: false, code: "INCOMPLETE_PROFILE", message: "Please complete your profile before borrowing a book!" }, { status: 403 });
        }

        const [buku, pinjamanAktif] = await Promise.all([
            prisma.buku.findUnique({ where: { id_buku }, select: { id_buku: true, stok: true } }),
            prisma.peminjaman.findMany({
                where: {
                    id_user: userProfile.id_user,
                    status: { in: [StatusPeminjaman.dipinjam, StatusPeminjaman.direservasi] }
                },
                select: { id_buku: true },
            }),
        ]);

        if (!buku || buku.stok <= 0) return NextResponse.json({ success: false, message: "Book is unavailable or the stock is empty" }, { status: 400 });
        if (pinjamanAktif.some(p => p.id_buku === id_buku)) return NextResponse.json({ success: false, message: "You already borrowed this book!" }, { status: 400 });
        if (pinjamanAktif.length >= 3) return NextResponse.json({ success: false, message: "You have reached the maximum number of active loans (3)." }, { status: 400 });

        // ✅ Pencatatan Tanggal Basis WIB
        const tanggalPinjamWIB = getWIBTime();
        const tanggalKembaliWIB = new Date(tanggalPinjamWIB);
        tanggalKembaliWIB.setDate(tanggalPinjamWIB.getDate() + 7);

        const kodePeminjaman = generateKodePeminjaman();
        const result = await prisma.$transaction([
            prisma.buku.update({
                where: { id_buku, stok: { gt: 0 } },
                data: { stok: { decrement: 1 } },
            }),
            prisma.peminjaman.create({
                data: {
                    id_user: userProfile.id_user,
                    id_buku,
                    kode_peminjaman: kodePeminjaman,
                    tanggal_pinjam: tanggalPinjamWIB,
                    tanggal_kembali: tanggalKembaliWIB,
                    status: StatusPeminjaman.direservasi,
                },
            }),
        ]);

        return NextResponse.json({ success: true, message: "Book borrowed successfully!", data: result[1] }, { status: 201 });

    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') console.error('Error on peminjaman API', error);
        if (error.code === 'P2025') return NextResponse.json({ success: false, message: "Book is unavailable or the stock has just run out!" }, { status: 400 });
        return NextResponse.json({ success: false, message: "An error occurred while processing your request." }, { status: 500 });
    }
}