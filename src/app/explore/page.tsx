'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { Search, Loader2, BookOpen, Settings, LogOut, X, Star, CheckCircle2, AlertCircle, Heart } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import Footer from '@/components/footer'; 

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
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
    const [reservationSuccess, setReservationSuccess] = useState<{kode: string, judul: string} | null>(null);

    // --- FAVORITE STATES ---
    const [isFavorited, setIsFavorited] = useState(false);
    const [isTogglingFavorite, setIsTogglingFavorite] = useState(false);

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

    // --- INIT USE EFFECT ---
    useEffect(() => {
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (token && userStr) {
            const user = JSON.parse(userStr);
            setUserProfile({ name: user.nama || 'User', npm: user.npm });
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
        
        const queryFromUrl = searchParams.get('q');
        if (queryFromUrl) {
            setSearchQuery(queryFromUrl); 
            fetchBooks(queryFromUrl);     
        } else {
            fetchBooks();                 
        }
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
        if (token) {
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
        const token = localStorage.getItem('lumenary_token');
        if (!token) {
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
        if (!token) {
            alert("Silakan Sign In terlebih dahulu untuk menyimpan buku favorit.");
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
                                {isLoggedIn && (
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
                                    {isLoggedIn ? 'Book This Title' : 'Sign In to Book'}
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
            <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[99999] flex items-center justify-center p-4 transition-opacity duration-300">
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

    if (isLoggedIn === null) {
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
                
                {isLoggedIn && (
                    <Link href="/dashboard/collection" className="bg-[#161B85] hover:bg-[#0E1154] text-white px-6 py-2.5 rounded-full text-[14px] font-bold transition-colors shadow-sm whitespace-nowrap text-center">
                        My Collection
                    </Link>
                )}
            </div>

            {!isLoggedIn && (
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

    // FIX: Gunakan isAnyModalOpen untuk background blur di Public Layout juga!
    const isAnyModalOpen = isModalOpen || isTnCOpen || reservationSuccess !== null;

    if (isLoggedIn) {
        return (
            <>
                {renderModal()}
                {renderTnCModal()}
                {renderSuccessModal()}
                
                <div className={`flex h-screen w-full bg-[#F8F8FF] font-['Plus_Jakarta_Sans',sans-serif] ${isAnyModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
                    <aside className="w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex">
                        <div>
                            <div className="flex items-center gap-3 px-8 py-8">
                                <img src="/logo.png" alt="Lumenary" className="w-8 h-8" />
                                <div className="flex flex-col gap-[2px]">
                                    <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                                    <span className="text-[#492073] text-[7px] md:text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                                </div>
                            </div>

                            <div className="px-6 mt-4">
                                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
                                <nav className="flex flex-col gap-2">
                                    <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname === '/dashboard' ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M17.3333 10.6667V5.33333C17.3333 4.95556 17.4613 4.63911 17.7173 4.384C17.9733 4.12889 18.2898 4.00089 18.6667 4H26.6667C27.0444 4 27.3613 4.128 27.6173 4.384C27.8733 4.64 28.0009 4.95644 28 5.33333V10.6667C28 11.0444 27.872 11.3613 27.616 11.6173C27.36 11.8733 27.0436 12.0009 26.6667 12H18.6667C18.2889 12 17.9724 11.872 17.7173 11.616C17.4622 11.36 17.3342 11.0436 17.3333 10.6667ZM4 16V5.33333C4 4.95556 4.128 4.63911 4.384 4.384C4.64 4.12889 4.95644 4.00089 5.33333 4H13.3333C13.7111 4 14.028 4.128 14.284 4.384C14.54 4.64 14.6676 4.95644 14.6667 5.33333V16C14.6667 16.3778 14.5387 16.6947 14.2827 16.9507C14.0267 17.2067 13.7102 17.3342 13.3333 17.3333H5.33333C4.95556 17.3333 4.63911 17.2053 4.384 16.9493C4.12889 16.6933 4.00089 16.3769 4 16ZM17.3333 26.6667V16C17.3333 15.6222 17.4613 15.3058 17.7173 15.0507C17.9733 14.7956 18.2898 14.6676 18.6667 14.6667H26.6667C27.0444 14.6667 27.3613 14.7947 27.6173 15.0507C27.8733 15.3067 28.0009 15.6231 28 16V26.6667C28 27.0444 27.872 27.3613 27.616 27.6173C27.36 27.8733 27.0436 28.0009 26.6667 28H18.6667C18.2889 28 17.9724 27.872 17.7173 27.616C17.4622 27.36 17.3342 27.0436 17.3333 26.6667ZM4 26.6667V21.3333C4 20.9556 4.128 20.6391 4.384 20.384C4.64 20.1289 4.95644 20.0009 5.33333 20H13.3333C13.7111 20 14.028 20.128 14.284 20.384C14.54 20.64 14.6676 20.9564 14.6667 21.3333V26.6667C14.6667 27.0444 14.5387 27.3613 14.2827 27.6173C14.0267 27.8733 13.7102 28.0009 13.3333 28H5.33333C4.95556 28 4.63911 27.872 4.384 27.616C4.12889 27.36 4.00089 27.0436 4 26.6667ZM6.66667 14.6667H12V6.66667H6.66667V14.6667ZM20 25.3333H25.3333V17.3333H20V25.3333ZM20 9.33333H25.3333V6.66667H20V9.33333ZM6.66667 25.3333H12V22.6667H6.66667V25.3333Z" fill="currentColor" /></svg> Dashboard
                                    </Link>
                                    <Link href="/explore" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/explore') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <BookOpen size={24} /> Book Catalog
                                    </Link>
                                    <Link href="/dashboard/collection" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/collection') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33" fill="none"><path d="M11 21.6667H27V5.66667H24.3333V13.8333C24.3333 14.1 24.2222 14.3 24 14.4333C23.7778 14.5667 23.5556 14.5556 23.3333 14.4L21.7 13.4333C21.4778 13.3 21.2391 13.2333 20.984 13.2333C20.7289 13.2333 20.5009 13.3 20.3 13.4333L18.6667 14.4C18.4222 14.5556 18.1942 14.5667 17.9827 14.4333C17.7711 14.3 17.6658 14.1 17.6667 13.8333V5.66667H11V21.6667ZM11 24.3333C10.2667 24.3333 9.63911 24.0724 9.11733 23.5507C8.59556 23.0289 8.33422 22.4009 8.33333 21.6667V5.66667C8.33333 4.93333 8.59467 4.30578 9.11733 3.784C9.64 3.26222 10.2676 3.00089 11 3H27C27.7333 3 28.3613 3.26133 28.884 3.784C29.4067 4.30667 29.6676 4.93422 29.6667 5.66667V21.6667C29.6667 22.4 29.4058 23.028 28.884 23.5507C28.3622 24.0733 27.7342 24.3342 27 24.3333H11ZM5.66667 29.6667C4.93333 29.6667 4.30578 29.4058 3.784 28.884C3.26222 28.3622 3.00089 27.7342 3 27V9.66667C3 9.28889 3.128 8.97244 3.384 8.71733C3.64 8.46222 3.95644 8.33422 4.33333 8.33333C4.71022 8.33244 5.02711 8.46044 5.284 8.71733C5.54089 8.97422 5.66844 9.29067 5.66667 9.66667V27H23C23.3778 27 23.6947 27.128 23.9507 27.384C24.2067 27.64 24.3342 27.9564 24.3333 28.3333C24.3324 28.7102 24.2044 29.0271 23.9493 29.284C23.6942 29.5409 23.3778 29.6684 23 29.6667H5.66667Z" fill="currentColor" /></svg> My Collection
                                    </Link>
                                    <Link href="/dashboard/history" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/history') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none"><path d="M16 28C13.2 28 10.7222 27.1502 8.56667 25.4507C6.41111 23.7511 5.01111 21.5787 4.36667 18.9333C4.27778 18.6 4.34444 18.2947 4.56667 18.0173C4.78889 17.74 5.08889 17.5787 5.46667 17.5333C5.82222 17.4889 6.14444 17.5556 6.43333 17.7333C6.72222 17.9111 6.92222 18.1778 7.03333 18.5333C7.56667 20.5333 8.66667 22.1667 10.3333 23.4333C12 24.7 13.8889 25.3333 16 25.3333C18.6 25.3333 20.8058 24.428 22.6173 22.6173C24.4289 20.8067 25.3342 18.6009 25.3333 16C25.3324 13.3991 24.4271 11.1938 22.6173 9.384C20.8076 7.57422 18.6018 6.66844 16 6.66667C14.4667 6.66667 13.0333 7.02222 11.7 7.73333C10.3667 8.44444 9.24444 9.42222 8.33333 10.6667H10.6667C11.0444 10.6667 11.3613 10.7947 11.6173 11.0507C11.8733 11.3067 12.0009 11.6231 12 12C11.9991 12.3769 11.8711 12.6938 11.616 12.9507C11.3609 13.2076 11.0444 13.3351 10.6667 13.3333H5.33333C4.95556 13.3333 4.63911 13.2053 4.384 12.9493C4.12889 12.6933 4.00089 12.3769 4 12V6.66667C4 6.28889 4.128 5.97244 4.384 5.71733C4.64 5.46222 4.95644 5.33422 5.33333 5.33333C5.71022 5.33244 6.02711 5.46044 6.284 5.71733C6.54089 5.97422 6.66844 6.29067 6.66667 6.66667V8.46667C7.8 7.04444 9.18356 5.94444 10.8173 5.16667C12.4511 4.38889 14.1787 4 16 4C17.6667 4 19.228 4.31689 20.684 4.95067C22.14 5.58444 23.4067 6.43956 24.484 7.516C25.5613 8.59244 26.4169 9.85911 27.0507 11.316C27.6844 12.7729 28.0009 14.3342 28 16C27.9991 17.6658 27.6827 19.2271 27.0507 20.684C26.4187 22.1409 25.5631 23.4076 24.484 24.484C23.4049 25.5604 22.1382 26.416 20.684 27.0507C19.2298 27.6853 17.6684 28.0018 16 28ZM17.3333 15.4667L20.6667 18.8C20.9111 19.0444 21.0333 19.3556 21.0333 19.7333C21.0333 20.1111 20.9111 20.4222 20.6667 20.6667C20.4222 20.9111 20.1111 21.0333 19.7333 21.0333C19.3556 21.0333 19.0444 20.9111 18.8 20.6667L15.0667 16.9333C14.9333 16.8 14.8333 16.6502 14.7667 16.484C14.7 16.3178 14.6667 16.1453 14.6667 15.9667V10.6667C14.6667 10.2889 14.7947 9.97244 15.0507 9.71733C15.3067 9.46222 15.6231 9.33422 16 9.33333C16.3769 9.33244 16.6938 9.46044 16.9507 9.71733C17.2076 9.97422 17.3351 10.2907 17.3333 10.6667V15.4667Z" fill="currentColor" /></svg> History
                                    </Link>
                                    <Link href="/dashboard/penalty" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname.startsWith('/dashboard/penalty') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="27" height="33" viewBox="0 0 27 33" fill="none"><path d="M12.3333 15H20.3333M12.3333 20.3333H20.3333M12.3333 9.66667H20.3333M7 4.33333C7 3.97971 7.14048 3.64057 7.39052 3.39052C7.64057 3.14048 7.97971 3 8.33333 3H24.3333C24.687 3 25.0261 3.14048 25.2761 3.39052C25.5262 3.64057 25.6667 3.97971 25.6667 4.33333V29.6667L21 26.3333L16.3333 29.6667L11.6667 26.3333L7 29.6667V4.33333Z" stroke="currentColor" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" /></svg> Penalty Bill
                                    </Link>
                                </nav>
                            </div>
                        </div>

                        <div className="px-6 pb-8">
                            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Settings</p>
                            <nav className="flex flex-col gap-2">
                                <Link href="/settings" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${pathname.startsWith('/settings') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                                    <Settings size={20} /> Setting
                                </Link>
                                <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors w-full text-left cursor-pointer">
                                    <LogOut size={20} /> Log Out
                                </button>
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-1 flex flex-col h-screen overflow-y-auto relative">
                        <header className="flex items-center justify-between px-8 py-6 bg-[#F8F8FF] sticky top-0 z-10">
                            <form onSubmit={handleSearchSubmit} className="relative w-full max-w-[600px]">
                                <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-[#161B85]">
                                    <Search size={18} />
                                </button>
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a book title, author, or ISBN..."
                                    className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-full text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] shadow-sm"
                                />
                            </form>

                            <div className="flex items-center gap-6">
                                <Link className="flex items-center gap-3 border-l border-zinc-300 pl-6 cursor-pointer" href="/settings">
                                    <div className="flex flex-col">
                                        <span className="text-[14px] font-bold text-black leading-tight line-clamp-1">{userProfile.name}</span>
                                        <span className="text-[11px] text-zinc-500 uppercase">{userProfile.npm}</span>
                                    </div>
                                </Link>
                            </div>
                        </header>

                        <div className="flex-1 px-8 pb-8">
                            {renderPageContent()}
                        </div>
                        <Footer />
                    </main>
                </div>
            </>
        );
    }

    // ==========================================
    // RENDER: JIKA USER BELUM LOGIN (PUBLIC LAYOUT)
    // ==========================================
    return (
        <>
            {renderModal()}
            {renderTnCModal()}
            {renderSuccessModal()}
            <div className={`min-h-screen flex flex-col bg-zinc-50 ${isAnyModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>
                {/* ====== NAVBAR DARI LANDING PAGE ====== */}
                <header className="w-full flex items-center justify-between gap-4 px-6 md:px-12 py-5 bg-white border-b border-zinc-200 sticky top-0 z-50 shadow-sm">
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

                    <button
                        type="button"
                        onClick={() => router.push('/login')}
                        className="relative cursor-pointer px-5 py-2 md:px-6 md:py-2.5 text-[#FCFDE9] text-[14px] md:text-[18px] font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all active:scale-95 border-none"
                        style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
                    >
                        Get Started
                    </button>
                </header>
                
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