import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";
import { StatusPeminjaman } from "@prisma/client";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        // ── 1. Auth ──────────────────────────────────────────────────────────
        const authHeader = request.headers.get("Authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            return NextResponse.json(
                { success: false, message: "Unauthorized!" },
                { status: 401 }
            );
        }

        const token = authHeader.split(" ")[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized! Token expired or invalid." },
                { status: 401 }
            );
        }

        // ── 2. Parse & Validate Body ─────────────────────────────────────────
        const body = await request.json();
        if (body?.action !== "cancel") {
            return NextResponse.json(
                { success: false, message: "Invalid action." },
                { status: 400 }
            );
        }

        // ── 3. Validate ID param ─────────────────────────────────────────────
        const { id } = await params;
        const id_peminjaman = parseInt(id, 10);
        if (isNaN(id_peminjaman) || id_peminjaman <= 0) {
            return NextResponse.json(
                { success: false, message: "Invalid loan ID." },
                { status: 400 }
            );
        }

        // ── 4. Resolve user profile ──────────────────────────────────────────
        const userProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { id_user: true },
        });
        if (!userProfile) {
            return NextResponse.json(
                { success: false, message: "User profile not found." },
                { status: 404 }
            );
        }

        // ── 5. Fetch the loan record ─────────────────────────────────────────
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

        // ── 6. Ownership check — user can only cancel their own loan ─────────
        if (peminjaman.id_user !== userProfile.id_user) {
            return NextResponse.json(
                { success: false, message: "Forbidden. You do not own this loan." },
                { status: 403 }
            );
        }

        // ── 7. Status check — only 'direservasi' can be cancelled ────────────
        if (peminjaman.status !== StatusPeminjaman.direservasi) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This loan cannot be cancelled. Only reservations that are awaiting pickup can be cancelled.",
                },
                { status: 409 }
            );
        }

        // ── 8. Atomic cancel + restock ───────────────────────────────────────
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
        if (process.env.NODE_ENV === "development") {
            console.error("Error cancelling reservation:", error);
        }
        return NextResponse.json(
            { success: false, message: "Internal Server Error." },
            { status: 500 }
        );
    }
}