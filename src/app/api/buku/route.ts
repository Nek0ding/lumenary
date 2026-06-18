import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
// ✅ Tetap pakai Anon Key, sudah sangat tepat!
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function GET(request: Request) {
    try {
        // --- 1. Validasi Token JWT ---
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);

        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Akses ditolak! Token Expired" }, { status: 401 });
        }

        // --- 2. Ambil Data Buku + Relasi Kategori ---
        const daftarBukuRaw = await prisma.buku.findMany({
            include: {
                kategori: {
                    select: {
                        nama_kategori: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });

        // --- 3. Normalisasi Data (Konversi Decimal ke Number agar aman di JSON) ---
        const daftarBuku = daftarBukuRaw.map(buku => ({
            ...buku,
            rating_rata: Number(buku.rating_rata) // ✅ Aman dari serialization crash!
        }));

        return NextResponse.json(
            {
                success: true,
                message: "Berhasil mengambil daftar buku",
                data: daftarBuku,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching books:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}