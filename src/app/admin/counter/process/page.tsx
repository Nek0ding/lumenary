'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
    CheckCircle2, AlertTriangle, RefreshCcw, ScanLine,
    Clock, ShieldCheck, ArrowLeft, AlertOctagon, Package
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { authFetch } from '@/lib/authFetch';
import toast from 'react-hot-toast';

type ValidationState = 'idle' | 'checking' | 'valid' | 'invalid';
type DamageType = 'sobek' | 'noda' | 'rusak_total' | null;

// ─── Fine Confirmation Modal ───────────────────────────────────────────────────
function FineModal({
    kondisi,
    damageType,
    bukuJudul,
    isSubmitting,
    onConfirm,
    onCancel,
}: {
    kondisi: 'RUSAK' | 'HILANG';
    damageType: DamageType;
    bukuJudul: string;
    isSubmitting: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}) {
    const isLost  = kondisi === 'HILANG';
    const isHeavy = damageType === 'rusak_total';
    const isRed   = isLost || isHeavy;

    const fineAmount = isRed ? 'Rp 100.000' : 'Rp 30.000';
    const fineLabel  = isLost
        ? 'Lost Book Fine'
        : damageType === 'sobek'
        ? 'Torn Pages Fine'
        : damageType === 'noda'
        ? 'Stained Book Fine'
        : 'Total Damage Fine';

    const desc = isLost
        ? 'A flat fine of Rp 100.000 will be charged as book replacement cost.'
        : isHeavy
        ? 'Book is beyond repair. A flat fine of Rp 100.000 applies.'
        : 'A flat fine of Rp 30.000 will be charged for minor damage.';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-7 w-full max-w-md shadow-2xl border border-zinc-200 mx-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${isRed ? 'bg-red-50' : 'bg-amber-50'}`}>
                    <AlertOctagon size={24} className={isRed ? 'text-red-600' : 'text-amber-600'} />
                </div>
                <h3 className="text-lg font-black text-zinc-900 mb-1">Record {fineLabel}</h3>
                <p className="text-sm text-zinc-500 font-medium mb-5 leading-relaxed">{desc}</p>
                <div className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 mb-4">
                    <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-1">Book</p>
                    <p className="text-sm font-extrabold text-zinc-900 line-clamp-2">{bukuJudul}</p>
                </div>
                <div className={`p-4 rounded-xl border-2 flex justify-between items-center mb-6 ${isRed ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'}`}>
                    <span className={`text-sm font-extrabold ${isRed ? 'text-red-700' : 'text-amber-700'}`}>{fineLabel}</span>
                    <span className={`text-xl font-black ${isRed ? 'text-red-700' : 'text-amber-700'}`}>{fineAmount}</span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1 py-3 border-2 border-zinc-200 text-zinc-600 rounded-xl font-extrabold text-sm hover:bg-zinc-50 transition-colors disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isSubmitting}
                        className={`flex-1 py-3 text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors disabled:opacity-50 ${
                            isRed ? 'bg-red-600 hover:bg-red-700' : 'bg-amber-600 hover:bg-amber-700'
                        }`}
                    >
                        {isSubmitting ? 'Recording...' : 'Confirm Fine'}
                    </button>
                </div>
            </div>
        </div>
    );
}

function ValidationFeedback({ state, message }: { state: ValidationState; message: string }) {
    if (state === 'idle' || !message) return null;
    if (state === 'checking') return (
        <p className="text-[11px] font-bold text-zinc-400 flex items-center gap-1.5 mt-1.5">
            <span className="w-3 h-3 border-2 border-zinc-300 border-t-zinc-500 rounded-full animate-spin inline-block" />
            Validating...
        </p>
    );
    if (state === 'valid') return (
        <p className="text-[11px] font-extrabold text-emerald-600 flex items-center gap-1 mt-1.5">
            <CheckCircle2 size={11} /> {message}
        </p>
    );
    return (
        <p className="text-[11px] font-extrabold text-red-600 flex items-center gap-1 mt-1.5">
            <AlertOctagon size={11} /> {message}
        </p>
    );
}

