import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function getFileNameFromUrl(url: string): string | null {
    if (!url) return null;
    const parts = url.split("/");
    const last = parts[parts.length - 1];
    return last.split("?")[0] || null;
}

// EDIT BUKU
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // 解 resolvedParams dari Promise aturan baru Next.js
        const { id } = await params;

        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, message: "Unauthorized!" },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized! Token expired or invalid." },
                { status: 401 }
            );
        }

        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: "Forbidden! Admin area only." },
                { status: 403 }
            );
        }

        const id_buku = parseInt(id);
        if (isNaN(id_buku)) {
            return NextResponse.json(
                { success: false, message: "Invalid Book ID parameter." },
                { status: 400 }
            );
        }

        const targetBuku = await prisma.buku.findUnique({ where: { id_buku } });
        if (!targetBuku) {
            return NextResponse.json(
                { success: false, message: "Book not found!" },
                { status: 404 }
            );
        }

        const formData = await request.formData();
        const id_kategori = formData.get("id_kategori") as string;
        const judul = formData.get("judul") as string;
        const penulis = formData.get("penulis") as string;
        const penerbit = formData.get("penerbit") as string;
        const tahun_terbit = formData.get("tahun_terbit") as string;
        const isbn = formData.get("isbn") as string;
        const stok = formData.get("stok") as string;
        const sinopsis = formData.get("sinopsis") as string;
        const fileGambar = formData.get("cover_buku") as File | null;

        let parsedKategori = targetBuku.id_kategori;
        let parsedTahun = targetBuku.tahun_terbit;
        let parsedStok = targetBuku.stok;

        if (id_kategori) {
            parsedKategori = parseInt(id_kategori);
            if (isNaN(parsedKategori)) {
                return NextResponse.json(
                    { success: false, message: "id_kategori must be a valid number." },
                    { status: 400 }
                );
            }
        }

        if (tahun_terbit) {
            parsedTahun = parseInt(tahun_terbit);
            if (isNaN(parsedTahun)) {
                return NextResponse.json(
                    { success: false, message: "tahun_terbit must be a valid number." },
                    { status: 400 }
                );
            }
        }

        if (stok) {
            parsedStok = parseInt(stok);
            if (isNaN(parsedStok) || parsedStok < 0) {
                return NextResponse.json(
                    { success: false, message: "stok must be a valid non-negative number." },
                    { status: 400 }
                );
            }
        }

        let coverUrl = targetBuku.cover_buku;

        if (fileGambar && fileGambar.size > 0) {
            if (!ALLOWED_IMAGE_TYPES.includes(fileGambar.type)) {
                return NextResponse.json(
                    { success: false, message: "Cover format must be JPEG, PNG, or WebP." },
                    { status: 400 }
                );
            }

            // Hapus cover lama
            const oldFileName = getFileNameFromUrl(targetBuku.cover_buku);
            if (oldFileName) {
                await supabase.storage.from("covers").remove([oldFileName]);
            }

            // Upload cover baru
            const fileExtension = fileGambar.name.split('.').pop();
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExtension}`;
            const buffer = Buffer.from(await fileGambar.arrayBuffer());

            const { error: uploadError } = await supabase.storage
                .from("covers")
                .upload(fileName, buffer, {
                    contentType: fileGambar.type,
                    cacheControl: "3600"
                });

            if (uploadError) {
                if (process.env.NODE_ENV === 'development') {
                    console.error("Upload error:", uploadError);
                }
                return NextResponse.json(
                    { success: false, message: "Failed to upload new book cover." },
                    { status: 500 }
                );
            }

            const { data: { publicUrl } } = supabase.storage.from("covers").getPublicUrl(fileName);
            coverUrl = publicUrl;
        }

        const updatedBuku = await prisma.buku.update({
            where: { id_buku },
            data: {
                id_kategori: parsedKategori,
                judul: judul || targetBuku.judul,
                penulis: penulis || targetBuku.penulis,
                penerbit: penerbit || targetBuku.penerbit,
                tahun_terbit: parsedTahun,
                isbn: isbn || targetBuku.isbn,
                stok: parsedStok,
                sinopsis: sinopsis || targetBuku.sinopsis,
                cover_buku: coverUrl,
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Book info has been successfully updated.",
                data: updatedBuku,
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error editing book:", error);
        }
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

// HAPUS BUKU
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        // 解 resolvedParams dari Promise aturan baru Next.js
        const { id } = await params;

        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json(
                { success: false, message: "Unauthorized!" },
                { status: 401 }
            );
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json(
                { success: false, message: "Unauthorized! Token expired or invalid." },
                { status: 401 }
            );
        }

        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json(
                { success: false, message: "Forbidden! Admin area only." },
                { status: 403 }
            );
        }

        const id_buku = parseInt(id);
        if (isNaN(id_buku)) {
            return NextResponse.json(
                { success: false, message: "Invalid Book ID parameter." },
                { status: 400 }
            );
        }

        const targetBuku = await prisma.buku.findUnique({ where: { id_buku } });
        if (!targetBuku) {
            return NextResponse.json(
                { success: false, message: "Book not found!" },
                { status: 404 }
            );
        }

        // Hapus cover dari Storage
        const fileName = getFileNameFromUrl(targetBuku.cover_buku);
        if (fileName) {
            await supabase.storage.from("covers").remove([fileName]);
        }

        await prisma.buku.delete({ where: { id_buku } });

        return NextResponse.json(
            {
                success: true,
                message: "Book and its cover image have been permanently deleted."
            },
            { status: 200 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error deleting book:", error);
        }

        const prismaError = error as { code?: string };
        if (prismaError.code === 'P2003') {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cannot delete this book. It is currently linked to active loans or transaction records."
                },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
}