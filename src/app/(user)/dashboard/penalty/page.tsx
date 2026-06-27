'use client';

import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2, AlertTriangle, Clock } from "lucide-react";
import { useRouter } from "next/navigation";

interface PenaltyItem {
    id_denda: number;
    jumlah_denda: number;
    hari_terlambat: number;
    keterangan_denda: string;
    judul_buku: string;
    penulis: string;
    cover_buku: string;
    tanggal_bayar: string | null;
    kode_peminjaman: string;
}

interface PenaltyData {
    active: PenaltyItem[];
    history: PenaltyItem[];
    total: number;
}

export default function PenaltyBillPage() {
    const router = useRouter();
    const [penaltyData, setPenaltyData] = useState<PenaltyData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPenalty = async () => {
            const token = localStorage.getItem('lumenary_token');
            if (!token) {
                router.replace('/login');
                return;
            }

            try {
                const res = await fetch('/api/user/penalty', {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.clear();
                    router.replace('/login');
                    return;
                }

                const resData = await res.json();
                
                if (res.ok && resData.success) {
                    setPenaltyData(resData.data);
                }
            } catch (err) {
                console.error("Failed to fetch penalty data", err);
            } finally {
                setLoading(false);
            }
        };

        fetchPenalty();
    }, [router]);

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            day: 'numeric', month: 'short', year: 'numeric'
        });
    };

    const formatKeterangan = (ket: string) => {
        if (ket === 'tidak_ada') return 'LATE RETURN';
        return ket.replace('_', ' ').toUpperCase();
    };

    if (loading) {
        return (
            <div className="flex flex-col h-[70vh] w-full items-center justify-center gap-4 font-['Plus_Jakarta_Sans',sans-serif]">
                <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                <p className="text-zinc-500 font-medium text-sm">Checking penalty records...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1000px] animate-in fade-in duration-300 font-['Plus_Jakarta_Sans',sans-serif] pb-10">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col mb-6 gap-2 mt-4">
                <h1 className="text-[28px] md:text-[32px] font-extrabold text-black leading-tight">
                    Penalty Bill
                </h1>
            </div>

            {/* --- BANNER AREA --- */}
            <div className="bg-[#FFF5F6] border border-[#FFE4E6] rounded-[20px] p-6 md:p-8 mb-8 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex flex-col relative z-10 max-w-2xl">
                    <span className="text-[11px] font-black tracking-widest text-[#E11D48] uppercase mb-2">
                        Account Settlement Required
                    </span>
                    <h2 className="text-[28px] md:text-[36px] font-extrabold text-[#BE123C] mb-3 leading-none tracking-tight">
                        Total Penalty Bill: {formatRupiah(penaltyData?.total || 0)}
                    </h2>
                    <p className="text-[#9F1239] text-[14px] md:text-[15px] font-medium leading-relaxed">
                        Please settle your outstanding bills at the library circulation desk to unlock your book reservation privileges and avoid academic registration blocks.
                    </p>
                </div>
            </div>

            {/* --- ACTIVE PENALTIES --- */}
            <div className="mb-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-[18px] font-bold text-[#111]">
                        Active Penalties ({penaltyData?.active.length || 0})
                    </h3>
                </div>

                {(!penaltyData || penaltyData.active.length === 0) ? (
                    <div className="bg-white rounded-2xl p-8 border border-zinc-200 flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-[18px] font-bold text-[#111] mb-1">You're All Clear!</h2>
                        <p className="text-zinc-500 text-[14px] font-medium">No active penalty bills found.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {penaltyData.active.map((item) => (
                            <div key={item.id_denda} className="bg-white rounded-2xl p-4 md:p-5 border border-zinc-200 shadow-sm flex flex-col md:flex-row md:items-center gap-5 md:gap-6">
                                {/* Book Cover */}
                                <div className="w-[70px] md:w-[85px] aspect-[2/3] bg-zinc-100 rounded-lg overflow-hidden shrink-0 border border-zinc-100">
                                    <img src={item.cover_buku || "/placeholder-cover.jpg"} alt={item.judul_buku} className="w-full h-full object-cover" />
                                </div>
                                
                                {/* Info */}
                                <div className="flex flex-col flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <span className={`text-[10px] font-bold px-2 py-1 rounded-md tracking-wider flex items-center gap-1
                                            ${item.keterangan_denda === 'tidak_ada' ? 'bg-[#FFE4E6] text-[#E11D48]' : 'bg-[#FEF3C7] text-[#BE123C]'}`}>
                                            {formatKeterangan(item.keterangan_denda)}
                                        </span>
                                        {item.keterangan_denda === 'tidak_ada' && (
                                            <span className="text-[12px] font-bold text-[#E11D48] flex items-center gap-1">
                                                <AlertTriangle size={14} /> {item.hari_terlambat} Days Overdue
                                            </span>
                                        )}
                                    </div>
                                    <h4 className="text-[18px] font-bold text-[#111] leading-tight mb-1">{item.judul_buku}</h4>
                                    <p className="text-[14px] text-zinc-500 font-medium">by {item.penulis}</p>
                                </div>

                                {/* Price */}
                                <div className="flex flex-col items-start md:items-end justify-center pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100 md:border-none shrink-0 md:min-w-[150px]">
                                    {item.keterangan_denda === 'tidak_ada' ? (
                                        <p className="text-[12px] font-bold text-zinc-500 mb-1">Rp 5.000,00 / day</p>
                                    ) : (
                                        <p className="text-[12px] font-bold text-zinc-500 mb-1">Damage penalty</p>
                                    )}
                                    <div className="text-[20px] md:text-[22px] font-black text-[#111] leading-none mb-1">
                                        {formatRupiah(item.jumlah_denda)}
                                    </div>
                                    <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">Subtotal Penalty</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* --- PAYMENT HISTORY --- */}
            {penaltyData && penaltyData.history.length > 0 && (
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-[18px] font-bold text-[#111]">Payment History</h3>
                    </div>
                    
                    <div className="bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-zinc-50/50 border-b border-zinc-200">
                                        <th className="py-4 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Book Information</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-wider">Bill ID</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-wider whitespace-nowrap">Date Paid</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-center">Status</th>
                                        <th className="py-4 px-6 text-[11px] font-bold text-zinc-500 uppercase tracking-wider text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {penaltyData.history.map((hist) => (
                                        <tr key={hist.id_denda} className="border-b border-zinc-100 last:border-none hover:bg-zinc-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="flex flex-col">
                                                    <span className="text-[14px] font-bold text-[#111] line-clamp-1">{hist.judul_buku}</span>
                                                    <span className="text-[13px] text-zinc-500">by {hist.penulis}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6">
                                                <span className="text-[13px] font-mono text-zinc-600">{hist.kode_peminjaman}</span>
                                            </td>
                                            <td className="py-4 px-6 whitespace-nowrap">
                                                <span className="text-[13px] font-medium text-zinc-700">{formatDate(hist.tanggal_bayar)}</span>
                                            </td>
                                            <td className="py-4 px-6 text-center">
                                                <div className="inline-flex items-center gap-1.5 bg-[#ECFDF5] text-[#059669] px-3 py-1.5 rounded-full">
                                                    <CheckCircle2 size={14} className="stroke-[3]" />
                                                    <span className="text-[11px] font-bold uppercase tracking-wider">Settled</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-right">
                                                <span className="text-[14px] font-bold text-[#111]">{formatRupiah(hist.jumlah_denda)}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}