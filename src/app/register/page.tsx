'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        npm: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [agree, setAgree] = useState(false);

    // --- LOGIKA VERIFIKASI SESI KE SERVER (Sangat Aman) ---
    useEffect(() => {
        const verifySession = async () => {
            const token = localStorage.getItem('lumenary_token');
            if (!token) {
                setLoading(false);
                return;
            }
            try {
                const res = await fetch('/api/auth/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    router.replace('/dashboard');
                } else {
                    localStorage.removeItem('lumenary_token');
                    setLoading(false);
                }
            } catch {
                setLoading(false);
            }
        };
        verifySession();
    }, [router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!agree) {
            setError('Anda harus menyetujui Terms & Conditions.');
            return;
        }

        if (formData.npm.length !== 8 || !/^\d+$/.test(formData.npm)) {
            setError('NPM harus terdiri dari 8 digit angka.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('Password dan Konfirmasi Password tidak cocok!');
            return;
        }

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    npm: formData.npm,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await res.json();
            if (res.ok && data.success) {
                router.replace('/login'); // Redirect ke login setelah daftar
            } else {
                setError(data.message || 'Registrasi gagal.');
            }
        } catch (error) {
            setError('Terjadi kesalahan pada server.');
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white text-black font-['Plus_Jakarta_Sans',sans-serif] antialiased justify-center overflow-hidden">
            <div className="flex w-full max-w-[1440px] px-6 md:px-[80px]">

                {/* SISI KIRI (SAMA SEPERTI LOGIN) */}
                <div className="hidden lg:flex relative w-1/2 flex-col justify-center pl-[40px] xl:pl-[80px] pr-12 xl:pr-24">
                    <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/background-login.jpg')` }} />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#161B85]/70 via-[#492073]/50 to-[#101464]/90" />
                    <div className="relative z-10 flex flex-col gap-6 text-white mt-12">
                        <h1 className="text-[36px] xl:text-[48px] font-bold leading-[1.15] mb-4">Step Into the<br />World of Words.</h1>
                        <p className="text-[14px] xl:text-[18px] font-medium text-indigo-100/90 leading-relaxed max-w-[420px]">
                            Create your student account today to reserve books online, build your wishlist, and stay notified about book returns.
                        </p>
                    </div>
                </div>

                {/* SISI KANAN (FORM REGISTER) */}
                <div className="w-full lg:w-1/2 flex items-center justify-center py-12 relative">
                    <div className="w-full max-w-[420px] flex flex-col gap-6 mt-12">
                        <div className="flex flex-col gap-2">
                            <h2 className="text-[28px] sm:text-[32px] font-extrabold text-[#000000] tracking-tight">Create Your Account</h2>
                            <p className="text-[14px] sm:text-[16px] font-medium text-[#000000]">Register with your student details to start exploring Lumenary.</p>
                        </div>

                        <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-4">
                            {error && <p className="text-red-500 text-[13px] font-semibold">*{error}</p>}

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">NPM</label>
                                <input type="text" placeholder="Enter your NPM" value={formData.npm} onChange={(e) => setFormData({ ...formData, npm: e.target.value })} maxLength={8} className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85]" required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">University Email</label>
                                <input type="email" placeholder="your-email@student.gunadarma.ac.id" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85]" required />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">Password</label>
                                <div className="relative">
                                    <input type={showPassword ? "text" : "password"} placeholder="Create a strong password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} className="w-full h-[48px] px-4 pr-10 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85]" required />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">Confirm Password</label>
                                <input type="password" placeholder="Re-enter your password" value={formData.confirmPassword} onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85]" required />
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    className="w-4 h-4 rounded border-zinc-300 text-[#161B85] focus:ring-[#161B85] cursor-pointer"
                                />
                                <span className="text-[13px] text-zinc-600">
                                    I agree to Lumenary's{' '}
                                    <Link href="/terms" className="font-bold text-[#161B85] hover:underline">
                                        Terms & Conditions
                                    </Link>
                                    {' '}and{' '}
                                    <Link href="/privacy" className="font-bold text-[#161B85] hover:underline">
                                        Privacy Policy
                                    </Link>.
                                </span>
                            </div>

                            <button type="submit" className="w-full h-[52px] mt-4 rounded-full text-white font-bold text-[18px]" style={{ background: 'linear-gradient(90deg, #D0DCFE 0%, #161B85 100%)' }}>
                                Create Account
                            </button>
                        </form>

                        <div className="flex justify-center items-center gap-2 text-[14px]">
                            <span className="text-zinc-600">Already have an account?</span>
                            <Link href="/login" className="font-bold text-[#161B85]">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}