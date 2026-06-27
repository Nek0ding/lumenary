'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { Search, Loader2, BookOpen, X, Star, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Buku {
    id_buku: string | number;
    judul: string;
    penulis: string;
    sinopsis?: string;
    cover_buku: string | null;
    isbn?: string;
    stok?: number;
    rating_rata: number | null;
    kategori?: { nama_kategori: string };
}

// Helper: handle semua fetch yang butuh auth.
// Jika response 401 dengan code TOKEN_EXPIRED atau sesi habis → redirect /login.
async function authFetch(
    url: string,
    options: RequestInit,
    token: string,
    onExpired: () => void
): Promise<Response | null> {
    const res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        }
    });

    if (res.status === 401) {
        localStorage.clear();
        onExpired();
        return null;
    }

    return res;
}

function CollectionContent() {
    const router = useRouter();

    const handleExpiredSession = useCallback(() => {
        router.replace('/login');
    }, [router]);

    // Data States
    const [books, setBooks] = useState<Buku[]>([]);
    const [loading, setLoading] = useState(true);

    // Search & Debounce States
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState('');

    // Modal & Book States
    const [selectedBook, setSelectedBook] = useState<Buku | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Reservation Process States
    const [isTnCOpen, setIsTnCOpen] = useState(false);
    const [agreedToTnC, setAgreedToTnC] = useState(false);
    const [isReserving, setIsReserving] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState<{ kode: string; judul: string } | null>(null);

    // Favorite States
    const [isFavorited, setIsFavorited] = useState(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    // --- GUARD: Cek token saat komponen mount ---
    // Jika tidak ada token sama sekali, langsung redirect (tanpa hit API)
    useEffect(() => {
        const token = localStorage.getItem('lumenary_token');
        if (!token) {
            router.replace('/login');
        }
    }, [router]);

    // --- DEBOUNCE EFFECT ---
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // --- FETCH DATA KOLEKSI FAVORIT ---
    const fetchCollection = useCallback(async () => {
        const token = localStorage.getItem('lumenary_token');
        if (!token) return;

        try {
            const res = await authFetch(
                '/api/user/favorit',
                { method: 'GET' },
                token,
                handleExpiredSession
            );
            if (!res) return; // Token expired, redirect sudah dipanggil

            const resData = await res.json();
            if (res.ok && resData.success) {
                setBooks(resData.data || []);
            } else {
                console.error("Gagal mengambil data:", resData.message);
            }
        } catch (err) {
            console.error('Terjadi kesalahan jaringan', err);
        } finally {
            setLoading(false);
        }
    }, [handleExpiredSession]);

    useEffect(() => {
        fetchCollection();
    }, [fetchCollection]);

    // --- MODAL TRIGGERS ---
    const openBookDetail = (book: Buku) => {
        setSelectedBook(book);
        setIsExpanded(false);
        setIsModalOpen(true);
        setIsFavorited(true); // Default true karena ini halaman My Collection
    };

    const closeBookDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedBook(null);
            setIsExpanded(false);
        }, 300);
    };

    const handleReserveClick = () => {
        setIsTnCOpen(true);
        setAgreedToTnC(false);
    };

    // --- TOGGLE FAVORITE HANDLER (UNFAVORITE dari halaman ini) ---
    const handleToggleFavorite = async () => {
        if (!selectedBook) return;
        const token = localStorage.getItem('lumenary_token');
        if (!token) return;

        setIsTogglingFavorite(true);
        try {
            const res = await authFetch(
                '/api/user/favorit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_buku: Number(selectedBook.id_buku) })
                },
                token,
                handleExpiredSession
            );
            if (!res) return;

            const data = await res.json();
            if (res.ok && data.success) {
                setIsFavorited(data.isFavorited);
                closeBookDetail();
                fetchCollection();
            } else {
                alert(data.message || "Gagal memperbarui status koleksi");
            }
        } catch (err) {
            alert("Terjadi masalah jaringan.");
        } finally {
            setIsTogglingFavorite(false);
        }
    };

    // --- EXECUTE RESERVATION API ---
    const submitReservation = async () => {
        if (!selectedBook || !agreedToTnC) return;
        const token = localStorage.getItem('lumenary_token');
        if (!token) return;

        setIsReserving(true);
        try {
            const res = await authFetch(
                '/api/peminjaman',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id_buku: Number(selectedBook.id_buku) })
                },
                token,
                handleExpiredSession
            );
            if (!res) return;

            const data = await res.json();
            if (res.ok && data.success) {
                setIsTnCOpen(false);
                closeBookDetail();
                setReservationSuccess({
                    kode: data.data.kode_peminjaman,
                    judul: selectedBook.judul
                });
            } else {
                if (data.code === 'INCOMPLETE_PROFILE') {
                    alert("Lengkapi alamat aktif dan nomor telepon di Settings sebelum meminjam buku!");
                    router.push('/settings');
                } else {
                    alert(`Gagal: ${data.message}`);
                }
            }
        } catch (e) {
            alert("Terjadi kesalahan koneksi ke server.");
        } finally {
            setIsReserving(false);
        }
    };

    const renderSynopsis = () => {
        if (!selectedBook) return null;
        const text = selectedBook.sinopsis || "Sinopsis tidak tersedia untuk buku ini.";
        const maxLength = 150;
        if (text.length <= maxLength) return text;
        return isExpanded ? (
            <>
                {text}
                <span onClick={() => setIsExpanded(false)} className="cursor-pointer font-extrabold ml-1 text-[#161B85] hover:underline">
                    (show less)
                </span>
            </>
        ) : (
            <>
                {text.substring(0, maxLength)}
                <span onClick={() => setIsExpanded(true)} className="cursor-pointer font-extrabold ml-1 text-[#111] hover:underline">
                    ...read more
                </span>
            </>
        );
    };

    // --- 1. MODAL BUKU UTAMA ---
    const renderModal = () => {
        if (!isModalOpen || !selectedBook) return null;
        const stockCount = selectedBook.stok ?? 0;

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99990] flex items-center justify-center p-4 transition-opacity duration-300">
                <div className="flex flex-col md:flex-row relative no-scrollbar p-6 md:p-8 gap-6 md:gap-8 bg-[#F8F5FF] w-full max-w-[850px] max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl">
                    <button onClick={closeBookDetail} className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform">
                        <X color="#333" className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-[280px] shrink-0 mx-auto">
                        <img
                            src={selectedBook.cover_buku || "https://placehold.co/300x450?text=No+Cover"}
                            alt={selectedBook.judul}
                            className="w-full aspect-[2/3] object-cover rounded-[16px] shadow-xl"
                        />
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
                            <div className={`w-3 h-3 rounded-full ${stockCount > 0 ? 'bg-[#00A651]' : 'bg-[#E11D48]'}`} />
                            <span className={`text-[13px] md:text-[15px] font-bold ${stockCount > 0 ? 'text-[#00A651]' : 'text-[#E11D48]'}`}>
                                {stockCount > 0 ? 'Available for Loan' : 'Out of Stock'}
                            </span>
                            <span className="text-[#A1A1AA] mx-1 hidden sm:block">|</span>
                            <span className="text-[13px] md:text-[15px] text-[#111] font-medium w-full sm:w-auto">
                                Stock leftovers: <b className="font-extrabold">{stockCount > 0 ? `${stockCount} Books` : '0 Books'}</b>
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                            <span className="bg-[#EADFFF] text-[#6B21A8] px-3 py-1 md:px-4 md:py-[6px] rounded-lg text-[12px] md:text-[14px] font-bold">
                                {selectedBook.kategori?.nama_kategori || 'General'}
                            </span>
                        </div>

                        <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#111] mb-2 md:mb-3">Synopsis</h3>
                        <p className="text-[14px] md:text-[16px] text-[#222] leading-[1.6] mb-5 md:mb-6 font-medium whitespace-pre-wrap">
                            {renderSynopsis()}
                        </p>

                        <div className="mt-auto flex flex-col gap-3">
                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={handleToggleFavorite}
                                    disabled={isTogglingFavorite}
                                    className={`px-4 py-3 md:py-4 rounded-xl border font-bold text-[14px] md:text-[16px] flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                                        ${isFavorited
                                            ? 'bg-red-50 border-red-200 text-red-600 hover:bg-red-100'
                                            : 'bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50'
                                        }`}
                                >
                                    <Heart size={20} className={isFavorited ? "fill-red-600 text-red-600" : "text-zinc-500"} />
                                    <span className="hidden sm:inline">{isFavorited ? 'Unfavorite' : 'Favorite'}</span>
                                </button>

                                <button
                                    onClick={handleReserveClick}
                                    disabled={stockCount <= 0}
                                    className="flex-1 py-3 md:py-4 rounded-xl text-[16px] md:text-[18px] font-extrabold border-none text-white shadow-md transition-transform hover:scale-[1.01] active:scale-95 disabled:hover:scale-100 disabled:active:scale-100"
                                    style={{
                                        background: 'linear-gradient(90deg, #161B85 0%, #0E1154 100%)',
                                        cursor: stockCount > 0 ? 'pointer' : 'not-allowed',
                                        opacity: stockCount > 0 ? 1 : 0.6,
                                    }}
                                >
                                    Book This Title
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // --- 2. MODAL TERMS & CONDITIONS ---
    const renderTnCModal = () => {
        if (!isTnCOpen) return null;
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99995] flex items-center justify-center p-4">
                <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[500px] shadow-2xl flex flex-col">
                    <div className="flex justify-between items-center mb-6 border-b border-zinc-100 pb-4">
                        <h3 className="text-[20px] md:text-[24px] font-extrabold text-[#111]">Terms & Conditions</h3>
                        <button onClick={() => setIsTnCOpen(false)} className="hover:scale-110 transition-transform">
                            <X color="#333" className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="text-[14px] md:text-[15px] text-zinc-600 space-y-4 mb-6 leading-relaxed">
                        <p>By proceeding with this reservation, you agree to the following Lumenary Library rules:</p>
                        <ul className="list-disc pl-5 space-y-2 font-medium">
                            <li><b className="text-[#E11D48]">24-Hour Pickup Rule:</b> You must collect the physical book from the campus library counter within 24 hours.</li>
                            <li><b className="text-[#161B85]">Maximum Loan Duration:</b> 7 working days from the time of pickup.</li>
                            <li><b className="text-[#161B85]">Penalties:</b> Failure to return the book on time will incur daily penalty charges.</li>
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

    // --- 3. MODAL SUCCESS KODE BOOKING ---
    const renderSuccessModal = () => {
        if (!reservationSuccess) return null;
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4">
                <div className="bg-white rounded-[32px] p-8 w-full max-w-[450px] shadow-2xl flex flex-col items-center text-center">
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

    const filteredBooks = books.filter(buku =>
        buku.judul.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        buku.penulis.toLowerCase().includes(debouncedQuery.toLowerCase())
    );

    return (
        <div className="w-full max-w-[1200px] mx-auto animate-in fade-in duration-300 font-['Plus_Jakarta_Sans',sans-serif]">
            {renderModal()}
            {renderTnCModal()}
            {renderSuccessModal()}

            <div className="flex flex-col mb-8 gap-2 mt-4">
                <h1 className="text-[28px] md:text-[32px] font-extrabold text-black leading-tight">My Collection</h1>
                <p className="text-[14px] md:text-[16px] text-zinc-500 font-medium">
                    Your curated reading shortlist. Click any title to check availability, manage status, or initiate quick booking.
                </p>
            </div>

            <div className="mb-8 relative flex items-center shadow-sm">
                <Search className="absolute left-4 text-zinc-400" size={20} />
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filter your favorites by title or author..."
                    className="w-full h-[52px] pl-12 pr-4 bg-white border border-zinc-200 text-black rounded-xl text-[15px] focus:outline-none focus:ring-1 focus:ring-[#161B85] focus:border-[#161B85] transition-all"
                />
            </div>

            {loading ? (
                <div className="flex flex-col justify-center items-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                    <p className="text-zinc-500 font-medium text-sm">Loading your collection...</p>
                </div>
            ) : filteredBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {filteredBooks.map((buku) => (
                        <div key={buku.id_buku} className="flex flex-col group cursor-pointer" onClick={() => openBookDetail(buku)}>
                            <div className="w-full aspect-[3/4] bg-zinc-100 rounded-[16px] mb-3 overflow-hidden shadow-sm group-hover:shadow-md transition-all border border-zinc-100 relative">
                                {buku.cover_buku ? (
                                    <img
                                        src={buku.cover_buku}
                                        alt={buku.judul}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-zinc-200">
                                        <BookOpen className="text-zinc-400 w-12 h-12" />
                                    </div>
                                )}
                            </div>
                            <h3 className="text-[16px] font-bold text-black leading-snug line-clamp-1 group-hover:text-[#161B85] transition-colors">
                                {buku.judul}
                            </h3>
                            <p className="text-[14px] text-zinc-600 line-clamp-1 mt-0.5">{buku.penulis}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-zinc-200">
                    <Heart className="text-zinc-300 w-16 h-16 mb-4" />
                    <h3 className="text-[20px] font-bold text-black mb-2">
                        {debouncedQuery ? "No matches found" : "Your collection is empty"}
                    </h3>
                    <p className="text-zinc-500 text-[15px]">
                        {debouncedQuery ? "Try a different title or author." : "Books you add to favorites will appear here."}
                    </p>
                    {!debouncedQuery && (
                        <button
                            onClick={() => router.push('/explore')}
                            className="mt-6 px-6 py-2.5 bg-[#161B85] text-white font-bold rounded-lg hover:bg-[#0E1154] transition-colors"
                        >
                            Explore Books
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default function CollectionPageWrapper() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F8FF]">
                <Loader2 className="w-10 h-10 text-[#161B85] animate-spin" />
            </div>
        }>
            <CollectionContent />
        </Suspense>
    );
}