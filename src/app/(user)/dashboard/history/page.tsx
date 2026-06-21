'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2, BookOpen, CheckCircle2, AlertCircle, AlertTriangle } from 'lucide-react';

interface LoanItem {
    id_peminjaman: number;
    id_buku: number;
    kode_peminjaman: string;
    judul: string;
    penulis: string;
    cover_buku: string;
    kategori: string;
    isbn: string;
    tanggal_pinjam: string;
    tanggal_kembali: string;
    status: string;
    denda?: number;
}

// ── Toast ────────────────────────────────────────────────────────────────────
type ToastType = 'success' | 'error';
interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

let toastCounter = 0;

function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: number) => void }) {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[999999] flex flex-col gap-2 items-center pointer-events-none">
            {toasts.map((t) => (
                <div
                    key={t.id}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl shadow-xl text-white text-[14px] font-semibold pointer-events-auto animate-in slide-in-from-bottom-4 duration-300
                        ${t.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'}`}
                >
                    {t.type === 'success'
                        ? <CheckCircle2 size={18} className="shrink-0" />
                        : <AlertCircle size={18} className="shrink-0" />
                    }
                    {t.message}
                    <button onClick={() => onRemove(t.id)} className="ml-1 opacity-70 hover:opacity-100">
                        <X size={14} />
                    </button>
                </div>
            ))}
        </div>
    );
}

