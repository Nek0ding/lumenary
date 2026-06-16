import React from 'react';
import { Search, ArrowRight, ChevronUp, ChevronDown } from 'lucide-react';

export default function LumenaryLandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans antialiased">
      
      {/* HERO SECTION WITH GRADIENT BACKGROUND */}
      <div className="mx-auto max-w-[1440px] px-4 pt-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FFF5F5] via-[#E8F0FE] to-[#E0DDFE] pb-16 pt-6 px-8 md:px-16">
          
          {/* Navbar */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-2">
              {/* Logo Placeholder */}
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500" />
              <span className="text-xl font-bold text-[#1E1B4B]">Lumenary</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <a href="#" className="hover:text-indigo-600 transition">Home</a>
              <a href="#" className="hover:text-indigo-600 transition">Explore Books</a>
              <a href="#" className="hover:text-indigo-600 transition">Features</a>
              <a href="#" className="hover:text-indigo-600 transition">About</a>
            </div>

            <button className="rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-medium text-white shadow-md hover:opacity-90 transition">
              Get Started
            </button>
          </nav>

          {/* Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-6">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#1E1B4B] leading-tight">
                Your Next Chapter Starts Here <br />
                <span className="text-indigo-600">Book Instantly,</span>{' '}
                <span className="text-pink-500">Read Seamlessly</span>
              </h1>
              
              <p className="text-base text-slate-600 max-w-lg leading-relaxed">
                The ultimate digital gateway to streamline your book borrowing experience. 
                Instantly lock your reading list and pick it up at your preferred campus library 
                without the queue.
              </p>

              <button className="flex items-center gap-2 rounded-full bg-[#1E1B4B] px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-indigo-950 transition group">
                Explore Library
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[#1E1B4B] group-hover:translate-x-1 transition-transform">
                  <ArrowRight size={12} className="stroke-[3]" />
                </span>
              </button>
            </div>

            {/* Mockup Laptop Screen */}
            <div className="lg:col-span-6 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[520px] aspect-[16/10] bg-slate-900 rounded-xl p-2 shadow-2xl border-4 border-slate-800">
                {/* Inner UI Preview Placeholder */}
                <div className="w-full h-full bg-white rounded-lg overflow-hidden p-3 flex flex-col justify-between bg-gradient-to-tr from-slate-50 to-indigo-50">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div className="h-3 w-16 bg-slate-200 rounded animate-pulse" />
                    <div className="h-4 w-4 rounded-full bg-slate-300" />
                  </div>
                  <div className="flex-1 my-2 bg-indigo-900 rounded-lg p-4 text-white flex flex-col justify-center">
                    <p className="text-[10px] uppercase tracking-wider text-indigo-200">Welcome Back, Anggit!</p>
                    <p className="text-xs font-bold mt-1">Ready to Discover Your Next Reference?</p>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="h-8 bg-white border border-slate-100 rounded p-1" />
                    <div className="h-8 bg-white border border-slate-100 rounded p-1" />
                    <div className="h-8 bg-white border border-slate-100 rounded p-1" />
                  </div>
                </div>
                {/* Laptop Base Shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[110%] h-2 bg-slate-800/20 rounded-full blur-sm" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SEARCH BAR SECTION */}
      <div className="max-w-3xl mx-auto -mt-7 relative z-10 px-4">
        <div className="relative flex items-center bg-white rounded-full shadow-xl border border-slate-100 p-2 pl-6">
          <Search className="text-slate-400 mr-3 shrink-0" size={20} />
          <input 
            type="text" 
            placeholder="Search for a book title, author, or ISBN..." 
            className="w-full bg-transparent pr-4 text-sm focus:outline-none text-slate-700 placeholder-slate-400"
          />
        </div>
      </div>

      {/* TRENDING NOW SECTION */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-[#1E1B4B] mb-8">Trending Now</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* Book Cards */}
          {[
            { title: "Clean Code", author: "Robert C. Martin", bg: "bg-slate-900" },
            { title: "The Lean Startup", author: "Eric Ries", bg: "bg-blue-600" },
            { title: "Pride and Prejudice", author: "Jane Austen", bg: "bg-emerald-800" },
            { title: "Atomic Habits", author: "James Clear", bg: "bg-amber-50" },
            { title: "Dune", author: "Frank Patrick H.", bg: "bg-orange-700" }
          ].map((book, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer">
              {/* Cover Aspect Ratio Wrapper */}
              <div className={`aspect-[3/4] w-full ${book.bg} rounded-xl shadow-md overflow-hidden relative group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-1 flex items-center justify-center p-4`}>
                {/* Text representation of book cover */}
                <span className="text-center font-bold text-xs uppercase tracking-wider text-white mix-blend-difference">
                  {book.title}
                </span>
              </div>
              <h3 className="mt-3 font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-indigo-600 transition">
                {book.title}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ SECTION */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="rounded-[24px] bg-gradient-to-r from-[#F3E8FF] to-[#E0E7FF] p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-4 space-y-3">
            <h2 className="text-2xl font-bold text-[#1E1B4B]">Frequently Asked Question</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Find quick answers to common questions about our platform, food safety, and how you can start making an impact with Intersight.
            </p>
          </div>

          <div className="lg:col-span-8 space-y-3">
            {[
              "What is Lumenary and how does it work?",
              "How long can I hold a book reservation before picking it up?",
              "Can I book a specific study room or reading slot through Lumenary?",
              "What happens if I return a borrowed book late?"
            ].map((question, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <button className="w-full flex items-center justify-between p-4 text-left text-sm font-semibold text-[#1E1B4B] hover:bg-slate-50 transition">
                  <span>{question}</span>
                  {idx === 0 ? <ChevronUp size={16} className="text-slate-500" /> : <ChevronDown size={16} className="text-slate-500" />}
                </button>
                {idx === 0 && (
                  <div className="px-4 pb-4 text-xs text-slate-500 leading-relaxed border-t border-slate-50 pt-2">
                    Lumenary is an integrated library management system tailored for Gunadarma University students to reserve, explore, and borrow books efficiently online.
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-slate-100 bg-white pt-12 pb-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-8">
            
            <div className="md:col-span-6 space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500" />
                <span className="text-lg font-bold text-[#1E1B4B]">Lumenary</span>
              </div>
              <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
                Gunadarma University library application that provides online library book booking services to Gunadarma University students.
              </p>
            </div>

            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800">Project Kami</h4>
                <ul className="text-[11px] text-slate-500 space-y-1.5">
                  <li><a href="#" className="hover:text-indigo-600">Tentang Kami</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Hubungi Kami</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Blog</a></li>
                  <li><a href="#" className="hover:text-indigo-600">FAQ</a></li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-800">Product</h4>
                <ul className="text-[11px] text-slate-500 space-y-1.5">
                  <li><a href="#" className="hover:text-indigo-600">Overview</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Smart Dashboard</a></li>
                  <li><a href="#" className="hover:text-indigo-600">Chat Bot</a></li>
                </ul>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-100 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
            <p>© 2026 Lumenary . Developed by Group 5. Gunadarma University</p>
            <p>All Right Reserved</p>
          </div>
        </div>
      </footer>

    </div>
  );
}