// ─── Fine Breakdown Card ───────────────────────────────────────────────────────
function FineBreakdown({ returnData, physicalCondition, fineRecorded }: {
    returnData: any;
    physicalCondition: string;
    fineRecorded: boolean;
}) {
    const denda        = returnData?.denda;
    const hasOverdue   = denda?.status_bayar === 'belum_bayar';
    const DENDA_PER_HARI = 5000;
    const hariTerlambat  = denda?.hari_terlambat ?? 0;
    const totalDenda     = denda ? Number(denda.jumlah_denda) : 0;
    const dendaTerlambat = hariTerlambat * DENDA_PER_HARI;
    const dendaFisik     = fineRecorded && physicalCondition !== 'TERSEDIA'
        ? totalDenda - dendaTerlambat
        : 0;

    const fmt = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

    if (!hasOverdue && !fineRecorded) {
        return (
            <div className="flex flex-col items-center justify-center text-emerald-600 text-center h-full gap-1.5 p-4">
                <CheckCircle2 size={26} className="opacity-80" />
                <span className="text-[11px] font-extrabold uppercase tracking-widest">No Active Fines</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-2 p-4 h-full justify-center">
            {hariTerlambat > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest">
                        Overdue ({hariTerlambat}d × Rp 5.000)
                    </span>
                    <span className="text-xs font-black text-red-700">{fmt(dendaTerlambat)}</span>
                </div>
            )}
            {fineRecorded && physicalCondition !== 'TERSEDIA' && dendaFisik > 0 && (
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-extrabold text-red-500 uppercase tracking-widest">
                        {physicalCondition === 'HILANG' ? 'Lost Book' : 'Damage'} Fine
                    </span>
                    <span className="text-xs font-black text-red-700">{fmt(dendaFisik)}</span>
                </div>
            )}
            <div className="border-t border-red-200 mt-1 pt-1.5 flex justify-between items-center">
                <span className="text-[10px] font-extrabold text-red-600 uppercase tracking-widest">Total Bill</span>
                <span className="text-lg font-black text-red-700 leading-none">{fmt(totalDenda)}</span>
            </div>
        </div>
    );
}

