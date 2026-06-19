import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';
import { StatusBayar, StatusPeminjaman } from "@/generated/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ FIX: Mengubah tipe params menjadi Promise<{ kode: string }>
export async function GET(request: Request, { params }: { params: Promise<{ kode: string }> }) {
    try {
        // ✅ FIX: Melakukan await pada params sebelum destructuring mengambil nilai kode
        const { kode } = await params;

        // 1. Validasi Token JWT Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Expired" }, { status: 401 });
        }

        // 2. Validasi Role Admin di Database
        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 403 });
        }

        // 3. Ambil Data Transaksi (Mendukung status 'dipinjam' maupun 'terlambat')
        const reservationData = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman: kode.toUpperCase() },
            include: {
                user: {
                    select: {
                        nama: true,
                        email: true,
                        no_telp: true,
                        alamat: true
                    }
                },
                buku: {
                    select: {
                        judul: true,
                    }
                },
                denda: true // Langsung mengambil data denda hasil rekam otomatis Cron Job database
            }
        });

        // 4. Validasi Jika Data Tidak Ditemukan
        if (!reservationData) {
            return NextResponse.json(
                { success: false, message: "Kode peminjaman tidak ditemukan" },
                { status: 404 }
            );
        }

        // 5. Validasi Status Transaksi yang Boleh Dikembalikan
        if (reservationData.status !== 'dipinjam' && reservationData.status !== 'terlambat') {
            return NextResponse.json(
                { 
                    success: false, 
                    message: `Kode tidak valid, status buku saat ini adalah ${reservationData.status}. Hanya buku berstatus 'dipinjam' atau 'terlambat' yang bisa dikembalikan.` 
                },
                { status: 400 }
            );
        }

        // 6. Respons Data untuk Dikonsumsi Form Frontend Admin
        return NextResponse.json(
            {
                success: true,
                message: "Data peminjaman berhasil discan",
                data: {
                    id_peminjaman: reservationData.id_peminjaman,
                    kode_peminjaman: reservationData.kode_peminjaman,
                    status: reservationData.status,
                    mahasiswa: {
                        nama: reservationData.user.nama,
                        email: reservationData.user.email,
                        no_telp: reservationData.user.no_telp,
                        alamat: reservationData.user.alamat,
                    },
                    buku: {
                        judul: reservationData.buku.judul,
                    },
                    denda_keterlambatan: {
                        hari_terlambat: reservationData.denda?.hari_terlambat || 0,
                        jumlah_denda: reservationData.denda?.jumlah_denda ? Number(reservationData.denda.jumlah_denda) : 0,
                        status_bayar: reservationData.denda?.status_bayar || "belum_bayar"
                    }
                },
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error checking data pengembalian : ", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}