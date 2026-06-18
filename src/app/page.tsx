"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, BookOpen, Star, Search } from 'lucide-react';
import Link from 'next/link';

const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-white rounded-[20px] border-b-[4px] border-zinc-300 shadow-[0px_4px_8px_rgba(0,0,0,0.06)] hover:border-zinc-400 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full px-8 py-5 flex justify-between items-center cursor-pointer focus:outline-none">
        <span className="text-[#020617] text-[20px] font-bold tracking-tight text-left">{question}</span>
        <span className={`text-[20px] font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>▲</span>
      </button>
      <div className={`px-8 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}>
        <p className="text-[18px] font-medium leading-relaxed">{answer}</p>
      </div>
    </div>
  );
};

// ================= MAIN LANDING PAGE =================
export default function LandingPage() {
  const router = useRouter();

  // State Bawaan
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State Baru untuk Search & Modal
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim() !== '') {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const openBookDetail = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeBookDetail = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBook(null), 300);
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

  return (
    <>
      {/* ================= MODAL POP-UP DETAIL BUKU (KUNCI MUTLAK DENGAN INLINE STYLE) ================= */}
      {isModalOpen && selectedBook && (
        <div 
          style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', 
            zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', 
            padding: '1rem' 
          }}
        >
          <div 
            className="bg-white flex flex-col md:flex-row relative"
            style={{ 
              width: '100%', maxWidth: '900px', maxHeight: '90vh', 
              borderRadius: '24px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
            }}
          >
            {/* Tombol Close */}
            <button 
              onClick={closeBookDetail} 
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, padding: '8px', backgroundColor: '#f4f4f5', borderRadius: '50%', cursor: 'pointer', border: 'none' }}
            >
              <X color="#52525b" size={24} />
            </button>

            {/* Gambar Cover (Kiri) */}
            <div style={{ backgroundColor: '#f4f4f5', padding: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', flex: '1 1 40%' }}>
              <img 
                src={selectedBook.cover_buku || "https://placehold.co/230x320?text=No+Cover"} 
                alt={selectedBook.judul} 
                style={{ width: '100%', maxWidth: '220px', aspectRatio: '3/4', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
              />
            </div>

            {/* Informasi Buku (Kanan) */}
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px', flex: '1 1 60%', overflowY: 'auto' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ padding: '4px 12px', backgroundColor: '#e0e7ff', color: '#3037B4', fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', borderRadius: '999px' }}>
                    {selectedBook.kategori?.nama_kategori || 'Trending'}
                  </span>
                  {selectedBook.rating_rata && (
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: 'bold', color: '#f59e0b' }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" /> {selectedBook.rating_rata}
                    </span>
                  )}
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#000', margin: 0, lineHeight: '1.2' }}>{selectedBook.judul}</h2>
                <p style={{ fontSize: '16px', fontWeight: '500', color: '#71717a', margin: 0 }}>{selectedBook.penulis}</p>
              </div>

              <div>
                <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: '#000', textTransform: 'uppercase', marginBottom: '8px' }}>Synopsis</h3>
                <div style={{ maxHeight: '120px', overflowY: 'auto', paddingRight: '8px' }}>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#52525b', lineHeight: '1.6', margin: 0 }}>
                    {selectedBook.sinopsis || "Sinopsis tidak tersedia untuk buku ini."}
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', borderTop: '1px solid #f4f4f5', borderBottom: '1px solid #f4f4f5', padding: '16px 0', fontSize: '14px' }}>
                <div>
                  <span style={{ display: 'block', color: '#a1a1aa', fontWeight: '500' }}>Penerbit</span>
                  <span style={{ fontWeight: 'bold', color: '#000' }}>{selectedBook.penerbit || '-'}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: '#a1a1aa', fontWeight: '500' }}>Tahun</span>
                  <span style={{ fontWeight: 'bold', color: '#000' }}>{selectedBook.tahun_terbit || '-'}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: '#a1a1aa', fontWeight: '500' }}>ISBN</span>
                  <span style={{ fontWeight: 'bold', color: '#000' }}>{selectedBook.isbn || '-'}</span>
                </div>
                <div>
                  <span style={{ display: 'block', color: '#a1a1aa', fontWeight: '500' }}>Stok</span>
                  <span style={{ fontWeight: 'bold', color: selectedBook.stok > 0 ? '#059669' : '#e11d48' }}>
                    {selectedBook.stok > 0 ? `${selectedBook.stok} Tersedia` : 'Habis / Dipinjam'}
                  </span>
                </div>
              </div>

              <button 
                onClick={handleReserve}
                disabled={selectedBook.stok <= 0}
                style={{ 
                  width: '100%', padding: '16px', borderRadius: '12px', color: '#fff', fontSize: '16px', fontWeight: 'bold', border: 'none', cursor: selectedBook.stok > 0 ? 'pointer' : 'not-allowed',
                  background: 'linear-gradient(92.68deg, #8EA1E6 0%, #3037B4 50%, #101464 100%)',
                  opacity: selectedBook.stok > 0 ? 1 : 0.5,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginTop: 'auto'
                }}
              >
                <BookOpen size={20} />
                {selectedBook.stok > 0 ? 'Reserve Book' : 'Out of Stock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CONTAINER HALAMAN UTAMA ================= */}
      <div className="w-full bg-white min-h-screen pt-4 pb-10 px-4 md:px-[80px] font-['Plus_Jakarta_Sans',sans-serif] text-[#020617] antialiased flex justify-center relative">
        <div className={`w-full max-w-[1200px] flex flex-col gap-10 md:gap-[40px] ${isModalOpen ? 'blur-sm pointer-events-none' : ''} transition-all duration-300`}>

          {/* HERO BOX (FLEXIBLE & RESPONSIVE) */}
          <div
            className="relative w-full min-h-[680px] rounded-[40px] overflow-hidden shadow-sm flex flex-col justify-between p-10 md:p-[40px]"
            style={{ background: 'linear-gradient(102.43deg, #FFFEF7 0%, #E2C6FF 83.81%)' }}
          >
            <div className="absolute pointer-events-none hidden md:block" style={{ width: '988px', height: '415px', left: '271px', bottom: '0px', background: 'linear-gradient(107.93deg, #FFDFEC 22.78%, #B8BAE3 38.05%, #555CDA 61.53%)', opacity: 0.9, filter: 'blur(50px)', zIndex: 0 }} />
            <div className="absolute pointer-events-none hidden md:block" style={{ width: '746px', height: '194px', left: '503px', top: '0px', background: 'linear-gradient(93deg, #FFF0F6 6.55%, #E68AAF 97.08%)', filter: 'blur(50px)', zIndex: 0 }} />

            <div className="relative z-10 w-full flex flex-col justify-between flex-1 gap-10">
              <div className="w-full flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <img className="w-[50px] h-[50px] object-contain" src="/logo.png" alt="Logo" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[#161B85] text-[24px] font-bold tracking-wide leading-none">Lumenary</span>
                    <span className="text-[#492073] text-[8px] font-bold uppercase tracking-wider">Gunadarma Library</span>
                  </div>
                </div>

                <div className="hidden lg:flex items-center gap-12">
                  {['Home', 'Explore Books', 'Features', 'About'].map((menu) => (
                    <a key={menu} href={`#${menu.toLowerCase().replace(' ', '-')}`} className="text-[#020617] text-[20px] font-bold hover:opacity-70 transition-opacity">
                      {menu}
                    </a>
                  ))}
                </div>

                <Link href="/login">
                    <button className="px-6 py-2 text-[#FCFDE9] text-[20px] font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all active:scale-95" style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}>
                    Get Started
                    </button>
                </Link>
              </div>

              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center flex-1 pb-16">
                <div className="flex flex-col gap-[24px] max-w-[540px]">
                  <div className="flex flex-col gap-[12px]">
                    <h2 className="text-[#020617] text-[32px] md:text-[32px] font-bold leading-[1.2] tracking-tight">Your Next Chapter Starts Here</h2>
                    <h2 className="text-[32px] md:text-[31px] font-bold leading-tight">
                      <span className="text-[#A347FF]">Book Instantly, </span>
                      <span className="text-[#FF99C2]">Read Seamlessly</span>
                    </h2>
                  </div>
                  <p className="text-[#020617]/80 text-[16px] font-medium leading-relaxed">
                    The ultimate digital gateway to streamline your book borrowing experience. Instantly lock your reading list and pick it up at your preferred campus library without the queue.
                  </p>
                  <Link href="/explore">
                    <button className="w-fit px-8 py-[14px] text-[#FCFDE9] text-[24px] md:text-[28px] font-bold rounded-full flex items-center gap-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.15)] group hover:brightness-105 transition-all" style={{ background: 'linear-gradient(120deg, #DDDEF2 10%, #8EA1E6 45%, #3037B4 77%, #101464 100%)' }}>
                        Explore Library
                        <div className="w-9 h-9 bg-white text-[#101464] rounded-full flex items-center justify-center font-bold text-[20px] group-hover:translate-x-1 transition-transform">
                        <svg width="17" height="14" viewBox="0 0 17 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.39067 0.390382C8.14071 0.640419 8.00029 0.979496 8.00029 1.33305C8.00029 1.6866 8.14071 2.02568 8.39067 2.27571L11.448 5.33305H1.33333C0.979711 5.33305 0.640573 5.47352 0.390525 5.72357C0.140476 5.97362 0 6.31276 0 6.66638C0 7.02 0.140476 7.35914 0.390525 7.60919C0.640573 7.85924 0.979711 7.99972 1.33333 7.99972H11.448L8.39067 11.057C8.14066 11.3071 8.0002 11.6461 8.0002 11.9997C8.0002 12.3533 8.14066 12.6924 8.39067 12.9424C8.64068 13.1924 8.97976 13.3328 9.33333 13.3328C9.6869 13.3328 10.026 13.1924 10.276 12.9424L16.552 6.66638L10.276 0.390382C10.026 0.140421 9.68689 0 9.33333 0C8.97978 0 8.6407 0.140421 8.39067 0.390382Z" fill="url(#paint0_linear_379_2627)" />
                            <defs><linearGradient id="paint0_linear_379_2627" x1="8.276" y1="0" x2="8.276" y2="13.3328" gradientUnits="userSpaceOnUse"><stop offset="0.100962" stopColor="#DDDEF2" /><stop offset="0.447115" stopColor="#8EA1E6" /><stop offset="0.769231" stopColor="#3037B4" /><stop offset="1" stopColor="#101464" /></linearGradient></defs>
                        </svg>
                        </div>
                    </button>
                  </Link>
                </div>

                <div className="relative w-full max-w-[500px] justify-self-center lg:justify-self-end flex items-center justify-center">
                  <div className="w-full h-full rounded-[32px] opacity-25 absolute blur-md inset-0" style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }} />
                  <img src="/laptop.png" alt="Lumenary Laptop" className="relative z-10 w-full h-auto object-contain drop-shadow-2xl" />
                </div>
              </div>

              {/* SEARCH BAR */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[842px] h-[72px] bg-white px-7 py-4 rounded-[20px] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] flex items-center gap-[20px] border border-zinc-100">
                <Search className="w-8 h-8 text-zinc-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  placeholder="Search for a book title, author, or ISBN ... (Press Enter)"
                  className="w-full text-zinc-700 text-[18px] md:text-[20px] font-medium placeholder-[#B1B2B7] bg-transparent outline-none"
                />
              </div>

            </div>
          </div>

          {/* ================= TRENDING NOW ================= */}
          <div className="w-full flex flex-col items-center gap-[32px] pt-4 px-5">
            <div className="text-center flex flex-col gap-[12px]">
              <h2 className="text-[32px] font-extrabold tracking-tight">Trending Now</h2>
              <p className=" text-[24px] font-medium">Check out the most popular and frequently borrowed books by students this week.</p>
            </div>

            {loading && <div className="font-medium py-10 animate-pulse text-[18px]">Loading trending books...</div>}
            {error && <div className="text-red-500 font-medium py-10 text-[18px]">Gagal memuat data: {error}</div>}

            {!loading && !error && (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {trendingBooks.length > 0 ? (
                  trendingBooks.map((book) => (
                    <div key={book.id_buku} onClick={() => openBookDetail(book)} className="flex flex-col gap-[12px] group cursor-pointer hover:-translate-y-2 transition-transform duration-300">
                      <div className="overflow-hidden rounded-[20px] shadow-sm group-hover:shadow-md transition-shadow aspect-[3/4] bg-zinc-100 relative">
                        <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" src={book.cover_buku || "https://placehold.co/230x320?text=No+Cover"} alt={book.judul} />
                        {book.rating_rata && (
                          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-[12px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                            ⭐ {book.rating_rata}
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col gap-[12px]">
                        <h3 className="text-[16px] font-bold leading-tight truncate text-[#020617]" title={book.judul}>{book.judul}</h3>
                        <p className="text-zinc-500 text-[12px] font-normal">{book.penulis}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-center py-6 text-[18px]">Tidak ada buku trending minggu ini.</div>
                )}
              </div>
            )}
          </div>

          {/* ================= HOW IT WORKS ================= */}
          <div className="w-full flex flex-col items-center gap-[32px] pt-4 px-5">
            <div className="text-center flex flex-col gap-[12px]">
              <h2 className="text-[32px] font-extrabold tracking-tight">How It Works?</h2>
              <p className=" text-[24px] font-medium">Discover, reserve, and enjoy your favorite books in just three simple steps</p>
            </div>
            <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { step: "Step 1", title: "Search & Select", desc: "Browse our extensive digital catalog and find the book or study slot you need." },
                { step: "Step 2", title: "Book Online", desc: "Reserve your book or reading space instantly with just a few clicks." },
                { step: "Step 3", title: "Pick Up & Read", desc: "Visit the library counter within 24 hours to claim your reservation and start reading." }
              ].map((item, idx) => (
                <div key={idx} className="p-8 bg-white rounded-[24px] border border-zinc-100 shadow-[0px_2px_4px_rgba(0,0,0,0.2)] flex flex-col gap-[12px] hover:shadow-[0px_15px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300">
                  <div className="w-fit px-4 py-1 rounded-full border border-blue-600 text-blue-600 text-[12px] font-bold uppercase">{item.step}</div>
                  <h3 className="text-[32px] font-bold">{item.title}</h3>
                  <p className=" text-[20px] font-medium leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ================= FAQ ================= */}
          <div className="w-full p-10 rounded-[40px] flex flex-col items-center gap-[32px]" style={{ background: 'linear-gradient(0deg, #FFFFFF 15%, #E2C6FF 100%)' }}>
            <div className="text-center flex flex-col gap-[12px]">
              <h2 className="text-[32px] font-extrabold tracking-tight">Frequently Asked Question</h2>
              <p className="max-w-[750px] text-[#020617] text-[20px] font-medium">Find quick answers to common questions about book reservations, slot booking, loan policies, and how to make the most of your Lumenary account.</p>
            </div>
            <div className="w-full max-w-[720px] flex flex-col gap-[16px]">
              {faqs.map((faq, idx) => <AccordionItem key={idx} question={faq.q} answer={faq.a} />)}
            </div>
          </div>
          
          {/* ================= FOOTER ================= */}
          <footer className="w-full pt-6 pb-4 px-10 flex flex-col gap-[32px] border-t border-zinc-100 text-zinc-500 font-medium">
            <div className="flex flex-col md:flex-row justify-between items-start gap-[32px]">
              <div className="flex flex-col gap-[12px] max-w-[460px]">
                <div className="flex items-center gap-3">
                  <img className="w-[50px] h-[50px] object-contain" src="/logo.png" alt="Logo" />
                  <div className="flex flex-col gap-[2px]">
                    <span className="text-[#161B85] text-[24px] font-bold leading-none">Lumenary</span>
                    <span className="text-[#492073] text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                  </div>
                </div>
                <p className="text-zinc-600 text-[16px] font-medium leading-relaxed mt-2">Gunadarma University library application that provides online library book booking services to Gunadarma University students.</p>
              </div>
              <div className="grid grid-cols-2 gap-x-[48px] gap-y-[12px] text-[16px] text-zinc-600">
                <div className="flex flex-col gap-[16px]">
                  <a href="#" className="hover:text-black font-medium">Home</a>
                  <a href="#" className="hover:text-black font-medium">Explore Books</a>
                  <a href="#" className="hover:text-black font-medium">About Us</a>
                  <a href="#" className="hover:text-black font-medium">FAQ</a>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <a href="#" className="hover:text-black font-medium">Book Reservation</a>
                  <a href="#" className="hover:text-black font-medium">Seat Booking</a>
                  <a href="#" className="hover:text-black font-medium">Loan Rules</a>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[16px] font-medium border-t border-zinc-100 pt-5 text-zinc-600">
              <span>© Copyrights - All Right Reserved 2026</span>
              <span>Developed by Group 5, Gunadarma University</span>
            </div>
          </footer>

        </div>
      </div>
    </>
  );
}