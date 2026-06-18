'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
    const router = useRouter();
    const [npm, setNpm] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSignInSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Fungsi login siap disambungkan ke API!');
    };
    const landingPage = () => {
        router.push('/')
    };

    return (
        // ✅ 1. ROOT DIV: Selalu putih dan menggunakan justify-center agar isi selalu di tengah
        <div className="flex min-h-screen w-full bg-white text-black font-['Plus_Jakarta_Sans',sans-serif] antialiased justify-center overflow-hidden">

            {/* ✅ 2. INNER WRAPPER: Mengunci lebar maksimal (1440px) persis seperti Landing Page */}
            <div className="flex w-full max-w-[1440px] px-6 md:px-[80px]">

                {/* ================= SISI KIRI (GAMBAR & TEKS) ================= */}
                <div className="hidden lg:flex relative w-1/2 flex-col justify-center pl-[40px] xl:pl-[80px] pr-12 xl:pr-24">

                    {/* Background Image Setup */}
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url('/background-login.jpg')` }}
                    />

                    {/* Layer Overlay */}
                    <div className="absolute inset-0 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#161B85]/70 via-[#492073]/50 to-[#101464]/90" />

                    {/* Logo Lumenary */}
                    <div className="absolute top-8 left-[24px] xl:top-5 xl:left-[10px] z-20 flex items-center gap-3 text-white cursor-pointer" onClick={landingPage}>
                        <img src="/logo.png" alt="Lumenary Logo" className="w-10 h-10 xl:w-12 xl:h-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl xl:text-2xl font-bold leading-none tracking-wide">Lumenary</span>
                            <span className="text-[7px] xl:text-[8px] font-normal uppercase tracking-widest text-[#E2C6FF] mt-[2px]">Gunadarma Library</span>
                        </div>
                    </div>

                    {/* Konten Kiri (Hanya Heading & Paragraf) */}
                    <div className="relative z-10 flex flex-col gap-6 text-white mt-12">
                        <div>
                            <h1 className="text-[36px] xl:text-[48px] font-bold leading-[1.15] mb-4 tracking-tight">
                                Illuminating Your<br />Intellectual Journey.
                            </h1>
                            <p className="text-[14px] xl:text-[18px] font-medium text-indigo-100/90 leading-relaxed max-w-[420px]">
                                Access thousands of library books, track your ongoing loans, and enjoy a personalized reading dashboard curated just for you.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ================= SISI KANAN (FORM LOGIN) ================= */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-12 relative">

                    {/* Logo untuk versi Mobile */}
                    <div className="absolute top-2 left-0 flex lg:hidden items-center gap-3">
                        <img src="/logo.png" alt="Lumenary Logo" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold leading-none tracking-wide text-[#161B85]">Lumenary</span>
                        </div>
                    </div>

                    <div className="w-full max-w-[420px] flex flex-col gap-6 sm:gap-8 mt-12 lg:mt-0">

                        {/* Header Form */}
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#000000] tracking-tight">
                                Welcome Back!
                            </h2>
                            <p className="text-[14px] sm:text-[16px] font-medium text-[#000000] leading-relaxed">
                                Please enter your student credentials to access your library account.
                            </p>
                        </div>

                        {/* Form Utama */}
                        <form onSubmit={handleSignInSubmit} className="flex flex-col gap-5 sm:gap-6">

                            {/* Input NPM */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] xl:text-[20px] font-bold text-[#000000]">Student ID Number (NPM)</label>
                                <input
                                    type="text"
                                    placeholder="Enter your id number"
                                    value={npm}
                                    onChange={(e) => setNpm(e.target.value)}
                                    className="w-full h-[48px] sm:h-[52px] xl:h-[48px] px-4 rounded-xl border border-zinc-300 bg-white text-black placeholder-zinc-400 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] transition-all text-[14px] sm:text-[15px] font-medium"
                                    required
                                />
                            </div>

                            {/* Input Password dengan Toggle Mata */}
                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] xl:text-[20px] font-bold text-[#000000]">Password</label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Create a strong password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full h-[48px] sm:h-[52px] xl:h-[48px] px-4 pr-12 rounded-xl border border-zinc-300 bg-white text-black placeholder-zinc-400 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] transition-all text-[14px] sm:text-[15px] font-medium"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-none"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Options Row */}
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-[-4px] gap-3 sm:gap-0">
                                <label className="flex items-center gap-2 cursor-pointer group w-fit">
                                    <input type="checkbox" className="w-4 h-4 rounded border-zinc-300 text-[#161B85] focus:ring-[#161B85] cursor-pointer" />
                                    <span className="text-[13px] font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">Keep me signed in</span>
                                </label>
                                <Link href="/forgot-password" className="text-[13px] font-medium text-zinc-500 hover:text-[#161B85] transition-colors w-fit">
                                    Forgot your password?
                                </Link>
                            </div>

                            {/* Button Sign In */}
                            <button
                                type="submit"
                                className="w-full h-[52px] sm:h-[56px] mt-2 rounded-full text-white text-[18px] sm:text-[20px] font-bold shadow-md hover:shadow-xl hover:opacity-95 transition-all active:scale-[0.98] flex items-center justify-center"
                                style={{ background: 'linear-gradient(90deg, #D0DCFE 0%, #161B85 100%)' }}
                            >
                                Sign In
                            </button>
                        </form>

                        {/* Divider Area */}
                        <div className="flex items-center gap-4 my-2">
                            <div className="flex-1 h-px bg-zinc-200"></div>
                            <span className="text-[13px] font-medium text-zinc-400">Or sign up with</span>
                            <div className="flex-1 h-px bg-zinc-200"></div>
                        </div>

                        {/* Sign Up Link */}
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-[14px] sm:text-[15px] font-medium text-zinc-600">New to Lumenary?</span>
                            <Link href="/register" className="text-[14px] sm:text-[15px] font-bold hover:opacity-80 transition-opacity" style={{ background: 'linear-gradient(90deg, #6B83FF 0%, #161B85 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                                Sign Up Here
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}