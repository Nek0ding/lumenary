import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Sesi kedaluwarsa." }, { status: 401 });
        }

        const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true }
        });

        if (!dbUser) {
            return NextResponse.json({ success: false, message: "User tidak ditemukan." }, { status: 404 });
        }

        // Ambil semua tagihan denda yang belum dibayar
        const dendaList = await prisma.denda.findMany({
            where: {
                status_bayar: 'belum_bayar',
                peminjaman: { id_user: dbUser.id_user }
            },
            include: {
                peminjaman: {
                    include: { buku: { select: { judul: true } } }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        // Format data
        const formattedDenda = dendaList.map(item => ({
            id_denda: item.id_denda,
            jumlah_denda: Number(item.jumlah_denda),
            hari_terlambat: item.hari_terlambat,
            keterangan_denda: item.keterangan_denda, // misal: 'tidak_ada', 'sobek', dll
            judul_buku: item.peminjaman.buku.judul
        }));

        // Hitung total semua tagihan
        const totalTagihan = formattedDenda.reduce((sum, item) => sum + item.jumlah_denda, 0);

        return NextResponse.json({
            success: true,
            data: {
                list: formattedDenda,
                total: totalTagihan
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching penalty:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}