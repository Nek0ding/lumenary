import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";

// Use service role key to bypass RLS when uploading from server side
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Helper: Validate Admin & Secure Route ────────────────────────────────────
async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
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

function generateKodeBuku(isbn: string, seri: number): string {
    const cleanIsbn = isbn.replace(/-/g, "").slice(-6);
    return `${cleanIsbn}-${String(seri).padStart(3, "0")}`;
}

// ─── GET /api/admin/buku ──────────────────────────────────────────────────────
export async function GET(request: Request) {
    const { error } = await validateAdmin(request);
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const page        = Math.max(1, parseInt(searchParams.get("page")  || "1"));
    const limit       = Math.max(1, Math.min(50, parseInt(searchParams.get("limit") || "12")));
    const categoryId  = searchParams.get("id_kategori");
    const sortBy      = searchParams.get("sortBy") || "created_at";
    const order       = searchParams.get("order") === "asc" ? "asc" : "desc";

    const allowedSort = ["created_at", "judul", "penulis", "tahun_terbit", "stok"];
    const safeSort    = allowedSort.includes(sortBy) ? sortBy : "created_at";

    const where: any = {};
    if (categoryId && categoryId !== "all") {
        const parsed = parseInt(categoryId);
        if (!isNaN(parsed)) where.id_kategori = parsed;
    }

    const [books, total, categories] = await Promise.all([
        prisma.buku.findMany({
            where,
            skip:    (page - 1) * limit,
            take:    limit,
            include: {
                kategori: { select: { id_kategori: true, nama_kategori: true } },
                items:    { select: { id_item: true, kode_buku: true, status: true, asal_perolehan: true } },
                _count:   { select: { ratings: true } },
            },
            orderBy: { [safeSort]: order },
        }),
        prisma.buku.count({ where }),
        prisma.kategori.findMany({ select: { id_kategori: true, nama_kategori: true }, orderBy: { nama_kategori: "asc" } }),
    ]);

    return NextResponse.json({
        success: true,
        data:    books,
        categories,
        meta:    { total, page, limit, totalPages: Math.ceil(total / limit) },
    });
}

