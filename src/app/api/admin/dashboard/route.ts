import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
    try {
        // --- 1. Ambil Parameter Filter dari URL ---
        const url = new URL(request.url);
        const filter = url.searchParams.get('filter') || '7days';
        const loopDays = filter === '30days' ? 30 : 7; // Menentukan jumlah hari mundur

        // 2. Verifikasi Token & Keamanan Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: authData, error: authError } = await supabase.auth.getUser(token);
        if (authError || !authData.user) {
            return NextResponse.json({ success: false, message: "Sesi kedaluwarsa." }, { status: 401 });
        }

        const adminUser = await prisma.user.findFirst({ where: { email: authData.user.email } });
        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Akses terlarang!" }, { status: 403 });
        }

        // 3. Setup Rentang Waktu Dinamis (7 Hari vs 30 Hari)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartBookings: { label: string; value: number }[] = [];
        const chartRevenue: { label: string; value: number }[] = [];

        for (let i = loopDays - 1; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            const startOfDay = new Date(d.setHours(0, 0, 0, 0));
            const endOfDay = new Date(d.setHours(23, 59, 59, 999));
            
            // Logika Label: Jika 7 hari pakai "Mon", "Tue". Jika 30 hari pakai format "12 Jun"
            const dayLabel = filter === '30days' 
                ? startOfDay.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })
                : daysOfWeek[startOfDay.getDay()];

            // Query Buku (peminjaman dibuat)
            const bookingCount = await prisma.peminjaman.count({
                where: { created_at: { gte: startOfDay, lte: endOfDay } }
            });

            // Query Revenue (denda dibayar)
            const revenueSum = await prisma.denda.aggregate({
                _sum: { jumlah_denda: true },
                where: {
                    status_bayar: 'sudah_bayar',
                    tanggal_bayar: { gte: startOfDay, lte: endOfDay }
                }
            });

            const dailyRevenue = revenueSum._sum.jumlah_denda ? Number(revenueSum._sum.jumlah_denda) : 0;

            chartBookings.push({ label: dayLabel, value: bookingCount });
            chartRevenue.push({ label: dayLabel, value: dailyRevenue });
        }

        const totalBookings = chartBookings.reduce((sum, item) => sum + item.value, 0);
        const totalRevenue = chartRevenue.reduce((sum, item) => sum + item.value, 0);

        // 4. Kalkulasi 3 Baris Kartu Stat Kecil di Bawah Grafik
        const activeStudentsCount = await prisma.user.count({ where: { role: 'CUSTOMER' } });
        const booksBorrowedCount = await prisma.peminjaman.count({ where: { status: 'dipinjam' } });
        const penaltyBillCount = await prisma.denda.count({ where: { status_bayar: 'belum_bayar' } });

        // 5. Mengambil Data Lini Masa dari Tabel AuditLog (CCTV)
        const recentLogs = await prisma.auditLog.findMany({
            take: 5,
            orderBy: { created_at: 'desc' },
            include: {
                user: { select: { nama: true } }
            }
        });

        const recentActions = recentLogs.map((log) => {
            let type = 'info';
            let title = 'System Update';

            // Menyesuaikan ikon frontend berdasarkan jenis Aksi database
            if (log.aksi === 'CREATE') {
                type = 'fine_cleared'; // Memunculkan ikon Centang Hijau
                title = `New ${log.entitas} Created`;
            } else if (log.aksi === 'UPDATE') {
                type = 'info'; // Memunculkan ikon Bookmark Biru
                title = `${log.entitas} Record Updated`;
            } else if (log.aksi === 'DELETE') {
                type = 'cancelled'; // Memunculkan ikon X Abu-abu
                title = `${log.entitas} Data Deleted`;
            }

            return { 
                id: log.id_log, 
                type, 
                title: title, 
                description: log.deskripsi, 
                timestamp: log.created_at.toISOString() 
            };
        });

        // 6. Kembalikan Response Terstruktur
        return NextResponse.json({
            success: true,
            data: {
                mainCharts: {
                    dailyBookings: { total: totalBookings, growth: "+0%", chartData: chartBookings },
                    revenuePerformance: { total: totalRevenue, chartData: chartRevenue }
                },
                smallStats: { activeStudents: activeStudentsCount, booksBorrowed: booksBorrowedCount, penaltyBill: penaltyBillCount },
                recentActions
            }
        }, { status: 200 });

    } catch (error) {
        console.error("Error Admin API:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}