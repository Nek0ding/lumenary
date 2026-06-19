import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';
import { keteranganDenda, StatusBayar, StatusPeminjaman } from "@prisma/client";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

function getWIBTime(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) return NextResponse.json({ success: false, message: "Unauthorized! Token expired or invalid." }, { status: 401 });

        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });
        if (!adminProfile || adminProfile.role !== 'ADMIN') return NextResponse.json({ success: false, message: "Forbidden! Admin area only." }, { status: 403 });

        const body = await request.json();
        const { id_peminjaman, keterangan_denda: inputKeterangan, biaya_kerusakan } = body;

        if (!id_peminjaman || typeof id_peminjaman !== 'number') return NextResponse.json({ success: false, message: "id_peminjaman wajib berupa angka." }, { status: 400 });

        const validKeterangan = Object.values(keteranganDenda);
        if (inputKeterangan && !validKeterangan.includes(inputKeterangan)) return NextResponse.json({ success: false, message: `keterangan_denda tidak valid.` }, { status: 400 });
        if (biaya_kerusakan !== undefined && (typeof biaya_kerusakan !== 'number' || biaya_kerusakan < 0)) return NextResponse.json({ success: false, message: "biaya_kerusakan harus angka non-negatif." }, { status: 400 });

        const peminjaman = await prisma.peminjaman.findUnique({
            where: { id_peminjaman },
            include: { denda: true }
        });

        if (!peminjaman) return NextResponse.json({ success: false, message: "Transaksi tidak ditemukan." }, { status: 404 });
        if (peminjaman.status !== StatusPeminjaman.dipinjam && peminjaman.status !== StatusPeminjaman.terlambat) {
            return NextResponse.json({ success: false, message: `Buku tidak bisa dikembalikan, status saat ini: ${peminjaman.status}` }, { status: 400 });
        }

        // Kalkulasi Denda Akhir (Gabungan Otomasi Cron & Manual Admin)
        const dendaTerlambat = peminjaman.denda ? Number(peminjaman.denda.jumlah_denda) : 0;
        const hariTerlambat = peminjaman.denda ? peminjaman.denda.hari_terlambat : 0;
        const nominalKerusakan = biaya_kerusakan ?? 0;
        const totalDenda = dendaTerlambat + nominalKerusakan;

        // Aturan Ketat: Record Denda hanya dibuat/diupdate jika memang ada nominal denda
        const perluDenda = totalDenda > 0;
        const waktuDikembalikanWIB = getWIBTime();

        await prisma.$transaction([
            prisma.peminjaman.update({
                where: { id_peminjaman },
                data: {
                    status: StatusPeminjaman.dikembalikan,
                    tanggal_dikembalikan: waktuDikembalikanWIB,
                }
            }),
            prisma.buku.update({
                where: { id_buku: peminjaman.id_buku },
                data: { stok: { increment: 1 } }
            }),
            ...(perluDenda ? [
                prisma.denda.upsert({
                    where: { id_peminjaman },
                    update: {
                        jumlah_denda: totalDenda,
                        hari_terlambat: hariTerlambat,
                        keterangan_denda: inputKeterangan || peminjaman.denda?.keterangan_denda || keteranganDenda.tidak_ada,
                        status_bayar: StatusBayar.sudah_bayar, // Mutlak Lunas
                        tanggal_bayar: waktuDikembalikanWIB,
                    },
                    create: {
                        id_peminjaman,
                        jumlah_denda: totalDenda,
                        hari_terlambat: hariTerlambat,
                        keterangan_denda: inputKeterangan || keteranganDenda.tidak_ada,
                        status_bayar: StatusBayar.sudah_bayar, // Mutlak Lunas
                        tanggal_bayar: waktuDikembalikanWIB,
                    }
                })
            ] : [])
        ]);

        return NextResponse.json({
            success: true,
            message: "Buku berhasil dikembalikan dan administrasi denda dinyatakan lunas.",
            data: {
                id_peminjaman,
                status_peminjaman: "dikembalikan",
                tanggal_dikembalikan: waktuDikembalikanWIB,
                total_denda_final: totalDenda,
                status_bayar: perluDenda ? "sudah_bayar" : "tidak_ada_denda",
            }
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error("Error finalizing book return:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}