// ─── POST /api/admin/buku (Add New Book) ──────────────────────────────────────
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);
    let formData: FormData;
    try { formData = await request.formData(); } 
    catch { return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 }); }

    const judul        = String(formData.get("judul") || "").trim();
    const penulis      = String(formData.get("penulis") || "").trim();
    const penerbit     = String(formData.get("penerbit") || "").trim();
    const tahun_str    = String(formData.get("tahun_terbit") || "").trim();
    const isbn         = String(formData.get("isbn") || "").replace(/[^0-9X\-]/gi, "").trim();
    const sinopsis     = String(formData.get("sinopsis") || "").trim();
    const id_kat_str   = String(formData.get("id_kategori") || "").trim();
    const stok_str     = String(formData.get("stok") || "1").trim();
    const asal         = String(formData.get("asal_perolehan") || "").trim().toUpperCase();
    const coverFile    = formData.get("cover") as File | null;

    const errors: string[] = [];
    if (!judul || judul.length > 200)       errors.push("Book title is required (max 200 characters).");
    if (!penulis || penulis.length > 100)   errors.push("Author name is required (max 100 characters).");
    if (!penerbit || penerbit.length > 100) errors.push("Publisher name is required (max 100 characters).");

    const tahun = parseInt(tahun_str);
    const currentYear = new Date().getFullYear();
    if (isNaN(tahun) || tahun < 1000 || tahun > currentYear) errors.push(`Invalid publication year (must be between 1000–${currentYear}).`);

    const isbnClean = isbn.replace(/-/g, "");
    if (!/^\d{9}[\dX]$|^\d{13}$/.test(isbnClean)) errors.push("Invalid ISBN format (must be 10 or 13 digits).");

    const id_kategori = parseInt(id_kat_str);
    if (isNaN(id_kategori)) errors.push("Category selection is required.");

    const stok = parseInt(stok_str);
    if (isNaN(stok) || stok < 1 || stok > 100) errors.push("Stock quantity must be between 1–100.");

    const allowedAsal = ["PEMBELIAN", "HIBAH", "DONASI", "WARISAN", "LAINNYA"];
    if (!allowedAsal.includes(asal)) errors.push(`Acquisition source must be one of the following: ${allowedAsal.join(", ")}.`);

    if (!coverFile || coverFile.size === 0) errors.push("Book cover image is required.");
    else if (!coverFile.type.startsWith("image/")) errors.push("Cover file must be an image.");
    else if (coverFile.size > 5 * 1024 * 1024) errors.push("Maximum cover image size is 5MB.");

    if (errors.length > 0) return NextResponse.json({ success: false, message: errors[0], errors }, { status: 422 });

    const existing = await prisma.buku.findUnique({ where: { isbn } });
    if (existing) return NextResponse.json({ success: false, message: `ISBN ${isbn} is already registered.` }, { status: 409 });

    const ext        = coverFile!.name.split(".").pop()?.toLowerCase() || "jpg";
    const filename   = `covers/${randomUUID()}.${ext}`;
    const arrayBuf   = await coverFile!.arrayBuffer();

    const { error: uploadError } = await supabaseAdmin.storage
        .from("cover_buku") 
        .upload(filename, arrayBuf, { contentType: coverFile!.type, cacheControl: "3600", upsert: false });

    if (uploadError) return NextResponse.json({ success: false, message: `Failed to upload cover: ${uploadError.message}` }, { status: 500 });

    const { data: publicUrlData } = supabaseAdmin.storage.from("cover_buku").getPublicUrl(filename);
    const cover_url = publicUrlData.publicUrl;

    try {
        const buku = await prisma.$transaction(async (tx) => {
            const newBuku = await tx.buku.create({
                data: {
                    id_kategori, judul, penulis, penerbit, tahun_terbit: tahun,
                    isbn, stok, cover_buku: cover_url, sinopsis: sinopsis || "", rating_rata: 0,
                },
            });

            const itemsData = Array.from({ length: stok }, (_, i) => ({
                id_buku:        newBuku.id_buku,
                kode_buku:      generateKodeBuku(isbn, i + 1),
                asal_perolehan: asal,
                status:         "TERSEDIA" as const,
            }));
            await tx.bukuItem.createMany({ data: itemsData });

            await tx.auditLog.create({
                data: {
                    id_user: auth.id_user,
                    aksi: "CREATE",
                    entitas: "Buku",
                    id_entitas: newBuku.id_buku.toString(),
                    deskripsi: `Admin ${auth.nama || 'Admin'} added a new book: "${judul}" (${stok} units).`,
                    data_baru: newBuku as any,
                    ip_address,
                    user_agent
                }
            });
            return newBuku;
        });

        return NextResponse.json({
            success: true,
            message: `Book "${judul}" successfully added with ${stok} units of stock.`,
            data:    { id_buku: buku.id_buku },
        }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "An internal server error occurred while saving data.", detail: err.message }, { status: 500 });
    }
}

