'use client';
import React, { useState } from 'react';
import {
    Search,
    ArrowRight,
    LayoutDashboard,
    BookOpen,
    Clock,
    Settings,
    Star,
    X,
    ChevronDown,
    CheckCircle,
    AlertCircle,
    MapPin,
    Info,
    BookMarked,
    Menu
} from 'lucide-react';

// Type Definitions
interface Book {
    id: string;
    title: string;
    author: string;
    category: string;
    rating: number;
    status: 'available' | 'reserved';
    coverClass: string;
    description: string;
    isbn: string;
    publishYear: number;
    location: string;
}

interface Reservation {
    reservationId: string;
    bookId: string;
    bookTitle: string;
    studentName: string;
    studentId: string;
    email: string;
    pickupDeadline: string;
    location: string;
}

interface FAQ {
    id: string;
    question: string;
    answer: string;
}

interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

// Initial Mock Data
const initialBooks: Book[] = [
    {
        id: '1',
        title: 'Introduction to Information Systems',
        author: 'R. Kelly Rainer',
        category: 'Core IS',
        rating: 4.8,
        status: 'available',
        coverClass: 'bg-gradient-to-br from-blue-600 to-indigo-900',
        description: 'Provides the essential academic foundation regarding how information systems support business activities. Explains core enterprise components, data storage architectures, and strategy implementation.',
        isbn: '978-1119636113',
        publishYear: 2020,
        location: 'Main Hall - Shelf A3'
    },
    {
        id: '2',
        title: 'Database System Concepts',
        author: 'Abraham Silberschatz',
        category: 'Database',
        rating: 4.9,
        status: 'available',
        coverClass: 'bg-gradient-to-br from-emerald-600 to-teal-900',
        description: 'The definitive complete master textbook for database management architectures. Covers advanced Oracle relational design, normalization theory, SQL query optimization, and transaction logs.',
        isbn: '978-0078022159',
        publishYear: 2019,
        location: 'Engineering Section - Shelf D1'
    },
    {
        id: '3',
        title: 'Systems Analysis and Design',
        author: 'Kenneth E. Kendall',
        category: 'System Design',
        rating: 4.7,
        status: 'reserved',
        coverClass: 'bg-gradient-to-br from-amber-500 to-orange-800',
        description: 'A deeply practical guide to structured system analysis methods. Includes modeling techniques such as Data Flow Diagrams (DFD), comprehensive system prototyping, and Agile software life cycles.',
        isbn: '978-0134817309',
        publishYear: 2018,
        location: 'Main Hall - Shelf B2'
    },
    {
        id: '4',
        title: 'Fundamentals of Software Engineering',
        author: 'Rajib Mall',
        category: 'Programming',
        rating: 4.6,
        status: 'available',
        coverClass: 'bg-gradient-to-br from-purple-600 to-fuchsia-900',
        description: 'Explains foundational paradigms of structured programming, software metrics, and verification testing methodologies. Highly beneficial for compiling algorithmic laboratory project reports.',
        isbn: '978-9388028028',
        publishYear: 2018,
        location: 'Computer Lab Annex'
    },
    {
        id: '5',
        title: 'Business Intelligence and Analytics',
        author: 'Ramesh Sharda',
        category: 'Data Science',
        rating: 4.7,
        status: 'available',
        coverClass: 'bg-gradient-to-br from-rose-600 to-red-950',
        description: 'Showcases enterprise predictive analytics, mathematical modeling tools, and visual dash-boarding structures. Critical reading for business analyst career positioning and processing workflows.',
        isbn: '978-0134633282',
        publishYear: 2017,
        location: 'Research Library - Level 2'
    },
    {
        id: '6',
        title: 'Data Communications and Networking',
        author: 'Behrouz A. Forouzan',
        category: 'Networking',
        rating: 4.5,
        status: 'available',
        coverClass: 'bg-gradient-to-br from-cyan-600 to-blue-800',
        description: 'A comprehensive study of packet routing mechanisms, OSI model distribution, standard network protocols, and cryptographic security layers for robust system infrastructure designs.',
        isbn: '978-0073376226',
        publishYear: 2012,
        location: 'Engineering Section - Shelf C4'
    }
];

