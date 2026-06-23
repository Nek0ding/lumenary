'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // <-- Import useRouter
import { toast } from 'react-hot-toast';      // <-- Import toast
import {
    GraduationCap, BookOpen, Receipt, Check,
    Bookmark, AlertTriangle, X, Calendar, MoreHorizontal, Loader2
} from 'lucide-react';

interface ChartItem {
    label: string;
    value: number;
}

interface DashboardData {
    mainCharts: {
        dailyBookings: { total: number; growth: string; chartData: ChartItem[] };
        revenuePerformance: { total: number; chartData: ChartItem[] };
    };
    smallStats: {
        activeStudents: number;
        booksBorrowed: number;
        penaltyBill: number;
    };
    recentActions: Array<{
        id: number;
        type: string;
        title: string;
        description: string;
        timestamp: string;
    }>;
}

export default function AdminDashboardPage() {
    const router = useRouter(); // <-- Inisialisasi router
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timeFilter, setTimeFilter] = useState<'7days' | '30days'>('7days');

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true); 
            const token = localStorage.getItem('lumenary_token');
            if (!token) { 
                setError('Authentication token missing.'); 
                setLoading(false); 
                return; 
            }
            try {
                const res = await fetch(`/api/admin/dashboard?filter=${timeFilter}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });

                // --- CEK SESI KADALUARSA DI SINI ---
                if (res.status === 401 || res.status === 403) {
                    toast.error('Session expired. Please log in again.');
                    localStorage.removeItem('lumenary_token');
                    localStorage.removeItem('lumenary_user');
                    router.replace('/login');
                    return; // Hentikan eksekusi
                }

                const resData = await res.json();
                if (res.ok && resData.success) {
                    setData(resData.data);
                    setError(''); // Bersihkan error jika sukses
                } else {
                    setError(resData.message || 'Failed to fetch data.');
                }
            } catch (err) { 
                setError('Network error connection failed.'); 
            } finally { 
                setLoading(false); 
            }
        };
        fetchDashboardData();
    }, [timeFilter, router]); // <-- Tambahkan router ke dependency array

    const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

    const getRelativeTime = (dateStr: string) => {
        const past = new Date(dateStr);
        const diffMins = Math.floor((new Date().getTime() - past.getTime()) / 60000);
        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} mins ago`;
        const diffHours = Math.floor(diffMins / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        return past.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    };

    if (loading) return <div className="flex h-[60vh] w-full items-center justify-center gap-3"><Loader2 className="w-8 h-8 text-[#161B85] animate-spin" /><span className="font-semibold text-zinc-500">Syncing live operations...</span></div>;
    if (error || !data) return <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-3 text-red-500 font-bold"><p>⚠️ {error || 'Something went wrong'}</p></div>;

    const maxRevenue = Math.max(...data.mainCharts.revenuePerformance.chartData.map(d => d.value), 10000);

    return (
        <div className="w-full flex justify-center">
            <div className="w-full max-w-[1200px] flex flex-col gap-6 font-['Plus_Jakarta_Sans',sans-serif] text-black">
                
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
                    <div>
                        <h1 className="text-[28px] md:text-[32px] font-black tracking-tight">Dashboard Overview</h1>
                        <p className="text-[14px] text-zinc-500 font-semibold">Welcome back, monitor your campus operations in real time</p>
                    </div>
                    <div className="flex items-center bg-zinc-100 p-1.5 rounded-xl border border-zinc-200 w-fit self-start sm:self-auto shadow-sm">
                        <button onClick={() => setTimeFilter('7days')} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${timeFilter === '7days' ? 'bg-[#161B85] text-white shadow-md' : 'text-zinc-500 hover:text-black'}`}>Last 7 Days</button>
                        <button onClick={() => setTimeFilter('30days')} className={`px-4 py-2 rounded-lg text-[13px] font-bold transition-all ${timeFilter === '30days' ? 'bg-[#161B85] text-white shadow-md' : 'text-zinc-500 hover:text-black'}`}>Last 30 Days</button>
                        <div className="p-2 ml-1 text-zinc-700 border-l border-zinc-200 cursor-pointer hover:text-[#161B85]">
                            <Calendar size={18} />
                        </div>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Booking Chart */}
                    <div className="bg-white border border-zinc-100 rounded-[24px] p-6 shadow-sm flex flex-col min-h-[340px]">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Daily Student Bookings</p>
                                <h2 className="text-[36px] font-black">{data.mainCharts.dailyBookings.total}</h2>
                            </div>
                        </div>
                        <div className="w-full h-[160px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.mainCharts.dailyBookings.chartData}>
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#A1A1AA', fontWeight: 700 }} minTickGap={15} />
                                    <Tooltip cursor={{ stroke: '#161B85', strokeWidth: 1 }} />
                                    <Line type="monotone" dataKey="value" stroke="#161B85" strokeWidth={3} dot={timeFilter === '7days' ? { r: 4, fill: '#161B85' } : false} activeDot={{ r: 6 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white border border-zinc-100 rounded-[24px] p-6 shadow-sm flex flex-col justify-between min-h-[340px]">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col">
                                <span className="text-[11px] font-bold text-zinc-400 tracking-wider uppercase">Revenue Performance</span>
                                <span className="text-[32px] md:text-[36px] font-black tracking-tight text-black mt-1">
                                    {formatRupiah(data.mainCharts.revenuePerformance.total)}
                                </span>
                                <span className="text-[12px] text-zinc-400 font-medium mt-0.5">Total fines collected</span>
                            </div>
                            <div className="text-zinc-400 p-1 hover:text-black cursor-pointer"><MoreHorizontal size={20} /></div>
                        </div>
                        <div className="w-full h-[160px] mt-6 flex flex-col justify-end">
                            <div className="w-full h-[120px] flex items-end justify-between px-1 gap-1 md:gap-2">
                                {data.mainCharts.revenuePerformance.chartData.map((d, idx) => {
                                    const heightPercentage = maxRevenue > 0 ? (d.value / maxRevenue) * 100 : 0;
                                    return (
                                        <div key={idx} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group relative">
                                            <div className="absolute mb-[125px] opacity-0 group-hover:opacity-100 bg-black text-white text-[10px] font-bold px-2 py-1 rounded shadow transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                {formatRupiah(d.value)}
                                            </div>
                                            <div className="w-full bg-[#161B85]/10 group-hover:bg-[#161B85] rounded-t-sm md:rounded-t-md transition-all duration-300" style={{ height: `${Math.max(heightPercentage, 4)}%` }} />
                                        </div>
                                    );
                                })}
                            </div>
                            <div className="flex justify-between text-[9px] md:text-[11px] text-zinc-400 font-bold uppercase mt-3 px-1">
                                {/* Hanya merender beberapa label jika mode 30 hari agar teks tidak bertumpuk */}
                                {data.mainCharts.revenuePerformance.chartData.map((d, idx) => {
                                    if (timeFilter === '30days' && idx % 5 !== 0 && idx !== 29) return <span key={idx} className="w-6 opacity-0">.</span>;
                                    return <span key={idx}>{d.label}</span>;
                                })}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { title: 'Active Students', val: data.smallStats.activeStudents, icon: <GraduationCap size={24} /> },
                        { title: 'Books Borrowed', val: data.smallStats.booksBorrowed, icon: <BookOpen size={22} /> },
                        { title: 'Penalty Bill', val: data.smallStats.penaltyBill, icon: <Receipt size={22} /> }
                    ].map((s, i) => (
                        <div key={i} className="bg-white border border-zinc-100 rounded-[20px] p-5 flex items-center gap-4 shadow-[0px_4px_16px_rgba(0,0,0,0.01)] hover:shadow-sm transition-shadow">
                            <div className="w-12 h-12 bg-indigo-50 text-[#161B85] rounded-2xl flex items-center justify-center shrink-0 shadow-inner">{s.icon}</div>
                            <div className="flex flex-col">
                                <p className="text-[13px] text-zinc-400 font-bold">{s.title}</p>
                                <p className="text-[20px] font-black mt-0.5">{s.val.toLocaleString('id-ID')} {i === 0 || i === 2 ? 'Student' : 'Books'}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Actions */}
                <div className="bg-white border border-zinc-100 rounded-[24px] p-6 md:p-8 mb-4 shadow-[0px_4px_20px_rgba(0,0,0,0.02)]">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[20px] md:text-[22px] font-black tracking-tight text-black">Recent Administrative Actions</h2>
                        <Link href="/admin/history" className="text-[#161B85] hover:text-[#0E1154] font-bold text-[14px] md:text-[15px] transition-colors">View All</Link>
                    </div>
                    <div className="flex flex-col gap-4">
                        {data.recentActions.length === 0 ? (
                            <div className="text-center text-zinc-400 text-[14px] py-6 font-medium">No library activities recorded today.</div>
                        ) : (
                            data.recentActions.map((act) => {
                                let iconNode = <Bookmark size={18} />;
                                let iconBg = 'bg-blue-50 text-[#161B85]';
                                if (act.type === 'fine_cleared') { iconNode = <Check size={18} />; iconBg = 'bg-emerald-50 text-emerald-600'; }
                                else if (act.type === 'overdue') { iconNode = <AlertTriangle size={18} />; iconBg = 'bg-red-50 text-red-600'; }
                                else if (act.type === 'cancelled') { iconNode = <X size={18} />; iconBg = 'bg-zinc-100 text-zinc-600'; }

                                return (
                                    <div key={act.id} className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-zinc-200 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-11 h-11 rounded-full ${iconBg} flex items-center justify-center shrink-0 shadow-sm`}>{iconNode}</div>
                                            <div className="flex flex-col">
                                                <h4 className="text-[14px] md:text-[16px] font-bold text-black leading-snug">{act.title}</h4>
                                                <p className="text-[12px] md:text-[14px] text-zinc-500 font-semibold mt-0.5 leading-normal">{act.description}</p>
                                            </div>
                                        </div>
                                        <span className="text-[11px] md:text-[13px] text-zinc-400 font-bold whitespace-nowrap self-start md:self-center pt-1 md:pt-0">{getRelativeTime(act.timestamp)}</span>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}