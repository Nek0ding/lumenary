import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ================= 1. GET: AMBIL DATA PROFIL USER =================
export async function GET(request: Request) {
    try {
        // Validasi Token JWT User yang sedang login
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Token Expired" }, { status: 401 });
        }

        // Ambil profil lengkap dari database database berdasarkan email auth
        const userProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: {
                id_user: true,
                npm: true,
                email: true,
                nama: true,
                no_telp: true,
                alamat: true,
                jenis_kelamin: true,
                role: true,
                created_at: true
            }
        });

        if (!userProfile) {
            return NextResponse.json({ success: false, message: "User profile not found!" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Berhasil mengambil data profil user",
            data: userProfile
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error retrieving user profile: ", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}

// ================= 2. PUT: UPDATE DATA PROFIL USER =================
export async function PUT(request: Request) {
    try {
        // Validasi Token JWT User
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Token Expired" }, { status: 401 });
        }

        const body = await request.json();
        const { nama, no_telp, alamat, jenis_kelamin } = body;

        // ---------------------------------------------------------
        // ✅ 1. VALIDASI NAMA (Minimal 3 karakter & bukan spasi kosong)
        // ---------------------------------------------------------
        if (!nama || typeof nama !== 'string' || nama.trim().length < 3) {
            return NextResponse.json(
                { success: false, message: "Format nama tidak valid! Minimal 3 karakter." },
                { status: 400 }
            );
        }

        // ---------------------------------------------------------
        // ✅ 2. VALIDASI NOMOR TELEPON (Regex: Hanya angka, +, -, 9 s/d 15 digit)
        // ---------------------------------------------------------
        const phoneRegex = /^[0-9\-\+]{9,15}$/;
        if (!no_telp || !phoneRegex.test(no_telp)) {
            return NextResponse.json(
                { success: false, message: "Format nomor telepon tidak valid! Hanya boleh berisi angka (9 - 15 digit)." },
                { status: 400 }
            );
        }

        // ---------------------------------------------------------
        // ✅ 3. VALIDASI ALAMAT (Minimal 10 karakter & bukan spasi kosong)
        // ---------------------------------------------------------
        if (!alamat || typeof alamat !== 'string' || alamat.trim().length < 10) {
            return NextResponse.json(
                { success: false, message: "Alamat terlalu pendek! Berikan alamat yang jelas (minimal 10 karakter)." },
                { status: 400 }
            );
        }

        // ---------------------------------------------------------
        // ✅ 4. VALIDASI JENIS KELAMIN (Strict Equality / Enum Check)
        // ---------------------------------------------------------
        // Sesuaikan isi array ini dengan struktur Enum/String yang kamu buat di schema.prisma
        const validJenisKelamin = ["L", "P"];

        if (!jenis_kelamin || !validJenisKelamin.includes(jenis_kelamin)) {
            return NextResponse.json(
                { success: false, message: `Jenis kelamin tidak valid! Pilihan yang tersedia: ${validJenisKelamin.join(', ')}` },
                { status: 400 }
            );
        }

        // Eksekusi update data ke Prisma jika semua validasi lolos
        const updatedUser = await prisma.user.update({
            where: { email: user.email! },
            data: {
                nama: nama.trim(),       // Membersihkan spasi berlebih di awal/akhir
                no_telp: no_telp.trim(),
                alamat: alamat.trim(),
                jenis_kelamin: jenis_kelamin
            },
            select: {
                id_user: true,
                npm: true,
                email: true,
                nama: true,
                no_telp: true,
                alamat: true,
                jenis_kelamin: true,
                role: true
            }
        });

        return NextResponse.json({
            success: true,
            message: "Data profil akun berhasil diperbarui.",
            data: updatedUser
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error updating user profile: ", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}