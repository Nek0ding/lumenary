'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { createClient } from '@supabase/supabase-js';
import {
    LayoutDashboard, Library, History, Receipt,
    Settings, LogOut, Search, BookOpen, Menu, X, Loader2
} from 'lucide-react';
import Footer from '@/components/footer';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    const [isAuthorized, setIsAuthorized] = useState<'checking' | 'authorized'>('checking');
    const [userProfile, setUserProfile] = useState({ name: 'Loading...', npm: '' });

    // --- STATE PENCARIAN & MOBILE MENU ---
    const [searchQuery, setSearchQuery] = useState('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const verifyAuth = async () => {
            const token = localStorage.getItem('lumenary_token');
            const userStr = localStorage.getItem('lumenary_user');

            if (!token || !userStr) {
                router.replace('/login');
                return;
            }

            const { data: { user }, error } = await supabase.auth.getUser(token);

            if (error || !user) {
                localStorage.removeItem('lumenary_token');
                localStorage.removeItem('lumenary_user');
                router.replace('/login');
            } else {
                const parsedUser = JSON.parse(userStr);
                setUserProfile({
                    name: parsedUser.nama || 'User',
                    npm: parsedUser.npm
                });
                setIsAuthorized('authorized');
            }
        };

        verifyAuth();
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('lumenary_token');
        localStorage.removeItem('lumenary_user');
        router.push('/login');
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        router.push(searchQuery.trim() !== '' ? `/explore?q=${encodeURIComponent(searchQuery)}` : `/explore`);
        setSearchQuery('');
        setIsMobileMenuOpen(false);
    };

    // --- MODERN LOADING SCREEN ---
    if (isAuthorized === 'checking') {
        return (
            <div className="min-h-screen bg-[#F8F8FF] flex flex-col items-center justify-center gap-4 font-['Plus_Jakarta_Sans',sans-serif]">
                <Loader2 className="w-10 h-10 text-[#161B85] animate-spin" />
                <span className="font-semibold text-zinc-500 text-[14px] animate-pulse">Initializing library workspace...</span>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-[#F8F8FF] font-['Plus_Jakarta_Sans',sans-serif] overflow-hidden">
            {/* Overlay Mobile */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between transform transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div>
                    <div className="flex items-center justify-between px-8 py-8">
                        <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/dashboard')}>
                            <img src="/logo.png" alt="Lumenary" className="w-8 h-8" />
                            <div className="flex flex-col gap-[2px]">
                                <span className="text-[#161B85] text-[20px] font-bold leading-none">Lumenary</span>
                                <span className="text-[#492073] text-[7px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                            </div>
                        </div>
                        <button className="md:hidden text-zinc-500" onClick={() => setIsMobileMenuOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className="px-6 mt-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
                        <nav className="flex flex-col gap-2">
                            <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname === '/dashboard' ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <LayoutDashboard size={24} /> Dashboard
                            </Link>
                            <Link href="/explore" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname.startsWith('/explore') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <BookOpen size={24} /> Book Catalog
                            </Link>
                            <Link href="/dashboard/collection" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname.startsWith('/dashboard/collection') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 30 33" fill="none">
                                    <path d="M11 21.6667H27V5.66667H24.3333V13.8333C24.3333 14.1 24.2222 14.3 24 14.4333C23.7778 14.5667 23.5556 14.5556 23.3333 14.4L21.7 13.4333C21.4778 13.3 21.2391 13.2333 20.984 13.2333C20.7289 13.2333 20.5009 13.3 20.3 13.4333L18.6667 14.4C18.4222 14.5556 18.1942 14.5667 17.9827 14.4333C17.7711 14.3 17.6658 14.1 17.6667 13.8333V5.66667H11V21.6667ZM11 24.3333C10.2667 24.3333 9.63911 24.0724 9.11733 23.5507C8.59556 23.0289 8.33422 22.4009 8.33333 21.6667V5.66667C8.33333 4.93333 8.59467 4.30578 9.11733 3.784C9.64 3.26222 10.2676 3.00089 11 3H27C27.7333 3 28.3613 3.26133 28.884 3.784C29.4067 4.30667 29.6676 4.93422 29.6667 5.66667V21.6667C29.6667 22.4 29.4058 23.028 28.884 23.5507C28.3622 24.0733 27.7342 24.3342 27 24.3333H11ZM5.66667 29.6667C4.93333 29.6667 4.30578 29.4058 3.784 28.884C3.26222 28.3622 3.00089 27.7342 3 27V9.66667C3 9.28889 3.128 8.97244 3.384 8.71733C3.64 8.46222 3.95644 8.33422 4.33333 8.33333C4.71022 8.33244 5.02711 8.46044 5.284 8.71733C5.54089 8.97422 5.66844 9.29067 5.66667 9.66667V27H23C23.3778 27 23.6947 27.128 23.9507 27.384C24.2067 27.64 24.3342 27.9564 24.3333 28.3333C24.3324 28.7102 24.2044 29.0271 23.9493 29.284C23.6942 29.5409 23.3778 29.6684 23 29.6667H5.66667Z" fill="black" />
                                </svg> My Collection
                            </Link>
                            <Link href="/dashboard/history" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname.startsWith('/dashboard/history') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 32" fill="none">
                                    <path d="M16 28C13.2 28 10.7222 27.1502 8.56667 25.4507C6.41111 23.7511 5.01111 21.5787 4.36667 18.9333C4.27778 18.6 4.34444 18.2947 4.56667 18.0173C4.78889 17.74 5.08889 17.5787 5.46667 17.5333C5.82222 17.4889 6.14444 17.5556 6.43333 17.7333C6.72222 17.9111 6.92222 18.1778 7.03333 18.5333C7.56667 20.5333 8.66667 22.1667 10.3333 23.4333C12 24.7 13.8889 25.3333 16 25.3333C18.6 25.3333 20.8058 24.428 22.6173 22.6173C24.4289 20.8067 25.3342 18.6009 25.3333 16C25.3324 13.3991 24.4271 11.1938 22.6173 9.384C20.8076 7.57422 18.6018 6.66844 16 6.66667C14.4667 6.66667 13.0333 7.02222 11.7 7.73333C10.3667 8.44444 9.24444 9.42222 8.33333 10.6667H10.6667C11.0444 10.6667 11.3613 10.7947 11.6173 11.0507C11.8733 11.3067 12.0009 11.6231 12 12C11.9991 12.3769 11.8711 12.6938 11.616 12.9507C11.3609 13.2076 11.0444 13.3351 10.6667 13.3333H5.33333C4.95556 13.3333 4.63911 13.2053 4.384 12.9493C4.12889 12.6933 4.00089 12.3769 4 12V6.66667C4 6.28889 4.128 5.97244 4.384 5.71733C4.64 5.46222 4.95644 5.33422 5.33333 5.33333C5.71022 5.33244 6.02711 5.46044 6.284 5.71733C6.54089 5.97422 6.66844 6.29067 6.66667 6.66667V8.46667C7.8 7.04444 9.18356 5.94444 10.8173 5.16667C12.4511 4.38889 14.1787 4 16 4C17.6667 4 19.228 4.31689 20.684 4.95067C22.14 5.58444 23.4067 6.43956 24.484 7.516C25.5613 8.59244 26.4169 9.85911 27.0507 11.316C27.6844 12.7729 28.0009 14.3342 28 16C27.9991 17.6658 27.6827 19.2271 27.0507 20.684C26.4187 22.1409 25.5631 23.4076 24.484 24.484C23.4049 25.5604 22.1382 26.416 20.684 27.0507C19.2298 27.6853 17.6684 28.0018 16 28ZM17.3333 15.4667L20.6667 18.8C20.9111 19.0444 21.0333 19.3556 21.0333 19.7333C21.0333 20.1111 20.9111 20.4222 20.6667 20.6667C20.4222 20.9111 20.1111 21.0333 19.7333 21.0333C19.3556 21.0333 19.0444 20.9111 18.8 20.6667L15.0667 16.9333C14.9333 16.8 14.8333 16.6502 14.7667 16.484C14.7 16.3178 14.6667 16.1453 14.6667 15.9667V10.6667C14.6667 10.2889 14.7947 9.97244 15.0507 9.71733C15.3067 9.46222 15.6231 9.33422 16 9.33333C16.3769 9.33244 16.6938 9.46044 16.9507 9.71733C17.2076 9.97422 17.3351 10.2907 17.3333 10.6667V15.4667Z" fill="black" />
                                </svg> History
                            </Link>
                            <Link href="/dashboard/penalty" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname.startsWith('/dashboard/penalty') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 27 33" fill="none">
                                    <path d="M12.3333 15H20.3333M12.3333 20.3333H20.3333M12.3333 9.66667H20.3333M7 4.33333C7 3.97971 7.14048 3.64057 7.39052 3.39052C7.64057 3.14048 7.97971 3 8.33333 3H24.3333C24.687 3 25.0261 3.14048 25.2761 3.39052C25.5262 3.64057 25.6667 3.97971 25.6667 4.33333V29.6667L21 26.3333L16.3333 29.6667L11.6667 26.3333L7 29.6667V4.33333Z" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg> Penalty Bill
                            </Link>
                        </nav>
                    </div>
                </div>

                <div className="px-6 pb-8">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Settings</p>
                    <nav className="flex flex-col gap-2">
                        <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium ${pathname.startsWith('/settings') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-zinc-600 hover:bg-zinc-50'}`}>
                            <Settings size={20} /> Setting
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-zinc-50 w-full text-left">
                            <LogOut size={20} /> Log Out
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="flex items-center justify-between px-6 md:px-8 py-5 bg-[#F8F8FF] sticky top-0 z-30">
                    <div className="flex items-center gap-4 w-full max-w-[600px]">
                        <button className="md:hidden p-2 rounded-lg bg-white shadow-sm border border-zinc-200" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={24} />
                        </button>
                        <form onSubmit={handleSearchSubmit} className="relative w-full">
                            <button type="submit" className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
                                <Search size={18} />
                            </button>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search for a book title, author, or ISBN ..."
                                className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-full text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85] shadow-sm"
                            />
                        </form>
                    </div>
                    <div className="hidden sm:flex items-center gap-4 ml-4">
                        <div className="text-right">
                            <p className="text-[14px] font-bold text-black">{userProfile.name}</p>
                            <p className="text-[11px] text-zinc-500 uppercase">{userProfile.npm}</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 px-6 md:px-8 pb-8">
                    {children}
                    <Toaster
                        position="top-right"
                        containerClassName="hot-toast-container"
                        reverseOrder={false}
                        toastOptions={{
                            style: {
                                zIndex: 999999, // Pastikan ini lebih tinggi dari z-index modal Anda
                            },
                        }}
                    />
                </div>
                <Footer />
            </main>
        </div>
    );
}