export default function ProcessDesk() {
    const router = useRouter();

    // ── Pickup state ─────────────────────────────────────────────────────────────
    const [pickupCode, setPickupCode]             = useState('');
    const [pickupData, setPickupData]             = useState<any>(null);
    const [isCheckingPickup, setIsCheckingPickup] = useState(false);
    const [kodeBuku, setKodeBuku]                 = useState('');
    const [itemValidation, setItemValidation]     = useState<ValidationState>('idle');
    const [itemValidMsg, setItemValidMsg]         = useState('');
    const [isReleasing, setIsReleasing]           = useState(false);
    const kodeBukuRef                             = useRef<HTMLInputElement>(null);
    const debounceRef                             = useRef<NodeJS.Timeout | null>(null);

    // ── Return state ──────────────────────────────────────────────────────────────
    const [returnCode, setReturnCode]               = useState('');
    const [returnData, setReturnData]               = useState<any>(null);
    const [isCheckingReturn, setIsCheckingReturn]   = useState(false);
    const [physicalCondition, setPhysicalCondition] = useState('TERSEDIA');
    const [damageType, setDamageType]               = useState<DamageType>(null);
    const [showFineModal, setShowFineModal]         = useState(false);
    const [isRecordingFine, setIsRecordingFine]     = useState(false);
    const [fineRecorded, setFineRecorded]           = useState(false);
    const [isReturning, setIsReturning]             = useState(false);
    // Track apakah sedang revert denda (kembali ke Normal setelah fine dicatat)
    const [isRevertingFine, setIsRevertingFine]     = useState(false);

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

    // ── Reset helpers ─────────────────────────────────────────────────────────────
    const resetPickup = () => {
        setPickupData(null);
        setPickupCode('');
        setKodeBuku('');
        setItemValidation('idle');
        setItemValidMsg('');
    };

    const resetReturn = () => {
        setReturnData(null);
        setReturnCode('');
        setPhysicalCondition('TERSEDIA');
        setDamageType(null);
        setFineRecorded(false);
        setShowFineModal(false);
    };

    // ── Re-fetch return data TANPA menyentuh state kondisi (fix stale closure bug) ──
    // Fungsi ini dipanggil setelah fine dicatat, hanya update returnData dari server
    const refetchReturnData = async (kode: string) => {
        try {
            const res  = await authFetch(`/api/admin/counter/check?code=${encodeURIComponent(kode)}&type=return`);
            const json = await res.json();
            if (json.success) {
                setReturnData(json.data);
                // physicalCondition, damageType, fineRecorded TIDAK disentuh
            }
        } catch {
            // Gagal re-fetch tidak fatal, data lama masih tampil
        }
    };

    // ── Check data awal (scan baru) ───────────────────────────────────────────────
    const handleCheckData = async (code: string, type: 'pickup' | 'return') => {
        const trimmed = code.trim();
        if (!trimmed) return toast.error('Please enter a valid code.');

        type === 'pickup' ? setIsCheckingPickup(true) : setIsCheckingReturn(true);
        try {
            const res  = await authFetch(`/api/admin/counter/check?code=${encodeURIComponent(trimmed)}&type=${type}`);
            const json = await res.json();
            if (json.success) {
                if (type === 'pickup') {
                    setPickupData(json.data);
                    setKodeBuku('');
                    setItemValidation('idle');
                    setItemValidMsg('');
                    setTimeout(() => kodeBukuRef.current?.focus(), 100);
                } else {
                    // Ini scan loan BARU — reset semua state kondisi ke default
                    setReturnData(json.data);
                    setPhysicalCondition('TERSEDIA');
                    setDamageType(null);
                    setFineRecorded(false);
                    setShowFineModal(false);
                }
                toast.success('Data verified.');
            } else {
                toast.error(json.message ?? 'Verification failed.');
                type === 'pickup' ? setPickupData(null) : setReturnData(null);
            }
        } catch {
            toast.error('Failed to connect to server.');
        } finally {
            type === 'pickup' ? setIsCheckingPickup(false) : setIsCheckingReturn(false);
        }
    };

    // ── Book code validation ──────────────────────────────────────────────────────
    const validateKodeBuku = useCallback(async (kode: string) => {
        if (!kode.trim() || !pickupData) {
            setItemValidation('idle');
            setItemValidMsg('');
            return;
        }
        setItemValidation('checking');
        try {
            const res  = await authFetch(
                `/api/admin/counter/validate-item?kode_buku=${encodeURIComponent(kode.trim().toUpperCase())}&kode_peminjaman=${encodeURIComponent(pickupData.kode_peminjaman)}`
            );
            const json = await res.json();
            setItemValidation(json.valid ? 'valid' : 'invalid');
            setItemValidMsg(json.message);
        } catch {
            setItemValidation('invalid');
            setItemValidMsg('Failed to validate. Check connection.');
        }
    }, [pickupData]);

    const handleKodeBukuChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setKodeBuku(val);
        setItemValidation('idle');
        setItemValidMsg('');
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => validateKodeBuku(val), 400);
    };

    const handleKodeBukuKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (debounceRef.current) clearTimeout(debounceRef.current);
            validateKodeBuku(kodeBuku);
        }
    };

    useEffect(() => {
        return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
    }, []);

    // ── Pickup release ────────────────────────────────────────────────────────────
    const handleRelease = async () => {
        if (itemValidation !== 'valid') return;
        setIsReleasing(true);
        try {
            const res  = await authFetch('/api/admin/counter/pickup', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kode_peminjaman: pickupData.kode_peminjaman,
                    kode_buku:       kodeBuku.trim().toUpperCase(),
                }),
            });
            const json = await res.json();
            if (json.success) { toast.success(json.message); resetPickup(); }
            else toast.error(json.message ?? 'Handover failed.');
        } catch {
            toast.error('Process failed due to network error.');
        } finally { setIsReleasing(false); }
    };

    // ── Condition tab selection ───────────────────────────────────────────────────
    const handleConditionChange = async (cond: string) => {
        // Jika kembali ke NORMAL setelah fine sudah dicatat → hapus denda fisik di DB
        if (cond === 'TERSEDIA' && fineRecorded && returnData) {
            setIsRevertingFine(true);
            try {
                const res  = await authFetch('/api/admin/counter/fine/revert', {
                    method:  'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ kode_peminjaman: returnData.kode_peminjaman }),
                });
                const json = await res.json();
                if (json.success) {
                    toast.success('Physical fine removed.');
                    // Update data dari server setelah revert
                    await refetchReturnData(returnData.kode_peminjaman);
                } else {
                    toast.error(json.message ?? 'Failed to revert fine.');
                    return; // Batalkan perubahan tab bila revert gagal
                }
            } catch {
                toast.error('Failed to connect to server.');
                return;
            } finally {
                setIsRevertingFine(false);
            }
        }

        // Update tab kondisi — tab TETAP di posisi yang dipilih
        setPhysicalCondition(cond);
        setDamageType(null);
        setFineRecorded(false);
        setShowFineModal(false);
    };

    // ── Damage type sub-selection ─────────────────────────────────────────────────
    const handleDamageTypeSelect = (type: DamageType) => {
        // Jika sudah ada fine sebelumnya (misal ganti dari sobek ke noda), reset dulu
        setDamageType(type);
        setFineRecorded(false);
        setShowFineModal(true);
    };

    // ── Record fine ───────────────────────────────────────────────────────────────
    const handleRecordFine = async () => {
        if (!returnData) return;

        const keterangan = physicalCondition === 'HILANG' ? 'kehilangan_buku' : damageType;
        if (!keterangan) {
            toast.error('Please select a damage type first.');
            return;
        }

        setIsRecordingFine(true);
        try {
            const res  = await authFetch('/api/admin/counter/fine', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kode_peminjaman:  returnData.kode_peminjaman,
                    kondisi_fisik:    physicalCondition,
                    keterangan_denda: keterangan,
                    // Client TIDAK mengirim nominal denda — server yang menghitung
                }),
            });
            const json = await res.json();
            if (json.success) {
                toast.success(json.message);
                setShowFineModal(false);
                setFineRecorded(true);
                // Gunakan refetchReturnData (bukan handleCheckData) agar
                // physicalCondition & damageType TIDAK direset — ini fix utama stale closure bug
                await refetchReturnData(returnData.kode_peminjaman);
            } else {
                toast.error(json.message ?? 'Failed to record fine.');
            }
        } catch {
            toast.error('Failed to record fine. Check connection.');
        } finally { setIsRecordingFine(false); }
    };

    // ── Confirm return ────────────────────────────────────────────────────────────
    const handleReturn = async () => {
        if (['RUSAK', 'HILANG'].includes(physicalCondition) && !fineRecorded) {
            toast.error('Please record the fine before confirming return.');
            if (physicalCondition === 'HILANG') setShowFineModal(true);
            return;
        }
        setIsReturning(true);
        try {
            const res  = await authFetch('/api/admin/counter/return', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    kode_peminjaman: returnData.kode_peminjaman,
                    kondisi_fisik:   physicalCondition,
                }),
            });
            const json = await res.json();
            if (json.success) { toast.success(json.message); resetReturn(); }
            else toast.error(json.message ?? 'Return process failed.');
        } catch {
            toast.error('Process failed due to network error.');
        } finally { setIsReturning(false); }
    };

    // Tombol return diblokir bila kondisi RUSAK tapi belum pilih damage type,
    // atau RUSAK/HILANG tapi fine belum tercatat
    const returnBlocked =
        isRevertingFine ||
        (physicalCondition === 'RUSAK' && !damageType) ||
        (['RUSAK', 'HILANG'].includes(physicalCondition) && !fineRecorded);

    return (
        <>
            {showFineModal && returnData &&
             ['RUSAK', 'HILANG'].includes(physicalCondition) &&
             (physicalCondition === 'HILANG' || damageType) && (
                <FineModal
                    kondisi={physicalCondition as 'RUSAK' | 'HILANG'}
                    damageType={damageType}
                    bukuJudul={returnData.buku?.judul ?? '—'}
                    isSubmitting={isRecordingFine}
                    onConfirm={handleRecordFine}
                    onCancel={() => {
                        setShowFineModal(false);
                        // Tab TIDAK direset — hanya batalkan sub-pilihan damage type
                        if (physicalCondition === 'RUSAK') setDamageType(null);
                        // fineRecorded tetap false, admin perlu pilih ulang
                    }}
                />
            )}

            <div className="p-8 bg-[#F8F5FF] min-h-screen font-sans">
                <div className="flex justify-between items-end mb-8">
                    <div>
                        <button onClick={() => router.push('/admin/counter')} className="flex items-center gap-1.5 text-xs font-extrabold text-zinc-400 hover:text-[#161B85] mb-2 transition-colors">
                            <ArrowLeft size={13} /> Back to Queue
                        </button>
                        <h1 className="text-3xl font-extrabold text-zinc-900">Process Desk</h1>
                        <p className="text-zinc-500 font-semibold mt-1 text-sm">Enter booking code then scan or type the physical book code</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="px-5 py-2.5 bg-[#161B85] text-white font-extrabold rounded-xl flex items-center gap-2 hover:bg-[#0E1154] transition-all shadow-md">
                        <RefreshCcw size={16} /> Refresh Data
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* ── LEFT PANEL: Pickup ──────────────────────────────────────── */}
                    <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm flex flex-col gap-5">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-extrabold text-zinc-900 flex items-center gap-2">
                                <ScanLine className="text-[#161B85]" /> Booking Pickup
                            </h2>
                            <span className="px-3 py-1 bg-[#F0F2FF] border border-[#C7CBF9] text-[#161B85] text-[10px] font-extrabold rounded-lg tracking-wider">COUNTER 01</span>
                        </div>

                        <div>
                            <p className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">Step 1 — Booking Code</p>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter or scan booking code..."
                                    value={pickupCode}
                                    onChange={(e) => setPickupCode(e.target.value.toUpperCase())}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCheckData(pickupCode, 'pickup')}
                                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono font-bold text-zinc-900 text-sm focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/40 uppercase"
                                />
                                <button
                                    onClick={() => handleCheckData(pickupCode, 'pickup')}
                                    disabled={isCheckingPickup || !pickupCode.trim()}
                                    className="bg-zinc-900 text-white px-6 rounded-xl font-extrabold text-sm hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isCheckingPickup
                                        ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                                        : 'VERIFY'}
                                </button>
                            </div>
                        </div>

                        {pickupData ? (
                            <>
                                <div className="flex gap-4 p-4 bg-zinc-50 border border-zinc-200 rounded-2xl">
                                    <div className="w-16 h-22 rounded-xl overflow-hidden shrink-0 border border-zinc-200 bg-zinc-200" style={{ minHeight: '88px' }}>
                                        <img src={pickupData.buku.cover_buku} alt="Cover" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center min-w-0">
                                        <span className="text-[10px] font-extrabold text-[#161B85] uppercase tracking-widest mb-0.5">Active Reservation</span>
                                        <p className="text-sm font-extrabold text-zinc-900 leading-snug line-clamp-2">{pickupData.buku.judul}</p>
                                        <p className="text-[10px] font-bold text-zinc-400 mt-1">ISBN: {pickupData.buku.isbn}</p>
                                        <div className="flex items-center gap-3 mt-2">
                                            <div>
                                                <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">Student</p>
                                                <p className="text-xs font-extrabold text-zinc-900">{pickupData.user.nama}</p>
                                                <p className="text-[10px] font-bold text-zinc-500 font-mono">NIM: {pickupData.user.npm}</p>
                                            </div>
                                            <div className="ml-auto text-right">
                                                <p className="text-[10px] text-zinc-400 font-extrabold uppercase tracking-widest">Due Date</p>
                                                <p className="text-xs font-extrabold text-zinc-900">{formatDate(pickupData.tanggal_kembali)}</p>
                                                <p className="text-[10px] font-bold text-emerald-600 flex items-center gap-0.5 justify-end mt-0.5">
                                                    <CheckCircle2 size={10} /> Verified
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">Step 2 — Physical Book Code</p>
                                    <div className="relative">
                                        <Package size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                        <input
                                            ref={kodeBukuRef}
                                            type="text"
                                            placeholder="Type or scan physical book code..."
                                            value={kodeBuku}
                                            onChange={handleKodeBukuChange}
                                            onKeyDown={handleKodeBukuKeyDown}
                                            className={`w-full bg-zinc-50 border rounded-xl pl-10 pr-10 py-3 font-mono font-bold text-zinc-900 text-sm uppercase focus:outline-none focus:ring-1 transition-colors ${
                                                itemValidation === 'valid'
                                                    ? 'border-emerald-400 focus:border-emerald-500 focus:ring-emerald-400/30'
                                                    : itemValidation === 'invalid'
                                                    ? 'border-red-400 focus:border-red-500 focus:ring-red-400/30'
                                                    : 'border-zinc-200 focus:border-[#161B85] focus:ring-[#161B85]/20'
                                            }`}
                                        />
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2">
                                            {itemValidation === 'checking' && <span className="w-4 h-4 border-2 border-zinc-300 border-t-[#161B85] rounded-full animate-spin inline-block" />}
                                            {itemValidation === 'valid'    && <CheckCircle2 size={16} className="text-emerald-500" />}
                                            {itemValidation === 'invalid'  && <AlertOctagon  size={16} className="text-red-500" />}
                                        </div>
                                    </div>
                                    <ValidationFeedback state={itemValidation} message={itemValidMsg} />
                                    {itemValidation === 'idle' && !kodeBuku && (
                                        <p className="text-[11px] text-zinc-400 font-medium mt-1.5">Input must match an available copy of the reserved title.</p>
                                    )}
                                </div>

                                <button
                                    onClick={handleRelease}
                                    disabled={itemValidation !== 'valid' || isReleasing}
                                    className="w-full bg-[#161B85] hover:bg-[#0E1154] disabled:opacity-40 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#161B85]/20"
                                >
                                    {isReleasing
                                        ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing...</>
                                        : <><ShieldCheck size={18} /> Confirm Handover</>}
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                                <ScanLine size={40} className="mb-3 text-zinc-300" />
                                <p className="text-sm font-extrabold text-zinc-400">Waiting for booking code...</p>
                                <p className="text-[11px] text-zinc-300 font-medium mt-1">Scan or type the student&apos;s reservation code above</p>
                            </div>
                        )}
                    </div>

                    {/* ── RIGHT PANEL: Returns ─────────────────────────────────────── */}
                    <div className="bg-white rounded-3xl p-6 border border-zinc-200 shadow-sm flex flex-col gap-5">
                        <h2 className="text-lg font-extrabold text-zinc-900 flex items-center gap-2">
                            <RefreshCcw className="text-[#161B85]" /> Returns & Fine Monitoring
                        </h2>

                        <div>
                            <p className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-widest mb-2">Loan Identification</p>
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter or scan booking code..."
                                    value={returnCode}
                                    onChange={(e) => setReturnCode(e.target.value.toUpperCase())}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCheckData(returnCode, 'return')}
                                    className="flex-1 bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-3 font-mono font-bold text-zinc-900 text-sm focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/40 uppercase"
                                />
                                <button
                                    onClick={() => handleCheckData(returnCode, 'return')}
                                    disabled={isCheckingReturn || !returnCode.trim()}
                                    className="bg-[#161B85] text-white px-8 rounded-xl font-extrabold text-sm hover:bg-[#0E1154] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isCheckingReturn
                                        ? <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin inline-block" />
                                        : 'CHECK'}
                                </button>
                            </div>
                        </div>

                        {returnData ? (
                            <>
                                <div className="grid grid-cols-2 gap-4">

                                    {/* ── Kondisi Fisik ─────────────────────────────── */}
                                    <div className="flex flex-col gap-2">
                                        <p className="text-[11px] font-extrabold text-zinc-500 uppercase tracking-widest">Physical Condition</p>

                                        {/* Tab utama */}
                                        <div className="flex p-1 bg-zinc-100/80 border border-zinc-200 rounded-xl">
                                            {(['TERSEDIA', 'RUSAK', 'HILANG'] as const).map((cond) => {
                                                const isActive    = physicalCondition === cond;
                                                const label       = { TERSEDIA: 'NORMAL', RUSAK: 'DAMAGED', HILANG: 'LOST' }[cond];
                                                const activeClass = {
                                                    TERSEDIA: 'bg-white text-emerald-700 shadow-sm border border-emerald-100',
                                                    RUSAK:    'bg-white text-amber-600 shadow-sm border border-amber-100',
                                                    HILANG:   'bg-white text-red-600 shadow-sm border border-red-100',
                                                }[cond];
                                                return (
                                                    <button
                                                        key={cond}
                                                        onClick={() => handleConditionChange(cond)}
                                                        disabled={isRevertingFine}
                                                        className={`flex-1 py-2 text-[10px] uppercase tracking-wider font-extrabold rounded-lg transition-all disabled:opacity-50 disabled:cursor-wait ${
                                                            isActive ? activeClass : 'text-zinc-500 hover:text-zinc-700'
                                                        }`}
                                                    >
                                                        {isRevertingFine && cond === 'TERSEDIA' ? '...' : label}
                                                    </button>
                                                );
                                            })}
                                        </div>

                                        {/* Sub-pilihan damage type */}
                                        {physicalCondition === 'RUSAK' && (
                                            <div className="flex flex-col gap-1">
                                                <p className="text-[9px] font-extrabold text-zinc-400 uppercase tracking-widest">Select damage type</p>
                                                <div className="flex gap-1.5">
                                                    {([
                                                        { type: 'sobek'       as DamageType, label: 'Torn',   fine: 'Rp 30k',  isRed: false },
                                                        { type: 'noda'        as DamageType, label: 'Stained',fine: 'Rp 30k',  isRed: false },
                                                        { type: 'rusak_total' as DamageType, label: 'Total',  fine: 'Rp 100k', isRed: true  },
                                                    ]).map(({ type, label, fine, isRed }) => {
                                                        const isSelected = damageType === type;
                                                        return (
                                                            <button
                                                                key={type}
                                                                onClick={() => handleDamageTypeSelect(type)}
                                                                className={`flex-1 py-2 px-1 border-2 rounded-xl text-center transition-all ${
                                                                    isSelected
                                                                        ? isRed
                                                                            ? 'bg-red-50 border-red-300 text-red-700'
                                                                            : 'bg-amber-50 border-amber-300 text-amber-700'
                                                                        : 'border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700'
                                                                }`}
                                                            >
                                                                <p className="text-[10px] font-extrabold uppercase tracking-wide">{label}</p>
                                                                <p className="text-[9px] font-bold opacity-60 mt-0.5">{fine}</p>
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        )}

                                        {/* Status fine */}
                                        {physicalCondition !== 'TERSEDIA' && (
                                            <div className="flex flex-col gap-1">
                                                <div className={`flex items-center gap-1 text-[10px] font-extrabold ${fineRecorded ? 'text-emerald-600' : 'text-amber-600'}`}>
                                                    {fineRecorded
                                                        ? <><CheckCircle2 size={10} /> Fine recorded.</>
                                                        : physicalCondition === 'RUSAK' && !damageType
                                                        ? <><AlertTriangle size={10} /> Select damage type above.</>
                                                        : <><AlertTriangle size={10} /> Fine not recorded yet.</>
                                                    }
                                                </div>
                                                {!fineRecorded && physicalCondition === 'HILANG' && (
                                                    <button
                                                        onClick={() => setShowFineModal(true)}
                                                        className="w-full py-2 text-[11px] font-extrabold rounded-xl border-2 transition-colors border-red-300 text-red-700 bg-red-50 hover:bg-red-100"
                                                    >
                                                        Record Lost Fine →
                                                    </button>
                                                )}
                                                {!fineRecorded && physicalCondition === 'RUSAK' && damageType && (
                                                    <button
                                                        onClick={() => setShowFineModal(true)}
                                                        className="w-full py-2 text-[11px] font-extrabold rounded-xl border-2 transition-colors border-amber-300 text-amber-700 bg-amber-50 hover:bg-amber-100"
                                                    >
                                                        Record Damage Fine →
                                                    </button>
                                                )}
                                            </div>
                                        )}

                                        <p className="text-[10px] text-zinc-400 font-medium leading-relaxed">
                                            {physicalCondition === 'TERSEDIA'
                                                ? 'No defects. Ready for next borrower.'
                                                : 'Fine must be recorded before confirming return.'}
                                        </p>
                                    </div>

                                    {/* ── Fine Breakdown Card ────────────────────────── */}
                                    <div className={`rounded-xl border-2 relative overflow-hidden transition-colors min-h-[140px] ${
                                        returnData.denda?.status_bayar === 'belum_bayar' || (fineRecorded && physicalCondition !== 'TERSEDIA')
                                            ? 'bg-red-50 border-red-200'
                                            : 'bg-emerald-50 border-emerald-200'
                                    }`}>
                                        {(returnData.denda?.status_bayar === 'belum_bayar' || (fineRecorded && physicalCondition !== 'TERSEDIA')) && (
                                            <AlertTriangle size={70} className="absolute -right-3 -bottom-3 text-red-400 opacity-10 pointer-events-none" />
                                        )}
                                        <FineBreakdown
                                            returnData={returnData}
                                            physicalCondition={physicalCondition}
                                            fineRecorded={fineRecorded}
                                        />
                                    </div>
                                </div>

                                {/* Loan detail */}
                                <div className="p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                                    <p className="text-[10px] font-extrabold text-zinc-400 uppercase tracking-widest mb-3">Loan Details</p>
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-[10px] font-bold text-zinc-400">Date Out</p>
                                            <p className="text-sm font-extrabold text-zinc-900">{formatDate(returnData.tanggal_pinjam)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-[10px] font-bold text-zinc-400">Due Date</p>
                                            <p className="text-sm font-extrabold text-zinc-900">{formatDate(returnData.tanggal_kembali)}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={handleReturn}
                                    disabled={isReturning || returnBlocked}
                                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-colors shadow-lg shadow-emerald-600/20"
                                >
                                    {isReturning
                                        ? <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Processing...</>
                                        : <><CheckCircle2 size={16} /> Confirm Return & Settle Fine</>}
                                </button>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center min-h-[220px] border-2 border-dashed border-zinc-200 rounded-2xl bg-zinc-50/50">
                                <Clock size={40} className="mb-3 text-zinc-300" />
                                <p className="text-sm font-extrabold text-zinc-400">Waiting for booking code...</p>
                                <p className="text-[11px] text-zinc-300 font-medium mt-1">Scan or type the student&apos;s loan code above</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}