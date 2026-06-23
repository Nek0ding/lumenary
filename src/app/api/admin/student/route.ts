// src/app/api/admin/student/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const page = parseInt(url.searchParams.get('page') || '1');
        const limit = parseInt(url.searchParams.get('limit') || '10');
        const search = url.searchParams.get('search') || '';
        const skip = (page - 1) * limit;

        // Verifikasi Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak" }, { status: 401 });
        }
        const token = authHeader.split(' ')[1];
        const { data: authData } = await supabase.auth.getUser(token);
        if (!authData.user) return NextResponse.json({ success: false, message: "Sesi tidak valid" }, { status: 401 });

        const adminUser = await prisma.user.findFirst({ where: { email: authData.user.email } });
        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Bukan admin" }, { status: 403 });
        }

        // Kondisi Pencarian
        const whereCondition = {
            role: 'CUSTOMER' as const,
            OR: search ? [
                { nama: { contains: search, mode: 'insensitive' as const } },
                { npm: { contains: search, mode: 'insensitive' as const } }
            ] : undefined
        };

        // Fetch Data & Count Total secara paralel agar cepat
        const [totalStudents, studentsData] = await Promise.all([
            prisma.user.count({ where: whereCondition }),
            prisma.user.findMany({
                where: whereCondition,
                skip,
                take: limit,
                orderBy: { created_at: 'desc' },
                include: {
                    peminjaman: { select: { status: true } }
                }
            })
        ]);

        // Mapping hasil untuk kalkulasi statistik peminjaman per mahasiswa
        const students = studentsData.map(user => {
            const activeLoans = user.peminjaman.filter(p => p.status === 'dipinjam').length;
            const lifetimeBorrowed = user.peminjaman.length;
            const lifetimeOverdue = user.peminjaman.filter(p => p.status === 'terlambat').length;

            return {
                id_user: user.id_user,
                nama: user.nama,
                npm: user.npm,
                email: user.email,
                no_telp: user.no_telp,
                jenis_kelamin: user.jenis_kelamin,
                alamat: user.alamat,
                activeLoans,
                lifetimeBorrowed,
                lifetimeOverdue
            };
        });

        return NextResponse.json({ success: true, data: students, total: totalStudents });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}