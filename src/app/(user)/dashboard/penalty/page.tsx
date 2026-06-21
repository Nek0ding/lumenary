'use client';

import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface PenaltyItem {
    id_denda: number;
    jumlah_denda: number;
    hari_terlambat: number;
    keterangan_denda: string;
    judul_buku: string;
}

interface PenaltyData {
    list: PenaltyItem[];
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
                const resData = await res.json();
                
                if (res.ok && resData.success) {
                    setPenaltyData(resData.data);
                }
            } catch (err) {
                console.error("Gagal mengambil data denda", err);
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
            minimumFractionDigits: 0
        }).format(amount);
    };

    const formatKeterangan = (ket: string) => {
        if (ket === 'tidak_ada') return 'Keterlambatan (Late Return)';
        return ket.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    if (loading) {
        return (
            <div className="flex flex-col h-[70vh] w-full items-center justify-center gap-4">
                <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                <p className="text-zinc-500 font-medium text-sm">Checking penalty records...</p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-[1000px] mx-auto animate-in fade-in duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col mb-8 gap-2 mt-4">
                <h1 className="text-[28px] md:text-[32px] font-extrabold text-black leading-tight">
                    Penalty Bill
                </h1>
                <p className="text-[14px] md:text-[16px] text-zinc-500 font-medium">
                    Review and manage your outstanding library fines.
                </p>
            </div>

            {/* --- KONTEN UTAMA --- */}
            <div className="flex flex-col gap-6 max-w-4xl">
                
                {(!penaltyData || penaltyData.list.length === 0) ? (
                    /* STATE: TIDAK ADA DENDA */
                    <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm flex flex-col items-center justify-center py-16 text-center">
                        <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 size={32} />
                        </div>
                        <h2 className="text-[20px] font-bold text-[#1E1E1E] mb-2">You're All Clear!</h2>
                        <p className="text-zinc-500 text-[15px] font-medium">
                            There are no outstanding penalty bills associated with your account.
                        </p>
                    </div>
                ) : (
                    /* STATE: ADA DENDA */
                    <>
                        <div className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm flex flex-col sm:flex-row justify-between sm:items-end gap-6 relative overflow-hidden">
                            {/* Dekorasi Background */}
                            <div className="absolute -right-10 -top-10 w-40 h-40 bg-red-50 rounded-full blur-3xl pointer-events-none" />

                            <div className="relative z-10">
                                <h2 className="text-xs font-bold text-red-500 tracking-wider uppercase mb-4 flex items-center gap-2">
                                    <AlertCircle size={16} /> Total Outstanding Bill
                                </h2>
                                <div className="text-[40px] md:text-[48px] font-extrabold text-[#1E1E1E] mb-2 tracking-tight leading-none">
                                    {formatRupiah(penaltyData.total)}
                                </div>
                                <p className="text-sm text-[#444444] font-medium">
                                    Total accumulated penalty for {penaltyData.list.length} overdue item(s).
                                </p>
                            </div>
                        </div>

                        {/* LIST DETAIL DENDA */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[16px] font-bold text-[#1E1E1E] ml-1">Bill Breakdown</h3>
                            {penaltyData.list.map((item) => (
                                <div key={item.id_denda} className="bg-white rounded-xl p-5 md:p-6 border border-zinc-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
                                    <div className="flex flex-col gap-1">
                                        <h4 className="text-[16px] font-bold text-[#1E1E1E] line-clamp-1">{item.judul_buku}</h4>
                                        <div className="flex items-center gap-2 text-[13px] font-medium text-zinc-500">
                                            <span className="text-red-500 bg-red-50 px-2 py-0.5 rounded uppercase tracking-wider text-[10px] font-bold">
                                                {formatKeterangan(item.keterangan_denda)}
                                            </span>
                                            <span>•</span>
                                            <span>{item.hari_terlambat} Days Overdue</span>
                                        </div>
                                    </div>
                                    <div className="text-[20px] font-black text-[#1E1E1E] shrink-0">
                                        {formatRupiah(item.jumlah_denda)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* KOTAK PROSEDUR PEMBAYARAN */}
                        <div className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm mt-4">
                            <h3 className="text-[18px] font-bold text-[#1E1E1E] mb-4">
                                Penalty Payment Procedure
                            </h3>
                            <div className="flex flex-col gap-4">
                                <ol className="list-decimal list-inside space-y-3 text-[#444444] text-[14px] md:text-[15px] font-medium leading-relaxed">
                                    <li>Visit the Gunadarma University Library circulation desk during operational hours (Monday - Friday, 08:00 - 16:00).</li>
                                    <li>Mention your NPM (Student ID) and Booking Code the state that you wish to clear your penalty bills.</li>
                                    <li>Present the physical book if you are returning an overdue item.</li>
                                    <li>Pay the exact penalty amount in cash or via QRIS (if available) to the librarian.</li>
                                    <li>The librarian will update your account status. This page will reflect zero balance once payment is verified.</li>
                                </ol>
                                <div className="mt-2 p-4 bg-yellow-50 text-yellow-800 rounded-xl text-[13px] font-medium flex gap-3 items-start border border-yellow-100">
                                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                                    <p>Your ability to borrow new books or reserve study slots is temporarily suspended until all outstanding bills are fully settled.</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}