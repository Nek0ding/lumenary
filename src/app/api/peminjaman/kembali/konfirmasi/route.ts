import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        // 1. Validasi Token JWT Admin (Supabase Auth)
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Expired" }, { status: 401 });
        }

        // 2. Validasi Role Admin di Database (Prisma)
        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Unauthorized! Admin area only." }, { status: 403 });
        }

        // 3. Ambil Input dari Body Request Form Frontend
        const body = await request.json();
        const { id_peminjaman, keterangan_denda, biaya_kerusakan } = body;

        // Catatan: nilai 'keterangan_denda' wajib string sesuai enum: 'tidak_ada' | 'sobek' | 'noda' | 'rusak_total' | 'kehilangan_buku'

        if (!id_peminjaman || typeof id_peminjaman !== 'number') {
            return NextResponse.json({ success: false, message: "ID Peminjaman wajib berupa angka" }, { status: 400 });
        }

        // 4. Ambil Info Transaksi Peminjaman Awal
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { id_peminjaman },
            include: { denda: true }
        });

        if (!peminjaman) {
            return NextResponse.json({ success: false, message: "Transaksi tidak ditemukan" }, { status: 404 });
        }

        // Pastikan buku memang sedang dipinjam atau berstatus terlambat (bukan sudah dikembalikan/batal)
        if (peminjaman.status !== 'dipinjam' && peminjaman.status !== 'terlambat') {
            return NextResponse.json(
                { success: false, message: `Buku tidak bisa dikembalikan karena status saat ini: ${peminjaman.status}` }, 
                { status: 400 }
            );
        }

        // 5. Gabungkan Denda Keterlambatan Otomatis (dari Cron Job) dengan Denda Kerusakan Baru (Input Admin)
        const dendaTerlambatBawaan = peminjaman.denda ? Number(peminjaman.denda.jumlah_denda) : 0;
        const hariTerlambatBawaan = peminjaman.denda ? peminjaman.denda.hari_terlambat : 0;
        
        const nominalKerusakanBaru = biaya_kerusakan ? Number(biaya_kerusakan) : 0;
        const totalAkumulasiDenda = dendaTerlambatBawaan + nominalKerusakanBaru;

        // 6. Eksekusi Atomik Menggunakan $transaction (ACID)
        await prisma.$transaction([
            // A. Update status sirkulasi peminjaman menjadi 'dikembalikan' dan isi tanggal dikembalikan
            prisma.peminjaman.update({
                where: { id_peminjaman },
                data: {
                    status: 'dikembalikan',
                    tanggal_dikembalikan: new Date()
                }
            }),
            // B. Naikkan stok fisik buku kembali +1 ke dalam rak perpustakaan
            prisma.buku.update({
                where: { id_buku: peminjaman.id_buku },
                data: {
                    stok: { increment: 1 }
                }
            }),
            // C. Perbarui record denda menggunakan Upsert (Gabungkan denda waktu + denda fisik)
            prisma.denda.upsert({
                where: { id_peminjaman },
                update: {
                    jumlah_denda: totalAkumulasiDenda,
                    keterangan_denda: keterangan_denda || "tidak_ada",
                    status_bayar: totalAkumulasiDenda > 0 ? "belum_bayar" : "belum_bayar" // default tetap belum_bayar sampai mahasiswa melunasi
                },
                create: {
                    id_peminjaman,
                    jumlah_denda: totalAkumulasiDenda,
                    hari_terlambat: hariTerlambatBawaan,
                    keterangan_denda: keterangan_denda || "tidak_ada",
                    status_bayar: totalAkumulasiDenda > 0 ? "belum_bayar" : "belum_bayar"
                }
            })
        ]);

        return NextResponse.json(
            {
                success: true,
                message: "Buku sukses dikembalikan! Stok buku naik +1 dan rekam denda akhir berhasil disimpan.",
                data: {
                    id_peminjaman,
                    status_peminjaman: "dikembalikan",
                    total_denda_akhir: totalAkumulasiDenda
                }
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error finalizing book return : ", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}