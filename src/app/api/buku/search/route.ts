import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
    try {
        // --- 1. Tangkap Parameter 'q' dari URL ---
        // Contoh URL yang masuk: /api/buku/search?q=atomic
        const { searchParams } = new URL(request.url);
        const q = searchParams.get('search'); 

        // --- 2. Bangun Logika Pencarian Dinamis (Where Clause) ---
        const whereCondition: any = {};

        // Pencarian Teks Murni (Cari di Judul ATAU Penulis ATAU ISBN)
        if (q && q.trim() !== '') {
            whereCondition.OR = [
                { judul: { contains: q, mode: 'insensitive' } },
                { penulis: { contains: q, mode: 'insensitive' } },
                { isbn: { contains: q, mode: 'insensitive' } },
            ];
        }

        // --- 3. Eksekusi Query ke Database Prisma ---
        const searchResultsRaw = await prisma.buku.findMany({
            where: whereCondition,
            include: {
                kategori: { // Tetap di-include agar UI Explore bisa menampilkan label kategori bukunya
                    select: {
                        nama_kategori: true
                    }
                }
            },
            orderBy: {
                created_at: 'desc' // Tampilkan buku paling baru terlebih dahulu
            },
            take: 50 // Batasi maksimal 50 hasil agar server tetap ringan
        });

        // --- 4. Normalisasi Tipe Data (Decimal ke Number) ---
        const searchResults = searchResultsRaw.map(buku => ({
            ...buku,
            rating_rata: buku.rating_rata ? Number(buku.rating_rata) : null
        }));

        return NextResponse.json({
            success: true,
            message: `Berhasil menemukan ${searchResults.length} buku.`,
            data: searchResults
        }, { status: 200 });

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error searching books:", error);
        }
        return NextResponse.json({ 
            success: false, 
            message: "Terjadi kesalahan pada server saat mencari buku." 
        }, { status: 500 });
    }
}