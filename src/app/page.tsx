"use client";
import React, { useState, useEffect } from 'react';

// ================= KOMPONEN LOGO SVG =================
function LogoIcon() {
  return (
    <svg
      width="50"
      height="50"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-sm"
    >
      <defs>
        <linearGradient id="bluePetalGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0B116E" />
          <stop offset="60%" stopColor="#3139C2" />
          <stop offset="100%" stopColor="#8DA3FF" />
        </linearGradient>
        <radialGradient id="starGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFE3E8" stopOpacity="1" />
          <stop offset="50%" stopColor="#FF9EB5" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="28" r="25" fill="url(#starGlow)" />
      <path d="M38 90 C22 80 14 55 26 36 C32 26 44 22 50 25 C42 35 34 50 42 70 C44 75 42 85 38 90 Z" fill="url(#bluePetalGrad)" opacity="0.85" />
      <path d="M38 90 C28 75 25 55 36 44 C42 38 52 38 56 44 C48 52 42 66 46 80 C46 84 42 88 38 90 Z" fill="url(#bluePetalGrad)" />
      <path d="M38 90 C34 70 50 54 68 46 C78 42 88 48 90 56 C80 58 60 62 50 82 C46 88 42 90 38 90 Z" fill="url(#bluePetalGrad)" />
      <path d="M38 90 C45 86 60 92 78 88 C88 86 92 78 86 74 C78 78 60 76 46 86 C42 89 40 90 38 90 Z" fill="url(#bluePetalGrad)" opacity="0.9" />
      <path d="M60 13 C60 23 61 28 68 28 C61 28 60 33 60 43 C60 33 59 28 52 28 C59 28 60 23 60 13 Z" fill="#FFFFFF" />
    </svg>
  );
}

