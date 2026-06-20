'use client';

import React, { useEffect, useState } from 'react';
import { Star, X, Loader2, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Stats {
    booksHandled: number;
    wishlist: { total: number; available: number };
    reserved: number;
    totalPenalty: number;
}

interface CurrentReadingItem {
    id: number;
    title: string;
    author: string;
    category: string;
    rating: number;
    cover: string;
    dueDate: string;
    status: string;
    isbn: string;
    // Tambahan property untuk modal
    tanggal_pinjam?: string;
    denda?: number;
    kode_peminjaman?: string;
}

interface RecommendedItem {
    id: number;
    title: string;
    author: string;
    cover: string;
    category: string;
    rating: number;
    isbn: string;
    stok: number;
    sinopsis: string;
}

export default function DashboardPage() {
    const router = useRouter();
    const [userName, setUserName] = useState('User');
    const [stats, setStats] = useState<Stats>({
        booksHandled: 0,
        wishlist: { total: 0, available: 0 },
        reserved: 0,
        totalPenalty: 0
    });
    const [currentReading, setCurrentReading] = useState<CurrentReadingItem[]>([]);
    const [recommended, setRecommended] = useState<RecommendedItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State Pengaturan Modal
    const [selectedBook, setSelectedBook] = useState<any>(null); // Modal Booking (dari Recommended)
    const [selectedLoan, setSelectedLoan] = useState<CurrentReadingItem | null>(null); // Modal Peminjaman (dari Current Reading)
    const [isExpanded, setIsExpanded] = useState(false);

    // State Reservasi
    const [isTnCOpen, setIsTnCOpen] = useState(false);
    const [agreedToTnC, setAgreedToTnC] = useState(false);
    const [isReserving, setIsReserving] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState<{kode: string, judul: string} | null>(null);

    const fetchDashboardData = async () => {
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (token && userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.nama || 'User');

            try {
                const res = await fetch(`/api/user/dashboard?npm=${user.npm}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                const resData = await res.json();

                if (res.ok && resData.success) {
                    setStats(resData.data.stats);
                    setCurrentReading(resData.data.currentReading || []);
                    setRecommended(resData.data.recommended || []);
                } else {
                    if (res.status === 401 || res.status === 403) {
                        localStorage.removeItem('lumenary_token');
                        localStorage.removeItem('lumenary_user');
                        router.replace('/login');
                        return;
                    }
                    setError(resData.message || 'Gagal memuat data dashboard.');
                }
            } catch (err) {
                console.error('Error fetching dashboard:', err);
                setError('Terjadi kesalahan jaringan atau server.');
            } finally {
                setLoading(false);
            }
        } else {
            setLoading(false);
            router.replace('/login');
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [router]);

    // ==========================================
    // HELPER FUNCTIONS
    // ==========================================
    const formatDate = (dateString: string | undefined) => {
        if (!dateString) return '-';
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatRupiah = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    };

    const getStatusInfo = (dueDateString: string, status: string) => {
        if (status === 'dikembalikan') return { text: 'Returned', color: 'text-emerald-600 bg-emerald-50' };
        if (status === 'dibatalkan') return { text: 'Cancelled', color: 'text-zinc-600 bg-zinc-100' };
        if (status === 'direservasi') return { text: 'Reserved (Awaiting Pickup)', color: 'text-blue-700 bg-blue-50' };

        const due = new Date(dueDateString);
        const today = new Date();
        due.setHours(0, 0, 0, 0);
        today.setHours(0, 0, 0, 0);

        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (status === 'terlambat' || diffDays < 0) {
            return { text: `Overdue (${Math.abs(diffDays)} days)`, color: 'text-red-600 bg-red-50' };
        } else if (diffDays === 0) {
            return { text: 'Due Today', color: 'text-orange-600 bg-orange-50' };
        } else {
            return { text: `Active (${diffDays} days left)`, color: 'text-[#161B85] bg-indigo-50' };
        }
    };

    const getCategoryBadge = (category: string | undefined) => {
        if (!category) return 'bg-zinc-100 text-zinc-700';
        const cat = category.toLowerCase();
        if (cat.includes('psychology')) return 'bg-[#EADFFF] text-[#6B21A8]';
        if (cat.includes('technology') || cat.includes('science') || cat.includes('computer')) return 'bg-indigo-100 text-indigo-700';
        if (cat.includes('fiction')) return 'bg-purple-100 text-purple-600';
        return 'bg-zinc-100 text-zinc-700';
    };

    const renderSynopsis = () => {
        if (!selectedBook) return null;
        const text = selectedBook.sinopsis || "Synopsis is not available for this book.";
        const maxLength = 150;

        if (text.length <= maxLength) return text;
        if (isExpanded) {
            return (
                <>
                    {text}
                    <span onClick={() => setIsExpanded(false)} style={{ cursor: 'pointer', fontWeight: '800', marginLeft: '6px', color: '#6B21A8' }}>
                        (show less)
                    </span>
                </>
            );
        }
        return (
            <>
                {text.substring(0, maxLength)}
                <span onClick={() => setIsExpanded(true)} style={{ cursor: 'pointer', fontWeight: '800', color: '#111' }}>
                    ...read more
                </span>
            </>
        );
    };

    // ==========================================
    // API RESERVASI
    // ==========================================
    const submitReservation = async () => {
        if (!selectedBook || !agreedToTnC) return;
        setIsReserving(true);
        try {
            const token = localStorage.getItem('lumenary_token');
            const res = await fetch('/api/peminjaman', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id_buku: Number(selectedBook.id) }) // ID dari RecommendedItem
            });
            const data = await res.json();

            if (res.ok && data.success) {
                setIsTnCOpen(false);
                setSelectedBook(null); 
                setReservationSuccess({
                    kode: data.data.kode_peminjaman,
                    judul: selectedBook.judul
                });
                fetchDashboardData(); // Refresh Data Dashboard (stok berkurang, current reading nambah)
            } else {
                if (data.code === 'INCOMPLETE_PROFILE') {
                    alert("Attention: Please complete your active residential address and phone number in Settings before borrowing a book!");
                    router.push('/settings');
                } else {
                    alert(`Failed: ${data.message}`);
                }
            }
        } catch(e) {
            alert("An error occurred connecting to the server.");
        } finally {
            setIsReserving(false);
        }
    };

    // ==========================================
    // RENDER: MODAL TERMS & CONDITIONS
    // ==========================================
    const renderTnCModal = () => {
        if (!isTnCOpen) return null;
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99995] flex items-center justify-center p-4">
                <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[500px] shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                        <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#111]">Terms & Conditions</h3>
                        <button onClick={() => setIsTnCOpen(false)} className="hover:scale-110 transition-transform">
                            <X color="#333" className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="text-[14px] md:text-[15px] text-zinc-600 space-y-4 mb-6 leading-relaxed">
                        <p>By proceeding with this reservation, you agree to the following Lumenary Library rules:</p>
                        <ul className="list-disc pl-5 space-y-2 font-medium">
                            <li><b className="text-[#E11D48]">24-Hour Pickup Rule:</b> You must collect the physical book from the campus library counter within 24 hours. If not collected, the reservation will be automatically cancelled by the system.</li>
                            <li><b className="text-[#161B85]">Maximum Loan Duration:</b> The maximum holding period for any borrowed book is 7 working days from the time of pickup.</li>
                            <li><b className="text-[#161B85]">Penalties:</b> Failure to return the book on time will incur daily penalty charges and may restrict your account from future borrowings.</li>
                        </ul>
                    </div>

                    <label className="flex items-start gap-3 cursor-pointer mb-6 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                        <input 
                            type="checkbox" 
                            checked={agreedToTnC} 
                            onChange={(e) => setAgreedToTnC(e.target.checked)}
                            className="mt-1 w-5 h-5 accent-[#161B85] cursor-pointer"
                        />
                        <span className="text-[14px] font-bold text-[#111]">
                            I have read, understood, and agree to abide by the Library Terms and Conditions.
                        </span>
                    </label>

                    <button
                        onClick={submitReservation}
                        disabled={!agreedToTnC || isReserving}
                        className="w-full py-4 rounded-xl text-[16px] font-extrabold text-white transition-all flex items-center justify-center gap-2"
                        style={{
                            background: (!agreedToTnC || isReserving) ? '#E4E4E7' : 'linear-gradient(90deg, #161B85 0%, #0E1154 100%)',
                            color: (!agreedToTnC || isReserving) ? '#A1A1AA' : '#fff',
                            cursor: (!agreedToTnC || isReserving) ? 'not-allowed' : 'pointer',
                        }}
                    >
                        {isReserving ? <Loader2 size={20} className="animate-spin" /> : <BookOpen size={20} />}
                        {isReserving ? 'Processing...' : 'Confirm Reservation'}
                    </button>
                </div>
            </div>
        );
    };

    // ==========================================
    // RENDER: MODAL SUCCESS KODE BOOKING
    // ==========================================
    const renderSuccessModal = () => {
        if (!reservationSuccess) return null;
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
                <div className="bg-white rounded-[32px] p-8 w-full max-w-[450px] shadow-2xl flex flex-col items-center text-center animate-in zoom-in-90 duration-300">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6">
                        <CheckCircle2 size={40} />
                    </div>
                    
                    <h3 className="text-[24px] font-extrabold text-[#111] mb-2">Reservation Successful!</h3>
                    <p className="text-[15px] text-zinc-500 mb-6 font-medium">
                        Your request for <b className="text-[#111]">"{reservationSuccess.judul}"</b> has been secured.
                    </p>

                    <div className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl p-6 mb-6">
                        <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mb-2">Your Booking Code</p>
                        <p className="text-[40px] font-black text-[#161B85] tracking-widest leading-none">
                            {reservationSuccess.kode}
                        </p>
                    </div>

                    <div className="flex items-start gap-3 bg-blue-50 text-blue-800 p-4 rounded-xl text-left mb-8 border border-blue-100">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <p className="text-[13px] font-medium leading-relaxed">
                            Please show this Booking Code to the librarian at the front desk within <b>24 hours</b> to claim your physical book.
                        </p>
                    </div>

                    <button
                        onClick={() => setReservationSuccess(null)}
                        className="w-full py-4 rounded-xl text-[16px] font-extrabold text-white transition-all hover:-translate-y-0.5 shadow-lg"
                        style={{ background: '#161B85' }}
                    >
                        Got it, Thanks!
                    </button>
                </div>
            </div>
        );
    };

    // ==========================================
    // PENGKONDISIAN LOADING & ERROR UTAMA
    // ==========================================
    if (loading) {
        return (
            <div className="flex h-[70vh] w-full text-black items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#A347FF] animate-spin" />
                <span className="ml-3 font-medium text-zinc-600">Loading Dashboard...</span>
            </div>
        );
    } 
    if (error) return (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 text-red-500 font-semibold">
            <p>⚠️ {error}</p>
            <button onClick={() => window.location.reload()} className="text-[13px] bg-zinc-200 text-zinc-700 px-4 py-1.5 rounded-lg hover:bg-zinc-300">Try again</button>
        </div>
    );

    const isAnyModalOpen = selectedBook !== null || selectedLoan !== null || isTnCOpen || reservationSuccess !== null;

    return (
        <>
            {renderTnCModal()}
            {renderSuccessModal()}

            {/* ================= MODAL 1: DETAIL BUKU (DARI RECOMMENDED) ================= */}
            {selectedBook && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99990] flex items-center justify-center p-4">
                    <div className="flex flex-col md:flex-row relative no-scrollbar p-6 md:p-8 gap-6 md:gap-8 bg-[#F8F5FF] w-full max-w-[850px] max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl animate-in zoom-in-95 duration-200">
                        
                        <button onClick={() => { setSelectedBook(null); setIsExpanded(false); }} className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform">
                            <X color="#333" className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-[280px] shrink-0 mx-auto">
                            <img src={selectedBook.cover_buku || "https://placehold.co/300x450?text=No+Cover"} alt={selectedBook.judul} className="w-full aspect-[2/3] object-cover rounded-[16px] shadow-xl" />
                            <div className="flex gap-1 md:gap-2 mt-4 md:mt-5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-5 h-5 md:w-7 md:h-7" fill="#FFD700" color="#FFD700" />
                                ))}
                            </div>
                            <p className="text-[14px] md:text-[16px] font-semibold text-[#333] mt-3 md:mt-4 text-center">
                                ISBN : {selectedBook.isbn || 'Unknown'}
                            </p>
                        </div>

                        <div className="flex flex-col flex-1 pt-0 md:pt-2">
                            <h2 className="text-[24px] md:text-[32px] font-extrabold text-[#111] mb-1 md:mb-2 leading-[1.2]">{selectedBook.judul}</h2>
                            <p className="text-[16px] md:text-[20px] font-medium text-[#555] mb-3 md:mb-4">{selectedBook.penulis}</p>

                            <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                                <div className={`w-3 h-3 rounded-full ${selectedBook.stok > 0 ? 'bg-[#00A651]' : 'bg-[#E11D48]'}`} />
                                <span className={`text-[13px] md:text-[15px] font-bold ${selectedBook.stok > 0 ? 'text-[#00A651]' : 'text-[#E11D48]'}`}>
                                    {selectedBook.stok > 0 ? 'Available for Loan' : 'Out of Stock'}
                                </span>
                                <span className="text-[#A1A1AA] mx-1 hidden sm:block">|</span>
                                <span className="text-[13px] md:text-[15px] text-[#111] font-medium w-full sm:w-auto">
                                    Stock leftovers: <b className="font-extrabold">{selectedBook.stok > 0 ? `${selectedBook.stok} Books` : '0 Books'}</b>
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                                <span className={`text-[12px] md:text-[14px] font-bold px-3 py-1.5 md:px-4 md:py-2 rounded-lg w-fit ${getCategoryBadge(selectedBook.kategori?.nama_kategori || '')}`}>
                                    {selectedBook.kategori?.nama_kategori || 'General'}
                                </span>
                            </div>

                            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#111] mb-2 md:mb-3">Synopsis</h3>
                            <p className="text-[14px] md:text-[16px] text-[#222] leading-[1.6] mb-5 md:mb-6 font-medium whitespace-pre-wrap">
                                {renderSynopsis()}
                            </p>

                            <div className="mt-auto flex flex-col gap-3">
                                <button
                                    onClick={() => { setIsTnCOpen(true); setAgreedToTnC(false); }}
                                    disabled={selectedBook.stok <= 0}
                                    className="w-full py-3 md:py-4 rounded-xl text-[16px] md:text-[18px] font-extrabold border-none text-white shadow-md transition-transform hover:scale-[1.02] active:scale-95 disabled:hover:scale-100 disabled:active:scale-100"
                                    style={{
                                        background: 'linear-gradient(90deg, #161B85 0%, #0E1154 100%)',
                                        cursor: selectedBook.stok > 0 ? 'pointer' : 'not-allowed', 
                                        opacity: selectedBook.stok > 0 ? 1 : 0.6,
                                    }}
                                >
                                    Book This Title
                                </button>
                                <p className="text-center text-[12px] md:text-[14px] text-[#555] mt-1 font-medium">
                                    *Maximum loan period is 7 working days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= MODAL 2: DETAIL PEMINJAMAN (DARI CURRENT READING) ================= */}
            {selectedLoan && (
                <div className="fixed inset-0 z-[99990] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-[32px] w-full max-w-[600px] shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden flex flex-col">
                        
                        <button onClick={() => setSelectedLoan(null)} className="absolute top-6 right-6 p-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-600 rounded-full transition-colors z-10">
                            <X size={20} />
                        </button>

                        <div className="p-8 md:p-10 flex flex-col gap-8">
                            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start text-center sm:text-left">
                                <div className="w-[120px] aspect-[2/3] shrink-0 bg-zinc-100 border border-zinc-200 rounded-2xl overflow-hidden shadow-md">
                                    <img src={selectedLoan.cover || "/placeholder-cover.jpg"} alt={selectedLoan.title} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex flex-col flex-1 pt-2 w-full">
                                    <span className={`text-[12px] font-bold px-3 py-1.5 rounded-lg w-fit mx-auto sm:mx-0 mb-3 ${getCategoryBadge(selectedLoan.category || 'General')}`}>
                                        {selectedLoan.category || 'General'}
                                    </span>
                                    <h2 className="text-[24px] font-bold text-black leading-tight mb-1">{selectedLoan.title}</h2>
                                    <p className="text-[16px] text-zinc-500 font-medium">{selectedLoan.author}</p>
                                    
                                    {/* KODE BOOKING DI DALAM MODAL */}
                                    <div className="mt-4 bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between">
                                        <span className="text-[13px] font-bold text-blue-800 uppercase">Booking Code</span>
                                        <span className="text-[20px] font-black text-[#161B85] tracking-[0.2em]">{selectedLoan.kode_peminjaman || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full h-[1px] bg-zinc-100"></div>

                            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Date Borrowed</span>
                                    <span className="text-[16px] font-bold text-black">{formatDate(selectedLoan.tanggal_pinjam)}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Return Due Date</span>
                                    <span className="text-[16px] font-bold text-black">{formatDate(selectedLoan.dueDate)}</span>
                                </div>

                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Current Status</span>
                                    <span className={`text-[16px] font-bold ${getStatusInfo(selectedLoan.dueDate, selectedLoan.status).color.split(' ')[0]}`}>
                                        {getStatusInfo(selectedLoan.dueDate, selectedLoan.status).text}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-[12px] text-zinc-500 font-bold uppercase tracking-wider">Penalty Amount</span>
                                    <span className={`text-[16px] font-black ${selectedLoan.denda && selectedLoan.denda > 0 ? 'text-red-600' : 'text-emerald-600'}`}>
                                        {formatRupiah(selectedLoan.denda || 0)}
                                    </span>
                                </div>
                            </div>

                            <div className="pt-4 border-t border-zinc-100 mt-2">
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

            {/* ================= DASHBOARD MAIN CONTENT ================= */}
            <div className={`flex flex-col gap-8 w-full max-w-[1200px] mx-auto transition-all duration-300 ${isAnyModalOpen ? 'blur-sm pointer-events-none' : ''}`}>

                {/* Hero Banner & Stats Cards */}
                <div className="w-full h-[313px] rounded-[20px] overflow-hidden relative shadow-sm flex flex-col justify-center px-5 md:px-10 mt-6">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('/background-dashboard.jpg')` }} />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#161B85]/90 to-[#492073]/60 mix-blend-multiply" />
                    <div className="relative z-10 text-white max-w-[665px]">
                        <h1 className="text-[24px] md:text-[36px] font-bold leading-tight mb-3">
                            Welcome Back, {userName}! Ready to<br />Discover Your Next Reference?
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100">
                        <p className="text-[16px] text-zinc-500 font-medium mb-1">Books Handled</p>
                        <p className="text-[20px] font-bold text-black">{stats.booksHandled} Books</p>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[16px] text-zinc-500 font-medium mb-1">Your Wishlist</p>
                            <p className="text-[20px] font-bold text-black">{stats.wishlist.total} Saved</p>
                            <p className="text-[12px] text-[#A855F7] font-medium mt-1">{stats.wishlist.available} Available in library</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M19.2767 35.1867C19.4879 35.3363 19.7403 35.4166 19.9992 35.4166C20.258 35.4166 20.5104 35.3363 20.7217 35.1867L20 34.1667L20.7233 35.1867L20.7367 35.1767L20.7717 35.1517L20.905 35.055C21.0206 34.9717 21.1844 34.85 21.3967 34.69C23.8733 32.8207 26.2111 30.7742 28.3917 28.5667C30.305 26.62 32.25 24.345 33.7233 21.9317C35.19 19.5317 36.25 16.8917 36.25 14.245C36.25 11.1033 35.275 8.64834 33.55 6.98168C31.8333 5.32501 29.5167 4.58334 27.0833 4.58334C24.2083 4.58334 21.67 5.97168 20 8.11168C18.33 5.97168 15.79 4.58334 12.9167 4.58334C7.78333 4.58334 3.75 8.98168 3.75 14.245C3.75 16.8917 4.81167 19.53 6.27667 21.9317C7.75 24.345 9.695 26.62 11.6083 28.5683C13.933 30.9203 16.436 33.0889 19.095 35.055L19.2283 35.1517L19.2633 35.1767L19.2767 35.1867Z" fill="#A347FF" />
                        </svg>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[16px] text-zinc-500 font-medium mb-1">Ready for Pickup</p>
                            <p className="text-[20px] font-bold text-black">{stats.reserved} Reserved</p>
                            <p className="text-[12px] text-[#F43F5E] font-medium mt-1">Check reservation menu</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M9.16667 38.5C8.15833 38.5 7.29544 38.1413 6.578 37.4238C5.86056 36.7064 5.50122 35.8429 5.5 34.8333V9.16667C5.5 8.15833 5.85933 7.29544 6.578 6.578C7.29667 5.86056 8.15956 5.50122 9.16667 5.5H34.8333C35.8417 5.5 36.7052 5.85933 37.4238 6.578C38.1425 7.29667 38.5012 8.15956 38.5 9.16667V34.8333C38.5 35.8417 38.1413 36.7052 37.4238 37.4238C36.7064 38.1425 35.8429 38.5012 34.8333 38.5H9.16667ZM12.8333 31.1667H22V27.5H12.8333V31.1667ZM14.6667 23.8333L22 20.1667L29.3333 23.8333V9.16667H14.6667V23.8333Z" fill="#FF68A5" />
                        </svg>
                    </div>
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[16px] text-zinc-500 font-medium mb-1">Total Penalty</p>
                            <p className="text-[20px] font-bold text-black">
                                {stats.totalPenalty > 0
                                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(stats.totalPenalty)
                                    : 'Rp 0'}
                            </p>
                            <p className="text-[12px] text-[#3B82F6] font-medium mt-1">
                                {stats.totalPenalty > 0 ? 'Please settle bills' : 'No outstanding bills'}
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M22 29.3333C20.9917 29.3333 20.1288 28.9746 19.4113 28.2572C18.6939 27.5397 18.3346 26.6762 18.3333 25.6667C18.3321 24.6571 18.6914 23.7942 19.4113 23.078C20.1312 22.3618 20.9941 22.0024 22 22C23.0059 21.9976 23.8694 22.3569 24.5905 23.078C25.3116 23.7991 25.6703 24.662 25.6667 25.6667C25.663 26.6713 25.3043 27.5348 24.5905 28.2572C23.8767 28.9795 23.0132 29.3382 22 29.3333ZM13.5208 12.8333H30.4792L32.8167 8.15833C33.1222 7.54722 33.099 6.95139 32.747 6.37083C32.395 5.79028 31.8682 5.5 31.1667 5.5H12.8333C12.1306 5.5 11.6038 5.79028 11.253 6.37083C10.9022 6.95139 10.879 7.54722 11.1833 8.15833L13.5208 12.8333ZM15.4 38.5H28.6C31.35 38.5 33.6875 37.5454 35.6125 35.6363C37.5375 33.7272 38.5 31.3818 38.5 28.6C38.5 27.4389 38.3014 26.3083 37.9042 25.2083C37.5069 24.1083 36.9417 23.1153 36.2083 22.2292L31.4417 16.5H12.5583L7.79167 22.2292C7.05833 23.1153 6.49306 24.1083 6.09583 25.2083C5.69861 26.3083 5.5 27.4389 5.5 28.6C5.5 31.3806 6.45517 33.726 8.3655 35.6363C10.2758 37.5467 12.6207 38.5012 15.4 38.5Z" fill="#62AAFF" />
                        </svg>
                    </div>
                </div>

                {/* Recommended For You */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-[32px] font-bold text-black">Recommended For You</h2>
                    {recommended.length === 0 ? (
                        <p className="text-zinc-500 text-[14px]">Belum ada rekomendasi buku tersedia.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {recommended.map((book) => (
                                <div key={book.id} onClick={() => setSelectedBook({ ...book, cover_buku: book.cover, judul: book.title, penulis: book.author, kategori: { nama_kategori: book.category } })} className="flex flex-col gap-2 cursor-pointer group">
                                    <div className="w-full aspect-[2/3] bg-zinc-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow border border-zinc-100">
                                        <img src={book.cover || "/placeholder-cover.jpg"} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                    </div>
                                    <div>
                                        <p className="text-[20px] font-bold text-black line-clamp-1 group-hover:text-[#161B85] transition-colors">{book.title}</p>
                                        <p className="text-[16px] text-zinc-600 line-clamp-1">{book.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Current Reading */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-[32px] font-bold text-black">Current Reading</h2>
                    {currentReading.length === 0 ? (
                        <div className="w-full bg-white rounded-[24px] p-12 text-center text-zinc-500 font-medium shadow-sm border border-zinc-100 flex flex-col items-center gap-4 mb-10">
                            <BookOpen size={48} className="text-zinc-300" />
                            <p className="text-[16px]">Anda tidak sedang meminjam buku saat ini.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 mb-10">
                            {currentReading.map((item) => (
                                <div key={item.id} onClick={() => setSelectedLoan(item)} className="bg-white rounded-[24px] p-5 shadow-[0px_2px_8px_rgba(0,0,0,0.04)] border border-zinc-100 flex flex-col sm:flex-row gap-5 md:gap-8 hover:shadow-[0px_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all cursor-pointer">
                                    <div className="w-[100px] md:w-[130px] aspect-[2/3] bg-zinc-100 rounded-xl overflow-hidden shrink-0 mx-auto sm:mx-0 border border-zinc-100">
                                        <img src={item.cover || "/placeholder-cover.jpg"} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-1.5 flex-1 py-1">
                                        <div className="flex justify-between items-start gap-4">
                                            <h3 className="text-[20px] md:text-[24px] font-bold text-black leading-tight line-clamp-1 sm:line-clamp-2">{item.title}</h3>
                                            <span className={`shrink-0 text-[11px] md:text-[12px] font-bold px-3 py-1 rounded-md ${getStatusInfo(item.dueDate, item.status).color}`}>
                                                {getStatusInfo(item.dueDate, item.status).text}
                                            </span>
                                        </div>
                                        <p className="text-[14px] md:text-[16px] text-zinc-500 font-medium">{item.author}</p>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-2 mt-5 sm:mt-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-zinc-100">
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">Borrowed Date</span>
                                                <span className="text-[13px] md:text-[15px] font-bold text-black">{formatDate(item.tanggal_pinjam)}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">Return Due Date</span>
                                                <span className="text-[13px] md:text-[15px] font-bold text-black">{formatDate(item.dueDate)}</span>
                                            </div>
                                            <div className="flex flex-col gap-0.5 col-span-2 sm:col-span-1">
                                                <span className="text-[12px] md:text-[13px] text-zinc-500 font-medium">Booking Code</span>
                                                <span className="text-[13px] md:text-[16px] font-black tracking-widest text-[#161B85]">{item.kode_peminjaman || '-'}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </>
    );
}