// ── Confirmation Dialog ──────────────────────────────────────────────────────
function ConfirmCancelDialog({
    bookTitle,
    onConfirm,
    onClose,
    isLoading,
}: {
    bookTitle: string;
    onConfirm: () => void;
    onClose: () => void;
    isLoading: boolean;
}) {
    return (
        <div className="fixed inset-0 z-[999995] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-[24px] w-full max-w-[420px] shadow-2xl p-8 flex flex-col gap-6 animate-in zoom-in-95 duration-200">
                <div className="flex flex-col items-center gap-4 text-center">
                    <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center">
                        <AlertTriangle size={32} className="text-red-500" />
                    </div>
                    <div>
                        <h3 className="text-[20px] font-extrabold text-black mb-2">Cancel Reservation?</h3>
                        <p className="text-[14px] text-zinc-500 font-medium leading-relaxed">
                            Are you sure you want to cancel your reservation for{' '}
                            <span className="font-bold text-black">"{bookTitle}"</span>?
                            <br /><br />
                            The book will be returned to stock and this action{' '}
                            <span className="text-red-600 font-bold">cannot be undone</span>.
                        </p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl border-2 border-zinc-200 text-zinc-700 font-bold text-[15px] hover:bg-zinc-50 transition-all disabled:opacity-50"
                    >
                        Keep It
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-[15px] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                        {isLoading && <Loader2 size={18} className="animate-spin" />}
                        {isLoading ? 'Cancelling...' : 'Yes, Cancel'}
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── Main Page ────────────────────────────────────────────────────────────────
export default function HistoryPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'on-loan' | 'history'>('on-loan');
    const [activeLoans, setActiveLoans] = useState<LoanItem[]>([]);
    const [pastLoans, setPastLoans] = useState<LoanItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Modal state
    const [selectedLoan, setSelectedLoan] = useState<LoanItem | null>(null);

    // Cancel state
    const [cancelTarget, setCancelTarget] = useState<LoanItem | null>(null);
    const [isCancelling, setIsCancelling] = useState(false);

    // Toast state
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = ++toastCounter;
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 4000);
    }, []);

    const removeToast = useCallback((id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const fetchHistoryData = useCallback(async () => {
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (!token || !userStr) {
            router.replace('/login');
            return;
        }

        const user = JSON.parse(userStr);

        try {
            const res = await fetch(`/api/user/history?npm=${user.npm}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const resData = await res.json();

            if (res.ok && resData.success) {
                setActiveLoans(resData.data?.active || []);
                setPastLoans(resData.data?.past || []);
            } else {
                if (res.status === 401 || res.status === 403) {
                    localStorage.removeItem('lumenary_token');
                    localStorage.removeItem('lumenary_user');
                    router.replace('/login');
                    return;
                }
                setError(resData.message || 'Gagal memuat data riwayat.');
            }
        } catch (err) {
            console.error('Error fetching history:', err);
            setError('Terjadi kesalahan jaringan atau server.');
        } finally {
            setLoading(false);
        }
    }, [router]);

    useEffect(() => {
        fetchHistoryData();
    }, [fetchHistoryData]);

    const handleConfirmCancel = async () => {
        if (!cancelTarget) return;
        setIsCancelling(true);

        try {
            const token = localStorage.getItem('lumenary_token');
            const res = await fetch(`/api/peminjaman/${cancelTarget.id_peminjaman}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ action: 'cancel' }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setCancelTarget(null);
                setSelectedLoan(null);
                showToast('Reservation successfully cancelled.', 'success');
                setActiveTab('history');
                fetchHistoryData();
            } else {
                setCancelTarget(null);
                showToast(data.message || 'Failed to cancel reservation.', 'error');
            }
        } catch {
            setCancelTarget(null);
            showToast('Network error. Please try again.', 'error');
        } finally {
            setIsCancelling(false);
        }
    };

    const formatDate = (dateString: string | null | undefined) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    // Fungsi Pembantu H+1 untuk Pickup Deadline
    const getPickupDeadline = (dateString: string | null | undefined) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1); // Tambah 1 hari dari tanggal pembuatan
        return formatDate(date.toISOString());
    };

    const formatRupiah = (amount: number) =>
        new Intl.NumberFormat('id-ID', {
            style: 'currency', currency: 'IDR', minimumFractionDigits: 0
        }).format(amount);

    const getStatusInfo = (dueDateString: string, status: string) => {
        if (status === 'dikembalikan') return { text: 'Returned', color: 'text-emerald-600 bg-emerald-50', badge: true };
        if (status === 'dibatalkan') return { text: 'Cancelled', color: 'text-zinc-600 bg-zinc-100', badge: true };
        if (status === 'direservasi') return { text: 'Reserved (Awaiting Pickup)', color: 'text-blue-700 bg-blue-50', badge: true };

        const due = new Date(dueDateString);
        const today = new Date();
        due.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);
        const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

        if (status === 'terlambat' || diffDays < 0) return { text: `Overdue (${Math.abs(diffDays)} days)`, color: 'text-red-600 bg-red-50', badge: true };
        if (diffDays === 0) return { text: 'Due Today', color: 'text-orange-600 bg-orange-50', badge: true };
        return { text: `Active (${diffDays} days left)`, color: 'text-[#161B85] bg-indigo-50', badge: true };
    };

    const getCategoryBadge = (category: string | undefined) => {
        if (!category) return 'bg-zinc-100 text-zinc-700';
        const cat = category.toLowerCase();
        if (cat.includes('psychology')) return 'bg-[#EADFFF] text-[#6B21A8]';
        if (cat.includes('technology') || cat.includes('science') || cat.includes('computer')) return 'bg-indigo-100 text-indigo-700';
        if (cat.includes('fiction')) return 'bg-purple-100 text-purple-600';
        return 'bg-zinc-100 text-zinc-700';
    };

    if (loading) return (
        <div className="flex h-[70vh] w-full text-black items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
            <span className="font-medium text-zinc-500">Loading history...</span>
        </div>
    );

    if (error) return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-4 text-red-500 font-semibold">
            <p className="flex items-center gap-2">⚠️ {error}</p>
            <button onClick={() => window.location.reload()} className="text-[13px] bg-zinc-200 text-zinc-700 px-6 py-2 rounded-lg hover:bg-zinc-300 transition-all font-bold">Try again</button>
        </div>
    );

    const displayedData = activeTab === 'on-loan' ? (activeLoans || []) : (pastLoans || []);

    return (
        <div className="flex flex-col gap-6 w-full max-w-[900px] font-['Plus_Jakarta_Sans',sans-serif]">

            <ToastContainer toasts={toasts} onRemove={removeToast} />

            {cancelTarget && (
                <ConfirmCancelDialog
                    bookTitle={cancelTarget.judul}
                    onConfirm={handleConfirmCancel}
                    onClose={() => setCancelTarget(null)}
                    isLoading={isCancelling}
                />
            )}

            {/* Header */}
            <div className="flex flex-col gap-1 mt-2">
                <h1 className="text-[32px] md:text-[36px] font-extrabold text-black tracking-tight">Borrowing History</h1>
                <p className="text-[15px] md:text-[18px] text-zinc-600 font-medium">
                    Track your currently active book loans and view your past reading history.
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-6 md:gap-8 border-b-[2px] border-zinc-200 mt-2">
                <button onClick={() => setActiveTab('on-loan')} className={`pb-3 font-bold text-[18px] transition-all relative ${activeTab === 'on-loan' ? 'text-[#161B85]' : 'text-zinc-400 hover:text-zinc-600'}`}>
                    On Loan ({activeLoans?.length || 0})
                    {activeTab === 'on-loan' && <div className="absolute bottom-[-2px] left-0 w-full h-[4px] bg-[#161B85] rounded-t-full"></div>}
                </button>
                <button onClick={() => setActiveTab('history')} className={`pb-3 font-bold text-[18px] transition-all relative ${activeTab === 'history' ? 'text-[#161B85]' : 'text-zinc-400 hover:text-zinc-600'}`}>
                    History ({pastLoans?.length || 0})
                    {activeTab === 'history' && <div className="absolute bottom-[-2px] left-0 w-full h-[4px] bg-[#161B85] rounded-t-full"></div>}
                </button>
            </div>

            {/* List Peminjaman */}
            <div className="flex flex-col gap-5 mt-2">
                {displayedData.length === 0 ? (
                    <div className="w-full bg-white rounded-[24px] p-12 text-center text-zinc-500 font-medium shadow-sm border border-zinc-100 flex flex-col items-center gap-4">
                        <BookOpen size={48} className="text-zinc-300" />
                        <p className="text-[16px]">{activeTab === 'on-loan' ? 'You have no active book loans at the moment.' : 'Your borrowing history is empty.'}</p>
                    </div>
                ) : (
                    displayedData.map((loan) => {
                        const statusInfo = getStatusInfo(loan.tanggal_kembali, loan.status);
                        const bookData = (loan as any).buku || {};
                        const isReservedOrCanceled = ['direservasi', 'dibatalkan'].includes(loan.status);

                        return (
                            <div
                                key={loan.id_peminjaman}
                                onClick={() => setSelectedLoan({
                                    ...loan,
                                    judul: bookData.judul || loan.judul,
                                    penulis: bookData.penulis || loan.penulis,
                                    cover_buku: bookData.cover_buku || loan.cover_buku
                                })}
                                className="bg-white rounded-[24px] md:rounded-[32px] p-5 md:p-6 flex flex-col sm:flex-row gap-5 md:gap-8 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-zinc-100 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 cursor-pointer transition-all duration-300"
                            >
                                <div className="w-[100px] md:w-[130px] aspect-[2/3] shrink-0 bg-zinc-100 rounded-xl md:rounded-2xl overflow-hidden shadow-sm mx-auto sm:mx-0 border border-zinc-100">
                                    <img src={bookData.cover_buku || loan.cover_buku || "/placeholder-cover.jpg"} alt={bookData.judul || loan.judul} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 py-1 justify-between">
                                    <div className="flex flex-col">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-[20px] md:text-[24px] font-bold text-black leading-tight line-clamp-1 sm:line-clamp-2">{bookData.judul || loan.judul}</h3>
                                            <span className={`shrink-0 text-[11px] md:text-[12px] font-bold px-3 py-1 rounded-md ${statusInfo.color}`}>
                                                {statusInfo.text}
                                            </span>
                                        </div>
                                        <p className="text-[14px] md:text-[16px] text-zinc-500 font-medium mt-1">{bookData.penulis || loan.penulis}</p>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 mt-5 sm:mt-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">
                                                {isReservedOrCanceled ? 'Reserved Date' : 'Borrowed Date'}
                                            </span>
                                            <span className="text-[13px] md:text-[15px] font-bold text-black">{formatDate(loan.tanggal_pinjam)}</span>
                                        </div>
                                        <div className="flex flex-col gap-0.5">
                                            <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">
                                                {isReservedOrCanceled ? 'Pickup Deadline' : 'Return Due Date'}
                                            </span>
                                            <span className="text-[13px] md:text-[15px] font-bold text-black">
                                                {isReservedOrCanceled ? getPickupDeadline(loan.tanggal_pinjam) : formatDate(loan.tanggal_kembali)}
                                            </span>
                                        </div>
                                        <div className="flex flex-col gap-0.5 col-span-2 sm:col-span-1">
                                            <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">Booking Code</span>
                                            <span className="text-[13px] md:text-[16px] font-black tracking-widest text-[#161B85]">{loan.kode_peminjaman}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* ================= MODAL DETAIL PEMINJAMAN ================= */}
            {selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-[32px] w-full max-w-[600px] shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">

                        <button
                            onClick={() => setSelectedLoan(null)}
                            className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors z-10"
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-10 flex flex-col gap-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                <div className="w-[120px] aspect-[2/3] shrink-0 bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden shadow-md">
                                    <img src={selectedLoan.cover_buku || "/placeholder-cover.jpg"} alt={selectedLoan.judul} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 pt-2 w-full">
                                    <span className={`text-[12px] font-bold px-3 py-1.5 rounded-lg w-fit mx-auto sm:mx-0 mb-3 ${getCategoryBadge(selectedLoan.kategori || 'General')}`}>
                                        {selectedLoan.kategori || 'General'}
                                    </span>
                                    <h2 className="text-[24px] font-bold text-black leading-tight mb-1">{selectedLoan.judul}</h2>
                                    <p className="text-[16px] text-zinc-500 font-medium">{selectedLoan.penulis}</p>
                                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-blue-800 uppercase">Booking Code</span>
                                        <span className="text-[20px] font-black text-[#161B85] tracking-[0.2em]">{selectedLoan.kode_peminjaman}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-zinc-100"></div>

                            {/* Detail Grid */}
                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">
                                        {['direservasi', 'dibatalkan'].includes(selectedLoan.status) ? 'Reserved Date' : 'Date Borrowed'}
                                    </span>
                                    <span className="text-[16px] font-bold text-black">{formatDate(selectedLoan.tanggal_pinjam)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">
                                        {['direservasi', 'dibatalkan'].includes(selectedLoan.status) ? 'Pickup Deadline' : 'Return Due Date'}
                                    </span>
                                    <span className="text-[16px] font-bold text-black">
                                        {['direservasi', 'dibatalkan'].includes(selectedLoan.status) ? getPickupDeadline(selectedLoan.tanggal_pinjam) : formatDate(selectedLoan.tanggal_kembali)}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Current Status</span>
                                    <span className={`text-[16px] font-bold ${getStatusInfo(selectedLoan.tanggal_kembali, selectedLoan.status).color.split(' ')[0]}`}>
                                        {getStatusInfo(selectedLoan.tanggal_kembali, selectedLoan.status).text}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Penalty Amount</span>
                                    <span className={`text-[16px] font-black ${selectedLoan.denda && selectedLoan.denda > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {formatRupiah(selectedLoan.denda || 0)}
                                    </span>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="pt-4 border-t border-zinc-100 mt-2 flex flex-col gap-3">
                                {selectedLoan.status === 'direservasi' && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setCancelTarget(selectedLoan);
                                        }}
                                        className="w-full py-4 rounded-xl border-2 border-red-200 text-red-600 bg-red-50 hover:bg-red-100 font-bold text-[16px] transition-all hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <X size={18} />
                                        Cancel Reservation
                                    </button>
                                )}
                                <button
                                    onClick={() => setSelectedLoan(null)}
                                    className="w-full py-4 rounded-xl text-white font-bold text-[16px] transition-all hover:-translate-y-0.5 shadow-lg active:scale-95"
                                    style={{ background: 'linear-gradient(90deg, #161B85 0%, #0E1154 100%)' }}
                                >
                                    Close Details
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}