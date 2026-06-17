import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const revalidate = 3600; 
export async function GET(request: Request) {
    try {
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

        if (topBorrowed.length === 0) {
            const defaultBooks = await prisma.buku.findMany({
                take: 5,
                orderBy: { id_buku: 'desc' }
            });

            return NextResponse.json(
                {
                    success: true,
                    message: "Successfully fetched trending books (default)",
                    data: defaultBooks,
                },
                { status: 200 }
            );
        }

        const booksIds = topBorrowed.map(item => item.id_buku);
        const trendingBooks = await prisma.buku.findMany(
            {
                where: {
                    id_buku: {
                        in: booksIds,
                    },
                },
            }
        );

        const sortedTrendingBooks = booksIds.map((id) => trendingBooks.find((buku) => buku.id_buku === id)).filter(Boolean);
        return NextResponse.json(
            {
                success: true,
                message: "Successfully fetched trending books",
                data: sortedTrendingBooks,
            },
            {status: 200}
        );
    } catch(error:any){
        if(process.env.NODE_ENV === 'development'){
            console.error("Error fetching trending books:", error);
        }
        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        );
    }
}