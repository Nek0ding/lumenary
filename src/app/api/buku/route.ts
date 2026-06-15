import {NextResponse} from "next/server";
import {prisma} from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);


//AMBIL DATA BUKU
export async function GET(request: Request) {
    try{
        const authHeader = request.headers.get('Authorization');
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return NextResponse.json(
                {
                    success: false,
                    message: "Akses ditolak! "
                },
                {status: 401});
        }

        const token = authHeader.split(' ')[1];

        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user){
            return NextResponse.json(
                {
                    success: false,
                    message: "Akses ditolak! Expired"
                },
                {status: 401}
            );
        }

        const daftarBuku = await prisma.buku.findMany({
            orderBy:{created_at: 'desc'}
        });

        return NextResponse.json(
            {
            success: true,
            message: "Berhasil mengambil daftar buku",
            data: daftarBuku,
            },
            {status: 200}
        );
    }catch(error){
        console.error("Error fetching books:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        )
    }
}

//TAMBAH BUKU