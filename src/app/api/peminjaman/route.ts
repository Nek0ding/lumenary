import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { prisma } from "@/lib/prisma";

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function generateKodePeminjaman(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export async function POST(request: Request) {
    try {
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
                { success: false, message: "Unauthorized! Expired" },
                { status: 401 }
            );
        }

        const body = await request.json();
        const { id_buku } = body;

        if (!id_buku || typeof id_buku !== 'number' || !Number.isInteger(id_buku) || id_buku <= 0) {
            return NextResponse.json(
                { success: false, message: "ID Buku is required and must be a positive integer!" },
                { status: 400 }
            );
        }

        const userProfile = await prisma.user.findUnique({
            where: { email: user.email! },
            select: {
                id_user: true,
                nama: true,
                no_telp: true,
                alamat: true,
                jenis_kelamin: true,
            }
        });

        if (!userProfile) {
            return NextResponse.json(
                { success: false, message: "User profile not found!" },
                { status: 404 }
            );
        }

        if (!userProfile.nama || !userProfile.no_telp || !userProfile.alamat || !userProfile.jenis_kelamin) {
            return NextResponse.json(
                { success: false, code: "INCOMPLETE_PROFILE", message: "Please complete your profile before borrowing a book!" },
                { status: 403 }
            );
        }

        const [buku, pinjamanAktif] = await Promise.all([
            prisma.buku.findUnique({
                where: { id_buku },
                select: { id_buku: true, stok: true },
            }),
            prisma.peminjaman.findMany({
                where: {
                    id_user: userProfile.id_user,
                    status: {
                        in: ['dipinjam', 'direservasi']
                    }
                },
                select: { id_buku: true },
            }),
        ]);

        if (!buku || buku.stok <= 0) {
            return NextResponse.json(
                { success: false, message: "Book is unavailable or the stock is empty" },
                { status: 400 }
            );
        }

        if (pinjamanAktif.some(p => p.id_buku === id_buku)) {
            return NextResponse.json(
                { success: false, message: "You already borrowed this book!" },
                { status: 400 }
            );
        }

        if (pinjamanAktif.length >= 3) {
            return NextResponse.json(
                { success: false, message: "You have reached the maximum number of active loans (3). Please return a book before borrowing another one." },
                { status: 400 }
            );
        }

        const tanggalPinjam = new Date();
        const tanggalKembali = new Date();
        tanggalKembali.setDate(tanggalPinjam.getDate() + 7);

        const kodePeminjaman = generateKodePeminjaman();
        const result = await prisma.$transaction([
            prisma.buku.update({
                where: { id_buku, stok: { gt: 0 } },
                data: { stok: { decrement: 1 } },
            }),
            prisma.peminjaman.create({
                data: {
                    id_user: userProfile.id_user,
                    id_buku,
                    kode_peminjaman: kodePeminjaman,
                    tanggal_pinjam: tanggalPinjam,
                    tanggal_kembali: tanggalKembali,
                    status: 'direservasi',
                },
            }),
        ]);

        return NextResponse.json(
            { success: true, message: "Book borrowed successfully!", data: result[1] },
            { status: 201 }
        );

    } catch (error: any) {
        if (process.env.NODE_ENV === 'development') {
            console.error('Error on peminjaman API', error);
        } else {
            console.error('Error on peminjaman API', error.code ?? 'Unknown error');
        }

        if (error.code === 'P2025') {
            return NextResponse.json(
                { success: false, message: "Book is unavailable or the stock has just run out!" },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { success: false, message: "An error occurred while processing your request." },
            { status: 500 }
        );
    }
}