import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// ─── Helper: Validate Admin & Secure Route ────────────────────────────────────
async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    
    if (auth.role !== "ADMIN") {
        return { error: NextResponse.json({ success: false, message: "Access Denied: Admins only." }, { status: 403 }) };
    }
    return { auth };
}

// ─── GET /api/admin/counter/check ─────────────────────────────────────────────
export async function GET(request: Request) {
    const { error } = await validateAdmin(request);
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const code = searchParams.get("code");
    const type = searchParams.get("type"); // expected: 'pickup' | 'return'

    if (!code) {
        return NextResponse.json({ success: false, message: "Transaction code is required." }, { status: 400 });
    }

    try {
        // Fetch data Peminjaman beserta relasi User, Buku, dan Denda
        const peminjaman = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman: code },
            include: {
                user: {
                    select: { nama: true, npm: true }
                },
                buku: {
                    select: { judul: true, isbn: true, cover_buku: true }
                },
                denda: true
            }
        });

        // Validasi 1: Apakah data ada?
        if (!peminjaman) {
            return NextResponse.json({ success: false, message: "Transaction data not found." }, { status: 404 });
        }

        // Validasi 2: Apakah status peminjaman sesuai dengan konteks yang diminta?
        if (type === "pickup") {
            if (peminjaman.status !== "direservasi") {
                return NextResponse.json({ 
                    success: false, 
                    message: `Invalid status for pickup. Current status: ${peminjaman.status.toUpperCase()}` 
                }, { status: 400 });
            }
        } else if (type === "return") {
            if (!["dipinjam", "terlambat"].includes(peminjaman.status)) {
                return NextResponse.json({ 
                    success: false, 
                    message: `Invalid status for return. Current status: ${peminjaman.status.toUpperCase()}` 
                }, { status: 400 });
            }
        }

        // Data aman, kembalikan ke Frontend
        return NextResponse.json({
            success: true,
            message: "Data successfully retrieved.",
            data: peminjaman
        });

    } catch (err: any) {
        return NextResponse.json({ 
            success: false, 
            message: "An internal server error occurred.", 
            detail: err.message 
        }, { status: 500 });
    }
}