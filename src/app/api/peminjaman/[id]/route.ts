import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { StatusPeminjaman } from "@prisma/client";
import { requireAuth } from "@/lib/auth"; // Menggunakan utility auth Anda

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    // 1. Autentikasi via utility
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return auth;

    try {
        const body = await request.json();
        if (body?.action !== "cancel") {
            return NextResponse.json(
                { success: false, message: "Invalid action." },
                { status: 400 }
            );
        }

        const { id } = await params;
        const id_peminjaman = parseInt(id, 10);
        
        if (isNaN(id_peminjaman) || id_peminjaman <= 0) {
            return NextResponse.json(
                { success: false, message: "Invalid loan ID." },
                { status: 400 }
            );
        }

        // 2. Fetch record peminjaman dengan relasi buku
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { id_peminjaman },
            select: {
                id_peminjaman: true,
                id_user: true,
                id_buku: true,
                status: true,
            },
        });

        if (!peminjaman) {
            return NextResponse.json(
                { success: false, message: "Loan record not found." },
                { status: 404 }
            );
        }

        // 3. Ownership check (IDOR Protection)
        if (peminjaman.id_user !== auth.id_user) {
            return NextResponse.json(
                { success: false, message: "Forbidden. You do not own this loan." },
                { status: 403 }
            );
        }

        // 4. Status check — hanya 'direservasi' yang bisa dibatalkan
        if (peminjaman.status !== StatusPeminjaman.direservasi) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cannot cancel. This reservation is already processed or finished.",
                },
                { status: 409 }
            );
        }

        // 5. Atomic cancel + restock
        await prisma.$transaction([
            prisma.peminjaman.update({
                where: { id_peminjaman },
                data: { status: StatusPeminjaman.dibatalkan },
            }),
            prisma.buku.update({
                where: { id_buku: peminjaman.id_buku },
                data: { stok: { increment: 1 } },
            }),
        ]);

        return NextResponse.json(
            { success: true, message: "Reservation successfully cancelled." },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error cancelling reservation:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error." },
            { status: 500 }
        );
    }
}