'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'; // Tambahkan useRouter
import {
    LayoutDashboard, Library, History, Receipt,
    Settings, LogOut, Search, Bell
} from 'lucide-react';
import footer from '@/components/footer';

export default function UserLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();

    // State untuk proteksi dan data user
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [userProfile, setUserProfile] = useState({ name: 'Loading...', npm: '' });

    useEffect(() => {
        // Cek token dan user di localStorage
        const token = localStorage.getItem('lumenary_token');
        const userStr = localStorage.getItem('lumenary_user');

        if (!token || !userStr) {
            // Jika tidak ada token, tendang ke login
            router.replace('/login');
        } else {
            // Jika ada, parse data user dan masukkan ke state
            const user = JSON.parse(userStr);

            setUserProfile({
                name: user.nama || 'User',
                npm: user.npm
            });
            setIsAuthorized(true);
        }
    }, [router]);

    // Fungsi Log Out
    const handleLogout = () => {
        localStorage.removeItem('lumenary_token');
        localStorage.removeItem('lumenary_user');
        router.push('/login');
    };

    // Render layar kosong (atau spinner) selama pengecekan token berlangsung
    if (!isAuthorized) {
        return <div className="min-h-screen bg-[#F8F8FF] flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="flex h-screen w-full bg-[#F8F8FF] font-['Plus_Jakarta_Sans',sans-serif]">

            {/* ================= SIDEBAR ================= */}
            <aside className="w-[260px] bg-white border-r border-zinc-200 flex flex-col justify-between hidden md:flex">
                <div>
                    {/* Logo */}
                    <div className="flex items-center gap-3 px-8 py-8">
                        <img src="/logo.png" alt="Lumenary" className="w-8 h-8" />
                        <div className="flex flex-col gap-[2px]">
                            <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                            <span className="text-[#492073] text-[7px] md:text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                        </div>
                    </div>

                    {/* Main Menu */}
                    <div className="px-6 mt-4">
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Main Menu</p>
                        <nav className="flex flex-col gap-2">
                            <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium transition-colors ${pathname === '/dashboard' ? 'bg-zinc-100 text-[#161B85] font-bold' : 'text-black hover:bg-zinc-50'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none">
                                    <path d="M17.3333 10.6667V5.33333C17.3333 4.95556 17.4613 4.63911 17.7173 4.384C17.9733 4.12889 18.2898 4.00089 18.6667 4H26.6667C27.0444 4 27.3613 4.128 27.6173 4.384C27.8733 4.64 28.0009 4.95644 28 5.33333V10.6667C28 11.0444 27.872 11.3613 27.616 11.6173C27.36 11.8733 27.0436 12.0009 26.6667 12H18.6667C18.2889 12 17.9724 11.872 17.7173 11.616C17.4622 11.36 17.3342 11.0436 17.3333 10.6667ZM4 16V5.33333C4 4.95556 4.128 4.63911 4.384 4.384C4.64 4.12889 4.95644 4.00089 5.33333 4H13.3333C13.7111 4 14.028 4.128 14.284 4.384C14.54 4.64 14.6676 4.95644 14.6667 5.33333V16C14.6667 16.3778 14.5387 16.6947 14.2827 16.9507C14.0267 17.2067 13.7102 17.3342 13.3333 17.3333H5.33333C4.95556 17.3333 4.63911 17.2053 4.384 16.9493C4.12889 16.6933 4.00089 16.3769 4 16ZM17.3333 26.6667V16C17.3333 15.6222 17.4613 15.3058 17.7173 15.0507C17.9733 14.7956 18.2898 14.6676 18.6667 14.6667H26.6667C27.0444 14.6667 27.3613 14.7947 27.6173 15.0507C27.8733 15.3067 28.0009 15.6231 28 16V26.6667C28 27.0444 27.872 27.3613 27.616 27.6173C27.36 27.8733 27.0436 28.0009 26.6667 28H18.6667C18.2889 28 17.9724 27.872 17.7173 27.616C17.4622 27.36 17.3342 27.0436 17.3333 26.6667ZM4 26.6667V21.3333C4 20.9556 4.128 20.6391 4.384 20.384C4.64 20.1289 4.95644 20.0009 5.33333 20H13.3333C13.7111 20 14.028 20.128 14.284 20.384C14.54 20.64 14.6676 20.9564 14.6667 21.3333V26.6667C14.6667 27.0444 14.5387 27.3613 14.2827 27.6173C14.0267 27.8733 13.7102 28.0009 13.3333 28H5.33333C4.95556 28 4.63911 27.872 4.384 27.616C4.12889 27.36 4.00089 27.0436 4 26.6667ZM6.66667 14.6667H12V6.66667H6.66667V14.6667ZM20 25.3333H25.3333V17.3333H20V25.3333ZM20 9.33333H25.3333V6.66667H20V9.33333ZM6.66667 25.3333H12V22.6667H6.66667V25.3333Z" fill="black" />
                                </svg> Dashboard
                            </Link>
                            <Link href="/dashboard/collection" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium text-black hover:bg-zinc-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="33" viewBox="0 0 30 33" fill="none">
                                    <path d="M11 21.6667H27V5.66667H24.3333V13.8333C24.3333 14.1 24.2222 14.3 24 14.4333C23.7778 14.5667 23.5556 14.5556 23.3333 14.4L21.7 13.4333C21.4778 13.3 21.2391 13.2333 20.984 13.2333C20.7289 13.2333 20.5009 13.3 20.3 13.4333L18.6667 14.4C18.4222 14.5556 18.1942 14.5667 17.9827 14.4333C17.7711 14.3 17.6658 14.1 17.6667 13.8333V5.66667H11V21.6667ZM11 24.3333C10.2667 24.3333 9.63911 24.0724 9.11733 23.5507C8.59556 23.0289 8.33422 22.4009 8.33333 21.6667V5.66667C8.33333 4.93333 8.59467 4.30578 9.11733 3.784C9.64 3.26222 10.2676 3.00089 11 3H27C27.7333 3 28.3613 3.26133 28.884 3.784C29.4067 4.30667 29.6676 4.93422 29.6667 5.66667V21.6667C29.6667 22.4 29.4058 23.028 28.884 23.5507C28.3622 24.0733 27.7342 24.3342 27 24.3333H11ZM5.66667 29.6667C4.93333 29.6667 4.30578 29.4058 3.784 28.884C3.26222 28.3622 3.00089 27.7342 3 27V9.66667C3 9.28889 3.128 8.97244 3.384 8.71733C3.64 8.46222 3.95644 8.33422 4.33333 8.33333C4.71022 8.33244 5.02711 8.46044 5.284 8.71733C5.54089 8.97422 5.66844 9.29067 5.66667 9.66667V27H23C23.3778 27 23.6947 27.128 23.9507 27.384C24.2067 27.64 24.3342 27.9564 24.3333 28.3333C24.3324 28.7102 24.2044 29.0271 23.9493 29.284C23.6942 29.5409 23.3778 29.6684 23 29.6667H5.66667Z" fill="black" />
                                </svg> My Collection
                            </Link>
                            <Link href="/dashboard/history" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium text-black hover:bg-zinc-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="32" viewBox="0 0 28 32" fill="none">
                                    <path d="M16 28C13.2 28 10.7222 27.1502 8.56667 25.4507C6.41111 23.7511 5.01111 21.5787 4.36667 18.9333C4.27778 18.6 4.34444 18.2947 4.56667 18.0173C4.78889 17.74 5.08889 17.5787 5.46667 17.5333C5.82222 17.4889 6.14444 17.5556 6.43333 17.7333C6.72222 17.9111 6.92222 18.1778 7.03333 18.5333C7.56667 20.5333 8.66667 22.1667 10.3333 23.4333C12 24.7 13.8889 25.3333 16 25.3333C18.6 25.3333 20.8058 24.428 22.6173 22.6173C24.4289 20.8067 25.3342 18.6009 25.3333 16C25.3324 13.3991 24.4271 11.1938 22.6173 9.384C20.8076 7.57422 18.6018 6.66844 16 6.66667C14.4667 6.66667 13.0333 7.02222 11.7 7.73333C10.3667 8.44444 9.24444 9.42222 8.33333 10.6667H10.6667C11.0444 10.6667 11.3613 10.7947 11.6173 11.0507C11.8733 11.3067 12.0009 11.6231 12 12C11.9991 12.3769 11.8711 12.6938 11.616 12.9507C11.3609 13.2076 11.0444 13.3351 10.6667 13.3333H5.33333C4.95556 13.3333 4.63911 13.2053 4.384 12.9493C4.12889 12.6933 4.00089 12.3769 4 12V6.66667C4 6.28889 4.128 5.97244 4.384 5.71733C4.64 5.46222 4.95644 5.33422 5.33333 5.33333C5.71022 5.33244 6.02711 5.46044 6.284 5.71733C6.54089 5.97422 6.66844 6.29067 6.66667 6.66667V8.46667C7.8 7.04444 9.18356 5.94444 10.8173 5.16667C12.4511 4.38889 14.1787 4 16 4C17.6667 4 19.228 4.31689 20.684 4.95067C22.14 5.58444 23.4067 6.43956 24.484 7.516C25.5613 8.59244 26.4169 9.85911 27.0507 11.316C27.6844 12.7729 28.0009 14.3342 28 16C27.9991 17.6658 27.6827 19.2271 27.0507 20.684C26.4187 22.1409 25.5631 23.4076 24.484 24.484C23.4049 25.5604 22.1382 26.416 20.684 27.0507C19.2298 27.6853 17.6684 28.0018 16 28ZM17.3333 15.4667L20.6667 18.8C20.9111 19.0444 21.0333 19.3556 21.0333 19.7333C21.0333 20.1111 20.9111 20.4222 20.6667 20.6667C20.4222 20.9111 20.1111 21.0333 19.7333 21.0333C19.3556 21.0333 19.0444 20.9111 18.8 20.6667L15.0667 16.9333C14.9333 16.8 14.8333 16.6502 14.7667 16.484C14.7 16.3178 14.6667 16.1453 14.6667 15.9667V10.6667C14.6667 10.2889 14.7947 9.97244 15.0507 9.71733C15.3067 9.46222 15.6231 9.33422 16 9.33333C16.3769 9.33244 16.6938 9.46044 16.9507 9.71733C17.2076 9.97422 17.3351 10.2907 17.3333 10.6667V15.4667Z" fill="black" />
                                </svg> History
                            </Link>
                            <Link href="/dashboard/penalty" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[16px] font-medium text-black hover:bg-zinc-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="27" height="33" viewBox="0 0 27 33" fill="none">
                                    <path d="M12.3333 15H20.3333M12.3333 20.3333H20.3333M12.3333 9.66667H20.3333M7 4.33333C7 3.97971 7.14048 3.64057 7.39052 3.39052C7.64057 3.14048 7.97971 3 8.33333 3H24.3333C24.687 3 25.0261 3.14048 25.2761 3.39052C25.5262 3.64057 25.6667 3.97971 25.6667 4.33333V29.6667L21 26.3333L16.3333 29.6667L11.6667 26.3333L7 29.6667V4.33333Z" stroke="black" strokeWidth="2.66667" strokeLinecap="round" strokeLinejoin="round" />
                                </svg> Penalty Bill
                            </Link>
                        </nav>
                    </div>
                </div>

                {/* Settings Menu */}
                <div className="px-6 pb-8">
                    <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider mb-4 px-2">Settings</p>
                    <nav className="flex flex-col gap-2">
                        <Link href="/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors">
                            <Settings size={20} /> Setting
                        </Link>
                        <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-zinc-600 hover:bg-zinc-50 transition-colors w-full text-left cursor-pointer">
                            <LogOut size={20} /> Log Out
                        </button>
                    </nav>
                </div>
            </aside>

            {/* ================= MAIN CONTENT AREA ================= */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">

                {/* Header / Top Bar */}
                <header className="flex items-center justify-between px-8 py-6 bg-[#F8F8FF] sticky top-0 z-10">
                    <div className="relative w-full max-w-[600px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search for a book title, author, or ISBN..."
                            className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-full text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] shadow-sm"
                        />
                    </div>

                    <div className="flex items-center gap-6">
                        {/* <button className="relative text-zinc-500 hover:text-[#161B85] transition-colors">
                            <Bell size={24} />
                            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#F8F8FF]"></span>
                        </button> */}
                        <Link className="flex items-center gap-3 border-l border-zinc-300 pl-6 cursor-pointer" href="/settings">
                            <div className="flex flex-col">
                                {/* Render Nama dan NPM dari state */}
                                <span className="text-[14px] font-bold text-black leading-tight line-clamp-1">{userProfile.name}</span>
                                <span className="text-[11px] text-zinc-500 uppercase">{userProfile.npm}</span>
                            </div>
                        </Link>
                    </div>
                </header>

                {/* Page Content (Children) */}
                <div className="flex-1 px-8 pb-8">
                    {children}
                </div>

                {/* Footer dipanggil di sini agar ada di bawah konten utama */}
                <footer />
            </main>

        </div>
    );
}