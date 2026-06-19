import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { npm, password } = body;

        if (!npm || !password) {
            return NextResponse.json(
                { success: false, message: "NPM dan password harus diisi!" },
                { status: 400 }
            );
        }

        // 1. Cari email berdasarkan NPM di Prisma
        const userPrisma = await prisma.user.findUnique({
            where: { npm }
        });

        if (!userPrisma?.email) {
            return NextResponse.json(
                { success: false, message: "Login gagal! NPM tidak ditemukan." },
                { status: 401 }
            );
        }

        // 2. Login ke Supabase Auth pakai email yang ditemukan
        const { data, error } = await supabase.auth.signInWithPassword({
            email: userPrisma.email,
            password
        });

        if (error || !data.session) {
            return NextResponse.json(
                { success: false, message: "Login gagal! Pastikan NPM dan password benar." },
                { status: 401 }
            );
        }

        // ✅ 3. Pastikan token ada sebelum dikirim
        const token = data.session.access_token;
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Gagal mendapatkan token sesi." },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Login berhasil!",
                token,
                user: {
                    id: data.user?.id,
                    npm: userPrisma.npm,
                    email: data.user?.email,
                    role: userPrisma.role,
                    nama: userPrisma.nama,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        // ✅ Log error agar bisa di-debug
        console.error("Error during login:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}