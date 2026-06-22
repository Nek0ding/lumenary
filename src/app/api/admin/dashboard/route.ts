import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
    try {
        // 1. Verifikasi Token & Keamanan Admin
        const authHeader = request.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ success: false, message: "Akses ditolak!" }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: authData, error: authError } = await supabase.auth.getUser(token);
        if (authError || !authData.user) {
            return NextResponse.json({ success: false, message: "Sesi kedaluwarsa." }, { status: 401 });
        }

        // SESUAIKAN: Menggunakan field 'created_at'/'updated_at' & Enum Role 'ADMIN'
        const adminUser = await prisma.user.findFirst({ where: { email: authData.user.email } });
        if (!adminUser || adminUser.role !== 'ADMIN') {
            return NextResponse.json({ success: false, message: "Akses terlarang!" }, { status: 403 });
        }

        // 2. Setup Rentang Waktu 7 Hari Terakhir (Untuk Grafik)
        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const chartBookings: { label: string; value: number }[] = [];
        const chartRevenue: { label: string; value: number }[] = [];

        for (let i = 6; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            
            const startOfDay = new Date(d.setHours(0, 0, 0, 0));
            const endOfDay = new Date(d.setHours(23, 59, 59, 999));
            const dayLabel = daysOfWeek[startOfDay.getDay()];

            // SESUAIKAN: menggunakan field 'created_at'
            const bookingCount = await prisma.peminjaman.count({
                where: {
                    created_at: { gte: startOfDay, lte: endOfDay }
                }
            });

            // SESUAIKAN: Pendapatan dihitung dari akumulasi tabel Denda yang 'sudah_bayar' pada rentang hari tersebut
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

        const totalBookingsThisWeek = chartBookings.reduce((sum, item) => sum + item.value, 0);
        const totalRevenueThisWeek = chartRevenue.reduce((sum, item) => sum + item.value, 0);

        // 3. Kalkulasi 3 Baris Kartu Stat Kecil di Bawah Grafik
        // a. Active Students (Menghitung total pengguna dengan role 'CUSTOMER')
        const activeStudentsCount = await prisma.user.count({
            where: { role: 'CUSTOMER' }
        });

        // b. Books Borrowed (Menghitung peminjaman aktif yang berstatus 'dipinjam')
        const booksBorrowedCount = await prisma.peminjaman.count({
            where: { status: 'dipinjam' }
        });

        // c. Penalty Bill (Menghitung total denda yang 'belum_bayar')
        const penaltyBillCount = await prisma.denda.count({
            where: { status_bayar: 'belum_bayar' }
        });

        // 4. Mengambil Data Lini Masa "Recent Administrative Actions"
        // Menyertakan ('include') relasi objek denda untuk mendeteksi log pelunasan uang
        const recentLogs = await prisma.peminjaman.findMany({
            take: 5,
            orderBy: { updated_at: 'desc' },
            include: {
                user: { select: { nama: true, npm: true } },
                buku: { select: { judul: true } },
                denda: true
            }
        });

        const recentActions = recentLogs.map((log) => {
            let type = 'info';
            let title = 'System Update';
            let description = '';

            // Logika deteksi tipe aksi berdasarkan status peminjaman & denda relasional
            if (log.denda && log.denda.status_bayar === 'sudah_bayar') {
                type = 'fine_cleared';
                title = `Fine Paid & Cleared - ID #${log.kode_peminjaman}`;
                description = `Rp ${Number(log.denda.jumlah_denda).toLocaleString('id-ID')} paid by ${log.user?.nama || 'Student'} via Cashier.`;
            } else if (log.status === 'dipinjam') {
                type = 'borrowed';
                title = 'Book Borrowed Successfully';
                description = `${log.user?.nama || 'Student'} borrowed "${log.buku?.judul}" (Due: ${new Date(log.tanggal_kembali).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })})`;
            } else if (log.status === 'terlambat') {
                type = 'overdue';
                title = 'Overdue Penalty Issued';
                description = `${log.user?.nama || 'Student'} - Late return for "${log.buku?.judul}"`;
            } else if (log.status === 'direservasi') {
                type = 'reserved';
                title = 'New Book Reservation';
                description = `${log.user?.nama || 'Student'} placed a reservation for "${log.buku?.judul}"`;
            } else if (log.status === 'dibatalkan') {
                type = 'cancelled';
                title = 'Reservation Cancelled';
                description = `Reservation for "${log.buku?.judul}" by ${log.user?.nama || 'Student'} was cancelled.`;
            }

            return {
                id: log.id_peminjaman,
                type,
                title,
                description,
                timestamp: log.updated_at
            };
        });

        // 5. Kembalikan Response Terstruktur
        return NextResponse.json(
            {
                success: true,
                message: "Data dashboard admin berhasil disinkronkan.",
                data: {
                    mainCharts: {
                        dailyBookings: {
                            total: totalBookingsThisWeek,
                            growth: "+12%", 
                            chartData: chartBookings
                        },
                        revenuePerformance: {
                            total: totalRevenueThisWeek,
                            chartData: chartRevenue
                        }
                    },
                    smallStats: {
                        activeStudents: activeStudentsCount,
                        booksBorrowed: booksBorrowedCount,
                        penaltyBill: penaltyBillCount
                    },
                    recentActions
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error on Admin Dashboard API:", error);
        return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 });
    }
}