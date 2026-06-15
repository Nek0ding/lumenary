import {NextResponse} from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const { npm, password } = body;

        if(!npm || !password){
            return NextResponse.json(
                {
                    success: false,
                    message: "NPM dan password harus diisi!"
                },
                {status: 400}
            );
        }

        const userPrisma = await prisma.user.findUnique({
            where:{npm:npm}
        });

        if(!userPrisma || !userPrisma.email){
            return NextResponse.json(
                {
                    success: false,
                    message: "Login gagal! NPM tidak ditemukan"
                },
                {status: 401}
            );
        }

        const {data,error} = await supabase.auth.signInWithPassword(
            {
                email: userPrisma.email,
                password: password,
            }
        );

        if(error){
            return NextResponse.json(
                {
                    success: false,
                    message: "Login gagal! Pastikan NPM dan password benar."
                },
                {status: 401}
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Login berhasil!",
                token: data.session?.access_token,
                user: {
                    id: data.user?.id,
                    npm: userPrisma.npm,
                    email: data.user?.email,
                    role: userPrisma.role,
                }
            },
            {status: 200}
        );
    } catch(error){
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        );
    }
}