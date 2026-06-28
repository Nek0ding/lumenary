import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    if (auth.role !== "ADMIN") {
        return {
            error: NextResponse.json(
                { success: false, message: "Access Denied: Admins only." },
                { status: 403 }
            ),
        };
    }
    return { auth };
}

// ─── GET /api/admin/counter/queue ─────────────────────────────────────────────
// Returns all "live" transactions: status = direservasi | dipinjam | terlambat
export async function GET(request: Request) {
    const { error } = await validateAdmin(request);
    if (error) return error;

    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const activeLoans = await prisma.peminjaman.findMany({
            where: {
                status: { in: ["direservasi", "dipinjam", "terlambat"] },
            },
            include: {
                user: { select: { nama: true, npm: true } },
                buku: { select: { judul: true, cover_buku: true, isbn: true } },
                denda: {
                    select: { jumlah_denda: true, status_bayar: true },
                },
            },
            orderBy: [
                // Overdue first, then by due date ascending
                { status: "asc" },
                { tanggal_kembali: "asc" },
            ],
        });

        // ─── Compute derived fields for each row ──────────────────────────
        const enriched = activeLoans.map((loan) => {
            const dueDate = new Date(loan.tanggal_kembali);
            dueDate.setHours(0, 0, 0, 0);
            const msPerDay = 1000 * 60 * 60 * 24;
            const hari_terlambat = Math.max(
                0,
                Math.floor((today.getTime() - dueDate.getTime()) / msPerDay)
            );

            const action_type: "PICKUP_BOOKING" | "RETURN & FINE" =
                loan.status === "direservasi" ? "PICKUP_BOOKING" : "RETURN & FINE";

            return {
                id_peminjaman: loan.id_peminjaman,
                kode_peminjaman: loan.kode_peminjaman,
                status: loan.status,
                tanggal_pinjam: loan.tanggal_pinjam,
                tanggal_kembali: loan.tanggal_kembali,
                action_type,
                hari_terlambat,
                user: loan.user,
                buku: loan.buku,
                denda: loan.denda,
            };
        });

        // ─── Summary stats ────────────────────────────────────────────────
        const pending_pickup = enriched.filter(
            (l) => l.action_type === "PICKUP_BOOKING"
        ).length;

        const overdue_returns = enriched.filter(
            (l) => l.hari_terlambat > 0
        ).length;

        // Sum only unpaid fines
        const total_penalty = activeLoans.reduce((acc, loan) => {
            if (
                loan.denda &&
                loan.denda.status_bayar === "belum_bayar"
            ) {
                return acc + Number(loan.denda.jumlah_denda);
            }
            return acc;
        }, 0);

        return NextResponse.json({
            success: true,
            summary: { pending_pickup, overdue_returns, total_penalty },
            data: enriched,
        });
    } catch (err: any) {
        return NextResponse.json(
            {
                success: false,
                message: "An internal server error occurred.",
                detail: err.message,
            },
            { status: 500 }
        );
    }
}