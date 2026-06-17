
"use client";

import React, { useState, useEffect } from 'react';
const AccordionItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`w-full bg-white rounded-[20px] border-b-[4px] border-zinc-300 shadow-[0px_4px_8px_rgba(0,0,0,0.06)] 
      hover:border-zinc-400 hover:shadow-[0px_6px_12px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden`}
    >
      {/* Bagian Header yang bisa diklik */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-8 py-5 flex justify-between items-center cursor-pointer focus:outline-none"
      >
        <span className="text-[#020617] text-[18px] font-extrabold tracking-tight text-left">
          {question}
        </span>
        {/* Panah berputar saat terbuka */}
        <span className={`text-[20px] text-zinc-500 font-bold transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          ▲
        </span>
      </button>

      {/* Bagian Jawaban yang muncul/hilang */}
      <div
        className={`px-8 transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 pb-0 opacity-0'}`}
      >
        <p className="text-zinc-600 text-[16px] font-medium leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
};

// ================= MAIN LANDING PAGE =================
export default function LandingPage() {
  const [trendingBooks, setTrendingBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const faqs = [
    { q: "What is Lumenary and how does it work?", a: "Lumenary is a digital library system designed to help Gunadarma students book books and study slots online easily." },
    { q: "How long can I hold a book reservation before picking it up?", a: "You can hold a book reservation for up to 24 hours before you need to pick it up at the library counter." },
    { q: "Can I book a specific study room or reading slot through Lumenary?", a: "Yes, you can browse available study slots and reserve them through the features menu." },
    { q: "What happens if I return a borrowed book late?", a: "Late returns may result in a temporary suspension of borrowing privileges as per library policies." }
  ];
  useEffect(() => {
    fetch('http://localhost:3000/api/buku/trending')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Gagal mengambil data trending buku');
        }
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

  return (
    <div className="w-full bg-white min-h-screen py-10 px-4 md:px-[120px] font-['Plus_Jakarta_Sans',sans-serif] text-[#020617] antialiased flex justify-center">
      <div className="w-full max-w-[1200px] flex flex-col gap-10 md:gap-[40px]">

        {/* ================= HERO BOX (FRAME 655 ASLI FIGMA) ================= */}
        <div
          className="relative w-[1200px] h-[680px] rounded-[40px] overflow-hidden shadow-sm"
          style={{ background: 'linear-gradient(102.43deg, #FFFEF7 0%, #E2C6FF 83.81%)' }}
        >
          {/* Vector Latar Belakang 1 */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '988px',
              height: '415px',
              left: '271px',
              bottom: '0px',
              background: 'linear-gradient(107.93deg, #FFDFEC 22.78%, #B8BAE3 38.05%, #555CDA 61.53%)',
              opacity: 0.9,
              filter: 'blur(50px)',
              zIndex: 0
            }}
          />

          {/* Vector Latar Belakang 2 */}
          <div
            className="absolute pointer-events-none"
            style={{
              width: '746px',
              height: '194px',
              left: '503px',
              top: '0px',
              background: 'linear-gradient(93deg, #FFF0F6 6.55%, #E68AAF 97.08%)',
              filter: 'blur(50px)',
              zIndex: 0
            }}
          />

          {/* LAYER KONTEN UTAMA DENGAN POSISI ABSOLUTE KAKU */}
          <div className="absolute inset-0 z-10 w-full h-full">

            {/* NAVIGATION BAR */}
            <div className="absolute top-[40px] left-[40px] right-[40px] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  className="w-[50px] h-[50px] object-cover group-hover:scale-105"
                  src="/logo.png"
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[#161B85] text-[24px] font-bold tracking-wide leading-none">Lumenary</span>
                  <span className="text-[#492073] text-[12px] font-bold uppercase tracking-wider">Gunadarma Library</span>
                </div>
              </div>

              <div className="flex items-center gap-12">
                {['Home', 'Explore Books', 'Features', 'About'].map((menu) => (
                  <a key={menu} href={`#${menu.toLowerCase().replace(' ', '-')}`} className="text-[#020617] text-[20px] font-bold hover:opacity-70 transition-opacity">
                    {menu}
                  </a>
                ))}
              </div>

              <button
                className="px-6 py-2 text-[#FCFDE9] text-[20px] font-bold rounded-full shadow-[0px_2px_4px_rgba(0,0,0,0.25)] hover:brightness-110 transition-all active:scale-95"
                style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
              >
                Get Started
              </button>
            </div>

            {/* SISI KIRI: BLOK TEKS & TOMBOL UTAMA */}
            <div className="absolute left-[40px] top-[180px] w-[540px] flex flex-col gap-[24px]">
              <div className="flex flex-col gap-[12px]">
                <h1 className="text-[#020617] text-[36px] font-extrabold leading-[1.2] tracking-tight">
                  Your Next Chapter Starts Here
                </h1>
                <h2 className="text-[32px] font-bold leading-tight">
                  <span className="text-[#6B21A8]">Book Instantly, </span>
                  <span className="text-[#DB2777]">Read Seamlessly</span>
                </h2>
              </div>

              <p className="text-[#020617]/80 text-[16px] font-medium leading-relaxed text-justify">
                The ultimate digital gateway to streamline your book borrowing experience. Instantly lock your reading list and pick it up at your preferred campus library without the queue.
              </p>

              <button
                className="w-fit px-8 py-[14px] text-[#FCFDE9] text-[28px] font-bold rounded-full flex items-center gap-[12px] shadow-[0px_4px_6px_rgba(0,0,0,0.15)] group hover:brightness-105 transition-all"
                style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
              >
                Explore Library
                <div className="w-9 h-9 bg-white text-[#101464] rounded-full flex items-center justify-center font-bold text-[20px] group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </button>
            </div>

            {/* SISI KANAN: ILUSTRASI LAPTOP */}
            <div className="absolute right-[40px] top-[160px] w-[543px] h-[330px] flex items-center justify-center">
              <div
                className="w-full h-full rounded-[32px] opacity-25 absolute blur-md"
                style={{ background: 'linear-gradient(180deg, #DDDEF2 10.1%, #8EA1E6 44.71%, #3037B4 76.92%, #101464 100%)' }}
              />
              <img
                src="/laptop.png"
                alt="Lumenary Laptop Illustration"
                className="relative z-10 w-full h-auto max-w-[480px] object-contain drop-shadow-2xl"
              />
            </div>

            {/* FLOATING SEARCH BAR (FRAME 125) - POSISI FIXED DI BAWAH KOTAK */}
            <div
              className="absolute bottom-[40px] left-1/2 -translate-x-1/2 w-[842px] h-[72px] bg-white px-7 py-4 rounded-[20px] shadow-[0px_2px_4px_rgba(0,0,0,0.25)] flex items-center gap-[20px] border border-zinc-100"
            >
              <span className="text-zinc-400 text-[24px]"><svg xmlns="http://www.w3.org/2000/svg" width="33" height="33" viewBox="0 0 33 33" fill="none">
                <path d="M12.6865 21.3582C10.2643 21.3534 8.2161 20.5103 6.5419 18.8288C4.86769 17.1472 4.0324 15.0958 4.03602 12.6745C4.03965 10.2532 4.88258 8.20504 6.56481 6.53012C8.24704 4.85519 10.2984 4.02011 12.7188 4.02486C15.1393 4.02962 17.1879 4.87275 18.8648 6.55427C20.5417 8.23579 21.3765 10.2872 21.3693 12.7085C21.3675 13.6863 21.2102 14.6082 20.8975 15.4743C20.5848 16.3403 20.1611 17.1062 19.6266 17.7718L27.0793 25.2531C27.3233 25.498 27.4449 25.8094 27.4442 26.1872C27.4435 26.5649 27.3207 26.8758 27.0758 27.1198C26.8309 27.3637 26.5196 27.4853 26.1418 27.4846C25.764 27.4839 25.4531 27.361 25.2092 27.1161L17.7564 19.6348C17.0888 20.1668 16.3213 20.5875 15.4541 20.8969C14.5868 21.2063 13.6643 21.3601 12.6865 21.3582ZM12.6915 18.6915C14.3582 18.6948 15.7761 18.1144 16.9454 16.9505C18.1147 15.7866 18.7004 14.3709 18.7027 12.7033C18.7049 11.0357 18.1244 9.61816 16.9613 8.45054C15.7981 7.28292 14.3823 6.69658 12.7139 6.69152C11.0454 6.68647 9.62789 7.26724 8.46127 8.43384C7.29465 9.60044 6.70845 11.0157 6.70269 12.6797C6.69692 14.3437 7.27783 15.7618 8.44543 16.9338C9.61303 18.1059 11.0284 18.6918 12.6915 18.6915Z" fill="#B1B2B7" />
              </svg></span>
              <input
                type="text"
                placeholder="Search for a book title, author, or ISBN ..."
                className="w-full text-zinc-700 text-[20px] font-medium placeholder-[#B1B2B7] bg-transparent outline-none"
              />
            </div>

          </div>
        </div>

        {/* ================= TRENDING NOW SECTION ================= */}
        <div className="w-full flex flex-col items-center gap-[32px] pt-4">
          <div className="text-center flex flex-col gap-[12px]">
            <h2 className="text-[32px] font-extrabold tracking-tight">Trending Now</h2>
            <p className="text-zinc-600 text-[20px] font-medium">Check out the most popular and frequently borrowed books by students this week.</p>
          </div>

          {loading && (
            <div className="text-zinc-500 font-medium py-10 animate-pulse text-[16px]">Loading trending books...</div>
          )}

          {error && (
            <div className="text-red-500 font-medium py-10 text-[16px]">Gagal memuat data: {error}</div>
          )}

          {!loading && !error && (
            <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {trendingBooks.length > 0 ? (
                trendingBooks.map((book) => (
                  <div key={book.id_buku} className="flex flex-col gap-[12px] group cursor-pointer">
                    <div className="overflow-hidden rounded-[20px] shadow-sm group-hover:shadow-md transition-shadow aspect-[3/4] bg-zinc-100 relative">
                      <img
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        src={book.cover_buku || "https://placehold.co/230x320?text=No+Cover"}
                        alt={book.judul}
                      />
                      {book.rating_rata && (
                        <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm text-yellow-400 text-[12px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          ⭐ {book.rating_rata}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col gap-[12px]">
                      <h3 className="text-[16px] font-bold leading-tight truncate text-[#020617]" title={book.judul}>
                        {book.judul}
                      </h3>
                      <p className="text-zinc-500 text-[12px] font-normal">
                        {book.penulis}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-zinc-400 py-6 text-[16px]">Tidak ada buku trending minggu ini.</div>
              )}
            </div>
          )}
        </div>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <div className="w-full flex flex-col items-center gap-[32px] pt-4">
          <div className="text-center flex flex-col gap-[12px]">
            <h2 className="text-[32px] font-extrabold tracking-tight">How It Works?</h2>
            <p className="text-zinc-600 text-[20px] font-medium">Discover, reserve, and enjoy your favorite books in just three simple steps</p>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "Step 1", title: "Search & Select", desc: "Browse our extensive digital catalog and find the book or study slot you need." },
              { step: "Step 2", title: "Book Online", desc: "Reserve your book or reading space instantly with just a few clicks." },
              { step: "Step 3", title: "Pick Up & Read", desc: "Visit the library counter within 24 hours to claim your reservation and start reading." }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-8 bg-white rounded-[24px] border border-zinc-100 shadow-[0px_10px_20px_rgba(0,0,0,0.05)] flex flex-col gap-[12px] hover:shadow-[0px_15px_30px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="w-fit px-4 py-1 rounded-full border border-blue-600 text-blue-600 text-[12px] font-bold uppercase">
                  {item.step}
                </div>
                <h3 className="text-[24px] font-bold text-[#020617]">{item.title}</h3>
                <p className="text-zinc-600 text-[16px] font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ================= FAQ SECTION ================= */}
        <div
          className="w-full p-10 rounded-[40px] flex flex-col items-center gap-[32px]"
          style={{ background: 'linear-gradient(0deg, #FFFFFF 19.99%, #E2C6FF 100%)' }}
        >
          <div className="text-center flex flex-col gap-[12px]">
            <h2 className="text-[32px] font-extrabold tracking-tight">Frequently Asked Question</h2>
            {/* Teks di bawah ini telah diubah menjadi bold dengan font-bold */}
            <p className="max-w-[750px] text-[#020617] text-[16px] font-medium">
              Find quick answers to common questions about book reservations, slot booking, loan policies, and how to make the most of your Lumenary account.
            </p>
          </div>

          <div className="w-full max-w-[720px] flex flex-col gap-[16px]">
      {faqs.map((faq, idx) => (
        <AccordionItem key={idx} question={faq.q} answer={faq.a} />
      ))}
    </div>
        </div>
        {/* ================= FOOTER ================= */}
        <footer className="w-full pt-6 pb-4 flex flex-col gap-[32px] border-t border-zinc-100 text-zinc-500 font-medium">
          <div className="flex flex-col md:flex-row justify-between items-start gap-[32px]">
            <div className="flex flex-col gap-[12px] max-w-[460px]">
              <div className="flex items-center gap-3">
                <img
                  className="w-[50px] h-[50px] object-cover"
                  src="/logo.png"
                  alt="Logo"
                />
                <div className="flex flex-col gap-[2px]">
                  <span className="text-[#161B85] text-[20px] font-bold leading-none">Lumenary</span>
                  <span className="text-[#492073] text-[12px] font-extrabold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                </div>
              </div>
              <p className="text-zinc-600 text-[16px] font-normal leading-relaxed mt-2">
                Gunadarma University library application that provides online library book booking services to Gunadarma University students.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-[48px] gap-y-[12px] text-[16px] text-zinc-600">
              <div className="flex flex-col gap-[12px]">
                <a href="#" className="hover:text-black font-normal">Home</a>
                <a href="#" className="hover:text-black font-normal">Explore Books</a>
                <a href="#" className="hover:text-black font-normal">About Us</a>
                <a href="#" className="hover:text-black font-normal">FAQ</a>
              </div>
              <div className="flex flex-col gap-[12px]">
                <a href="#" className="hover:text-black font-normal">Book Reservation</a>
                <a href="#" className="hover:text-black font-normal">Seat Booking</a>
                <a href="#" className="hover:text-black font-normal">Loan Rules</a>
              </div>
            </div>
          </div>

          <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[12px] font-normal border-t border-zinc-100 pt-5 text-zinc-400">
            <span>© Copyrights - All Right Reserved 2026</span>
            <span>Developed by Group 5, Gunadarma University</span>
          </div>
        </footer>
        
      </div>
    </div>
  );
}