import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// GET: Mengambil Riwayat Peminjaman Khusus Untuk 1 Mahasiswa
export async function GET(request: Request) {
    try {
        // Cara Paling Aman 100%: Ambil ID langsung dari pemotongan URL terakhir
        const url = new URL(request.url);
        const studentId = url.pathname.split('/').filter(Boolean).pop();

        if (!studentId || studentId === 'undefined') {
            return NextResponse.json({ success: false, message: "Invalid Student ID parameter." }, { status: 400 });
        }

        const history = await prisma.peminjaman.findMany({
            where: { 
                id_user: studentId 
            },
            orderBy: { created_at: 'desc' },
            include: {
                buku: { select: { judul: true, penulis: true, cover_buku: true } }
            }
        });

        return NextResponse.json({ success: true, data: history });
    } catch (error) {
        console.error("Error fetching student history:", error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}

// PUT: Menyimpan Editan Profil dan Mencatat ke Audit Log
export async function PUT(request: Request) {
    try {
        // Cara Paling Aman 100%: Ambil ID langsung dari pemotongan URL terakhir
        const url = new URL(request.url);
        const studentId = url.pathname.split('/').filter(Boolean).pop();
        
        if (!studentId || studentId === 'undefined') {
            return NextResponse.json({ success: false, message: "Invalid Student ID parameter." }, { status: 400 });
        }

        // Autentikasi Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) return NextResponse.json({ success: false, message: "Akses ditolak" }, { status: 401 });
        const token = authHeader.split(' ')[1];
        const { data: authData } = await supabase.auth.getUser(token);
        if (!authData.user) return NextResponse.json({ success: false, message: "Sesi tidak valid" }, { status: 401 });

        const adminUser = await prisma.user.findFirst({ where: { email: authData.user.email } });
        if (!adminUser || adminUser.role !== 'ADMIN') return NextResponse.json({ success: false, message: "Bukan admin" }, { status: 403 });

        const body = await request.json();
        
        // Ambil Data Lama untuk Audit Log
        const oldUser = await prisma.user.findUnique({ where: { id_user: studentId } });
        if (!oldUser) return NextResponse.json({ success: false, message: "User tidak ditemukan" }, { status: 404 });

        // Update Data Utama
        const updatedUser = await prisma.user.update({
            where: { id_user: studentId },
            data: {
                nama: body.nama,
                npm: body.npm,
                email: body.email,
                no_telp: body.no_telp,
                alamat: body.alamat,
                jenis_kelamin: body.jenis_kelamin,
            }
        });

        // TULIS KE AUDIT LOG
        const deskripsiLog = `Admin ${adminUser.nama} updated profile data for student: ${oldUser.nama} (NPM: ${oldUser.npm}).`;
        await prisma.auditLog.create({
            data: {
                id_user: adminUser.id_user,
                aksi: 'UPDATE',
                entitas: 'User',
                id_entitas: updatedUser.id_user,
                deskripsi: deskripsiLog,
                data_lama: oldUser as any,
                data_baru: updatedUser as any,
                ip_address: request.headers.get('x-forwarded-for') || 'Unknown',
                user_agent: request.headers.get('user-agent') || 'Unknown'
            }
        });

        return NextResponse.json({ success: true, message: "Profil berhasil diperbarui", data: updatedUser });
    } catch (error) {
        console.error("Error updating student:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}