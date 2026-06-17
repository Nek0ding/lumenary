import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
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

            )
        }
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

        const body = await request.json();
        const{id_peminjaman}=body;
        if(!id_peminjaman || typeof id_peminjaman !=='number'){
            return NextResponse.json(
                {
                    success:false,
                    message:"ID Peminjaman valid diperlukan"
                },
                {status:400}
            );
        }

        const peminjaman = await prisma.peminjaman.findUnique(
            {
                where:{
                    id_peminjaman
                }
            }
        );

        if(!peminjaman || peminjaman.status!='direservasi'){
            return NextResponse.json(
                {
                    success:false,
                    message: "Peminjaman tidak ditemukan atau status nya sudah bukan direservasi"
                },
                {status:400}
            );
        }

        const tanggalMulai = new Date();
        const tanggalKembali = new Date();
        tanggalKembali.setDate(tanggalMulai.getDate() + 7);

        const result = await prisma.peminjaman.update(
            {
                where:{id_peminjaman},
                data:{
                    status:'dipinjam',
                    tanggal_pinjam: tanggalMulai,
                    tanggal_kembali: tanggalKembali,
                }
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: `Konfirmasi sukses! status buku sekarang : ${result.status}`,
                data:result,
            },
            {status:200}
        );
    } catch(error){
        if(process.env.NODE_ENV === 'development'){
            console.error("Error changing the status : ", error);
        }
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        );
    }
}