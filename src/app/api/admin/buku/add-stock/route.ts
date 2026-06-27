import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// ─── Helper: Validate Admin & Secure Route ────────────────────────────────────
async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    
    // If requireAuth fails (token expired, missing, or invalid), it returns a NextResponse (401/403)
    if (auth instanceof NextResponse) return { error: auth };
    
    // Second-layer Role Protection: Verify the account has Admin access rights
    if (auth.role !== "ADMIN") {
        return { 
            error: NextResponse.json(
                { success: false, message: "Access Denied: This feature is restricted to Admins only." }, 
                { status: 403 }
            ) 
        };
    }
    
    return { auth };
}

// ─── Helper: Client Info Extraction for Audit Logs ───────────────────────────
function getClientInfo(request: Request) {
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const user_agent = request.headers.get("user-agent") || "Unknown Device";
    return { ip_address, user_agent };
}

// ─── POST /api/admin/buku/add-stock ──────────────────────────────────────────
// Add one or more physical units to an existing book
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);

    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
    }

    const { id_buku, jumlah_tambah, asal_perolehan } = body;

    // ── Validation ───────────────────────────────────────────────────────────
    const errors: string[] = [];

    if (!id_buku || isNaN(parseInt(id_buku)))
        errors.push("Invalid Book ID.");

    const jumlah = parseInt(jumlah_tambah);
    if (isNaN(jumlah) || jumlah < 1 || jumlah > 50)
        errors.push("Stock addition quantity must be between 1–50.");

    const asal = String(asal_perolehan || "").trim().toUpperCase();
    const allowedAsal = ["PEMBELIAN", "HIBAH", "DONASI", "WARISAN", "LAINNYA"];
    if (!allowedAsal.includes(asal))
        errors.push(`Acquisition source must be one of the following: ${allowedAsal.join(", ")}.`);

    if (errors.length > 0)
        return NextResponse.json({ success: false, message: errors[0], errors }, { status: 422 });

    // ── Check book exists ────────────────────────────────────────────────────
    const buku = await prisma.buku.findUnique({
        where:   { id_buku: parseInt(id_buku) },
        include: { items: { select: { kode_buku: true }, orderBy: { id_item: "desc" }, take: 1 } },
    });
    if (!buku)
        return NextResponse.json({ success: false, message: "Book not found." }, { status: 404 });

    // ── Determine next serial number ─────────────────────────────────────────
    const existingCount = await prisma.bukuItem.count({ where: { id_buku: parseInt(id_buku) } });

    // ── Generate kode_buku ───────────────────────────────────────────────────
    function generateKodeBuku(isbn: string, seri: number): string {
        const cleanIsbn = isbn.replace(/-/g, "").slice(-6);
        return `${cleanIsbn}-${String(seri).padStart(3, "0")}`;
    }

    // ── Atomic Transaction ───────────────────────────────────────────────────
    try {
        const result = await prisma.$transaction(async (tx) => {
            const itemsData = Array.from({ length: jumlah }, (_, i) => ({
                id_buku:        parseInt(id_buku),
                kode_buku:      generateKodeBuku(buku.isbn, existingCount + i + 1),
                asal_perolehan: asal,
                status:         "TERSEDIA" as const,
            }));

            await tx.bukuItem.createMany({ data: itemsData });

            // Update stock count in Buku table
            const updatedBuku = await tx.buku.update({
                where: { id_buku: parseInt(id_buku) },
                data:  { stok: { increment: jumlah } },
            });

            // Fetch newly created book items
            const generatedItems = await tx.bukuItem.findMany({
                where:   { id_buku: parseInt(id_buku) },
                orderBy: { id_item: "desc" },
                take:    jumlah,
            });

            // Log stock addition to AuditLog
            await tx.auditLog.create({
                data: {
                    id_user: auth.id_user,
                    aksi: "UPDATE",
                    entitas: "BukuItem",
                    id_entitas: id_buku.toString(),
                    deskripsi: `Admin ${auth.nama} added ${jumlah} new physical stock units to book: "${buku.judul}" (Source: ${asal}).`,
                    data_lama: { previous_stock: buku.stok } as any,
                    data_baru: { current_stock: updatedBuku.stok, new_items: generatedItems.map(i => i.kode_buku) } as any,
                    ip_address,
                    user_agent
                }
            });

            return generatedItems;
        });

        return NextResponse.json({
            success:  true,
            message:  `${jumlah} stock unit(s) successfully added.`,
            newItems: result.reverse(),
        });

    } catch (err: any) {
        return NextResponse.json({ 
            success: false, 
            message: "An internal server error occurred while processing the stock addition.", 
            detail: err.message 
        }, { status: 500 });
    }
}