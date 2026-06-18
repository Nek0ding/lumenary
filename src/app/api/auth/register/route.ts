import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";
import bcrypt from 'bcryptjs';

// ✅ Gunakan SERVICE_ROLE_KEY agar bisa mengontrol pembuatan user bypass konfirmasi email
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
    // Sediakan variabel di luar block try agar bisa dibaca oleh block catch jika terjadi rollback
    let supabaseUid: string | undefined;

    try {
        const body = await request.json();
        const { npm, email, password } = body;

        if (!npm || !email || !password) {
            return NextResponse.json({ success: false, message: "Semua field harus diisi!" }, { status: 400 });
        }

        // 1. Daftarkan User ke Supabase Auth via Admin API (Auto-confirm Email)
        const { data: authData, error: authError } = await supabase.auth.admin.createUser({
            email: email,
            password: password,
            email_confirm: true // Langsung aktif tanpa verifikasi email link!
        });

        if (authError || !authData.user) {
            if (authError?.message.includes("already registered")) {
                return NextResponse.json({ success: false, message: "Gagal registrasi! Email sudah terdaftar di auth." }, { status: 400 });
            }
            return NextResponse.json({ success: false, message: authError?.message || "Gagal membuat user di Auth." }, { status: 500 });
        }

        // ✅ MODIFIKASI: Langsung isi tanpa pakai keyword 'const' lagi
        supabaseUid = authData.user.id;

        // 2. Hash password untuk cadangan di database lokal Prisma
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Simpan data profil lengkap ke tabel User Prisma
        const userBaru = await prisma.user.create({
            data: {
                id_user: supabaseUid, // DISAMAKAN dengan ID Supabase Auth agar relasi token JWT klop
                npm: npm,
                email: email,
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

        // 🔴 ROLLBACK AMAN: Jika user telanjur masuk Supabase Auth tapi gagal di Prisma, hapus kembali dari Supabase
        if (supabaseUid) {
            await supabase.auth.admin.deleteUser(supabaseUid);
        }

        if (error.code === 'P2002') {
            return NextResponse.json({ success: false, message: "Gagal registrasi! Email atau NPM sudah terdaftar." }, { status: 400 });
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}