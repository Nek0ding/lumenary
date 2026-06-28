'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
    BookOpen, AlertTriangle, Banknote, RefreshCcw, ArrowRight,
    Clock, CheckCircle2, ChevronLeft, ChevronRight, Search,
    Download, ScanLine, X, ShieldCheck, AlertOctagon
} from 'lucide-react';
import { authFetch } from '@/lib/authFetch';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
type ActionType = 'PICKUP_BOOKING' | 'RETURN & FINE';
type StatusFilter = 'all' | 'pickup' | 'return';

interface QueueItem {
    id_peminjaman: number;
    kode_peminjaman: string;
    status: string;
    tanggal_kembali: string;
    action_type: ActionType;
    hari_terlambat: number;
    user: { nama: string; npm: string };
    buku: { judul: string; cover_buku: string; isbn: string };
    denda?: { jumlah_denda: number; status_bayar: string } | null;
}

interface QueueSummary {
    pending_pickup: number;
    overdue_returns: number;
    total_penalty: number;
}

// ─── Pickup Modal ─────────────────────────────────────────────────────────────
// Admin menginput kode_buku secara manual (ketik atau scan).
// Sistem memvalidasi apakah kode_buku tersebut:
//   1. Ada di database (BukuItem.kode_buku)
//   2. Berstatus TERSEDIA
//   3. Belong to id_buku yang sama dengan yang dipesan
// Jika tidak valid → tombol konfirmasi tetap disabled.
function PickupModal({
    item,
    onSuccess,
    onClose,
}: {
    item: QueueItem;
    onSuccess: () => void;
    onClose: () => void;
}) {
    const [kodeBuku, setKodeBuku] = useState('');
    const [validationState, setValidationState] = useState<'idle' | 'checking' | 'valid' | 'invalid'>('idle');
    const [validationMsg, setValidationMsg] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    // Auto-focus input saat modal terbuka
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    // Validasi kode_buku secara real-time (debounce 400ms)
    // — cocok untuk input manual maupun scanner yang langsung paste value
    const validateKodeBuku = useCallback(async (kode: string) => {
        if (!kode.trim()) {
            setValidationState('idle');
            setValidationMsg('');
            return;
        }

        setValidationState('checking');
        setValidationMsg('');

        try {
            const res = await authFetch(
                `/api/admin/counter/validate-item?kode_buku=${encodeURIComponent(kode.trim())}&kode_peminjaman=${encodeURIComponent(item.kode_peminjaman)}`
            );
            const json = await res.json();

            if (json.valid) {
                setValidationState('valid');
                setValidationMsg(json.message); // e.g. "Item LB-001 — valid & available"
            } else {
                setValidationState('invalid');
                setValidationMsg(json.message); // e.g. "Book code does not match the reserved title"
            }
        } catch {
            setValidationState('invalid');
            setValidationMsg('Failed to validate. Check connection.');
        }
    }, [item.kode_peminjaman]);

    const handleKodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setKodeBuku(val);
        setValidationState('idle');

        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => validateKodeBuku(val), 400);
    };

    // Juga trigger validasi saat Enter (misalnya scanner yang kirim Enter setelah scan)
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            validateKodeBuku(kodeBuku);
        }
    };

    const handleConfirm = async () => {
        if (validationState !== 'valid') return;
        setIsConfirming(true);
        try {
            const res = await authFetch('/api/admin/counter/pickup', {
                method: 'POST',
                body: JSON.stringify({
                    kode_peminjaman: item.kode_peminjaman,
                    kode_buku: kodeBuku.trim(),
                }),
            });
            const json = await res.json();
            if (json.success) {
                toast.success(json.message);
                onSuccess();
            } else {
                toast.error(json.message);
            }
        } catch {
            toast.error('Failed to process. Check connection.');
        } finally {
            setIsConfirming(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-7 w-full max-w-lg shadow-2xl border border-zinc-200 mx-4">

                {/* Header */}
                <div className="flex items-start justify-between mb-5">
                    <div>
                        <div className="w-11 h-11 bg-[#F0F2FF] rounded-2xl flex items-center justify-center mb-3">
                            <ScanLine size={22} className="text-[#161B85]" />
                        </div>
                        <h3 className="text-lg font-black text-zinc-900">Confirm Book Handover</h3>
                        <p className="text-xs text-zinc-500 font-medium mt-0.5">Enter the physical book code to validate before handover</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-100 rounded-xl transition-colors mt-1">
                        <X size={16} className="text-zinc-400" />
                    </button>
                </div>

                {/* Loan Info */}
                <div className="flex gap-3 p-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl mb-5">
                    <div className="w-10 h-14 rounded-lg overflow-hidden shrink-0 bg-zinc-200 border border-zinc-200">
                        <img src={item.buku.cover_buku} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                        <p className="text-sm font-extrabold text-zinc-900 line-clamp-2 leading-tight">{item.buku.judul}</p>
                        <p className="text-[10px] font-bold text-zinc-400 mt-1">ISBN: {item.buku.isbn}</p>
                        <div className="flex items-center gap-2 mt-1.5">
                            <span className="font-mono text-[10px] font-extrabold text-[#161B85] bg-[#F0F2FF] px-2 py-0.5 rounded-md">
                                {item.kode_peminjaman}
                            </span>
                            <span className="text-[10px] font-bold text-zinc-400">{item.user.nama}</span>
                        </div>
                    </div>
                </div>

                {/* Kode Buku Input */}
                <div className="mb-2">
                    <label className="text-[11px] font-extrabold text-zinc-600 uppercase tracking-widest mb-2 block">
                        Physical Book Code
                    </label>
                    <div className="relative">
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder="e.g. LB-0042 — type or scan barcode..."
                            value={kodeBuku}
                            onChange={handleKodeChange}
                            onKeyDown={handleKeyDown}
                            className={`w-full bg-zinc-50 border rounded-xl px-4 py-3 font-mono font-bold text-zinc-900 text-sm uppercase focus:outline-none focus:ring-1 transition-colors pr-10 ${
                                validationState === 'valid'
                                    ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-500/20'
                                    : validationState === 'invalid'
                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20'
                                    : 'border-zinc-200 focus:border-[#161B85] focus:ring-[#161B85]/20'
                            }`}
                        />
                        {/* Validation icon inline */}
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {validationState === 'checking' && (
                                <div className="w-4 h-4 border-2 border-zinc-300 border-t-[#161B85] rounded-full animate-spin" />
                            )}
                            {validationState === 'valid' && <CheckCircle2 size={16} className="text-emerald-500" />}
                            {validationState === 'invalid' && <AlertOctagon size={16} className="text-red-500" />}
                        </div>
                    </div>
                </div>

                {/* Validation feedback */}
                <div className="min-h-[20px] mb-5">
                    {validationState === 'valid' && (
                        <p className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 size={11} /> {validationMsg}
                        </p>
                    )}
                    {validationState === 'invalid' && (
                        <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1">
                            <AlertOctagon size={11} /> {validationMsg}
                        </p>
                    )}
                    {validationState === 'idle' && kodeBuku.length === 0 && (
                        <p className="text-[11px] text-zinc-400 font-medium">
                            Input must match an available physical copy of this title.
                        </p>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isConfirming}
                        className="flex-1 py-3 border-2 border-zinc-200 text-zinc-600 rounded-xl font-extrabold text-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={validationState !== 'valid' || isConfirming}
                        className="flex-1 py-3 bg-[#161B85] hover:bg-[#0E1154] disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#161B85]/20"
                    >
                        {isConfirming
                            ? 'Processing...'
                            : <><ShieldCheck size={16} /> Confirm Handover</>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

// ─── Sub-components ───────────────────────────────────────────────────────────
function StatCard({ icon, label, value, accent }: {
    icon: React.ReactNode; label: string; value: string | number; accent: string;
}) {
    return (
        <div className="bg-white rounded-2xl px-5 py-4 border border-zinc-200 shadow-sm flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${accent}`}>
                {icon}
            </div>
            <div>
                <p className="text-[11px] font-extrabold text-zinc-400 uppercase tracking-widest">{label}</p>
                <p className="text-xl font-black text-zinc-900 leading-tight">{value}</p>
            </div>
        </div>
    );
}

function ActionBadge({ type, days }: { type: ActionType; days: number }) {
    if (type === 'PICKUP_BOOKING') {
        return (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-[#F0F2FF] border border-[#C7CBF9] text-[#161B85] text-[10px] font-extrabold rounded-lg tracking-wider">
                <BookOpen size={11} /> PICKUP BOOKING
            </span>
        );
    }
    return (
        <div className="flex flex-col gap-1">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-red-50 border border-red-200 text-red-700 text-[10px] font-extrabold rounded-lg tracking-wider">
                <RefreshCcw size={11} /> RETURN & FINE
            </span>
            {days > 0 && (
                <span className="text-[10px] font-extrabold text-red-600 flex items-center gap-1">
                    <AlertTriangle size={9} /> Overdue {days} Days
                </span>
            )}
        </div>
    );
}

function DeadlineCell({ dateString, isOverdue }: { dateString: string; isOverdue: boolean }) {
    const formatted = new Date(dateString).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric',
    });
    return (
        <p className={`text-sm font-extrabold ${isOverdue ? 'text-red-700' : 'text-zinc-900'}`}>
            {formatted}
        </p>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CounterDashboard() {
    const router = useRouter();
    const [queue, setQueue] = useState<QueueItem[]>([]);
    const [summary, setSummary] = useState<QueueSummary>({ pending_pickup: 0, overdue_returns: 0, total_penalty: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [pickupItem, setPickupItem] = useState<QueueItem | null>(null);
    const PER_PAGE = 8;

    const fetchQueue = useCallback(async () => {
        setIsLoading(true);
        try {
            const res = await authFetch('/api/admin/counter/queue');
            const json = await res.json();
            if (json.success) {
                setQueue(json.data);
                setSummary(json.summary);
            } else {
                toast.error(json.message || 'Failed to load queue.');
            }
        } catch {
            toast.error('Failed to connect to server.');
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQueue();
        const interval = setInterval(fetchQueue, 60_000);
        return () => clearInterval(interval);
    }, [fetchQueue]);

    // ─── Filter & Search ───────────────────────────────────────────────────
    // Filter "return" hanya menampilkan yang RETURN & FINE.
    // Filter "pickup" hanya menampilkan PICKUP_BOOKING.
    // "Overdue Returns" di tab secara konsisten = action_type RETURN & FINE
    // (baik yang sudah terlambat maupun yang belum, karena keduanya perlu dikembalikan).
    // Jika ingin strictly hanya yang terlambat, ganti kondisi di bawah.
    const filtered = queue.filter(item => {
        const matchFilter =
            activeFilter === 'all' ||
            (activeFilter === 'pickup' && item.action_type === 'PICKUP_BOOKING') ||
            (activeFilter === 'return' && item.action_type === 'RETURN & FINE');

        // Search: kode_peminjaman, nama, npm, judul buku
        const q = searchQuery.toLowerCase().trim();
        const matchSearch =
            !q ||
            item.kode_peminjaman.toLowerCase().includes(q) ||
            item.user.nama.toLowerCase().includes(q) ||
            item.user.npm.includes(q) ||
            item.buku.judul.toLowerCase().includes(q);

        return matchFilter && matchSearch;
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    // Clamp page jika filtered berkurang setelah search/filter
    const safePage = Math.min(page, totalPages);
    const paginated = filtered.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

    const handleFilterChange = (f: StatusFilter) => { setActiveFilter(f); setPage(1); };
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchQuery(e.target.value); setPage(1); };

    const handlePickupSuccess = () => {
        setPickupItem(null);
        fetchQueue(); // refresh queue setelah pickup berhasil
    };

    return (
        <>
            {/* Pickup Modal */}
            {pickupItem && (
                <PickupModal
                    item={pickupItem}
                    onSuccess={handlePickupSuccess}
                    onClose={() => setPickupItem(null)}
                />
            )}

            <div className="p-8 bg-[#F8F5FF] min-h-screen font-sans">

                {/* ─── Header ──────────────────────────────────────────── */}
                <div className="flex justify-between items-end mb-6">
                    <div>
                        <p className="text-xs font-extrabold text-zinc-400 uppercase tracking-widest mb-1">
                            Dashboard &rsaquo; Counter Operations
                        </p>
                        <h1 className="text-3xl font-black text-zinc-900">Counter Operations</h1>
                        <p className="text-zinc-500 font-semibold mt-1 text-sm">
                            Real-time monitoring of live student transaction queue
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchQueue}
                            className="px-4 py-2.5 bg-white border border-zinc-200 text-zinc-700 font-extrabold rounded-xl flex items-center gap-2 hover:bg-zinc-50 transition-all shadow-sm text-sm"
                        >
                            <RefreshCcw size={14} /> Refresh
                        </button>
                        <button
                            onClick={() => router.push('/admin/counter/process')}
                            className="px-5 py-2.5 bg-[#161B85] text-white font-extrabold rounded-xl flex items-center gap-2 hover:bg-[#0E1154] transition-all shadow-md shadow-[#161B85]/20 text-sm"
                        >
                            Process Desk <ArrowRight size={16} />
                        </button>
                    </div>
                </div>

                {/* ─── Summary Stats ────────────────────────────────────── */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                    <StatCard
                        icon={<BookOpen size={18} className="text-[#161B85]" />}
                        label="Pending Pickup Today"
                        value={`${summary.pending_pickup} Books`}
                        accent="bg-[#F0F2FF]"
                    />
                    <StatCard
                        icon={<AlertTriangle size={18} className="text-amber-600" />}
                        label="Overdue Returns"
                        value={`${summary.overdue_returns}B`}
                        accent="bg-amber-50"
                    />
                    <StatCard
                        icon={<Banknote size={18} className="text-red-600" />}
                        label="Penalty Bill"
                        value={`Rp ${Number(summary.total_penalty).toLocaleString('id-ID')}`}
                        accent="bg-red-50"
                    />
                </div>

                {/* ─── Table Card ───────────────────────────────────────── */}
                <div className="bg-white rounded-3xl border border-zinc-200 shadow-sm overflow-hidden">

                    {/* Toolbar */}
                    <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-zinc-100 gap-4">
                        {/* Filter Tabs */}
                        <div className="flex items-center gap-1 bg-zinc-100 rounded-xl p-1">
                            {([
                                { key: 'all',    label: 'All Live Queue' },
                                { key: 'pickup', label: 'Ready for Pickup' },
                                { key: 'return', label: 'Overdue Returns' },
                            ] as { key: StatusFilter; label: string }[]).map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => handleFilterChange(tab.key)}
                                    className={`px-4 py-2 text-xs font-extrabold rounded-lg transition-all ${
                                        activeFilter === tab.key
                                            ? 'bg-white text-zinc-900 shadow-sm'
                                            : 'text-zinc-500 hover:text-zinc-700'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Search + Export */}
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                                <input
                                    type="text"
                                    placeholder="Search by code, name, or book title..."
                                    value={searchQuery}
                                    onChange={handleSearch}
                                    className="pl-9 pr-4 py-2.5 text-xs font-semibold text-zinc-600 bg-zinc-50 border border-zinc-200 rounded-xl focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30 w-72"
                                />
                            </div>
                            {/* <button className="p-2.5 bg-zinc-50 border border-zinc-200 rounded-xl hover:bg-zinc-100 transition-colors">
                                <Download size={14} className="text-zinc-500" />
                            </button> */}
                        </div>
                    </div>

                    {/* Table */}
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-zinc-100">
                                    {['Transaction ID', 'Student Details', 'Book Title', 'Action Type', 'Due Date', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-3.5 text-left text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {isLoading ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <tr key={i} className="border-b border-zinc-50">
                                            {Array.from({ length: 6 }).map((__, j) => (
                                                <td key={j} className="px-6 py-4">
                                                    <div className="h-4 bg-zinc-100 rounded-lg animate-pulse w-3/4" />
                                                </td>
                                            ))}
                                        </tr>
                                    ))
                                ) : paginated.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-16 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <Clock size={40} className="text-zinc-200" />
                                                <p className="text-sm font-extrabold text-zinc-400">
                                                    {searchQuery
                                                        ? `No results for "${searchQuery}"`
                                                        : 'No active transactions in queue.'}
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    paginated.map((item, idx) => (
                                        <tr
                                            key={item.id_peminjaman}
                                            className={`border-b border-zinc-50 hover:bg-zinc-50/60 transition-colors ${idx % 2 !== 0 ? 'bg-zinc-50/30' : ''}`}
                                        >
                                            {/* Transaction ID */}
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs font-extrabold text-[#161B85] bg-[#F0F2FF] px-2 py-1 rounded-lg">
                                                    {item.kode_peminjaman}
                                                </span>
                                            </td>

                                            {/* Student */}
                                            <td className="px-6 py-4">
                                                <p className="text-sm font-extrabold text-zinc-900">{item.user.nama}</p>
                                                <p className="text-[11px] font-bold text-zinc-400 font-mono">NIM: {item.user.npm}</p>
                                            </td>

                                            {/* Book */}
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-11 rounded-lg overflow-hidden shrink-0 bg-zinc-100 border border-zinc-200">
                                                        <img src={item.buku.cover_buku} alt="" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-extrabold text-zinc-900 max-w-[180px] line-clamp-2 leading-tight">
                                                            {item.buku.judul}
                                                        </p>
                                                        <p className="text-[10px] font-bold text-zinc-400 mt-0.5">{item.buku.isbn}</p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* Action Type */}
                                            <td className="px-6 py-4">
                                                <ActionBadge type={item.action_type} days={item.hari_terlambat} />
                                            </td>

                                            {/* Due Date */}
                                            <td className="px-6 py-4">
                                                <DeadlineCell
                                                    dateString={item.tanggal_kembali}
                                                    isOverdue={item.hari_terlambat > 0}
                                                />
                                            </td>

                                            {/* Actions — berbeda berdasarkan action_type */}
                                            <td className="px-6 py-4">
                                                {item.action_type === 'PICKUP_BOOKING' ? (
                                                    <button
                                                        onClick={() => setPickupItem(item)}
                                                        className="px-4 py-2 bg-[#161B85] hover:bg-[#0E1154] text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm shadow-[#161B85]/20 whitespace-nowrap"
                                                    >
                                                        <BookOpen size={12} /> Pickup
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => router.push('/admin/counter/process')}
                                                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold rounded-xl flex items-center gap-1.5 transition-colors shadow-sm whitespace-nowrap"
                                                    >
                                                        <ArrowRight size={12} /> Return
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination Footer */}
                    <div className="px-6 py-4 border-t border-zinc-100 flex items-center justify-between">
                        <p className="text-xs font-bold text-zinc-400">
                            Showing {filtered.length === 0 ? 0 : (safePage - 1) * PER_PAGE + 1}–{Math.min(safePage * PER_PAGE, filtered.length)} of {filtered.length} items
                        </p>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPage(p => Math.max(1, p - 1))}
                                disabled={safePage === 1}
                                className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronLeft size={14} className="text-zinc-600" />
                            </button>
                            <span className="text-xs font-extrabold text-zinc-600 px-1">{safePage} / {totalPages}</span>
                            <button
                                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                                disabled={safePage === totalPages}
                                className="p-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                <ChevronRight size={14} className="text-zinc-600" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}