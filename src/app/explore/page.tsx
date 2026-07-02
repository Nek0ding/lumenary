'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Loader2, BookOpen, Settings, LogOut, X, Star, CheckCircle2, AlertCircle, Heart, Menu, LayoutDashboard, History, Receipt, Library } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-hot-toast';

import Footer from '@/components/footer';

// Inisialisasi Supabase untuk validasi token
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

interface Buku {
    id_buku: string | number;
    judul: string;
    penulis: string;
    sinopsis?: string;
    cover_buku: string | null;
    isbn?: string;
    stok?: number;
    stok_tersedia?: number;
    rating_rata: number | null;
    kategori?: { nama_kategori: string };
}

function ExploreContent() {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Data States
    const [books, setBooks] = useState<Buku[]>([]);
    const [loading, setLoading] = useState(true);
    const [authStatus, setAuthStatus] = useState<'checking' | 'logged-in' | 'guest'>('checking');
    const [userProfile, setUserProfile] = useState({ name: 'User', npm: '' });

    // Search States
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Modal & Book States
    const [selectedBook, setSelectedBook] = useState<Buku | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    // Reservation Process States
    const [isTnCOpen, setIsTnCOpen] = useState(false);
    const [agreedToTnC, setAgreedToTnC] = useState(false);
    const [isReserving, setIsReserving] = useState(false);
    const [reservationSuccess, setReservationSuccess] = useState<{ kode: string, judul: string } | null>(null);

    // --- FAVORITE STATES ---
    const [isFavorited, setIsFavorited] = useState(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

    // --- MOBILE MENU STATE ---
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- FETCH BUKU ---
    const fetchBooks = async (query = '') => {
        setIsSearching(true);
        try {
            const url = query ? `/api/buku/search?search=${encodeURIComponent(query)}` : '/api/buku/search';
            const res = await fetch(url, { method: 'GET' });
            const resData = await res.json();
            if (res.ok && resData.success) {
                setBooks(resData.data);
            }
        } catch (err) {
            console.error('Gagal mengambil data buku', err);
        } finally {
            setIsSearching(false);
            setLoading(false);
        }
    };

    // --- INIT USE EFFECT (KEAMANAN TOKEN EXPIRED) ---
    useEffect(() => {
        const verifyAuthAndFetch = async () => {
            const token = localStorage.getItem('lumenary_token');
            const userStr = localStorage.getItem('lumenary_user');

            if (token && userStr) {
                try {
                    const { data: { user }, error } = await supabase.auth.getUser(token);

                    if (error || !user) {
                        localStorage.removeItem('lumenary_token');
                        localStorage.removeItem('lumenary_user');
                        setAuthStatus('guest');
                    } else {
                        const parsedUser = JSON.parse(userStr);
                        setUserProfile({ name: parsedUser.nama || 'User', npm: parsedUser.npm });
                        setAuthStatus('logged-in');
                    }
                } catch {
                    setAuthStatus('guest');
                }
            } else {
                setAuthStatus('guest');
            }

            const queryFromUrl = searchParams.get('q');
            if (queryFromUrl) {
                setSearchQuery(queryFromUrl);
                fetchBooks(queryFromUrl);
            } else {
                fetchBooks();
            }
        };

        verifyAuthAndFetch();
    }, [searchParams]);

    // --- HANDLERS ---
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
        } else {
            router.push(`/explore`);
        }
        fetchBooks(searchQuery);
    };

    const handleLogout = () => {
        localStorage.removeItem('lumenary_token');
        localStorage.removeItem('lumenary_user');
        router.push('/login');
    };

    // --- MODAL TRIGGERS & FAVORITE CHECK ---
    const openBookDetail = async (book: Buku) => {
        setSelectedBook(book);
        setIsExpanded(false);
        setIsModalOpen(true);
        setIsFavorited(false);

        const token = localStorage.getItem('lumenary_token');
        if (token && authStatus === 'logged-in') {
            try {
                const res = await fetch(`/api/user/favorit?id_buku=${book.id_buku}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    setIsFavorited(data.isFavorited);
                }
            } catch (err) {
                console.error("Gagal memuat status favorit awal", err);
            }
        }
    };

    const closeBookDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedBook(null);
            setIsExpanded(false);
            setIsFavorited(false);
        }, 300);
    };

    const handleReserveClick = () => {
        if (authStatus !== 'logged-in') {
            router.push('/login');
        } else {
            setIsTnCOpen(true);
            setAgreedToTnC(false);
        }
    };

    // --- TOGGLE FAVORITE HANDLER ---
    const handleToggleFavorite = async () => {
        if (!selectedBook) return;
        const token = localStorage.getItem('lumenary_token');
        if (!token || authStatus !== 'logged-in') {
            toast.error("Please login first to favorite this book");
            router.push('/login');
            return;
        }

        setIsTogglingFavorite(true);
        try {
            const res = await fetch('/api/user/favorit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id_buku: Number(selectedBook.id_buku) })
            });
            const data = await res.json();
            if (res.ok && data.success) {
                setIsFavorited(data.isFavorited);
            } else {
                alert(data.message || "Gagal memperbarui status favorit");
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

        setIsReserving(true);
        const toastId = toast.loading('Processing your reservation...');

        try {
            const token = localStorage.getItem('lumenary_token');
            const res = await fetch('/api/peminjaman', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ id_buku: Number(selectedBook.id_buku) })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setIsTnCOpen(false);
                closeBookDetail();
                setReservationSuccess({
                    kode: data.data.kode_peminjaman,
                    judul: selectedBook.judul
                });
                fetchBooks(searchQuery);
                toast.success('Reservation successfully created!', { id: toastId });
            }
            else {
                if (data.code === 'INCOMPLETE_PROFILE') {
                    toast.error(data.message || "Please complete your profile before borrowing.", { id: toastId });
                    setTimeout(() => {
                        router.push('/settings');
                    }, 1500);
                } else if (res.status === 403) {
                    toast.error(data.message || "You are restricted from borrowing.", { id: toastId });

                    if (data.message.toLowerCase().includes("penalty")) {
                        setTimeout(() => router.push('/dashboard/penalty'), 2000);
                    }
                } else {
                    toast.error(data.message || 'Reservation failed.', { id: toastId });
                }
            }
        } catch (e) {
            toast.error("An error occurred connecting to the server.", { id: toastId });
        } finally {
            setIsReserving(false);
        }
    };

    const renderSynopsis = () => {
        if (!selectedBook) return null;
        const text = selectedBook.sinopsis || "Sinopsis tidak tersedia untuk buku ini.";
        const maxLength = 150;

        if (text.length <= maxLength) return text;

        if (isExpanded) {
            return (
                <>
                    {text}
                    <span onClick={() => setIsExpanded(false)} className="cursor-pointer font-extrabold ml-1 text-[#161B85] hover:underline">
                        (show less)
                    </span>
                </>
            );
        }
        return (
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
        const stockCount = selectedBook.stok ?? selectedBook.stok_tersedia ?? 0;

        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99990] flex items-center justify-center p-4 transition-opacity duration-300">
                <div className="flex flex-col md:flex-row relative no-scrollbar p-6 md:p-8 gap-6 md:gap-8 bg-[#F8F5FF] w-full max-w-[850px] max-h-[90vh] overflow-y-auto rounded-[24px] shadow-2xl transform transition-transform duration-300 scale-100">
                    <button onClick={closeBookDetail} className="absolute top-4 right-4 z-10 hover:scale-110 transition-transform">
                        <X color="#333" className="w-6 h-6 md:w-7 md:h-7" />
                    </button>

                    <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-[280px] shrink-0 mx-auto">
                        <img src={selectedBook.cover_buku || "https://placehold.co/300x450?text=No+Cover"} alt={selectedBook.judul} className="w-full aspect-[2/3] object-cover rounded-[16px] shadow-xl" />
                        
                        {/* IMPLEMENTASI RATING BINTANG DINAMIS */}
                        <div className="flex items-center gap-1 md:gap-2 mt-4 md:mt-5">
                            {[1, 2, 3, 4, 5].map((star) => {
                                const rating = selectedBook.rating_rata ?? 0;
                                const isFilled = star <= Math.round(rating);
                                return (
                                    <Star 
                                        key={star} 
                                        className="w-5 h-5 md:w-7 md:h-7 transition-colors duration-200" 
                                        fill={isFilled ? "#FFD700" : "transparent"} 
                                        color={isFilled ? "#FFD700" : "#CBD5E1"} 
                                    />
                                );
                            })}
                            {selectedBook.rating_rata && (
                                <span className="text-sm md:text-base font-black text-zinc-700 ml-1">
                                    ({Number(selectedBook.rating_rata).toFixed(1)})
                                </span>
                            )}
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
                                {authStatus === 'logged-in' && (
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
                                )}

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
                                    {authStatus === 'logged-in' ? 'Book This Title' : 'Sign In to Book'}
                                </button>
                            </div>
                            <p className="text-center text-[12px] md:text-[14px] text-[#555] mt-1 font-medium">
                                *Maximum loan period is 7 working days
                            </p>
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99995] flex items-center justify-center p-4 transition-opacity duration-300">
                <div className="bg-white rounded-[24px] p-6 md:p-8 w-full max-w-[500px] shadow-2xl flex flex-col transform transition-transform duration-300 scale-100">
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

    // --- 3. MODAL SUCCESS KODE BOOKING ---
    const renderSuccessModal = () => {
        if (!reservationSuccess) return null;
        return (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[99999] flex items-center justify-center p-4 transition-opacity duration-300">
                <div className="bg-white rounded-[32px] p-8 w-full max-w-[450px] shadow-2xl flex flex-col items-center text-center transform transition-transform duration-300 scale-100">
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

    if (authStatus === 'checking') {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F8FF]">
                <Loader2 className="w-10 h-10 text-[#161B85] animate-spin" />
            </div>
        );
    }

    const renderPageContent = () => (
        <div className="w-full max-w-[1000px] mx-auto transition-opacity duration-500 opacity-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 mt-4">
                <div>
                    <h1 className="text-[28px] md:text-[32px] font-extrabold text-black leading-tight">
                        Book Catalog
                    </h1>
                    <p className="text-[14px] text-zinc-500 font-medium mt-1">
                        Manage book lists, active reservations, and track your reading preferences in one place.
                    </p>
                </div>

                {authStatus === 'logged-in' && (
                    <Link href="/dashboard/collection" className="bg-[#161B85] hover:bg-[#0E1154] text-white px-6 py-2.5 rounded-full text-[14px] font-bold transition-colors shadow-sm whitespace-nowrap text-center">
                        My Collection
                    </Link>
                )}
            </div>

            {authStatus === 'guest' && (
                <form onSubmit={handleSearchSubmit} className="mb-8 relative flex items-center shadow-sm">
                    <Search className="absolute left-4 text-zinc-400" size={20} />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search for a book title, author, or ISBN..."
                        className="w-full h-[52px] pl-12 pr-32 bg-white border border-zinc-200 text-black rounded-xl text-[15px] focus:outline-none focus:ring-1 focus:ring-[#161B85] focus:border-[#161B85] transition-all"
                    />
                    <button type="submit" className="absolute right-2 bg-[#161B85] hover:bg-[#0E1154] text-white px-6 py-2 rounded-lg font-bold transition-colors">
                        Search
                    </button>
                </form>
            )}

            {isSearching || loading ? (
                <div className="flex flex-col justify-center items-center py-20 gap-4">
                    <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                    <p className="text-zinc-500 font-medium text-sm">Searching catalog...</p>
                </div>
            ) : books.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
                    {books.map((buku) => (
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
                            <p className="text-[14px] text-zinc-600 line-clamp-1 mt-0.5">
                                {buku.penulis}
                            </p>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-2xl border border-zinc-200">
                    <Search className="text-zinc-300 w-12 h-12 mb-4" />
                    <h3 className="text-[18px] font-bold text-black mb-1">No books found</h3>
                    <p className="text-zinc-500 text-[14px]">We couldn't find any books matching your search.</p>
                </div>
            )}
        </div>
    );

    const isAnyModalOpen = isModalOpen || isTnCOpen || reservationSuccess !== null;

    if (authStatus === 'logged-in') {
        return (
            <>
                {renderModal()}
                {renderTnCModal()}
                {renderSuccessModal()}

                {isMobileMenuOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />
                )}

                <div className={`flex h-screen w-full bg-[#F8F8FF] font-['Plus_Jakarta_Sans',sans-serif] ${isAnyModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300 overflow-hidden`}>
                    <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                        <div>
                            <div className="flex items-center justify-between px-8 py-8">
                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                                    <img src="/logo.png" alt="Lumenary" className="w-8 h-8" />
                                    <div className="flex flex-col gap-[2px]">
                                        <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                                        <span className="text-[#492073] text-[7px] md:text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                                    </div>
                                </div>
                                <button className="md:hidden text-zinc-500 hover:text-[#161B85]" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="px-6 mt-4">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
                                <nav className="flex flex-col gap-2">
                                    <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname === '/dashboard' ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <LayoutDashboard size={24} /> Dashboard
                                    </Link>
                                    <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/explore') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <BookOpen size={24} /> Book Catalog
                                    </Link>
                                    <Link href="/dashboard/collection" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/collection') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <Library size={24} /> My Collection
                                    </Link>
                                    <Link href="/dashboard/history" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/history') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <History size={24} /> History
                                    </Link>
                                    <Link href="/dashboard/penalty" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/penalty') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <Receipt size={24} /> Penalty Bill
                                    </Link>
                                </nav>
                            </div>
                        </div>

                        <div className="px-6 pb-8">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Settings</p>
                            <nav className="flex flex-col gap-2">
                                <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${pathname.startsWith('/settings') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                                    <Settings size={20} /> Setting
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors w-full text-left cursor-pointer">
                                    <LogOut size={20} /> Log Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
                        <header className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 bg-[#F8F8FF] sticky top-0 z-30">
                            <div className="flex items-center gap-4 w-full max-w-[600px]">
                                <button
                                    className="md:hidden text-zinc-700 hover:text-[#161B85] focus:outline-none p-2 -ml-2 rounded-lg bg-white shadow-sm border border-zinc-200"
                                    onClick={() => setIsMobileMenuOpen(true)}
                                >
                                    <Menu size={24} />
                                </button>

                                <form onSubmit={handleSearchSubmit} className="relative w-full">
                                    <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#161B85]">
                                        <Search size={18} />
                                    </button>
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search for a book title, author, or ISBN..."
                                        className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-full text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] shadow-sm transition-all"
                                    />
                                </form>
                            </div>

                            <div className="flex items-center gap-4 md:gap-6 ml-4">
                                <Link className="flex items-center gap-3 border-l border-zinc-300 pl-4 md:pl-6 cursor-pointer" href="/settings">
                                    <div className="flex flex-col hidden sm:flex">
                                        <span className="text-[14px] font-bold text-black leading-tight line-clamp-1">{userProfile.name}</span>
                                        <span className="text-[11px] text-zinc-500 uppercase">{userProfile.npm}</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-[#EADFFF] border-2 border-[#161B85]/20 flex items-center justify-center text-[#161B85] font-bold sm:hidden">
                                        {userProfile.name.charAt(0)}
                                    </div>
                                </Link>
                            </div>
                        </header>

                        <div className="flex-1 px-6 md:px-8 pb-8">
                            {renderPageContent()}
                        </div>
                        <Footer />
                    </main>
                </div>
            </>
        );
    }

    return (
        <>
            {renderModal()}
            {renderTnCModal()}
            {renderSuccessModal()}

            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[55] lg:hidden backdrop-blur-sm"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            <div className={`min-h-screen flex flex-col bg-zinc-50 ${isAnyModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
                <header className="w-full flex items-center justify-between gap-4 px-6 md:px-12 py-5 bg-white border-b border-zinc-200 sticky top-0 z-50 shadow-sm font-['Plus_Jakarta_Sans',sans-serif]">
                    <div className="flex items-center gap-2 md:gap-3 cursor-pointer" onClick={() => router.push('/')}>
                        <img className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain" src="/logo.png" alt="Logo" />
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[#161B85] text-[18px] md:text-[24px] font-bold tracking-wide leading-none">Lumenary</span>
                            <span className="text-[#492073] text-[6px] md:text-[8px] font-bold uppercase tracking-wider">Gunadarma Library</span>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center gap-12">
                        <Link href="/" className="text-[#020617] text-[18px] font-bold hover:text-[#161B85] transition-colors">Home</Link>
                        <Link href="/explore" className="text-[#161B85] text-[18px] font-bold transition-colors">Explore Books</Link>
                        <Link href="/#features" className="text-[#020617] text-[18px] font-bold hover:text-[#161B85] transition-colors">Features</Link>
                        <Link href="/#about" className="text-[#020617] text-[18px] font-bold hover:text-[#161B85] transition-colors">About</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className="hidden lg:block relative cursor-pointer px-5 py-2 md:px-6 md:py-2.5 text-[#FCFDE9] text-[14px] md:text-[18px] font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all active:scale-95 border-none"
                            style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
                        >
                            Get Started
                        </button>
                        <button
                            className="lg:hidden text-zinc-700 hover:text-[#161B85] p-2 rounded-lg bg-zinc-100"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </header>

                <div className={`lg:hidden fixed top-[80px] left-0 w-full bg-white border-b border-zinc-200 shadow-xl z-[60] transform transition-transform duration-300 origin-top flex flex-col font-['Plus_Jakarta_Sans',sans-serif]
                    ${isMobileMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
                    <div className="flex flex-col p-4 gap-2">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[16px] font-bold text-[#020617] hover:bg-zinc-50">Home</Link>
                        <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[16px] font-bold text-[#161B85] bg-indigo-50">Explore Books</Link>
                        <Link href="/#features" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[16px] font-bold text-[#020617] hover:bg-zinc-50">Features</Link>
                        <Link href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="px-4 py-3 rounded-xl text-[16px] font-bold text-[#020617] hover:bg-zinc-50">About</Link>
                        <div className="h-px bg-zinc-100 my-2 w-full"></div>
                        <button
                            onClick={() => { setIsMobileMenuOpen(false); router.push('/login'); }}
                            className="w-full py-3.5 mt-2 rounded-xl text-white font-bold text-[16px]"
                            style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
                        >
                            Sign In / Get Started
                        </button>
                    </div>
                </div>

                <main className="flex-1 px-4 md:px-6 py-10 md:py-16">
                    {renderPageContent()}
                </main>
                <Footer />
            </div>
        </>
    );
}

export default function ExplorePage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-[#F8F8FF]">
                <Loader2 className="w-10 h-10 text-[#161B85] animate-spin" />
            </div>
        }>
            <ExploreContent />
        </Suspense>
    );
}