import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';
import { StatusBayar, StatusPeminjaman } from "@/generated/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ FIX: Ubah tipe params menjadi Promise<{ kode: string }>
export async function GET(request: Request, { params }: { params: Promise<{ kode: string }> }) {
    try {
        // ✅ FIX: Await params sebelum digunakan
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

        // 3. Ambil Data Transaksi Lengkap dengan Struktur Relasi Denda
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
                        id_buku: true,
                        judul: true,
                    }
                },
                denda: true // Diperlukan untuk kalkulasi denda saat scan pengembalian
            }
        });

        // 4. Validasi Jika Data Tidak Ditemukan
        if (!reservationData) {
            return NextResponse.json({ success: false, message: "Kode peminjaman tidak ditemukan" }, { status: 404 });
        }

        // 5. Validasi Status Sirkulasi yang Diperbolehkan untuk Di-scan di Meja Loket
        const statusValid = ["direservasi", "dipinjam", "terlambat"];
        if (!statusValid.includes(reservationData.status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Kode peminjaman tidak valid, status saat ini adalah ${reservationData.status}.`
                },
                { status: 400 }
            );
        }

        // 6. Logika Pembatalan Otomatis Khusus untuk Status 'direservasi' yang Lewat 24 Jam
        if (reservationData.status === StatusPeminjaman.direservasi) {
            const waktuSekarang = new Date();
            const waktuReservasi = new Date(reservationData.created_at);
            const selisihJam = (waktuSekarang.getTime() - waktuReservasi.getTime()) / (1000 * 60 * 60);

            if (selisihJam > 24) {
                // Jalankan transaksi atomik untuk membatalkan reservasi & mengembalikan stok buku
                await prisma.$transaction([
                    prisma.peminjaman.update({
                        where: { id_peminjaman: reservationData.id_peminjaman },
                        data: { status: StatusPeminjaman.dibatalkan } // ✅ Menggunakan Enum Resmi
                    }),
                    prisma.buku.update({
                        where: { id_buku: reservationData.id_buku },
                        data: { stok: { increment: 1 } }
                    })
                ]);
                return NextResponse.json(
                    {
                        success: false,
                        message: "Masa reservasi telah kedaluwarsa melewati batas 24 jam! Status otomatis diubah menjadi dibatalkan."
                    },
                    { status: 400 }
                );
            }
        }

        // 7. Respons Sukses - Data Dikirim Dinamis Menyesuaikan Kebutuhan UI Frontend
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
                        id_buku: reservationData.buku.id_buku,
                        judul: reservationData.buku.judul,
                    },
                    denda_keterlambatan: {
                        hari_terlambat: reservationData.denda?.hari_terlambat || 0,
                        jumlah_denda: reservationData.denda?.jumlah_denda ? Number(reservationData.denda.jumlah_denda) : 0,
                        status_bayar: reservationData.denda?.status_bayar || StatusBayar.sudah_bayar
                    }
                },
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error retrieving data peminjaman : ", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}