// ─── PUT /api/admin/buku (Edit Book Info & Cover) ─────────────────────────────
export async function PUT(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;
    const { ip_address, user_agent } = getClientInfo(request);

    let formData: FormData;
    try { formData = await request.formData(); } 
    catch { return NextResponse.json({ success: false, message: "Invalid form data." }, { status: 400 }); }

    const id_buku      = formData.get("id_buku") as string;
    const judul        = formData.get("judul") as string;
    const penulis      = formData.get("penulis") as string;
    const penerbit     = formData.get("penerbit") as string;
    const tahun_terbit = formData.get("tahun_terbit") as string;
    const isbn         = formData.get("isbn") as string;
    const id_kategori  = formData.get("id_kategori") as string;
    const sinopsis     = formData.get("sinopsis") as string;
    const coverFile    = formData.get("cover") as File | null;

    if (!id_buku) return NextResponse.json({ success: false, message: "Invalid or missing Book ID." }, { status: 400 });

    const oldBuku = await prisma.buku.findUnique({ where: { id_buku: Number(id_buku) } });
    if (!oldBuku) return NextResponse.json({ success: false, message: "The book requested for update could not be found." }, { status: 404 });

    if (isbn && isbn !== oldBuku.isbn) {
        const conflict = await prisma.buku.findUnique({ where: { isbn } });
        if (conflict) return NextResponse.json({ success: false, message: `ISBN ${isbn} is already registered to another book.` }, { status: 409 });
    }

    let cover_url = oldBuku.cover_buku;

    // Jika ada file cover baru yang diunggah
    if (coverFile && coverFile.size > 0) {
        if (!coverFile.type.startsWith("image/")) {
            return NextResponse.json({ success: false, message: "Cover file must be an image." }, { status: 400 });
        }
        const ext        = coverFile.name.split(".").pop()?.toLowerCase() || "jpg";
        const filename   = `covers/${randomUUID()}.${ext}`;
        const arrayBuf   = await coverFile.arrayBuffer();

        const { error: uploadError } = await supabaseAdmin.storage
            .from("cover_buku") 
            .upload(filename, arrayBuf, { contentType: coverFile.type, cacheControl: "3600", upsert: false });

        if (uploadError) return NextResponse.json({ success: false, message: `Failed to upload new cover: ${uploadError.message}` }, { status: 500 });
        cover_url = supabaseAdmin.storage.from("cover_buku").getPublicUrl(filename).data.publicUrl;
    }

    try {
        const result = await prisma.$transaction(async (tx) => {
            const updatedBuku = await tx.buku.update({
                where: { id_buku: Number(id_buku) },
                data: {
                    judul: judul || oldBuku.judul,
                    penulis: penulis || oldBuku.penulis,
                    penerbit: penerbit || oldBuku.penerbit,
                    tahun_terbit: tahun_terbit ? Number(tahun_terbit) : oldBuku.tahun_terbit,
                    isbn: isbn || oldBuku.isbn,
                    id_kategori: id_kategori ? Number(id_kategori) : oldBuku.id_kategori,
                    sinopsis: sinopsis !== undefined ? sinopsis : oldBuku.sinopsis,
                    cover_buku: cover_url
                },
            });

            await tx.auditLog.create({
                data: {
                    id_user: auth.id_user,
                    aksi: "UPDATE",
                    entitas: "Buku",
                    id_entitas: updatedBuku.id_buku.toString(),
                    deskripsi: `Admin ${auth.nama || 'Admin'} updated book metadata: "${updatedBuku.judul}"`,
                    data_lama: oldBuku as any,
                    data_baru: updatedBuku as any,
                    ip_address,
                    user_agent
                }
            });
            return updatedBuku;
        });

        return NextResponse.json({ success: true, message: "Book metadata successfully updated.", data: result });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "An internal server error occurred while updating data.", detail: err.message }, { status: 500 });
    }
}

// ─── DELETE /api/admin/buku (Delete Book) ─────────────────────────────────────
export async function DELETE(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;
    const { ip_address, user_agent } = getClientInfo(request);

    const { searchParams } = new URL(request.url);
    const id_buku = searchParams.get("id_buku");

    if (!id_buku) return NextResponse.json({ success: false, message: "Book ID is required." }, { status: 400 });

    try {
        // 1. Cek apakah buku ada
        const book = await prisma.buku.findUnique({ where: { id_buku: Number(id_buku) } });
        if (!book) return NextResponse.json({ success: false, message: "Book not found." }, { status: 404 });

        // 2. Validasi Peminjaman Aktif
        // Menghitung jumlah transaksi yang belum selesai (direservasi, dipinjam, atau terlambat)
        const activeLoans = await prisma.peminjaman.count({
            where: {
                id_buku: Number(id_buku),
                status: {
                    in: ["direservasi", "dipinjam", "terlambat"]
                }
            }
        });

        if (activeLoans > 0) {
            return NextResponse.json({ 
                success: false, 
                message: `Cannot delete book. There are ${activeLoans} active loan(s) or reservations associated with this book. Please resolve them first.` 
            }, { status: 400 }); // Gunakan HTTP 400 (Bad Request) atau 409 (Conflict)
        }

        // 3. Eksekusi Hapus dan AuditLog (Jika tidak ada peminjaman aktif)
        await prisma.$transaction(async (tx) => {
            // Because of onDelete: Cascade in schema, deleting the book will delete BukuItems & Ratings
            await tx.buku.delete({ where: { id_buku: Number(id_buku) } });

            await tx.auditLog.create({
                data: {
                    id_user: auth.id_user,
                    aksi: "DELETE",
                    entitas: "Buku",
                    id_entitas: id_buku.toString(),
                    deskripsi: `Admin ${auth.nama || 'Admin'} deleted the book collection: "${book.judul}"`,
                    data_lama: book as any,
                    ip_address,
                    user_agent
                }
            });
        });

        return NextResponse.json({ success: true, message: "Book collection successfully deleted." });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "Server error occurred during deletion.", detail: err.message }, { status: 500 });
    }
}