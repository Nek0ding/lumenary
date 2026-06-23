'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import {
    LayoutDashboard, Archive, Store, GraduationCap, UserCog,
    Settings, LogOut, Search, Menu, X, Loader2 // <-- 1. Tambahkan Loader2 di sini
} from 'lucide-react';
import Footer from '@/components/footer';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userProfile, setUserProfile] = useState({ name: 'Loading...', npm: '' });
    
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (!token || !userStr) {
            router.replace('/login');
        } else {
            const user = JSON.parse(userStr);
            
            if (user.role !== 'ADMIN') {
                router.replace('/dashboard');
                return;
            }

            setUserProfile({
                name: user.nama || 'Admin',
                npm: user.npm
            });
            setIsAuthorized(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('lumenary_token');
        localStorage.removeItem('lumenary_user');
        router.push('/login');
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim() !== '') {
            router.push(`/admin/inventory?q=${encodeURIComponent(searchQuery)}`);
            setSearchQuery(''); 
        }
    };

    // =========================================================================
    // 2. UBAH BAGIAN LOADING DI BAWAH INI JADI SPINNING LOADER2 YANG SMOOTH
    // =========================================================================
    if (!isAuthorized) {
        return (
            <div className="min-h-screen bg-[#F8F8FF] flex flex-col items-center justify-center gap-3 font-['Plus_Jakarta_Sans',sans-serif]">
                <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                <span className="font-semibold text-zinc-500 text-[14px]">Verifying credentials...</span>
            </div>
        );
    }

    const adminNavLinks = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: <LayoutDashboard size={22} /> },
        { name: 'Inventory', href: '/admin/inventory', icon: <Archive size={22} /> },
        { name: 'Counter', href: '/admin/counter', icon: <Store size={22} /> },
        { name: 'Student', href: '/admin/student', icon: <GraduationCap size={22} /> },
        { name: 'Staff', href: '/admin/staff', icon: <UserCog size={22} /> },
    ];

    return (
        <div className="flex h-screen w-full bg-[#F8F8FF] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
            {/* ... Sisa kode layout ke bawah tetap sama persis ... */}
            {/* ================= OVERLAY UNTUK MOBILE ================= */}
            {isMobileMenuOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* ================= SIDEBAR ================= */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                            <img src="/logo.png" alt="Lumenary" className="w-8 h-8" />
                            <div className="flex flex-col gap-[2px]">
                                <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                                <span className="text-[#492073] text-[8px] md:text-[9px] font-extrabold uppercase tracking-[0.05em] leading-none">ADMIN PANEL</span>
                            </div>
                        </div>
                        <button className="md:hidden text-zinc-500 hover:text-red-500" onClick={() => setIsMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="px-6 mt-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Manage System</p>
                        <nav className="flex flex-col gap-2">
                            {adminNavLinks.map((link) => {
                                const isActive = pathname.startsWith(link.href);
                                return (
                                    <Link 
                                        key={link.name} 
                                        href={link.href} 
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors 
                                            ${isActive ? 'bg-red-50 text-[#7A35BF] font-bold' : 'text-zinc-700 hover:bg-zinc-50'}`}
                                    >
                                        {link.icon} {link.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>
                </div>

                <div className="px-6 pb-8">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Settings</p>
                    <nav className="flex flex-col gap-2">
                        <Link 
                            href="/admin/settings" 
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-colors 
                                ${pathname.startsWith('/admin/settings') ? 'bg-red-50 text-red-600 font-bold' : 'text-zinc-600 hover:bg-zinc-50'}`}
                        >
                            <Settings size={20} /> Setting
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-red-50 hover:text-red-600 transition-colors w-full text-left cursor-pointer">
                            <LogOut size={20} /> Log Out
                        </button>
                    </nav>
                </div>
            </aside>

            {/* ================= MAIN CONTENT AREA ================= */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="flex items-center justify-between px-6 md:px-8 py-5 md:py-6 bg-[#F8F8FF] sticky top-0 z-30">
                    <div className="flex items-center gap-4 w-full max-w-[600px]">
                        <button 
                            className="md:hidden text-zinc-700 hover:text-[#161B85] focus:outline-none p-2 -ml-2 rounded-lg bg-white shadow-sm border border-zinc-200"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu size={24} />
                        </button>

                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-600">
                                <Search size={18} />
                            </button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search inventory or students..."
                                className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-full text-[14px] border border-zinc-200 focus:outline-none focus:border-red-400 focus:ring-1 focus:ring-red-400 shadow-sm transition-all"
                            />
                        </form>
                    </div>

                    <div className="flex items-center gap-4 md:gap-6 ml-4">
                        <Link className="flex items-center gap-3 border-l border-zinc-300 pl-4 md:pl-6 cursor-pointer" href="/admin/settings">
                            <div className="flex flex-col text-right md:text-left hidden sm:flex">
                                <span className="text-[14px] font-bold text-black leading-tight line-clamp-1">{userProfile.name}</span>
                                <span className="text-[11px] text-black font-bold uppercase">{userProfile.npm}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-[#EADFFF] border-2 border-[#161B85]/20 flex items-center justify-center text-[#161B85] font-bold sm:hidden">
                                {userProfile.name.charAt(0)}
                            </div>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 px-6 md:px-8 pb-8">
                    {children}
                    <Toaster position="top-right" reverseOrder={false} />
                </div>

                <Footer />
            </main>
        </div>
    );
}