// ================= MAIN LANDING PAGE =================
export default function LandingPage() {
  // 1. Inisialisasi State untuk menampung data dari API
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Mengambil data dari API saat komponen pertama kali di-render
  useEffect(() => {
    fetch('http://localhost:3000/api/buku/trending')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data trending buku');
        }
        return response.json();
      })
      .then((data) => {
        // Asumsi API mengembalikan sebuah array objek buku langsung, atau objek dengan property data/books.
        // Sesuaikan jika format API Anda berbentuk: { data: [...] } menjadi setTrendingBooks(data.data)
        setTrendingBooks(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="w-full bg-white min-h-screen py-10 px-4 font-['Plus_Jakarta_Sans'] text-[#020617]">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-16">

        {/* ================= HERO & NAV BOX ================= */}
        <div className="relative w-full min-h-[680px] bg-gradient-to-br from-[#FFFEF7] to-[#E2C6FF] rounded-[40px] p-10 flex flex-col justify-between overflow-hidden shadow-sm">

          <div className="absolute w-[988px] h-[415px] -right-10 -bottom-20 bg-gradient-to-r from-[#FFDFEC] via-[#B8BAE3] to-[#555CDA] opacity-80 blur-[60px] pointer-events-none z-0" />
          <div className="absolute w-[746px] h-[194px] right-20 top-0 bg-gradient-to-r from-[#FFF0F6] to-[#E68AAF] opacity-70 blur-[50px] pointer-events-none z-0" />

          <div className="relative z-10 flex flex-col justify-between h-full min-h-[600px]">

            {/* NAVIGATION BAR */}
            <nav className="w-full flex items-center justify-between">
              <div className="flex items-center gap-3">
                <LogoIcon />
                <div className="flex flex-col">
                  <span className="text-[#161B85] text-2xl font-bold tracking-wide leading-none">Lumenary</span>
                  <span className="text-[#492073] text-[8px] font-bold uppercase tracking-wider mt-1">Gunadarma Library</span>
                </div>
              </div>

              <div className="hidden md:flex items-center gap-12">
                {['Home', 'Explore Books', 'Features', 'About'].map((menu) => (
                  <a key={menu} href={`#${menu.toLowerCase().replace(' ', '-')}`} className="text-[#020617] text-[18px] font-bold hover:opacity-70 transition-opacity">
                    {menu}
                  </a>
                ))}
              </div>

              <button className="px-6 py-2 bg-gradient-to-b from-[#3037B4] to-[#101464] text-[#FCFDE9] text-base font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:opacity-90 transition-all active:scale-95">
                Get Started
              </button>
            </nav>

            {/* HERO KONTEN (Teks & Laptop) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center my-auto pt-4">
              <div className="lg:col-span-6 flex flex-col gap-6 max-w-[530px]">
                <div className="flex flex-col gap-2">
                  <h1 className="text-[#020617] text-[40px] font-bold leading-[1.15] tracking-tight">
                    Your Next Chapter Starts Here
                  </h1>
                  <h2 className="text-[36px] font-bold leading-none bg-gradient-to-r from-[#A347FF] to-[#E68AAF] bg-clip-text text-transparent [text-shadow:_0px_1px_4px_rgba(255,255,255,0.2)]">
                    Book Instantly, Read Seamlessly
                  </h2>
                </div>

                <p className="text-[#020617]/80 text-base font-medium leading-relaxed text-justify">
                  The ultimate digital gateway to streamline your book borrowing experience. Instantly lock your reading list and pick it up at your preferred campus library without the queue.
                </p>

                <button className="w-fit px-8 py-4 bg-gradient-to-r from-[#3037B4] to-[#101464] text-white text-2xl font-bold rounded-full flex items-center gap-4 shadow-md group hover:opacity-95 transition-opacity">
                  Explore Library
                  <div className="w-8 h-8 bg-white text-[#101464] rounded-full flex items-center justify-center font-extrabold text-lg group-hover:translate-x-1 transition-transform">
                    →
                  </div>
                </button>
              </div>

              <div className="lg:col-span-6 flex justify-end items-center relative">
                <div className="relative z-10 w-full md:w-[480px] h-[280px] md:h-[350px] flex items-center justify-center mt-8 md:mt-0">
                  <div className="w-full h-full max-w-[543px] max-h-[330px] bg-gradient-to-b from-[#DDDEF2] via-[#8EA1E6] via-[#3037B4] to-[#101464] rounded-[32px] opacity-25 absolute blur-md"></div>
                  <img
                    src="/laptop.png"
                    alt="Lumenary Laptop Illustration"
                    className="relative z-10 w-full h-auto max-w-[450px] object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>

            {/* FLOATING SEARCH BAR */}
            <div className="w-full max-w-[840px] mx-auto bg-white px-7 py-4 rounded-full shadow-[0px_4px_10px_rgba(0,0,0,0.1)] flex items-center gap-4 border border-purple-100/50">
              <span className="text-zinc-400 text-xl">🔍</span>
              <input
                type="text"
                placeholder="Search for a book title, author, or ISBN ..."
                className="w-full text-zinc-700 text-lg font-medium placeholder-[#B1B2B7] bg-transparent outline-none"
              />
            </div>

          </div>
        </div>

        {/* ================= TRENDING NOW SECTION (DINAMIS) ================= */}
        <div className="w-full flex flex-col items-center gap-8 pt-6">
          <div className="text-center">
            <h2 className="text-[32px] font-extrabold tracking-tight">Trending Now</h2>
            <p className="text-zinc-600 text-lg font-medium mt-1">Check out the most popular and frequently borrowed books by students this week.</p>
          </div>

          {loading && (
            <div className="text-zinc-500 font-medium py-10 animate-pulse">Loading trending books...</div>
          )}

          {error && (
            <div className="text-red-500 font-medium py-10">Gagal memuat data: {error}</div>
          )}

          {!loading && !error && (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {trendingBooks.length > 0 ? (
                trendingBooks.map((book) => (
                  <div key={book.id_buku} className="flex flex-col gap-3 group cursor-pointer">
                    <div className="overflow-hidden rounded-[20px] shadow-sm group-hover:shadow-md transition-shadow aspect-[3/4] bg-zinc-100 relative">
                      {/* MENYESUAIKAN: Menggunakan properti book.cover_buku */}
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={book.cover_buku || "https://placehold.co/230x320?text=No+Cover"}
                        alt={book.judul}
                      />
                      {/* Badge Rating opsional dari API */}
                      {book.rating_rata && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          ⭐ {book.rating_rata}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      {/* MENYESUAIKAN: Menggunakan properti book.judul dan book.penulis */}
                      <h3 className="text-[16px] font-bold leading-tight truncate text-[#020617]" title={book.judul}>
                        {book.judul}
                      </h3>
                      <p className="text-zinc-500 text-xs font-medium mt-1">
                        {book.penulis}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-zinc-400 py-6">Tidak ada buku trending minggu ini.</div>
              )}
            </div>
          )}
        </div>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <div className="w-full flex flex-col items-center gap-8 pt-6">
          <div className="text-center">
            <h2 className="text-[32px] font-extrabold tracking-tight">How It Works?</h2>
            <p className="text-zinc-600 text-lg font-medium mt-1">Discover, reserve, and enjoy your favorite books in just three simple steps</p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "Step 1", title: "Search & Select", desc: "Browse our extensive digital catalog and find the book or study slot you need." },
              { step: "Step 2", title: "Book Online", desc: "Reserve your book or reading space instantly with just a few clicks." },
              { step: "Step 3", title: "Pick Up & Read", desc: "Visit the library counter within 24 hours to claim your reservation and start reading." }
            ].map((item, idx) => (
              <div key={idx} className="p-8 bg-white rounded-[20px] border border-zinc-100 shadow-[0px_4px_12px_rgba(0,0,0,0.03)] flex flex-col gap-4">
                <div className="w-fit px-4 py-1 rounded-full border border-blue-600 text-blue-600 text-xs font-bold uppercase">
                  {item.step}
                </div>
                <h3 className="text-[24px] font-bold text-[#020617]">{item.title}</h3>
                <p className="text-zinc-600 text-base font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FAQ SECTION ================= */}
        <div className="w-full p-10 bg-gradient-to-b from-white to-[#E2C6FF]/30 rounded-[40px] flex flex-col items-center gap-8">
          <div className="text-center flex flex-col gap-2">
            <h2 className="text-[32px] font-extrabold tracking-tight">Frequently Asked Question</h2>
            <p className="max-w-[750px] text-zinc-600 text-base font-medium">
              Find quick answers to common questions about book reservations, slot booking, loan policies, and how to make the most of your Lumenary account.
            </p>
          </div>

          <div className="w-full max-w-[720px] flex flex-col gap-3">
            {[
              "What is Lumenary and how does it work?",
              "How long can I hold a book reservation before picking it up?",
              "Can I book a specific study room or reading slot through Lumenary?",
              "What happens if I return a borrowed book late?"
            ].map((faq, idx) => (
              <div key={idx} className="w-full px-6 py-4 bg-white rounded-full shadow-sm flex justify-between items-center cursor-pointer hover:bg-zinc-50/80 transition-colors border border-purple-100/20">
                <span className="text-[#020617] text-base font-bold tracking-tight">{faq}</span>
                <span className="text-lg text-zinc-500">▲</span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <footer className="w-full pt-6 pb-4 flex flex-col gap-8 border-t border-zinc-100 text-zinc-500 font-medium">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="flex flex-col gap-3 max-w-[460px]">
              <div className="flex items-center gap-3">
                <LogoIcon />
                <span className="text-[#161B85] text-xl font-bold">Lumenary</span>
              </div>
              <p className="text-zinc-600 text-sm leading-relaxed">
                Gunadarma University library application that provides online library book booking services to Gunadarma University students.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-2 text-sm text-zinc-600">
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-black">Home</a>
                <a href="#" className="hover:text-black">Explore Books</a>
                <a href="#" className="hover:text-black">About Us</a>
                <a href="#" className="hover:text-black">FAQ</a>
              </div>
              <div className="flex flex-col gap-2">
                <a href="#" className="hover:text-black">Book Reservation</a>
                <a href="#" className="hover:text-black">Seat Booking</a>
                <a href="#" className="hover:text-black">Loan Rules</a>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-xs border-t border-zinc-100 pt-5 text-zinc-400">
            <span>© Copyrights - All Right Reserved 2026</span>
            <span>Developed by Group 5, Gunadarma University</span>
          </div>
        </footer>

      </div>
    </div>
  );
}