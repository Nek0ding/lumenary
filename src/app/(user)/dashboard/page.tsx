'use client';

import React, { useEffect, useState } from 'react';
import { Star, X } from 'lucide-react'; // Tambahkan X untuk tombol close

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

    // State Pengaturan Modal (Sesuai dengan Landing Page)
    const [selectedBook, setSelectedBook] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (token && userStr) {
            const user = JSON.parse(userStr);
            setUserName(user.nama || 'User');

            const fetchDashboardData = async () => {
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
                        setCurrentReading(resData.data.currentReading);
                        setRecommended(resData.data.recommended);
                    } else {
                        if (res.status === 401 || res.status === 403) {
                            localStorage.removeItem('lumenary_token');
                            localStorage.removeItem('lumenary_user');
                            window.location.href = '/login';
                            return; // Hentikan eksekusi script selanjutnya
                        }
                        setError(resData.message || 'Gagal memuat data dashboard.');
                    }
                } catch (err) {
                    console.error('Error fetching dashboard:', err);
                    setError('Terjadi kesalahan jaringan atau server.');
                } finally {
                    setLoading(false);
                }
            };

            fetchDashboardData();
        } else {
            setLoading(false);
        }
    }, []);

    // Fungsi Pembantu Membuka Modal (Normalisasi properti agar pas dengan struktur modal)
    const openBookDetail = (item: any) => {
        setSelectedBook({
            judul: item.title,
            penulis: item.author,
            cover_buku: item.cover,
            stok: item.stok ?? 5, // Fallback stok jika belum terdefinisi penuh di API dashboard
            isbn: item.isbn || 'ISBN Not Found',
            sinopsis: item.sinopsis || 'Sinopsys Ss Not Available',
            rating_rata: item.rating,
            kategori: { nama_kategori: item.category || 'General' }
        });
        setIsExpanded(false);
        setIsModalOpen(true);
    };

    const closeBookDetail = () => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedBook(null);
            setIsExpanded(false);
        }, 300);
    };

    const handleReserve = () => {
        alert(`Buku "${selectedBook?.judul}" siap direservasi!`);
        closeBookDetail();
    };

    // Fungsi pembantu untuk memotong sinopsis (Persis dari Landing Page)
    const renderSynopsis = () => {
        if (!selectedBook) return null;

        const text = selectedBook.sinopsis || "Sinopsis tidak tersedia untuk buku ini.";
        const maxLength = 150;

        if (text.length <= maxLength) {
            return text;
        }

        if (isExpanded) {
            return (
                <>
                    {text}
                    <span
                        onClick={() => setIsExpanded(false)}
                        style={{ cursor: 'pointer', fontWeight: '800', marginLeft: '6px', color: '#6B21A8' }}
                    >
                        (show less)
                    </span>
                </>
            );
        }

        return (
            <>
                {text.substring(0, maxLength)}
                <span
                    onClick={() => setIsExpanded(true)}
                    style={{ cursor: 'pointer', fontWeight: '800', color: '#111' }}
                >
                    ...read more
                </span>
            </>
        );
    };

    // Helper untuk mewarnai badge kategori secara dinamis
    const getCategoryColor = (category: string) => {
        const cat = category.toLowerCase();
        if (cat.includes('psychology')) return 'text-purple-600 bg-purple-100';
        if (cat.includes('science')) return 'text-indigo-600 bg-indigo-100';
        if (cat.includes('technology')) return 'text-blue-600 bg-blue-100';
        return 'text-pink-600 bg-pink-100';
    };

    // Helper untuk menghitung selisih hari peminjaman secara dinamis
    const getDaysLeftText = (dueDateString: string, status: string) => {
        if (status === 'terlambat') return 'Overdue!';
        const due = new Date(dueDateString);
        const today = new Date();
        const diffTime = due.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) return 'Melewati tenggat!';
        return `(${diffDays} hari tersisa)`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-EN', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleRetry = () => {
        // Cek apakah pesan error berhubungan dengan token atau akses
        const isAuthError = error.toLowerCase().includes('token') || error.toLowerCase().includes('access') || error.toLowerCase().includes('akses');

        if (isAuthError) {
            // Jika error karena token, bersihkan storage lalu lempar ke login
            localStorage.removeItem('lumenary_token');
            localStorage.removeItem('lumenary_user');
            window.location.href = '/login';
        } else {
            // Jika error karena hal lain (misal koneksi terputus), cukup reload halaman
            window.location.reload();
        }
    };

    if (loading) {
        return (
            <div className="flex h-[50vh] w-full items-center justify-center text-zinc-500 font-medium">
                Memuat data dashboard...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-2 text-red-500 font-semibold">
                <p>⚠️ {error}</p>
                <button onClick={handleRetry} className="text-[13px] bg-zinc-200 text-zinc-700 px-4 py-1.5 rounded-lg hover:bg-zinc-300 transition-all">
                    Try again
                </button>
            </div>
        );
    }

    return (
        <>
            {/* ================= MODAL POP-UP DETAIL BUKU (DARI LANDING PAGE) ================= */}
            {isModalOpen && selectedBook && (
                <div
                    style={{
                        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                        backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(5px)',
                        zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        padding: '16px'
                    }}
                >
                    <div
                        className="flex flex-col md:flex-row relative no-scrollbar p-6 md:p-8 gap-6 md:gap-8"
                        style={{
                            backgroundColor: '#F8F5FF',
                            width: '100%', maxWidth: '850px', maxHeight: '90vh', overflowY: 'auto',
                            borderRadius: '24px',
                            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)'
                        }}
                    >
                        {/* Tombol Close */}
                        <button
                            onClick={closeBookDetail}
                            style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: 'none', cursor: 'pointer', border: 'none' }}
                        >
                            <X color="#333" className="w-6 h-6 md:w-7 md:h-7" />
                        </button>

                        {/* ====== KIRI: COVER & ISBN ====== */}
                        <div className="flex flex-col items-center w-full max-w-[200px] md:max-w-[280px] shrink-0 mx-auto">
                            <img
                                src={selectedBook.cover_buku || "https://placehold.co/300x450?text=No+Cover"}
                                alt={selectedBook.judul}
                                style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
                            />

                            <div className="flex gap-1 md:gap-2 mt-4 md:mt-5">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star key={star} className="w-5 h-5 md:w-7 md:h-7" fill="#FFD700" color="#FFD700" />
                                ))}
                            </div>

                            <p className="text-[14px] md:text-[16px] font-semibold text-[#333] mt-3 md:mt-4 text-center">
                                ISBN : {selectedBook.isbn || '978-0-59-313520-4'}
                            </p>
                        </div>

                        {/* ====== KANAN: DETAIL INFO ====== */}
                        <div className="flex flex-col flex-1 pt-0 md:pt-2">
                            <h2 className="text-[24px] md:text-[32px] font-extrabold text-[#111] mb-1 md:mb-2 leading-[1.2]">
                                {selectedBook.judul}
                            </h2>
                            <p className="text-[16px] md:text-[20px] font-medium text-[#555] mb-3 md:mb-4">
                                {selectedBook.penulis}
                            </p>

                            {/* Status Row */}
                            <div className="flex flex-wrap items-center gap-2 mb-3 md:mb-4">
                                <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: selectedBook.stok > 0 ? '#00A651' : '#E11D48' }} />
                                <span className="text-[13px] md:text-[15px] font-bold" style={{ color: selectedBook.stok > 0 ? '#00A651' : '#E11D48' }}>
                                    {selectedBook.stok > 0 ? 'Available for Loan' : 'Out of Stock'}
                                </span>
                                <span className="text-[#A1A1AA] mx-1 hidden sm:block">|</span>
                                <span className="text-[13px] md:text-[15px] text-[#111] font-medium w-full sm:w-auto">
                                    Stock leftovers: <b className="font-extrabold">{selectedBook.stok > 0 ? `${selectedBook.stok} Books` : '0 Books'}</b>
                                </span>
                            </div>

                            {/* Tags/Kategori */}
                            <div className="flex flex-wrap gap-2 md:gap-3 mb-4 md:mb-6">
                                <span className="bg-[#EADFFF] text-[#6B21A8] px-3 py-1 md:px-4 md:py-[6px] rounded-lg text-[12px] md:text-[14px] font-bold">
                                    {selectedBook.kategori?.nama_kategori || 'Sci-Fi'}
                                </span>
                            </div>

                            {/* Sinopsis Dinamis */}
                            <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#111] mb-2 md:mb-3">Sinopsys</h3>
                            <p className="text-[14px] md:text-[16px] text-[#222] leading-[1.6] mb-5 md:mb-6 font-medium whitespace-pre-wrap">
                                {renderSynopsis()}
                            </p>

                            {/* Buttons Container */}
                            <div className="mt-auto flex flex-col gap-3">
                                <button
                                    onClick={handleReserve}
                                    disabled={selectedBook.stok <= 0}
                                    className="w-full py-3 md:py-4 rounded-xl text-[16px] md:text-[18px] font-extrabold border-none text-white shadow-md"
                                    style={{
                                        background: 'linear-gradient(90deg, #C3CFF7 0%, #101464 100%)',
                                        cursor: selectedBook.stok > 0 ? 'pointer' : 'not-allowed', opacity: selectedBook.stok > 0 ? 1 : 0.6,
                                    }}
                                >
                                    Booking Book
                                </button>
                                <p className="text-center text-[12px] md:text-[14px] text-[#555] mt-1 font-medium">
                                    *Maximum loan period is 7 working days
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= CONTAINER HALAMAN DASHBOARD UTAMA ================= */}
            <div className={`flex flex-col gap-8 w-full max-w-[1200px] mx-auto transition-all duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>

                {/* 1. Hero Banner */}
                <div className="w-full h-[313px] rounded-[20px] overflow-hidden relative shadow-sm flex flex-col justify-center px-10">
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('/background-dashboard.jpg')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#161B85]/90 to-[#492073]/60 mix-blend-multiply" />

                    <div className="relative z-10 text-white max-w-[665px]">
                        <h1 className="text-[36px] font-bold leading-tight mb-3">
                            Welcome Back, {userName}! Ready to<br />Discover Your Next Reference?
                        </h1>
                    </div>
                </div>

                {/* 2. Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {/* Card 1 */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100">
                        <p className="text-[12px] text-zinc-500 font-medium mb-1">Books Handled</p>
                        <p className="text-[20px] font-bold text-black">{stats.booksHandled} Books</p>
                    </div>
                    {/* Card 2 */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[12px] text-zinc-500 font-medium mb-1">Your Wishlist</p>
                            <p className="text-[20px] font-bold text-black">{stats.wishlist.total} Saved</p>
                            <p className="text-[10px] text-[#A855F7] font-medium mt-1">{stats.wishlist.available} Available in library</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
                            <path d="M19.2767 35.1867C19.4879 35.3363 19.7403 35.4166 19.9992 35.4166C20.258 35.4166 20.5104 35.3363 20.7217 35.1867L20 34.1667L20.7233 35.1867L20.7367 35.1767L20.7717 35.1517L20.905 35.055C21.0206 34.9717 21.1844 34.85 21.3967 34.69C23.8733 32.8207 26.2111 30.7742 28.3917 28.5667C30.305 26.62 32.25 24.345 33.7233 21.9317C35.19 19.5317 36.25 16.8917 36.25 14.245C36.25 11.1033 35.275 8.64834 33.55 6.98168C31.8333 5.32501 29.5167 4.58334 27.0833 4.58334C24.2083 4.58334 21.67 5.97168 20 8.11168C18.33 5.97168 15.79 4.58334 12.9167 4.58334C7.78333 4.58334 3.75 8.98168 3.75 14.245C3.75 16.8917 4.81167 19.53 6.27667 21.9317C7.75 24.345 9.695 26.62 11.6083 28.5683C13.933 30.9203 16.436 33.0889 19.095 35.055L19.2283 35.1517L19.2633 35.1767L19.2767 35.1867Z" fill="#A347FF" />
                        </svg>
                    </div>
                    {/* Card 3 */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[12px] text-zinc-500 font-medium mb-1">Ready for Pickup</p>
                            <p className="text-[20px] font-bold text-black">{stats.reserved} Reserved</p>
                            <p className="text-[10px] text-[#F43F5E] font-medium mt-1">Check reservation menu</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M9.16667 38.5C8.15833 38.5 7.29544 38.1413 6.578 37.4238C5.86056 36.7064 5.50122 35.8429 5.5 34.8333V9.16667C5.5 8.15833 5.85933 7.29544 6.578 6.578C7.29667 5.86056 8.15956 5.50122 9.16667 5.5H34.8333C35.8417 5.5 36.7052 5.85933 37.4238 6.578C38.1425 7.29667 38.5012 8.15956 38.5 9.16667V34.8333C38.5 35.8417 38.1413 36.7052 37.4238 37.4238C36.7064 38.1425 35.8429 38.5012 34.8333 38.5H9.16667ZM12.8333 31.1667H22V27.5H12.8333V31.1667ZM14.6667 23.8333L22 20.1667L29.3333 23.8333V9.16667H14.6667V23.8333Z" fill="#FF68A5" />
                        </svg>
                    </div>
                    {/* Card 4 */}
                    <div className="bg-white rounded-2xl p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.25)] border border-zinc-100 flex justify-between items-center">
                        <div>
                            <p className="text-[12px] text-zinc-500 font-medium mb-1">Total Penalty</p>
                            <p className="text-[20px] font-bold text-black">
                                {stats.totalPenalty > 0
                                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(stats.totalPenalty)
                                    : 'Rp 0'}
                            </p>
                            <p className="text-[10px] text-[#3B82F6] font-medium mt-1">
                                {stats.totalPenalty > 0 ? 'Please settle bills' : 'No outstanding bills'}
                            </p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44" fill="none">
                            <path d="M22 29.3333C20.9917 29.3333 20.1288 28.9746 19.4113 28.2572C18.6939 27.5397 18.3346 26.6762 18.3333 25.6667C18.3321 24.6571 18.6914 23.7942 19.4113 23.078C20.1312 22.3618 20.9941 22.0024 22 22C23.0059 21.9976 23.8694 22.3569 24.5905 23.078C25.3116 23.7991 25.6703 24.662 25.6667 25.6667C25.663 26.6713 25.3043 27.5348 24.5905 28.2572C23.8767 28.9795 23.0132 29.3382 22 29.3333ZM13.5208 12.8333H30.4792L32.8167 8.15833C33.1222 7.54722 33.099 6.95139 32.747 6.37083C32.395 5.79028 31.8682 5.5 31.1667 5.5H12.8333C12.1306 5.5 11.6038 5.79028 11.253 6.37083C10.9022 6.95139 10.879 7.54722 11.1833 8.15833L13.5208 12.8333ZM15.4 38.5H28.6C31.35 38.5 33.6875 37.5454 35.6125 35.6363C37.5375 33.7272 38.5 31.3818 38.5 28.6C38.5 27.4389 38.3014 26.3083 37.9042 25.2083C37.5069 24.1083 36.9417 23.1153 36.2083 22.2292L31.4417 16.5H12.5583L7.79167 22.2292C7.05833 23.1153 6.49306 24.1083 6.09583 25.2083C5.69861 26.3083 5.5 27.4389 5.5 28.6C5.5 31.3806 6.45517 33.726 8.3655 35.6363C10.2758 37.5467 12.6207 38.5012 15.4 38.5Z" fill="#62AAFF" />
                        </svg>
                    </div>
                </div>

                {/* 3. Recommended For You */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-[20px] font-bold text-black">Recommended For You</h2>
                    {recommended.length === 0 ? (
                        <p className="text-zinc-500 text-[14px]">Belum ada rekomendasi buku tersedia.</p>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {recommended.map((book) => (
                                <div key={book.id} onClick={() => openBookDetail(book)} className="flex flex-col gap-2 cursor-pointer group">
                                    <div className="w-full aspect-[2/3] bg-zinc-200 rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                                        <img src={book.cover || "/placeholder-cover.jpg"} alt={book.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] font-bold text-black line-clamp-1">{book.title}</p>
                                        <p className="text-[12px] text-zinc-500">{book.author}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 4. Current Reading */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-[20px] font-bold text-black">Current Reading</h2>
                    {currentReading.length === 0 ? (
                        <p className="text-zinc-500 text-[14px] bg-white rounded-2xl p-6 text-center border border-zinc-100 shadow-sm">
                            Anda tidak sedang meminjam buku saat ini.
                        </p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {currentReading.map((item) => (
                                <div key={item.id} onClick={() => openBookDetail(item)} className="bg-white rounded-2xl p-4 shadow-sm border border-zinc-100 flex gap-5 items-center hover:shadow-md transition-shadow cursor-pointer">
                                    <div className="w-[80px] h-[110px] bg-zinc-200 rounded-lg overflow-hidden shrink-0">
                                        <img src={item.cover || "/placeholder-cover.jpg"} alt={item.title} className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center gap-1.5 flex-1">
                                        <h3 className="text-[16px] font-bold text-black leading-tight line-clamp-1">{item.title}</h3>
                                        <p className="text-[13px] text-zinc-600">{item.author}</p>

                                        <div className="flex items-center gap-3 mt-1">
                                            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-md ${getCategoryColor(item.category)}`}>
                                                {item.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-[13px] font-bold text-black">
                                                <Star size={14} className="text-yellow-400" fill="#FACC15" />
                                                {item.rating}
                                            </div>
                                        </div>

                                        <p className={`text-[12px] font-medium mt-1 ${item.status === 'terlambat' ? 'text-red-500 animate-pulse' : 'text-pink-500'}`}>
                                            Due: {formatDate(item.dueDate)} {getDaysLeftText(item.dueDate, item.status)}
                                        </p>
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