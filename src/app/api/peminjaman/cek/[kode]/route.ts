import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request, { params }: { params: { kode: string } }) {
    try {
        // 1. Validasi Token JWT Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized!"
                },
                { status: 401 }
            );
        }
        
        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized! Expired"
                },
                { status: 401 }
            );
        }

        // 2. Validasi Role Admin di Database
        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized!"
                },
                { status: 403 }
            );
        }

        // 3. Ambil Kode Peminjaman dari Parameter URL
        const { kode } = params;

        // 4. Ambil Data Reservasi (id_buku otomatis terambil di tingkat root model)
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
                }
            }
        });

        // 5. Validasi Jika Data Tidak Ditemukan
        if (!reservationData) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Kode peminjaman tidak ditemukan"
                },
                { status: 404 }
            );
        }

        // 6. Validasi Jika Statusnya Memang Sudah Bukan 'direservasi'
        if (reservationData.status !== 'direservasi') {
            return NextResponse.json(
                {
                    success: false,
                    message: `Kode peminjaman tidak valid, status saat ini adalah ${reservationData.status}`
                },
                { status: 400 }
            );
        }

        // 7. Logika Pembatalan Otomatis (Jika Lewat 24 Jam)
        const waktuSekarang = new Date();
        const waktuReservasi = new Date(reservationData.tanggal_pinjam);
        const selisihJam = (waktuSekarang.getTime() - waktuReservasi.getTime()) / (1000 * 60 * 60);

        if (selisihJam > 24) {
            // Jalankan transaksi atomik untuk membatalkan reservasi & mengembalikan stok buku
            await prisma.$transaction([
                prisma.peminjaman.update({
                    where: {
                        id_peminjaman: reservationData.id_peminjaman
                    },
                    data: {
                        status: 'dibatalkan'
                    }
                }),
                prisma.buku.update({
                    where: {
                        id_buku: reservationData.id_buku // Aman, mengambil foreign key langsung dari root reservationData
                    },
                    data: {
                        stok: { increment: 1 }
                    }
                })
            ]);

            return NextResponse.json(
                {
                    success: false,
                    message: "Reservation is expired past 24 hours! Status has been changed to dibatalkan."
                },
                { status: 400 }
            );
        }

        // 8. Respons Sukses Jika Lolos Semua Validasi
        return NextResponse.json(
            {
                success: true,
                message: "Data reservasi ditemukan",
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
                    }
                },
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error retrieving data peminjaman : ", error);
        }
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            { status: 500 }
        );
    }
}