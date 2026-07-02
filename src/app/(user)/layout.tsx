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
            if (userStr) {
                const user = JSON.parse(userStr);
                // Jika Admin nyasar ke dashboard user, paksa pindah
                if (user.role === 'ADMIN' && !window.location.pathname.startsWith('/admin')) {
                    router.replace('/admin/dashboard');
                }
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
                        <Link href="/settings" onClick={() => setIsMobileMenuOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium ${pathname.startsWith('/settings') ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M19.8999 12.66C19.7396 12.4775 19.6512 12.2429 19.6512 12C19.6512 11.7571 19.7396 11.5225 19.8999 11.34L21.1799 9.9C21.3209 9.74267 21.4085 9.54471 21.4301 9.33451C21.4516 9.12431 21.4061 8.91269 21.2999 8.73L19.2999 5.27C19.1948 5.08752 19.0348 4.94288 18.8426 4.85669C18.6505 4.7705 18.4361 4.74716 18.2299 4.79L16.3499 5.17C16.1107 5.21943 15.8616 5.17959 15.6498 5.058C15.4379 4.93641 15.2779 4.74149 15.1999 4.51L14.5899 2.68C14.5228 2.48138 14.395 2.30887 14.2245 2.18684C14.0541 2.06482 13.8495 1.99946 13.6399 2H9.6399C9.42183 1.98862 9.20603 2.04893 9.02546 2.17172C8.84489 2.2945 8.70948 2.47302 8.6399 2.68L8.0799 4.51C8.0019 4.74149 7.84187 4.93641 7.63001 5.058C7.41815 5.17959 7.16911 5.21943 6.9299 5.17L4.9999 4.79C4.80445 4.76238 4.6052 4.79322 4.42724 4.87864C4.24929 4.96406 4.1006 5.10023 3.9999 5.27L1.9999 8.73C1.89106 8.91065 1.84212 9.12109 1.86008 9.33123C1.87804 9.54136 1.96198 9.74044 2.0999 9.9L3.3699 11.34C3.53022 11.5225 3.61863 11.7571 3.61863 12C3.61863 12.2429 3.53022 12.4775 3.3699 12.66L2.0999 14.1C1.96198 14.2596 1.87804 14.4586 1.86008 14.6688C1.84212 14.8789 1.89106 15.0894 1.9999 15.27L3.9999 18.73C4.10499 18.9125 4.26502 19.0571 4.45715 19.1433C4.64928 19.2295 4.86372 19.2528 5.0699 19.21L6.9499 18.83C7.18911 18.7806 7.43815 18.8204 7.65001 18.942C7.86187 19.0636 8.0219 19.2585 8.0999 19.49L8.7099 21.32C8.77948 21.527 8.91489 21.7055 9.09546 21.8283C9.27603 21.9511 9.49183 22.0114 9.7099 22H13.7099C13.9195 22.0005 14.1241 21.9352 14.2945 21.8132C14.465 21.6911 14.5928 21.5186 14.6599 21.32L15.2699 19.49C15.3479 19.2585 15.5079 19.0636 15.7198 18.942C15.9316 18.8204 16.1807 18.7806 16.4199 18.83L18.2999 19.21C18.5061 19.2528 18.7205 19.2295 18.9126 19.1433C19.1048 19.0571 19.2648 18.9125 19.3699 18.73L21.3699 15.27C21.4761 15.0873 21.5216 14.8757 21.5001 14.6655C21.4785 14.4553 21.3909 14.2573 21.2499 14.1L19.8999 12.66ZM18.4099 14L19.2099 14.9L17.9299 17.12L16.7499 16.88C16.0297 16.7328 15.2805 16.8551 14.6445 17.2238C14.0085 17.5925 13.53 18.1818 13.2999 18.88L12.9199 20H10.3599L9.9999 18.86C9.76975 18.1618 9.29128 17.5725 8.6553 17.2038C8.01932 16.8351 7.27012 16.7128 6.5499 16.86L5.3699 17.1L4.0699 14.89L4.8699 13.99C5.36185 13.44 5.63383 12.7279 5.63383 11.99C5.63383 11.2521 5.36185 10.54 4.8699 9.99L4.0699 9.09L5.3499 6.89L6.5299 7.13C7.25012 7.27722 7.99932 7.15488 8.6353 6.7862C9.27128 6.41752 9.74975 5.82816 9.9799 5.13L10.3599 4H12.9199L13.2999 5.14C13.53 5.83816 14.0085 6.42752 14.6445 6.7962C15.2805 7.16488 16.0297 7.28722 16.7499 7.14L17.9299 6.9L19.2099 9.12L18.4099 10.02C17.9235 10.5688 17.6549 11.2767 17.6549 12.01C17.6549 12.7433 17.9235 13.4512 18.4099 14ZM11.6399 8C10.8488 8 10.0754 8.2346 9.41761 8.67412C8.75982 9.11365 8.24713 9.73836 7.94438 10.4693C7.64163 11.2002 7.56241 12.0044 7.71675 12.7804C7.8711 13.5563 8.25206 14.269 8.81147 14.8284C9.37088 15.3878 10.0836 15.7688 10.8595 15.9231C11.6355 16.0775 12.4397 15.9983 13.1706 15.6955C13.9015 15.3928 14.5262 14.8801 14.9658 14.2223C15.4053 13.5645 15.6399 12.7911 15.6399 12C15.6399 10.9391 15.2185 9.92172 14.4683 9.17157C13.7182 8.42143 12.7008 8 11.6399 8ZM11.6399 14C11.2443 14 10.8577 13.8827 10.5288 13.6629C10.1999 13.4432 9.94351 13.1308 9.79214 12.7654C9.64076 12.3999 9.60116 11.9978 9.67833 11.6098C9.7555 11.2219 9.94598 10.8655 10.2257 10.5858C10.5054 10.3061 10.8618 10.1156 11.2497 10.0384C11.6377 9.96126 12.0398 10.0009 12.4053 10.1522C12.7707 10.3036 13.0831 10.56 13.3028 10.8889C13.5226 11.2178 13.6399 11.6044 13.6399 12C13.6399 12.5304 13.4292 13.0391 13.0541 13.4142C12.679 13.7893 12.1703 14 11.6399 14Z" fill="black" />
                            </svg> Setting
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium text-black hover:bg-zinc-50 w-full text-left">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M5 21C4.45 21 3.97933 20.8043 3.588 20.413C3.19667 20.0217 3.00067 19.5507 3 19V5C3 4.45 3.196 3.97933 3.588 3.588C3.98 3.19667 4.45067 3.00067 5 3H11C11.2833 3 11.521 3.096 11.713 3.288C11.905 3.48 12.0007 3.71733 12 4C11.9993 4.28267 11.9033 4.52033 11.712 4.713C11.5207 4.90567 11.2833 5.00133 11 5H5V19H11C11.2833 19 11.521 19.096 11.713 19.288C11.905 19.48 12.0007 19.7173 12 20C11.9993 20.2827 11.9033 20.5203 11.712 20.713C11.5207 20.9057 11.2833 21.0013 11 21H5ZM17.175 13H10C9.71667 13 9.47933 12.904 9.288 12.712C9.09667 12.52 9.00067 12.2827 9 12C8.99933 11.7173 9.09533 11.48 9.288 11.288C9.48067 11.096 9.718 11 10 11H17.175L15.3 9.125C15.1167 8.94167 15.025 8.71667 15.025 8.45C15.025 8.18333 15.1167 7.95 15.3 7.75C15.4833 7.55 15.7167 7.44567 16 7.437C16.2833 7.42833 16.525 7.52433 16.725 7.725L20.3 11.3C20.5 11.5 20.6 11.7333 20.6 12C20.6 12.2667 20.5 12.5 20.3 12.7L16.725 16.275C16.525 16.475 16.2877 16.571 16.013 16.563C15.7383 16.555 15.5007 16.4507 15.3 16.25C15.1167 16.05 15.0293 15.8127 15.038 15.538C15.0467 15.2633 15.1423 15.034 15.325 14.85L17.175 13Z" fill="black" />
                            </svg> Log Out
                        </button>
                    </nav>
                </div>
            </aside>

            {/* Main Area */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                <header className="flex items-center justify-between px-6 md:px-8 py-5 bg-[#F8F8FF] sticky top-0 z-30">
                    <div className="flex items-center gap-4 w-full max-w-[800px]">
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