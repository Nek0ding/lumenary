import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function POST(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        const body = await request.json();
        const { id_buku, rating } = body;

        if (!id_buku || typeof rating !== 'number' || rating < 1 || rating > 5) {
            return NextResponse.json({ success: false, message: "Invalid rating data." }, { status: 400 });
        }

        // 1. Validasi: User harus sudah pernah mengembalikan buku ini
        const hasBorrowedAndReturned = await prisma.peminjaman.findFirst({
            where: {
                id_user: auth.id_user,
                id_buku: id_buku,
                status: 'dikembalikan'
            }
        });

        if (!hasBorrowedAndReturned) {
            return NextResponse.json({ 
                success: false, 
                message: "You can only rate books you have successfully returned." 
            }, { status: 403 });
        }

        // 2. Gunakan logic findFirst + update/create (Menghindari conflict unique constraint)
        const existingRating = await prisma.rating.findFirst({
            where: {
                id_user: auth.id_user,
                id_buku: id_buku
            }
        });

        if (existingRating) {
            await prisma.rating.update({
                where: { id_rating: existingRating.id_rating },
                data: { rating: rating }
            });
        } else {
            await prisma.rating.create({
                data: {
                    id_user: auth.id_user,
                    id_buku: id_buku,
                    rating: rating
                }
            });
        }

        // 3. Update rata-rata rating di tabel Buku
        const aggregations = await prisma.rating.aggregate({
            _avg: { rating: true },
            where: { id_buku: id_buku }
        });

        const newAverage = aggregations._avg.rating || 0;

        await prisma.buku.update({
            where: { id_buku: id_buku },
            data: { rating_rata: newAverage }
        });

        return NextResponse.json({ success: true, message: "Rating submitted successfully!" }, { status: 200 });

    } catch (error) {
        console.error("Error submitting rating:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}