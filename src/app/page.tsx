"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Star, Search } from 'lucide-react';
import Link from 'next/link';

type Book = {
  id_buku: string;
  judul: string;
  penulis: string;
  sinopsis?: string;
  cover_buku?: string;
  isbn?: string;
  stok: number;
  rating_rata?: number;
  kategori?: { nama_kategori: string };
};

const AccordionItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-[16px] md:rounded-[20px] border-b-[4px] border-zinc-300 shadow-[0px_4px_8px_rgba(0,0,0,0.06)] hover:border-zinc-400 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-5 py-4 md:px-8 md:py-5 flex justify-between items-center cursor-pointer focus:outline-none">
        <span className="text-[#020617] text-[16px] md:text-[20px] font-bold tracking-tight text-left">{question}</span>
        <span className={`text-[16px] md:text-[20px] font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▲</span>
      </button>
      <div className={`px-5 md:px-8 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-4 md:pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
        <p className="text-[14px] md:text-[18px] font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// ================= MAIN LANDING PAGE =================
export default function LandingPage() {
  const router = useRouter();

  const [trendingBooks, setTrendingBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State baru untuk mengatur buka/tutup sinopsis panjang
  const [isExpanded, setIsExpanded] = useState(false);

  const faqs = [
    { q: "What is Lumenary and how does it work?", a: "Lumenary is a digital library system designed to help Gunadarma students book books and study slots online easily." },
    { q: "How long can I hold a book reservation before picking it up?", a: "You can hold a book reservation for up to 24 hours before you need to pick it up at the library counter." },
    { q: "Can I book a specific study room or reading slot through Lumenary?", a: "Yes, you can browse available study slots and reserve them through the features menu." },
    { q: "What happens if I return a borrowed book late?", a: "Late returns may result in a temporary suspension of borrowing privileges as per library policies." }
  ];

  useEffect(() => {
    fetch('/api/buku/trending')
      .then((response) => {
        if (!response.ok) throw new Error('Gagal mengambil data trending buku');
        return response.json();
      })
      .then((resJson) => {
        if (resJson.success && Array.isArray(resJson.data)) {
          setTrendingBooks(resJson.data);
        } else {
          setTrendingBooks([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openBookDetail = (book: Book) => {
    setSelectedBook(book);
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
    const token = localStorage.getItem('lumenary_token');
    if (!token) {
      alert("Silakan Sign In terlebih dahulu untuk mereservasi buku ini.");
      router.push('/login');
    } else {
      alert(`Buku "${selectedBook?.judul}" siap direservasi!`);
      closeBookDetail();
    }
  };

  const landingPage = () => {
    router.push('/')
  };

  const getStarted = () => {
    const token = localStorage.getItem('lumenary_token');
    if (!token) {
      router.push('/login');
    } else {
      router.push('/dashboard');
    }
  };

  // Fungsi pembantu untuk memotong sinopsis
  const renderSynopsis = () => {
    if (!selectedBook) return null;

    const text = selectedBook.sinopsis || "Sinopsis tidak tersedia untuk buku ini.";
    const maxLength = 150; // Batas karakter sebelum dipotong

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

  return (
    <>
      {/* ================= MODAL POP-UP DETAIL BUKU ================= */}
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
                <span className="bg-[#EADFFF] text-[#6B21A8] px-3 py-1 md:px-4 md:py-[6px] rounded-lg text-[12px] md:text-[14px] font-bold">
                  Fiction
                </span>
              </div>

              {/* Sinopsis Dinamis */}
              <h3 className="text-[18px] md:text-[20px] font-extrabold text-[#111] mb-2 md:mb-3">Synopsis</h3>
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

      {/* ================= CONTAINER HALAMAN UTAMA ================= */}
      <div className="w-full bg-white min-h-screen pt-4 pb-10 px-4 md:px-[80px] font-['Plus_Jakarta_Sans',sans-serif] text-[#020617] antialiased flex justify-center relative no-scrollbar">
        <div className={`w-full max-w-[1200px] flex flex-col gap-10 md:gap-[40px] ${isModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>

          {/* HERO BOX */}
          <div
            className="relative w-full min-h-[550px] md:min-h-[680px] rounded-[32px] md:rounded-[40px] overflow-hidden shadow-sm flex flex-col justify-between p-6 md:p-[40px]"
            style={{ background: 'linear-gradient(102.43deg, #FFFEF7 0%, #E2C6FF 83.81%)' }}
          >
            <div className="absolute pointer-events-none hidden md:block" style={{ width: '988px', height: '415px', left: '271px', bottom: '0px', background: 'linear-gradient(107.93deg, #FFDFEC 22.78%, #B8BAE3 38.05%, #555CDA 61.53%)', opacity: 0.9, filter: 'blur(50px)', zIndex: 0 }} />
            <div className="absolute pointer-events-none hidden md:block" style={{ width: '746px', height: '194px', left: '503px', top: '0px', background: 'linear-gradient(93deg, #FFF0F6 6.55%, #E68AAF 97.08%)', filter: 'blur(50px)', zIndex: 0 }} />

            <div className="relative z-10 w-full flex flex-col justify-between flex-1 gap-10">
              {/* NAVBAR */}
              <div className="w-full flex items-center justify-between gap-4 cursor-pointer">
                <div className="flex items-center gap-2 md:gap-3" onClick={landingPage}>
                  <img className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain" src="/logo.png" alt="Logo" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[#161B85] text-[18px] md:text-[24px] font-bold tracking-wide leading-none">Lumenary</span>
                    <span className="text-[#492073] text-[6px] md:text-[8px] font-bold uppercase tracking-wider">Gunadarma Library</span>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-12">
                  {['Home', 'Explore Books', 'Features', 'About'].map((menu) => (
                    <a key={menu} href={`#${menu.toLowerCase().replace(' ', '-')}`} className="text-[#020617] text-[20px] font-bold hover:opacity-70 transition-opacity">
                      {menu}
                    </a>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={getStarted}
                  className="relative z-50 cursor-pointer px-4 py-2 md:px-6 md:py-2 text-[#FCFDE9] text-[14px] md:text-[20px] font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all active:scale-95 border-none"
                  style={{
                    background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)',
                    pointerEvents: 'auto'
                  }}
                >
                  Get Started
                </button>
              </div>

              {/* HERO CONTENT */}
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center flex-1 pb-12 md:pb-16">
                <div className="flex flex-col gap-[16px] md:gap-[24px] max-w-[540px]">
                  <div className="flex flex-col gap-[8px] md:gap-[12px]">
                    <h2 className="text-[#020617] text-[28px] md:text-[32px] font-bold leading-[1.2] tracking-tight">Your Next Chapter Starts Here</h2>
                    <h2 className="text-[28px] md:text-[31px] font-bold leading-tight">
                      <span className="text-[#A347FF]">Book Instantly, </span>
                      <br className="block sm:hidden" />
                      <span className="text-[#FF99C2]">Read Seamlessly</span>
                    </h2>
                  </div>
                  <p className="text-[#020617]/80 text-[14px] md:text-[16px] font-medium leading-relaxed">
                    The ultimate digital gateway to streamline your book borrowing experience. Instantly lock your reading list and pick it up at your preferred campus library without the queue.
                  </p>
                  <Link href="/explore">
                    <button className="w-fit px-6 py-[12px] md:px-8 md:py-[14px] text-[#FCFDE9] text-[18px] md:text-[24px] lg:text-[28px] font-bold rounded-full flex items-center gap-[10px] md:gap-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.15)] group hover:brightness-105 transition-all" style={{ background: 'linear-gradient(120deg, #DDDEF2 10%, #8EA1E6 45%, #3037B4 77%, #101464 100%)' }}>
                      Explore Library
                      <div className="w-7 h-7 md:w-9 md:h-9 bg-white text-[#101464] rounded-full flex items-center justify-center font-bold text-[16px] md:text-[20px] group-hover:translate-x-1 transition-transform">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-[12px] h-[10px] md:w-[17px] md:h-[14px]">
                          <path d="M8.39067 0.390382C8.14071 0.640419 8.00029 0.979496 8.00029 1.33305C8.00029 1.6866 8.14071 2.02568 8.39067 2.27571L11.448 5.33305H1.33333C0.979711 5.33305 0.640573 5.47352 0.390525 5.72357C0.140476 5.97362 0 6.31276 0 6.66638C0 7.02 0.140476 7.35914 0.390525 7.60919C0.640573 7.85924 0.979711 7.99972 1.33333 7.99972H11.448L8.39067 11.057C8.14066 11.3071 8.0002 11.6461 8.0002 11.9997C8.0002 12.3533 8.14066 12.6924 8.39067 12.9424C8.64068 13.1924 8.97976 13.3328 9.33333 13.3328C9.6869 13.3328 10.026 13.1924 10.276 12.9424L16.552 6.66638L10.276 0.390382C10.026 0.140421 9.68689 0 9.33333 0C8.97978 0 8.6407 0.140421 8.39067 0.390382Z" fill="url(#paint0_linear_379_2627)" />
                          <defs><linearGradient id="paint0_linear_379_2627" x1="8.276" y1="0" x2="8.276" y2="13.3328" gradientUnits="userSpaceOnUse"><stop offset="0.100962" stopColor="#DDDEF2" /><stop offset="0.447115" stopColor="#8EA1E6" /><stop offset="0.769231" stopColor="#3037B4" /><stop offset="1" stopColor="#101464" /></linearGradient></defs>
                        </svg>
                      </div>
                    </button>
                  </Link>
                </div>

                <div className="relative w-full max-w-[500px] justify-self-center lg:justify-self-end flex items-center justify-center hidden sm:flex">
                  <div className="w-full h-full rounded-[32px] opacity-25 absolute blur-md inset-0" style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }} />
                  <img src="/laptop.png" alt="Lumenary Laptop" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl" />
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="absolute -bottom-6 md:-bottom-5 left-1/2 -translate-x-1/2 w-[92%] md:w-[90%] max-w-[842px] h-[60px] md:h-[72px] bg-white px-5 md:px-7 py-3 md:py-4 rounded-[16px] md:rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-[12px] md:gap-[20px] border border-zinc-100">
                <Search className="w-6 h-6 md:w-8 md:h-8 text-zinc-400 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search book, author, or ISBN..."
                  className="w-full text-zinc-700 text-[15px] md:text-[20px] font-medium placeholder-[#B1B2B7] bg-transparent outline-none"
                />
              </div>

            </div>
          </div>

          {/* ================= TRENDING NOW ================= */}
          <div className="w-full flex flex-col items-center gap-[24px] md:gap-[32px] pt-6 md:pt-4 px-2 md:px-5">
            <div className="text-center flex flex-col gap-[8px] md:gap-[12px]">
              <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-tight">Trending Now</h2>
              <p className="text-[16px] md:text-[24px] font-medium text-zinc-600 md:text-[#020617]">Check out the most popular and frequently borrowed books by students this week.</p>
            </div>

            {loading && <div className="font-medium py-10 animate-pulse text-[16px] md:text-[18px]">Loading trending books...</div>}
            {error && <div className="text-red-500 font-medium py-10 text-[16px] md:text-[18px]">Gagal memuat data: {error}</div>}

            {!loading && !error && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-4">
                {trendingBooks.length > 0 ? (
                  trendingBooks.map((book) => (
                    <div key={book.id_buku} onClick={() => openBookDetail(book)} className="flex flex-col gap-[10px] md:gap-[12px] group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                      <div className="overflow-hidden rounded-[16px] md:rounded-[20px] shadow-sm group-hover:shadow-md transition-shadow aspect-[3/4] bg-zinc-100 relative">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={book.cover_buku || "https://placehold.co/230x320?text=No+Cover"} alt={book.judul} />
                        {book.rating_rata && (
                          <div className="absolute top-2 right-2 md:top-3 md:right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-[10px] md:text-[12px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            ⭐ {book.rating_rata}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-[4px] md:gap-[12px]">
                        <h3 className="text-[14px] md:text-[16px] font-bold leading-tight line-clamp-2 md:truncate text-[#020617]" title={book.judul}>{book.judul}</h3>
                        <p className="text-zinc-500 text-[11px] md:text-[12px] font-normal truncate">{book.penulis}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6 text-[16px] md:text-[18px]">Tidak ada buku trending minggu ini.</div>
                )}
              </div>
            )}
          </div>

          {/* ================= HOW IT WORKS ================= */}
          <div className="w-full flex flex-col items-center gap-[24px] md:gap-[32px] pt-4 px-2 md:px-5" id="features">
            <div className="text-center flex flex-col gap-[8px] md:gap-[12px]">
              <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-tight">How It Works?</h2>
              <p className="text-[16px] md:text-[24px] font-medium text-zinc-600 md:text-[#020617]">Discover, reserve, and enjoy your favorite books in just three simple steps</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {[
                { step: "Step 1", title: "Search & Select", desc: "Browse our extensive digital catalog and find the book or study slot you need." },
                { step: "Step 2", title: "Book Online", desc: "Reserve your book or reading space instantly with just a few clicks." },
                { step: "Step 3", title: "Pick Up & Read", desc: "Visit the library counter within 24 hours to claim your reservation and start reading." }
              ].map((item, idx) => (
                <div key={idx} className="p-6 md:p-8 bg-white rounded-[20px] md:rounded-[24px] border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[8px] md:gap-[12px] hover:shadow-[0px_15px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  <div className="w-fit px-3 py-1 md:px-4 md:py-1 rounded-full border border-blue-600 text-blue-600 text-[10px] md:text-[12px] font-bold uppercase">{item.step}</div>
                  <h3 className="text-[24px] md:text-[32px] font-bold">{item.title}</h3>
                  <p className="text-[15px] md:text-[20px] font-medium leading-relaxed text-zinc-600 md:text-[#020617]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= FAQ ================= */}
          <div className="w-full p-6 md:p-10 rounded-[24px] md:rounded-[40px] flex flex-col items-center gap-[24px] md:gap-[32px] mt-4" id="about" style={{ background: 'linear-gradient(0deg, #FFFFFF 15%, #E2C6FF 100%)' }}>
            <div className="text-center flex flex-col gap-[8px] md:gap-[12px]">
              <h2 className="text-[26px] md:text-[32px] font-extrabold tracking-tight">Frequently Asked Question</h2>
              <p className="max-w-[750px] text-[#020617] text-[15px] md:text-[20px] font-medium leading-relaxed">Find quick answers to common questions about book reservations, slot booking, loan policies, and how to make the most of your Lumenary account.</p>
            </div>
            <div className="w-full max-w-[720px] flex flex-col gap-[12px] md:gap-[16px]">
              {faqs.map((faq, idx) => <AccordionItem key={idx} question={faq.q} answer={faq.a} />)}
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <footer className="w-full pt-8 pb-4 flex flex-col gap-[24px] md:gap-[32px] md:px-[40px] border-t border-zinc-100 text-zinc-500 font-medium">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[32px]">
              <div className="flex flex-col gap-[12px] max-w-[460px]">
                <div className="flex items-center gap-3">
                  <img className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain" src="/logo.png" alt="Logo" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                    <span className="text-[#492073] text-[7px] md:text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                  </div>
                </div>
                <p className="text-zinc-600 text-[14px] md:text-[16px] font-medium leading-relaxed mt-2">Gunadarma University library application that provides online library book booking services to Gunadarma University students.</p>
              </div>
              <div className="grid grid-cols-2 gap-x-8 md:gap-x-[48px] gap-y-[12px] text-[14px] md:text-[16px] text-zinc-600 w-full lg:w-auto mt-2 lg:mt-0">
                <div className="flex flex-col gap-[12px] md:gap-[16px]">
                  <a href="#" className="hover:text-black font-medium">Home</a>
                  <a href="#" className="hover:text-black font-medium">Explore Books</a>
                  <a href="#" className="hover:text-black font-medium">About Us</a>
                  <a href="#" className="hover:text-black font-medium">FAQ</a>
                </div>
                <div className="flex flex-col gap-[12px] md:gap-[16px]">
                  <a href="#" className="hover:text-black font-medium">Book Reservation</a>
                  <a href="#" className="hover:text-black font-medium">Seat Booking</a>
                  <a href="#" className="hover:text-black font-medium">Loan Rules</a>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[13px] md:text-[16px] font-medium border-t border-zinc-100 pt-5 text-zinc-600 gap-2 sm:gap-0">
              <span>© Copyrights - All Right Reserved 2026</span>
              <span>Developed by Group 5, Gunadarma University</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}
