import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcryptjs';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    let supabaseUid: string | undefined;

    try {
        const body = await request.json();
        const { npm, email, password } = body;

        if (!npm || !email || !password) {
            return NextResponse.json(
                { success: false, message: "Semua field harus diisi!" },
                { status: 400 }
            );
        }

        if (!/^\d{8}$/.test(npm)) {
            return NextResponse.json(
                { success: false, message: "NPM harus terdiri dari 8 digit angka." },
                { status: 400 }
            );
        }

        // 1. Daftarkan ke Supabase Auth
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email,
            password,
            email_confirm: true
        });

        if (authError || !authData.user) {
            // ✅ Cek status code + string untuk keamanan ganda
            if (authError?.status === 422 || authError?.message.toLowerCase().includes("already registered")) {
                return NextResponse.json(
                    { success: false, message: "Gagal registrasi! Email sudah terdaftar." },
                    { status: 400 }
                );
            }
            return NextResponse.json(
                { success: false, message: authError?.message || "Gagal membuat user di Auth." },
                { status: 500 }
            );
        }

        supabaseUid = authData.user.id;

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Simpan ke Prisma
        const userBaru = await prisma.user.create({
            data: {
                id_user: supabaseUid,
                npm,
                email,
                password: hashedPassword,
                role: 'CUSTOMER'
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registrasi berhasil!",
                data: {
                    id_user: userBaru.id_user,
                    npm: userBaru.npm,
                    email: userBaru.email,
                }
            },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error during registration:", error);

        // ✅ Rollback dengan error handling
        if (supabaseUid) {
            const { error: deleteError } = await supabase.auth.admin.deleteUser(supabaseUid);
            if (deleteError) {
                console.error("CRITICAL: Gagal rollback Supabase user:", supabaseUid, deleteError);
            }
        }

        if (error.code === 'P2002') {
            return NextResponse.json(
                { success: false, message: "Gagal registrasi! Email atau NPM sudah terdaftar." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}