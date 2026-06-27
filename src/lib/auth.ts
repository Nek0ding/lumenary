import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

// Gunakan SERVICE_ROLE_KEY (bukan ANON_KEY) untuk validasi token di server-side.
// Service role key bypass RLS dan tidak pernah di-expose ke client.
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export interface AuthPayload {
    id_user: string;
    role: "CUSTOMER" | "ADMIN";
    nama: string | null;
}

/**
 * Validasi token dari Authorization header.
 * Mengembalikan AuthPayload jika valid, atau NextResponse 401 jika tidak.
 *
 * Pola penggunaan di API route:
 *   const auth = await requireAuth(request);
 *   if (auth instanceof NextResponse) return auth;
 *   // auth.id_user dan auth.role tersedia di sini
 */
export async function requireAuth(request: Request): Promise<AuthPayload | NextResponse> {
    const authHeader = request.headers.get('Authorization');

    if (!authHeader?.startsWith('Bearer ')) {
        return NextResponse.json(
            { success: false, message: "Akses ditolak: token tidak ditemukan." },
            { status: 401 }
        );
    }

    const token = authHeader.split(' ')[1];

    // Verifikasi token ke Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
        // Token expired atau tidak valid → client harus redirect ke /login
        return NextResponse.json(
            { success: false, message: "Sesi kedaluwarsa. Silakan login kembali.", code: "TOKEN_EXPIRED" },
            { status: 401 }
        );
    }

    // Ambil data user dari database (validasi npm/email sekaligus)
    const dbUser = await prisma.user.findUnique({
        where: { email: user.email! },
        select: { id_user: true, role: true, nama: true }
    });

    if (!dbUser) {
        return NextResponse.json(
            { success: false, message: "Akun tidak ditemukan di sistem." },
            { status: 404 }
        );
    }

    return {
        id_user: dbUser.id_user,
        role: dbUser.role,
        nama: dbUser.nama,
    };
}

/**
 * Sama seperti requireAuth, tapi memastikan user adalah ADMIN.
 * Return 403 jika user adalah CUSTOMER.
 */
export async function requireAdmin(request: Request): Promise<AuthPayload | NextResponse> {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    if (auth.role !== "ADMIN") {
        return NextResponse.json(
            { success: false, message: "Akses ditolak: hanya admin yang diizinkan." },
            { status: 403 }
        );
    }

    return auth;
}