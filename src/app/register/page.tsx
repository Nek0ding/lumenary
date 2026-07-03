'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, X, ShieldCheck, ScrollText, EyeIcon, Landmark } from 'lucide-react';

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
    const [isSubmitting, setIsSubmitting] = useState(false); 
    const [agree, setAgree] = useState(false);
    
    // State kontrol penampilan modal overlay
    const [isTermsOpen, setIsTermsOpen] = useState(false);
    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

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
                const data = await res.json();
                
                if (res.ok) {
                    if (data.user?.role === 'admin') {
                        router.replace('/admin/dashboard');
                    } else {
                        router.replace('/dashboard');
                    }
                } else {
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

    if (loading) return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-3 bg-white">
            <Loader2 size={32} className="animate-spin text-[#161B85]" />
            <p className="text-sm font-bold text-zinc-500">Verifying session...</p>
        </div>
    );

    const handleRegisterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!agree) {
            setError('Anda harus menyetujui Terms & Conditions dan Privacy Policy.');
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

        setIsSubmitting(true);

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
                router.replace('/login');
            } else {
                setError(data.message || 'Registrasi gagal.');
            }
        } catch (error) {
            setError('Terjadi kesalahan pada server.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-white text-black font-['Plus_Jakarta_Sans',sans-serif] antialiased justify-center overflow-hidden relative">
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
                            {error && <p className="text-red-500 text-[13px] font-semibold animate-in fade-in duration-200">*{error}</p>}

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">NPM</label>
                                <input 
                                    type="text" 
                                    placeholder="Enter your NPM" 
                                    value={formData.npm} 
                                    onChange={(e) => setFormData({ ...formData, npm: e.target.value })} 
                                    maxLength={8} 
                                    disabled={isSubmitting}
                                    className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85] disabled:opacity-50 disabled:bg-zinc-50 transition-all text-sm font-semibold" 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">University Email</label>
                                <input 
                                    type="email" 
                                    placeholder="your-email@student.gunadarma.ac.id" 
                                    value={formData.email} 
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                                    disabled={isSubmitting}
                                    className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85] disabled:opacity-50 disabled:bg-zinc-50 transition-all text-sm font-semibold" 
                                    required 
                                />
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">Password</label>
                                <div className="relative">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        placeholder="Create a strong password" 
                                        value={formData.password} 
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })} 
                                        disabled={isSubmitting}
                                        className="w-full h-[48px] px-4 pr-10 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85] disabled:opacity-50 disabled:bg-zinc-50 transition-all text-sm font-semibold" 
                                        required 
                                    />
                                    <button 
                                        type="button" 
                                        onClick={() => setShowPassword(!showPassword)} 
                                        disabled={isSubmitting}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 disabled:opacity-50"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-[14px] font-bold">Confirm Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Re-enter your password" 
                                    value={formData.confirmPassword} 
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} 
                                    disabled={isSubmitting}
                                    className="w-full h-[48px] px-4 rounded-xl border border-zinc-300 outline-none focus:border-[#161B85] disabled:opacity-50 disabled:bg-zinc-50 transition-all text-sm font-semibold" 
                                    required 
                                />
                            </div>
                            
                            <div className="flex items-start gap-2 mt-2">
                                <input
                                    type="checkbox"
                                    checked={agree}
                                    onChange={(e) => setAgree(e.target.checked)}
                                    disabled={isSubmitting}
                                    className="w-4 h-4 mt-0.5 rounded border-zinc-300 text-[#161B85] focus:ring-[#161B85] cursor-pointer disabled:opacity-50 shrink-0"
                                />
                                <span className="text-[13px] text-zinc-600">
                                    I agree to Lumenary's{' '}
                                    <button 
                                        type="button" 
                                        onClick={() => setIsTermsOpen(true)} 
                                        className="font-bold text-[#161B85] hover:underline bg-transparent border-none p-0 cursor-pointer inline"
                                    >
                                        Terms & Conditions
                                    </button>
                                    {' '}and{' '}
                                    <button 
                                        type="button" 
                                        onClick={() => setIsPrivacyOpen(true)} 
                                        className="font-bold text-[#161B85] hover:underline bg-transparent border-none p-0 cursor-pointer inline"
                                    >
                                        Privacy Policy
                                    </button>.
                                </span>
                            </div>

                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className={`w-full h-[52px] mt-4 rounded-full text-white font-bold text-[18px] transition-all flex items-center justify-center gap-2
                                    ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg active:scale-[0.98]'}`} 
                                style={{ background: 'linear-gradient(90deg, #D0DCFE 0%, #161B85 100%)' }}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 size={24} className="animate-spin text-white" />
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>
                        </form>

                        <div className="flex justify-center items-center gap-2 text-[14px]">
                            <span className="text-zinc-600">Already have an account?</span>
                            <Link href="/login" className="font-bold text-[#161B85] hover:underline">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* ================= MODAL OVERLAY: TERMS & CONDITIONS ================= */}
            {isTermsOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[24px] w-full max-w-[520px] shadow-2xl relative flex flex-col max-h-[85vh] border border-zinc-200 animate-in zoom-in-95 duration-200 overflow-hidden">
                        
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
                            <div className="flex items-center gap-2.5 text-[#161B85]">
                                <ScrollText size={22} />
                                <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Terms & Conditions</h3>
                            </div>
                            <button onClick={() => setIsTermsOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto text-sm text-zinc-600 space-y-4 leading-relaxed no-scrollbar">
                            <p className="font-medium">Welcome to Lumenary Gunadarma Library. By creating an account and utilizing our platform, you commit to respecting the following rules:</p>
                            
                            <div className="space-y-3 pt-1">
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-[#161B85] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">1</div>
                                    <p className="font-medium"><strong className="text-zinc-900">Account Authenticity:</strong> Registration is strictly limited to active students of Gunadarma University. You must use valid credentials corresponding to your student profile.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-[#161B85] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">2</div>
                                    <p className="font-medium"><strong className="text-zinc-900">24-Hour Booking Rule:</strong> Once a book reservation is confirmed online, you are granted a maximum of 24 hours to pick up the physical book at the campus counter. Expired bookings are auto-released back to stock.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-[#161B85] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">3</div>
                                    <p className="font-medium"><strong className="text-zinc-900">Loan Limitations:</strong> Each student account is permitted to maintain a maximum of 3 active physical book loans simultaneously for a standard circulation length of 7 working days.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-5 h-5 rounded-full bg-indigo-50 border border-indigo-100 text-[#161B85] flex items-center justify-center text-[11px] font-bold shrink-0 mt-0.5">4</div>
                                    <p className="font-medium"><strong className="text-zinc-900">Penalties & Late Returns:</strong> Accumulating late material counts or failing to settle daily overdue penalties will lead to temporary suspension of systemic borrowing privileges until outstanding bills are paid.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsTermsOpen(false);
                                    if (agree === false && isPrivacyOpen === false) {
                                        // Secara cerdas memancing user untuk lanjut membaca Privacy Policy
                                        setIsPrivacyOpen(true);
                                    }
                                }}
                                className="px-6 py-2.5 bg-[#161B85] hover:bg-[#0E1154] text-white text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md"
                            >
                                <ShieldCheck size={16} /> Next: Privacy Policy
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ================= MODAL OVERLAY: PRIVACY POLICY ================= */}
            {isPrivacyOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9999] flex items-center justify-center p-4 animate-in fade-in duration-200">
                    <div className="bg-white rounded-[24px] w-full max-w-[520px] shadow-2xl relative flex flex-col max-h-[85vh] border border-zinc-200 animate-in zoom-in-95 duration-200 overflow-hidden">
                        
                        <div className="flex items-center justify-between p-6 border-b border-zinc-100 bg-zinc-50/50">
                            <div className="flex items-center gap-2.5 text-[#161B85]">
                                <Landmark size={22} />
                                <h3 className="text-lg font-extrabold text-zinc-900 tracking-tight">Privacy Policy</h3>
                            </div>
                            <button onClick={() => setIsPrivacyOpen(false)} className="p-2 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 rounded-xl transition-all">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto text-sm text-zinc-600 space-y-4 leading-relaxed no-scrollbar">
                            <p className="font-medium">Lumenary protects student data with utmost confidentiality. This platform collects data to provide catalog circulation services exclusively:</p>
                            
                            <div className="space-y-3 pt-1">
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#161B85] shrink-0 mt-2"></div>
                                    <p className="font-medium"><strong className="text-zinc-900">Data Collected:</strong> We process your student identifier (NPM), institution-linked email address, telephone logs, and borrow history to generate personalized sirkulasi services.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#161B85] shrink-0 mt-2"></div>
                                    <p className="font-medium"><strong className="text-zinc-900">Encrypted Security:</strong> Passwords and authentications are encrypted end-to-end terpusat on Supabase Auth. Staff personnel cannot view or retrieve plain text credentials.</p>
                                </div>
                                <div className="flex gap-3">
                                    <div className="w-2 h-2 rounded-full bg-[#161B85] shrink-0 mt-2"></div>
                                    <p className="font-medium"><strong className="text-zinc-900">Zero Commercialization:</strong> Your telemetry network, logs, and account records will never be sold, leased, or distributed to non-campus entities.</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-5 border-t border-zinc-100 bg-zinc-50 flex justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setAgree(true); // Otomatis mencentang checkbox jika disetujui di dalam modal
                                    setIsPrivacyOpen(false);
                                }}
                                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/10"
                            >
                                <ShieldCheck size={16} /> Agree & Accept All
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}