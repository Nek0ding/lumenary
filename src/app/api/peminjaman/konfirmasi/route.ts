import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { StatusPeminjaman } from "@/generated/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ✅ Helper Waktu WIB
function getWIBTime(): Date {
    return new Date(new Date().toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        
        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) return NextResponse.json({ success: false, message: "Unauthorized! Expired" }, { status: 401 });

        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 403 });

        const body = await request.json();
        const { id_peminjaman } = body;
        if (!id_peminjaman || typeof id_peminjaman !== 'number') return NextResponse.json({ success: false, message: "ID Peminjaman valid diperlukan" }, { status: 400 });

        const peminjaman = await prisma.peminjaman.findUnique({ where: { id_peminjaman } });

        if (!peminjaman || peminjaman.status !== StatusPeminjaman.direservasi) {
            return NextResponse.json({ success: false, message: "Peminjaman tidak ditemukan atau status nya sudah bukan direservasi" }, { status: 400 });
        }

        // ✅ Normalisasi Tanggal ke WIB untuk Tipe @db.Date / DateTime
        const tanggalMulaiWIB = getWIBTime();
        const tanggalKembaliWIB = new Date(tanggalMulaiWIB);
        tanggalKembaliWIB.setDate(tanggalMulaiWIB.getDate() + 7);

        const result = await prisma.peminjaman.update({
            where: { id_peminjaman },
            data: {
                status: StatusPeminjaman.dipinjam,
                tanggal_pinjam: tanggalMulaiWIB,
                tanggal_kembali: tanggalKembaliWIB,
            }
        });

        return NextResponse.json({
            success: true,
            message: `Konfirmasi sukses! status buku sekarang : ${result.status}`,
            data: result,
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') console.error("Error changing the status : ", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}