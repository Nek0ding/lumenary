'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2 } from 'lucide-react'; // Tambahkan Loader2

export default function LoginPage() {
    const router = useRouter();
    const [npm, setNpm] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true); // Loading untuk cek sesi awal
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading untuk tombol submit
    const [keepSignedIn, setKeepSignedIn] = useState(false);

    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem('lumenary_token');

            // Tidak ada token sama sekali — langsung tampilkan form
            if (!token) {
                setLoading(false);
                return;
            }

            // Ada token — verifikasi ke server apakah masih valid
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                const data = await res.json();

                if (res.ok) {
                    // Token valid — cek role untuk redirect yang sesuai
                    if (data.user?.role === 'ADMIN') {
                        router.replace('/admin/dashboard');
                    } else {
                        router.replace('/dashboard');
                    }
                } else {
                    // Token tidak valid / expired — bersihkan storage
                    localStorage.removeItem('lumenary_token');
                    localStorage.removeItem('lumenary_user');
                    setLoading(false);
                }
            } catch {
                setLoading(false);
            }
        };

        verifySession();
    }, [router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const handleSignInSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsSubmitting(true); // Aktifkan animasi loading tombol

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ npm, password }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                localStorage.setItem('lumenary_token', data.token);
                localStorage.setItem('lumenary_user', JSON.stringify(data.user));

                // Jika tidak centang "Keep me signed in", tandai sebagai session-only
                if (!keepSignedIn) {
                    sessionStorage.setItem('lumenary_session_only', 'true');
                }

                // REDIRECT BERDASARKAN ROLE
                if (data.user.role === 'ADMIN') {
                    router.replace('/admin/dashboard');
                } else {
                    router.replace('/dashboard');
                }
            } else {
                setError(data.message || 'Login failed, check your credential.');
            }
        } catch {
            setError('Terjadi kesalahan pada server. Coba lagi nanti.');
        } finally {
            setIsSubmitting(false); // Matikan animasi loading tombol
        }
    };

    const landingPage = () => router.push('/');

    return (
        <div className="flex min-h-screen w-full bg-white text-black font-['Plus_Jakarta_Sans',sans-serif] antialiased justify-center overflow-hidden">
            <div className="flex w-full max-w-[1440px] px-6 md:px-[80px]">

                {/* ================= SISI KIRI ================= */}
                <div className="hidden lg:flex relative w-1/2 flex-col justify-center pl-[40px] xl:pl-[80px] pr-12 xl:pr-24">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/background-login.jpg')` }} />
                    <div className="absolute inset-0 mix-blend-multiply" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#161B85]/70 via-[#492073]/50 to-[#101464]/90" />

                    {/* Logo */}
                    <div className="absolute top-8 left-[24px] xl:top-5 xl:left-[10px] z-20 flex items-center gap-3 text-white cursor-pointer" onClick={landingPage}>
                        <img src="/logo.png" alt="Lumenary Logo" className="w-10 h-10 xl:w-12 xl:h-12 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl xl:text-2xl font-bold leading-none tracking-wide">Lumenary</span>
                            <span className="text-[7px] xl:text-[8px] font-normal uppercase tracking-widest text-[#E2C6FF] mt-[2px]">Gunadarma Library</span>
                        </div>
                    </div>

                    <div className="relative z-10 flex flex-col gap-6 text-white mt-12">
                        <h1 className="text-[36px] xl:text-[48px] font-bold leading-[1.15] mb-4 tracking-tight">
                            Illuminating Your<br />Intellectual Journey.
                        </h1>
                        <p className="text-[14px] xl:text-[18px] font-medium text-indigo-100/90 leading-relaxed max-w-[420px]">
                            Access thousands of library books, track your ongoing loans, and enjoy a personalized reading dashboard curated just for you.
                        </p>
                    </div>
                </div>

                {/* ================= SISI KANAN ================= */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-12 relative">

                    {/* Logo Mobile */}
                    <div className="absolute top-2 left-0 flex lg:hidden items-center gap-3">
                        <img src="/logo.png" alt="Lumenary Logo" className="w-10 h-10 object-contain" />
                        <div className="flex flex-col">
                            <span className="text-xl font-bold leading-none tracking-wide text-[#161B85]">Lumenary</span>
                        </div>
                    </div>

                    <div className="w-full max-w-[420px] flex flex-col gap-6 sm:gap-8 mt-12 lg:mt-0">

                        <div className="flex flex-col gap-2">
                            <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#000000] tracking-tight">Welcome Back!</h2>
                            <p className="text-[14px] sm:text-[16px] font-medium text-[#000000] leading-relaxed">
                                Please enter your student credentials to access your library account.
                            </p>
                        </div>

                        <form onSubmit={handleSignInSubmit} className="flex flex-col gap-5 sm:gap-6">

                            <div className="flex flex-col gap-2">
                                {error && (
                                    <p className="text-red-500 text-[13px] md:text-[14px] font-semibold tracking-wide animate-in fade-in duration-200">
                                        *{error}
                                    </p>
                                )}
                                <label className="text-[16px] xl:text-[20px] font-bold text-[#000000]">Student ID Number (NPM)</label>
                                <input
                                    type="text"
                                    placeholder="Enter your id number"
                                    value={npm}
                                    onChange={(e) => setNpm(e.target.value)}
                                    maxLength={8} 
                                    disabled={isSubmitting}
                                    className="w-full h-[48px] sm:h-[52px] xl:h-[48px] px-4 rounded-xl border border-zinc-300 bg-white text-black placeholder-zinc-400 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] transition-all text-[14px] sm:text-[15px] font-medium disabled:opacity-50 disabled:bg-zinc-50"
                                    required
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[16px] xl:text-[20px] font-bold text-[#000000]">Password</label>
                                <div className="relative w-full">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={isSubmitting}
                                        className="w-full h-[48px] sm:h-[52px] xl:h-[48px] px-4 pr-12 rounded-xl border border-zinc-300 bg-white text-black placeholder-zinc-400 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] transition-all text-[14px] sm:text-[15px] font-medium disabled:opacity-50 disabled:bg-zinc-50"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isSubmitting}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors focus:outline-none disabled:opacity-50"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-[-4px] gap-3 sm:gap-0">
                                <label className="flex items-center gap-2 cursor-pointer group w-fit">
                                    <input
                                        type="checkbox"
                                        checked={keepSignedIn}
                                        onChange={(e) => setKeepSignedIn(e.target.checked)}
                                        disabled={isSubmitting}
                                        className="w-4 h-4 rounded border-zinc-300 text-[#161B85] focus:ring-[#161B85] cursor-pointer disabled:opacity-50"
                                    />
                                    <span className="text-[13px] font-medium text-zinc-500 group-hover:text-zinc-700 transition-colors">Keep me signed in</span>
                                </label>
                                <Link href="/forgot-password" className="text-[13px] font-medium text-zinc-500 hover:text-[#161B85] transition-colors w-fit">
                                    Forgot your password?
                                </Link>
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full h-[52px] sm:h-[56px] mt-2 rounded-full text-white text-[18px] sm:text-[20px] font-bold shadow-md transition-all flex items-center justify-center gap-2
                                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-xl hover:opacity-95 active:scale-[0.98]'}`}
                                style={{ background: 'linear-gradient(90deg, #D0DCFE 0%, #161B85 100%)' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin text-white" />
                                        Signing In...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </form>

                        <div className="flex items-center gap-4 my-2">
                            <div className="flex-1 h-px bg-zinc-200"></div>
                            <span className="text-[13px] font-medium text-zinc-400">Or sign up with</span>
                            <div className="flex-1 h-px bg-zinc-200"></div>
                        </div>

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