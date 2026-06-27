import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from '@supabase/supabase-js';

// Menggunakan Service Role Key untuk akses server-side yang lebih stabil
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('search') || ''; 

        // Pencarian (Tanpa mewajibkan auth agar publik bisa akses)
        const results = await prisma.buku.findMany({
            where: q ? {
                OR: [
                    { judul: { contains: q, mode: 'insensitive' } },
                    { penulis: { contains: q, mode: 'insensitive' } },
                    { isbn: { contains: q, mode: 'insensitive' } },
                ]
            } : {},
            include: { kategori: { select: { nama_kategori: true } } },
            orderBy: { created_at: 'desc' },
            take: 50
        });

        const normalized = results.map(b => ({
            ...b,
            rating_rata: b.rating_rata ? Number(b.rating_rata) : null
        }));

        return NextResponse.json({ success: true, data: normalized });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Server Error" }, { status: 500 });
    }
}