'use client';

import React, { useEffect, useState } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, Tooltip } from 'recharts';
import Link from 'next/link';
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
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [timeFilter, setTimeFilter] = useState<'7days' | '30days'>('7days');

    useEffect(() => {
        const fetchDashboardData = async () => {
            const token = localStorage.getItem('lumenary_token');
            if (!token) { setError('Authentication token missing.'); setLoading(false); return; }
            try {
                const res = await fetch('/api/admin/dashboard', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
                });
                const resData = await res.json();
                if (res.ok && resData.success) setData(resData.data);
                else setError(resData.message || 'Failed to fetch data.');
            } catch (err) { setError('Network error connection failed.'); }
            finally { setLoading(false); }
        };
        fetchDashboardData();
    }, []);

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
                        <button onClick={() => setTimeFilter('7days')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${timeFilter === '7days' ? 'bg-[#161B85] text-white' : 'text-zinc-500'}`}>Last 7 Days</button>
                        <button onClick={() => setTimeFilter('30days')} className={`px-4 py-2 rounded-lg text-[13px] font-bold ${timeFilter === '30days' ? 'bg-[#161B85] text-white' : 'text-zinc-500'}`}>Last 30 Days</button>
                    </div>
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Booking Chart */}
                    <div className="bg-white border border-zinc-100 rounded-[24px] p-6 shadow-sm min-h-[340px]">
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Daily Student Bookings</p>
                        <h2 className="text-[36px] font-black">{data.mainCharts.dailyBookings.total}</h2>
                        <div className="w-full h-[160px] mt-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={data.mainCharts.dailyBookings.chartData}>
                                    <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#A1A1AA', fontWeight: 700 }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="value" stroke="#161B85" strokeWidth={3} dot={{ r: 4 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Revenue Chart */}
                    <div className="bg-white border border-zinc-100 rounded-[24px] p-6 shadow-sm min-h-[340px]">
                        <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Revenue Performance</p>
                        <h2 className="text-[32px] font-black mt-1">{formatRupiah(data.mainCharts.revenuePerformance.total)}</h2>
                        <div className="w-full h-[160px] mt-6 flex items-end justify-between px-2 gap-4">
                            {data.mainCharts.revenuePerformance.chartData.map((d, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center group">
                                    <div className="w-full bg-[#161B85]/10 group-hover:bg-[#161B85] rounded-t-md transition-all" style={{ height: `${Math.max((d.value/1000000)*100, 6)}%` }} />
                                    <span className="text-[11px] font-bold text-zinc-400 mt-3">{d.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                        { title: 'Active Students', val: data.smallStats.activeStudents, icon: <GraduationCap /> },
                        { title: 'Books Borrowed', val: data.smallStats.booksBorrowed, icon: <BookOpen /> },
                        { title: 'Penalty Bill', val: data.smallStats.penaltyBill, icon: <Receipt /> }
                    ].map((s, i) => (
                        <div key={i} className="bg-white border border-zinc-100 rounded-[20px] p-5 flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 text-[#161B85] rounded-2xl flex items-center justify-center">{s.icon}</div>
                            <div>
                                <p className="text-[13px] text-zinc-400 font-bold">{s.title}</p>
                                <p className="text-[20px] font-black">{s.val}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Recent Actions */}
                <div className="bg-white border border-zinc-100 rounded-[24px] p-8 mb-4">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-[20px] font-black">Recent Administrative Actions</h2>
                        <Link href="/admin/history" className="text-[#161B85] font-bold text-[14px]">View All</Link>
                    </div>
                    {data.recentActions.map((act) => (
                        <div key={act.id} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-4 mb-4 flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-[#161B85] flex items-center justify-center"><Bookmark size={18}/></div>
                                <div><h4 className="font-bold text-[14px]">{act.title}</h4><p className="text-[12px] text-zinc-500">{act.description}</p></div>
                            </div>
                            <span className="text-[12px] font-bold text-zinc-400">{getRelativeTime(act.timestamp)}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}