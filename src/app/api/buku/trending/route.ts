import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Mengaktifkan cache static Next.js selama 1 jam demi performa optimal
export const revalidate = 3600; 

export async function GET(request: Request) {
    try {
        // 1. Agregasi 5 ID Buku yang paling sering muncul di tabel peminjaman
        const topBorrowed = await prisma.peminjaman.groupBy({
            by: ['id_buku'],
            _count: {
                id_buku: true,
            },
            orderBy: {
                _count: {
                    id_buku: 'desc',
                },
            },
            take: 5,
        });

        // --- SKENARIO A: Jika data peminjaman masih kosong (Sistem Baru) ---
        if (topBorrowed.length === 0) {
            const defaultBooksRaw = await prisma.buku.findMany({
                take: 5,
                orderBy: { id_buku: 'desc' }
            });

            // Konversi Decimal ke Number agar aman dilempar sebagai JSON
            const defaultBooks = defaultBooksRaw.map(buku => ({
                ...buku,
                rating_rata: Number(buku.rating_rata)
            }));

            return NextResponse.json(
                {
                    success: true,
                    message: "Successfully fetched trending books (default)",
                    data: defaultBooks,
                },
                { status: 200 }
            );
        }

        // --- SKENARIO B: Jika data sirkulasi trending sudah tersedia ---
        const booksIds = topBorrowed.map(item => item.id_buku);
        const trendingBooksRaw = await prisma.buku.findMany({
            where: {
                id_buku: {
                    in: booksIds,
                },
            },
        });

        // Susun ulang urutan buku sesuai rank terpopuler + konversi tipe Decimal
        const sortedTrendingBooks = booksIds
            .map((id) => {
                const buku = trendingBooksRaw.find((b) => b.id_buku === id);
                if (!buku) return null;
                return {
                    ...buku,
                    rating_rata: Number(buku.rating_rata) // ✅ Aman dari serialization crash!
                };
            })
            .filter(Boolean);

        return NextResponse.json(
            {
                success: true,
                message: "Successfully fetched trending books",
                data: sortedTrendingBooks,
            },
            { status: 200 }
        );

    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error fetching trending books:", error);
        }
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            { status: 500 }
        );
    }
}