const initialFAQs: FAQ[] = [
    {
        id: 'f1',
        question: 'How do I reserve a library book through Lumenary?',
        answer: 'Browse the available collection on your dashboard. When you find a book you need, click the "Hold / Reserve" button. A verification popup will display the reservation ID and pickup location details. Books are held for a maximum of 48 hours.'
    },
    {
        id: 'f2',
        question: 'What is the maximum hold time for a reserved item?',
        answer: 'All reserved items are held at their specific campus shelf location for 48 hours from the exact moment of reservation. If the item is not collected within this window, the system automatically cancels the hold.'
    },
    {
        id: 'f3',
        question: 'Can I extend my return deadline online?',
        answer: 'Yes, active book loans can be extended once via the dashboard under your active items profile tab, provided that another student has not already placed a reservation hold on that specific title.'
    }
];

export default function LumenaryApp() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [npm, setNpm] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
    const [books, setBooks] = useState<Book[]>(initialBooks);
    const [reservations, setReservations] = useState<Reservation[]>([]);
    const [activeTab, setActiveTab] = useState<'browse' | 'reservations' | 'faq'>('browse');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
    const [selectedBook, setSelectedBook] = useState<Book | null>(null);
    const [showReservationModal, setShowReservationModal] = useState<boolean>(false);
    const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

    const handleSignUpSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!npm || !email || !password || !confirmPassword) {
            addToast('Please fill in all registration fields.', 'error');
            return;
        }
        if (password !== confirmPassword) {
            addToast('Passwords do not match.', 'error');
            return;
        }
        if (!agreeTerms) {
            addToast('You must agree to the Terms & Conditions.', 'error');
            return;
        }

        setIsLoggedIn(true);
        addToast('Account created successfully! Welcome to Lumenary.', 'success');
    };

    const addToast = (message: string, type: 'success' | 'error' | 'info') => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    };

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const openReservationWorkflow = (book: Book) => {
        setSelectedBook(book);
        setShowReservationModal(true);
    };

    const confirmReservation = () => {
        if (!selectedBook) return;
        const newReservation: Reservation = {
            reservationId: `RES-${Math.floor(100000 + Math.random() * 900000)}`,
            bookId: selectedBook.id,
            bookTitle: selectedBook.title,
            studentName: "Information Systems Student",
            studentId: npm || "20261104",
            email: email || "student@gunadarma.ac.id",
            pickupDeadline: new Date(Date.now() + 172800000).toLocaleDateString('en-US', {
                month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }),
            location: selectedBook.location
        };
        setReservations((prev) => [newReservation, ...prev]);
        setBooks((prev) => prev.map((b) => b.id === selectedBook.id ? { ...b, status: 'reserved' } : b));

        setShowReservationModal(false);
        setSelectedBook(null);
        addToast(`Hold successfully placed on "${selectedBook.title}"!`, 'success');
    };

    const handleCancelReservation = (resId: string, bookId: string) => {
        setReservations((prev) => prev.filter((r) => r.reservationId !== resId));
        setBooks((prev) => prev.map((b) => b.id === bookId ? { ...b, status: 'available' } : b));
        addToast('Reservation hold cancelled.', 'info');
    };

    const categories = ['All Categories', ...Array.from(new Set(initialBooks.map((b) => b.category)))];
    const filteredBooks = books.filter((book) => {
        const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
            book.isbn.includes(searchQuery);
        const matchesCategory = selectedCategory === 'All Categories' || book.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="min-h-screen bg-[#FEFEFE] text-black font-sans antialiased">

            {/* GLOBAL TOAST BANNER CONTAINER */}
            <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`p-4 rounded-xl shadow-lg border flex items-start gap-3 transition-all duration-300 transform translate-x-0 bg-white ${toast.type === 'success' ? 'border-emerald-200 text-emerald-900 shadow-emerald-50' :
                            toast.type === 'error' ? 'border-rose-200 text-rose-900 shadow-rose-50' :
                                'border-blue-200 text-blue-900 shadow-blue-50'
                            }`}
                    >
                        {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />}
                        {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />}
                        {toast.type === 'info' && <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                        <div className="flex-1 text-sm font-medium leading-normal">{toast.message}</div>
                        <button onClick={() => removeToast(toast.id)} className="text-slate-400 hover:text-slate-600 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>

            {!isLoggedIn ? (
                /* IMPLEMENTASI HERO LANDING PAGE */
                <div className="min-h-screen flex items-center justify-center p-4 md:p-0 bg-[#FEFEFE]">
                    <div className="w-full max-w-[1196px] min-h-screen md:h-[1024px] mx-auto flex flex-col md:flex-row items-center justify-between gap-[65px]">

                        {/* SISI KIRI HERO */}
                        <div
                            className="relative w-full md:w-[604px] h-[400px] md:h-full rounded-2xl md:rounded-none flex flex-col justify-center items-center px-6 md:px-[70px] py-12 text-center md:text-left overflow-hidden bg-cover bg-center"
                            style={{
                                backgroundImage: `linear-gradient(360deg, rgba(16, 20, 100, 0.3) 0%, rgba(16, 20, 100, 0.6) 100%), url('/background.png')`
                            }}
                        >
                            {/* LOGO LUMENARY (Menggunakan font-serif & font-mono, posisi digeser rapat ke ujung kiri lewat left-12) */}
                            <div className="absolute top-8 left-6 md:left-[141px] flex items-center gap-3">
                                <img
                                    className="w-[50px] h-[50px] object-contain"
                                    src="/logo.png"
                                    alt="Logo"
                                />
                                <div className="flex flex-col items-start gap-[2px]">
                                    <span className="text-[24px] font-extrabold leading-[30px] tracking-wide text-white font-serif">
                                        Lumenary
                                    </span>


                                    {/* Menggunakan font-mono (style kode/teknikal) dengan warna ungu muda cerah (text-[#E2C6FF]) */}
                                    <span className="text-[9px] font-medium tracking-widest uppercase text-[#E2C6FF] font-mono">
                                        Gunadarma Library
                                    </span>
                                </div>
                            </div>

                            {/* Konten Teks Hero (md:self-start md:pl-12 diselaraskan lurus di bawah logo) */}
                            <div className="w-full max-w-[396px] flex flex-col gap-3 mt-16 md:mt-0 md:self-start md:pl-12">
                                <h1 className="text-[36px] font-extrabold leading-[45px] text-[#FEFEFE]">
                                    Step Into the World of Words.
                                </h1>
                                <p className="text-[24px] font-medium leading-[30px] text-[#FEFEFE]">
                                    Create your student account today to reserve books online, build your wishlist, and stay notified about book returns.
                                </p>
                            </div>
                        </div>

                        {/* SISI KANAN: Form Registrasi */}
                        <div className="w-full md:w-[592px] h-auto md:h-full flex flex-col justify-center items-center px-4 md:px-8 bg-[#FEFEFE]">
                            <div className="w-full max-w-[442px] flex flex-col gap-8">
                                <div className="flex flex-col gap-3">
                                    <h2 className="text-[32px] font-bold leading-[40px] text-black">
                                        Create Your Account
                                    </h2>
                                    <p className="text-[16px] font-medium leading-[20px] text-black/70">
                                        Register with your student details to start exploring Lumenary.
                                    </p>
                                </div>

                                <form className="flex flex-col gap-5" onSubmit={handleSignUpSubmit}>
                                    <div className="flex flex-col gap-2 relative pt-[25px]">
                                        <label className="absolute top-0 left-0 text-[20px] font-bold leading-[25px] text-black">
                                            Student ID Number (NPM)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="Enter your id number"
                                            value={npm}
                                            onChange={(e) => setNpm(e.target.value)}
                                            className="w-full h-[40px] border-[1.5px] border-[#CCCABE] rounded-xl px-5 text-[16px] font-normal text-black placeholder-[#99988F] focus:outline-none focus:border-[#3037B4] active:border-[#CCCABE] transition"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 relative pt-[25px]">
                                        <label className="absolute top-0 left-0 text-[20px] font-bold leading-[25px] text-black">
                                            University Email Address
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="Enter your university email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full h-[40px] border-[1.5px] border-[#CCCABE] rounded-xl px-5 text-[16px] font-normal text-black placeholder-[#99988F] focus:outline-none focus:border-[#3037B4] active:border-[#CCCABE] transition"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 relative pt-[25px]">
                                        <label className="absolute top-0 left-0 text-[20px] font-bold leading-[25px] text-black">
                                            Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Create a strong password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full h-[40px] border-[1.5px] border-[#CCCABE] rounded-xl px-5 text-[16px] font-normal text-black placeholder-[#99988F] focus:outline-none focus:border-[#3037B4] active:border-[#CCCABE] transition"
                                        />
                                    </div>

                                    <div className="flex flex-col gap-2 relative pt-[25px]">
                                        <label className="absolute top-0 left-0 text-[20px] font-bold leading-[25px] text-black">
                                            Confirm Password
                                        </label>
                                        <input
                                            type="password"
                                            placeholder="Re-enter your password"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            className="w-full h-[40px] border-[1.5px] border-[#CCCABE] rounded-xl px-5 text-[16px] font-normal text-black placeholder-[#99988F] focus:outline-none focus:border-[#3037B4] active:border-[#CCCABE] transition"
                                        />
                                    </div>

                                    <div className="flex items-center gap-3 py-2">
                                        <input
                                            type="checkbox"
                                            id="agree"
                                            checked={agreeTerms}
                                            onChange={(e) => setAgreeTerms(e.target.checked)}
                                            className="w-5 h-5 accent-[#3037B4] border-[#515151] rounded"
                                        />
                                        <label htmlFor="agree" className="text-[16px] font-medium leading-[20px] text-[#595953] cursor-pointer select-none">
                                            I agree to Lumenary’s Terms & Conditions and Privacy Policy.
                                        </label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full h-[64px] rounded-[40px] bg-gradient-to-r from-[#DDDEF2] via-[#8EA1E6] via-[#3037B4] to-[#101464] text-[32px] font-bold text-[#FEFEFE] leading-[40px] tracking-wide hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center"
                                    >
                                        Create Account
                                    </button>
                                </form>

                                <div className="w-full flex items-center justify-center gap-3 text-[#595953]/50 text-[16px] font-medium leading-[20px]">
                                    <div className="flex-1 h-[1px] bg-[#595953]/50"></div>
                                    <span>Or sign up with</span>
                                    <div className="flex-1 h-[1px] bg-[#595953]/50"></div>
                                </div>

                                <div className="w-full flex items-center justify-center gap-3 text-[16px] font-medium leading-[20px] text-[#595953]">
                                    <span>Already have an account?</span>
                                    <button type="button" onClick={() => setIsLoggedIn(true)} className="font-bold bg-gradient-to-r from-[#DDDEF2] via-[#8EA1E6] via-[#3037B4] to-[#101464] bg-clip-text text-transparent hover:opacity-80 transition">
                                        Sign In
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                /* SECTION DASHBOARD INTEGRATION UTAMA */
                <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
                    <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-white p-6 justify-between flex-shrink-0">
                        <div className="flex flex-col gap-8">
                            {/* LOGO SIDEBAR (Font disamakan dengan Logo Utama: font-serif & font-mono) */}
                            <div className="flex items-center gap-3 border-b border-slate-800 pb-5">
                                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-black text-sm text-white">L</div>
                                <div>
                                    <h3 className="font-serif font-extrabold text-base tracking-wide text-white">
                                        Lumenary
                                    </h3>
                                    <span className="text-[10px] uppercase font-medium tracking-widest text-slate-400 font-mono">
                                        Gunadarma Library
                                    </span>
                                </div>
                            </div>

                            <nav className="flex flex-col gap-1">
                                <button
                                    onClick={() => setActiveTab('browse')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'browse' ?
                                        'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                >
                                    <LayoutDashboard className="w-4 h-4" />
                                    Browse Books
                                </button>
                                <button
                                    onClick={() => setActiveTab('reservations')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative ${activeTab === 'reservations' ?
                                        'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                >
                                    <BookMarked className="w-4 h-4" />
                                    My Holds
                                    {reservations.length > 0 && (
                                        <span className="absolute right-4 bg-amber-500 text-slate-950 text-xs font-black px-1.5 py-0.5 rounded-md">{reservations.length}</span>
                                    )}
                                </button>
                                <button
                                    onClick={() => setActiveTab('faq')}
                                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'faq' ?
                                        'bg-indigo-600 text-white shadow-lg shadow-indigo-600/10' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'
                                        }`}
                                >
                                    <Info className="w-4 h-4" />
                                    Support & FAQ
                                </button>
                            </nav>
                        </div>

                        <div className="border-t border-slate-800 pt-4 flex flex-col gap-2">
                            <div className="flex items-center gap-3 px-2">
                                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-indigo-300">IS</div>
                                <div className="flex flex-col truncate">
                                    <span className="text-xs font-bold text-slate-200 truncate">Student Account</span>
                                    <span className="text-[10px] text-slate-400 truncate">{npm || "NPM Not Set"}</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsLoggedIn(false)}
                                className="w-full text-left text-xs font-bold text-rose-400 hover:text-rose-300 px-2 pt-2 mt-2 border-t border-slate-800/60"
                            >
                                Log Out
                            </button>
                        </div>
                    </aside>

                    <header className="md:hidden w-full bg-slate-900 text-white px-4 py-3 flex items-center justify-between sticky top-0 z-40">
                        <div className="flex items-center gap-2">
                            <div className="w-7 h-7 rounded-md bg-indigo-500 flex items-center justify-center font-black text-xs text-white">L</div>
                            <span className="font-bold text-xs tracking-wider uppercase">Lumenary</span>
                        </div>
                        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-1 text-slate-400 hover:text-white">
                            <Menu className="w-6 h-6" />
                        </button>
                        {mobileMenuOpen && (
                            <div className="absolute top-full left-0 w-full bg-slate-900 border-t border-slate-800 p-4 shadow-xl flex flex-col gap-2">
                                <button
                                    onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold ${activeTab === 'browse' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                                >
                                    Browse Books
                                </button>
                                <button
                                    onClick={() => { setActiveTab('reservations'); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold flex justify-between items-center ${activeTab === 'reservations' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                                >
                                    My Holds
                                    {reservations.length > 0 && <span className="bg-amber-500 text-slate-950 text-xs px-2 py-0.5 rounded font-bold">{reservations.length}</span>}
                                </button>
                                <button
                                    onClick={() => { setActiveTab('faq'); setMobileMenuOpen(false); }}
                                    className={`w-full text-left px-4 py-3 rounded-lg text-sm font-bold ${activeTab === 'faq' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                                >
                                    Support & FAQ
                                </button>
                                <button
                                    onClick={() => { setIsLoggedIn(false); setMobileMenuOpen(false); }}
                                    className="w-full text-left px-4 py-3 rounded-lg text-sm font-bold text-rose-400 border-t border-slate-800 mt-2"
                                >
                                    Log Out
                                </button>
                            </div>
                        )}
                    </header>

                    <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
                        {activeTab === 'browse' && (
                            <div className="flex flex-col gap-6">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
                                    <div>
                                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Academic Catalog Database</h1>
                                        <p className="text-sm text-slate-500 font-medium mt-1">Search or reserve verified Information Systems core literature datasets.</p>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setSelectedCategory(cat)}
                                                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedCategory === cat ? 'bg-slate-900 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="relative w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-2 flex items-center gap-3">
                                    <Search className="w-5 h-5 text-slate-400 ml-3 flex-shrink-0" />
                                    <input
                                        type="text"
                                        placeholder="Search titles, authors, specialized topics, or ISBN codes..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent py-2.5"
                                    />
                                    {searchQuery && (
                                        <button onClick={() => setSearchQuery('')} className="p-1 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors mr-1">
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>

                                {filteredBooks.length === 0 ? (
                                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto w-full shadow-sm mt-4">
                                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold mb-4">?</div>
                                        <h3 className="font-bold text-slate-900 text-lg">No literature modules found</h3>
                                        <p className="text-sm text-slate-500 font-medium mt-1 max-w-xs">We couldn't find matches for "{searchQuery}". Check spelling alignment variables or change current category index filters.</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredBooks.map((book) => (
                                            <div key={book.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                                                <div className={`p-6 ${book.coverClass} text-white flex flex-col justify-between h-48 relative`}>
                                                    <span className="text-[10px] uppercase tracking-widest font-extrabold bg-white/20 backdrop-blur-md px-2.5 py-1 rounded-md self-start">{book.category}</span>
                                                    <div>
                                                        <h3 className="font-black text-lg leading-tight tracking-tight line-clamp-2">{book.title}</h3>
                                                        <p className="text-xs text-white/80 font-medium mt-1">by {book.author}</p>
                                                    </div>
                                                </div>
                                                <div className="p-6 flex flex-col gap-4 flex-1 justify-between bg-white">
                                                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 font-medium">{book.description}</p>
                                                    <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 text-[11px] text-slate-500 font-bold">
                                                        <div className="flex justify-between"><span>ISBN:</span> <span className="text-slate-800">{book.isbn}</span></div>
                                                        <div className="flex justify-between"><span>Published:</span> <span className="text-slate-800">{book.publishYear}</span></div>
                                                        <div className="flex justify-between"><span>Shelf:</span> <span className="text-slate-800">{book.location}</span></div>
                                                    </div>
                                                    <div className="flex items-center justify-between mt-2 pt-3 border-t border-slate-100">
                                                        <div className="flex items-center gap-1">
                                                            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                                            <span className="text-xs font-black text-slate-800">{book.rating}</span>
                                                        </div>
                                                        {book.status === 'available' ? (
                                                            <button
                                                                onClick={() => openReservationWorkflow(book)}
                                                                className="flex items-center gap-1.5 px-3.5 py-2 bg-indigo-50 border border-indigo-100 hover:bg-indigo-100 rounded-xl text-xs font-black text-indigo-700 transition-colors shadow-sm shadow-indigo-600/5"
                                                            >
                                                                Hold / Reserve
                                                                <ArrowRight className="w-3.5 h-3.5" />
                                                            </button>
                                                        ) : (
                                                            <span className="px-3 py-1.5 bg-amber-50 border border-amber-100 rounded-xl text-xs font-bold text-amber-700 select-none">Reserved Hold</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'reservations' && (
                            <div className="flex flex-col gap-6">
                                <div className="border-b border-slate-200 pb-5">
                                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Active Hold Registry</h1>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Track active textbook loan holds. Items must be collected within the 48-hour window parameters.</p>
                                </div>
                                {reservations.length === 0 ? (
                                    <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center max-w-xl mx-auto w-full shadow-sm">
                                        <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold mb-4">0</div>
                                        <h3 className="font-bold text-slate-900 text-lg">No active holds recorded</h3>
                                        <p className="text-sm text-slate-500 font-medium mt-1 max-w-xs">You currently hold no active literature tokens. Browse the catalog database matrix to reserve structural modules.</p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col gap-4">
                                        {reservations.map((res) => (
                                            <div key={res.reservationId} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-slate-300 transition-colors">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-600 flex-shrink-0"><BookOpen className="w-6 h-6" /></div>
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black tracking-widest text-indigo-600 uppercase bg-indigo-50 px-2 py-0.5 rounded self-start">{res.reservationId}</span>
                                                        <h3 className="font-bold text-slate-900 text-base tracking-tight mt-1">{res.bookTitle}</h3>
                                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 font-medium mt-1">
                                                            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-emerald-600" /> {res.location}</span>
                                                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> Deadline: <strong className="text-slate-700">{res.pickupDeadline}</strong></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleCancelReservation(res.reservationId, res.bookId)}
                                                    className="px-4 py-2 border border-slate-200 hover:border-rose-200 rounded-xl text-xs font-bold text-slate-600 hover:text-rose-600 hover:bg-rose-50/50 transition-all self-end md:self-center"
                                                >
                                                    Cancel Hold
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {activeTab === 'faq' && (
                            <div className="flex flex-col gap-6">
                                <div className="border-b border-slate-200 pb-5">
                                    <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Support Infrastructure & FAQ</h1>
                                    <p className="text-sm text-slate-500 font-medium mt-1">Review operational directives regarding Lumenary library integration protocols.</p>
                                </div>
                                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden max-w-3xl w-full mx-auto">
                                    {initialFAQs.map((faq, index) => {
                                        const isExpanded = expandedFAQ === faq.id;
                                        return (
                                            <div key={faq.id} className={`border-b border-slate-100 last:border-none ${isExpanded ? 'bg-slate-50/40' : ''}`}>
                                                <button
                                                    onClick={() => setExpandedFAQ(isExpanded ? null : faq.id)}
                                                    className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-50"
                                                >
                                                    <span className="text-sm font-bold text-slate-900 tracking-tight">{faq.question}</span>
                                                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 flex-shrink-0 ml-4 ${isExpanded ? 'transform rotate-180 text-indigo-600' : ''}`} />
                                                </button>
                                                <div className={`transition-all duration-200 ease-in-out overflow-hidden ${isExpanded ? 'max-h-40 border-t border-slate-100/60' : 'max-h-0'}`}>
                                                    <p className="p-5 text-xs text-slate-600 font-medium leading-relaxed bg-white">{faq.answer}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            )}

            {/* MODAL WORKFLOW */}
            {showReservationModal && selectedBook && (
                <div className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-2 text-indigo-600">
                                <BookOpen className="w-5 h-5" />
                                <h3 className="font-black text-slate-900 text-sm tracking-tight">Confirm Hold Reservation</h3>
                            </div>
                            <button onClick={() => { setShowReservationModal(false); setSelectedBook(null); }} className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 flex flex-col gap-4">
                            <p className="text-xs font-medium text-slate-600 leading-relaxed">
                                You are requesting an academic hold token allocation for the following core item dataset:
                            </p>
                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-xl flex flex-col gap-1">
                                <h4 className="font-bold text-slate-900 text-sm tracking-tight">{selectedBook.title}</h4>
                                <span className="text-[11px] text-slate-500 font-medium">by {selectedBook.author}</span>
                            </div>
                            <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 text-xs text-slate-500">
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    <span>Pickup Location: <strong className="text-slate-700 font-bold">{selectedBook.location}</strong></span>
                                </div>
                                <div className="flex items-center gap-2 mt-1">
                                    <Clock className="w-4 h-4 text-amber-500" />
                                    <span>Hold Reservation Expiry: <strong className="text-slate-700 font-bold">48 Hours Window</strong></span>
                                </div>
                            </div>
                        </div>

                        <div className="p-6 pt-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-end gap-3">
                            <button
                                onClick={() => { setShowReservationModal(false); setSelectedBook(null); }}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 transition-colors"
                            >
                                Dismiss
                            </button>
                            <button
                                onClick={confirmReservation}
                                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-600/10 transition-colors"
                            >
                                Confirm Hold
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}