import { NextResponse } from 'next/server';
import { prisma } from "@/lib/prisma";
import { createClient } from "@supabase/supabase-js";

// ✅ Menggunakan SERVICE_ROLE_KEY untuk server-side auth (Sangat Tepat!)
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export async function POST(request: Request) {
    try {
        // --- Auth ---
        const authHeader = request.headers.get('Authorization');
        if (!authHeader?.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Unauthorized!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) {
            return NextResponse.json({ success: false, message: "Unauthorized! Token expired or invalid." }, { status: 401 });
        }

        // --- Role check ---
        const adminProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: { role: true }
        });

        if (!adminProfile || adminProfile.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Forbidden! Admin area only." }, { status: 403 });
        }

        // --- Parse form data ---
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

        // --- Validasi field wajib ---
        if (!id_kategori || !judul || !penulis || !penerbit || !tahun_terbit || !isbn || !stok || !sinopsis) {
            return NextResponse.json({ success: false, message: "All fields must be filled!" }, { status: 400 });
        }

        // --- Validasi numerik ---
        const parsedKategori = parseInt(id_kategori);
        const parsedTahun = parseInt(tahun_terbit);
        const parsedStok = parseInt(stok);

        if (isNaN(parsedKategori) || isNaN(parsedTahun) || isNaN(parsedStok)) {
            return NextResponse.json({ success: false, message: "id_kategori, tahun_terbit, and stok must be valid numbers." }, { status: 400 });
        }

        if (parsedStok < 0) {
            return NextResponse.json({ success: false, message: "Stok cannot be negative." }, { status: 400 });
        }

        // --- Validasi cover ---
        if (!fileGambar || fileGambar.size === 0) {
            return NextResponse.json({ success: false, message: "Book cover is required!" }, { status: 400 });
        }

        if (!ALLOWED_IMAGE_TYPES.includes(fileGambar.type)) {
            return NextResponse.json({ success: false, message: "Cover format must be JPEG, PNG, or WebP." }, { status: 400 });
        }

        // --- Upload cover ke Supabase Storage ---
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
            return NextResponse.json({ success: false, message: "Failed to upload book cover." }, { status: 500 });
        }

        const { data: { publicUrl } } = supabase.storage.from("covers").getPublicUrl(fileName);

        // --- Simpan ke database ---
        const bukuBaru = await prisma.buku.create({
            data: {
                id_kategori: parsedKategori,
                judul,
                penulis,
                penerbit,
                tahun_terbit: parsedTahun,
                isbn,
                stok: parsedStok,
                sinopsis,
                cover_buku: publicUrl,
                rating_rata: 0.0,
            }
        });

        // ✅ PERBAIKAN: Normalisasi objek Decimal agar aman dilempar ke JSON NextResponse
        const responseData = {
            ...bukuBaru,
            rating_rata: Number(bukuBaru.rating_rata)
        };

        return NextResponse.json(
            {
                success: true,
                message: "New book has been added.",
                data: responseData,
            },
            { status: 201 }
        );

    } catch (error) {
        if (process.env.NODE_ENV === 'development') {
            console.error("Error creating book:", error);
        }
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}