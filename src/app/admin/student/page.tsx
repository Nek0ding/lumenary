'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { 
    Search, ChevronLeft, ChevronRight, Edit, History, 
    X, Loader2, BookCopy
} from 'lucide-react';

export default function AdminStudentPage() {
    // --- State Utama ---
    const [students, setStudents] = useState<any[]>([]);
    const [totalStudents, setTotalStudents] = useState(0);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [searchInput, setSearchInput] = useState('');
    const [isTableLoading, setIsTableLoading] = useState(true);
    const limit = 10;
    const router = useRouter();

    // --- State Modals ---
    const [historyModalOpen, setHistoryModalOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState<any[]>([]);
    const [isHistoryLoading, setIsHistoryLoading] = useState(false);
    const [activeStudentName, setActiveStudentName] = useState('');

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [isEditSaving, setIsEditSaving] = useState(false);
    const [editForm, setEditForm] = useState<any>({});
    const [originalForm, setOriginalForm] = useState<any>({}); // Kunci untuk validasi tombol save

    // --- Helper: Translasi Status Database (ID) ke UI (EN) ---
    const translateStatus = (status: string) => {
        const s = status?.toLowerCase();
        if (s === 'direservasi') return { label: 'Reserved', className: 'bg-blue-50 text-[#161B85]' };
        if (s === 'dibatalkan') return { label: 'Cancelled', className: 'bg-zinc-100 text-zinc-500' };
        if (s === 'dipinjam') return { label: 'Borrowed', className: 'bg-indigo-50 text-indigo-700' };
        if (s === 'dikembalikan') return { label: 'Returned', className: 'bg-emerald-50 text-emerald-600' };
        if (s === 'terlambat') return { label: 'Overdue', className: 'bg-red-50 text-red-600' };
        return { label: status, className: 'bg-zinc-100 text-zinc-700' };
    };

    const fetchStudents = async (currentPage: number, searchQuery: string) => {
        setIsTableLoading(true);
        const token = localStorage.getItem('lumenary_token');
        try {
            const res = await fetch(`/api/admin/student?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(searchQuery)}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.status === 401 || res.status === 403) {
                toast.error('Session expired. Please log in again.');
                localStorage.removeItem('lumenary_token');
                localStorage.removeItem('lumenary_user');
                router.replace('/login'); // Tendang paksa ke login
                return; // Hentikan fungsi agar kode di bawahnya tidak jalan
            }
            
            const resData = await res.json();
            if (resData.success) {
                setStudents(resData.data);
                setTotalStudents(resData.total);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsTableLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents(page, search);
    }, [page, search]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setPage(1);
        setSearch(searchInput);
    };

    const openHistoryModal = async (student: any) => {
        setActiveStudentName(student.nama);
        setHistoryModalOpen(true);
        setIsHistoryLoading(true);
        const token = localStorage.getItem('lumenary_token');
        try {
            const res = await fetch(`/api/admin/student/${student.id_user}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const resData = await res.json();
            if (resData.success) setSelectedHistory(resData.data);
        } catch (error) { 
            console.error(error); 
        } finally { 
            setIsHistoryLoading(false); 
        }
    };

    // --- Buka Edit Modal & Ambil Snapshot Data Asli ---
    const openEditModal = (student: any) => {
        const formData = {
            id_user: student.id_user,
            npm: student.npm || '',
            email: student.email || '',
            nama: student.nama || '',
            no_telp: student.no_telp || '',
            jenis_kelamin: student.jenis_kelamin || '',
            alamat: student.alamat || ''
        };
        setEditForm(formData);
        setOriginalForm(formData); // Simpan wujud asli di state terpisah
        setEditModalOpen(true);
    };

    const handleEditSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsEditSaving(true);
        const token = localStorage.getItem('lumenary_token');
        const loadingToast = toast.loading('Saving changes...');
        try {
            const res = await fetch(`/api/admin/student/${editForm.id_user}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm)
            });
            const resData = await res.json();
            if (resData.success) {
                // Selesaikan toast dengan sukses
                toast.success('Student profile updated successfully!', { id: loadingToast });
                setEditModalOpen(false);
                fetchStudents(page, search);
            } else {
                // Selesaikan toast dengan error dari pesan serverless backend
                toast.error(resData.message || 'Failed to save changes.', { id: loadingToast });
            }
        } catch (error) {
            console.error(error);
            toast.error('Network connection error. Please try again.', { id: loadingToast });
        } finally {
            setIsEditSaving(false);
        }
    };

    // Logika Pembanding: Cek apakah ada field yang berbeda dari data asli
    const isUnchanged = 
        editForm.npm === originalForm.npm &&
        editForm.email === originalForm.email &&
        editForm.nama === originalForm.nama &&
        editForm.no_telp === originalForm.no_telp &&
        editForm.jenis_kelamin === originalForm.jenis_kelamin &&
        editForm.alamat === originalForm.alamat;

    const totalPages = Math.ceil(totalStudents / limit);

    return (
        <div className="w-full flex justify-center pb-12 px-4 md:px-0">
            <div className="w-full max-w-[1200px] flex flex-col font-['Plus_Jakarta_Sans',sans-serif]">
                
                {/* Header */}
                <div className="mt-2 mb-8">
                    <h1 className="text-[32px] font-black text-black tracking-tight">Student Directory</h1>
                    <p className="text-[15px] text-zinc-500 font-semibold">Manage campus library membership and track borrowing habits.</p>
                </div>

                {/* Table */}
                <div className="bg-white border border-zinc-200 rounded-[24px] shadow-sm overflow-hidden flex flex-col relative">
                    <div className="p-5 border-b border-zinc-100 bg-[#FDFDFF]">
                        <form onSubmit={handleSearch} className="relative w-full max-w-[400px]">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                            <input 
                                type="text" placeholder="Search by student name or NPM..."
                                value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-zinc-200 text-[14px] text-black focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] transition-all"
                            />
                        </form>
                    </div>

                    <div className="overflow-x-auto relative min-h-[400px]">
                        {isTableLoading && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[1px] z-10 flex items-center justify-center">
                                <Loader2 className="w-8 h-8 text-[#161B85] animate-spin" />
                            </div>
                        )}

                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-50/50 border-b border-zinc-200">
                                    <th className="py-4 px-6 text-[12px] font-extrabold text-zinc-500 uppercase tracking-wider">Student Profile</th>
                                    <th className="py-4 px-6 text-[12px] font-extrabold text-zinc-500 uppercase tracking-wider text-center">Active Loans</th>
                                    <th className="py-4 px-6 text-[12px] font-extrabold text-zinc-500 uppercase tracking-wider text-center">Lifetime Track Record</th>
                                    <th className="py-4 px-6 text-[12px] font-extrabold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map((st) => (
                                    <tr key={st.id_user} className="border-b border-zinc-100 hover:bg-[#F8F8FF]/50 transition-colors">
                                        <td className="py-4 px-6">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-[15px] text-black">{st.nama || 'Unnamed Student'}</span>
                                                <span className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest mt-0.5">NPM: {st.npm}</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex items-center justify-center gap-2">
                                                <BookCopy size={16} className={st.activeLoans > 0 ? "text-[#161B85]" : "text-zinc-300"} />
                                                <span className={`text-[14px] font-bold ${st.activeLoans > 0 ? 'text-black' : 'text-zinc-400'}`}>{st.activeLoans} Books</span>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-center">
                                            <div className="flex flex-col items-center">
                                                <span className="text-[12px] font-bold text-zinc-600">
                                                    {st.lifetimeBorrowed} Borrowed <span className="text-zinc-300 mx-1">/</span> <span className={st.lifetimeOverdue > 0 ? 'text-red-500' : 'text-zinc-400'}>{st.lifetimeOverdue} Overdue</span>
                                                </span>
                                                <div className="w-[100px] h-1.5 bg-zinc-100 rounded-full mt-2 overflow-hidden flex">
                                                    <div className="h-full bg-[#161B85]" style={{ width: `${Math.min((st.lifetimeBorrowed / 20) * 100, 100)}%` }}></div>
                                                    {st.lifetimeOverdue > 0 && <div className="h-full bg-red-500" style={{ width: `${Math.min((st.lifetimeOverdue / st.lifetimeBorrowed) * 100, 100)}%` }}></div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <button onClick={() => openHistoryModal(st)} className="text-[#161B85] hover:text-[#0E1154] font-bold text-[13px] flex items-center gap-1.5 transition-colors"><History size={16} /> View History</button>
                                                <span className="text-zinc-200">|</span>
                                                <button onClick={() => openEditModal(st)} className="text-zinc-500 hover:text-black font-bold text-[13px] flex items-center gap-1.5 transition-colors"><Edit size={16} /> Edit</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="p-4 border-t border-zinc-200 bg-zinc-50/50 flex items-center justify-between">
                        <span className="text-[13px] font-semibold text-zinc-500">
                            Showing <span className="text-black">{students.length > 0 ? (page - 1) * limit + 1 : 0}</span> to <span className="text-black">{Math.min(page * limit, totalStudents)}</span> of <span className="text-black">{totalStudents}</span> students
                        </span>
                        <div className="flex items-center gap-1">
                            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-50 transition-all text-zinc-600"><ChevronLeft size={16}/></button>
                            <span className="px-4 text-[13px] font-bold text-[#161B85]">{page}</span>
                            <button disabled={page >= totalPages} onClick={() => setPage(page + 1)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-zinc-200 bg-white hover:bg-zinc-50 disabled:opacity-50 transition-all text-zinc-600"><ChevronRight size={16}/></button>
                        </div>
                    </div>
                </div>

                {/* ================= MODAL HISTORY ================= */}
                {historyModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
                        <div className="bg-[#F8F8FF] w-full max-w-[600px] max-h-[85vh] rounded-[24px] shadow-2xl flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-zinc-200 flex justify-between items-center bg-white">
                                <div>
                                    <h2 className="text-[20px] font-black text-black leading-tight">Loan History</h2>
                                    <p className="text-[13px] text-zinc-500 font-bold mt-0.5">{activeStudentName}</p>
                                </div>
                                <button onClick={() => setHistoryModalOpen(false)} className="p-2 bg-zinc-100 hover:bg-red-100 hover:text-red-600 rounded-full transition-colors text-zinc-500"><X size={20}/></button>
                            </div>
                            
                            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                                {isHistoryLoading ? (
                                    <div className="flex justify-center py-10"><Loader2 className="animate-spin text-[#161B85]" size={32} /></div>
                                ) : selectedHistory.length === 0 ? (
                                    <p className="text-center text-zinc-400 font-bold py-10">No loan history found for this student.</p>
                                ) : (
                                    selectedHistory.map((loan) => {
                                        const currentStatus = translateStatus(loan.status);
                                        return (
                                            <div key={loan.id_peminjaman} className="bg-white border border-zinc-100 rounded-2xl p-4 flex gap-4 shadow-sm">
                                                <div className="w-[70px] h-[100px] shrink-0 bg-zinc-100 rounded-lg overflow-hidden border border-zinc-200">
                                                    {loan.buku?.cover_buku ? <img src={loan.buku.cover_buku} alt="cover" className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-zinc-300"><BookCopy size={24}/></div>}
                                                </div>
                                                <div className="flex flex-col flex-1 justify-between">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h3 className="text-[16px] font-bold text-black leading-tight line-clamp-2">{loan.buku?.judul}</h3>
                                                            <p className="text-[12px] text-zinc-400 font-medium mt-1">{loan.buku?.penulis}</p>
                                                        </div>
                                                        <span className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider whitespace-nowrap ${currentStatus.className}`}>
                                                            {currentStatus.label}
                                                        </span>
                                                    </div>
                                                    <div className="flex gap-8 mt-4 border-t border-zinc-100 pt-3">
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-zinc-400 font-bold uppercase">Borrow/Reserve Date</span>
                                                            <span className="text-[12px] font-bold text-black mt-0.5">{new Date(loan.tanggal_pinjam).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</span>
                                                        </div>
                                                        <div className="flex flex-col">
                                                            <span className="text-[10px] text-zinc-400 font-bold uppercase">Return Deadline</span>
                                                            <span className="text-[12px] font-bold text-black mt-0.5">{new Date(loan.tanggal_kembali).toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* ================= MODAL EDIT PROFIL ================= */}
                {editModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in zoom-in-95 duration-200">
                        <div className="bg-white w-full max-w-[650px] rounded-[24px] shadow-2xl overflow-hidden flex flex-col">
                            <div className="p-6 border-b border-zinc-100 flex justify-between items-center bg-[#FDFDFF]">
                                <h2 className="text-[22px] font-black text-black">Edit Personal Profile</h2>
                                <button onClick={() => setEditModalOpen(false)} className="p-2 hover:bg-zinc-100 rounded-full transition-colors text-zinc-500"><X size={20}/></button>
                            </div>

                            <form onSubmit={handleEditSave} className="p-6 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* NPM */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-zinc-500">NPM (Student ID)</label>
                                        <input type="text" value={editForm.npm || ''} onChange={(e) => setEditForm({...editForm, npm: e.target.value})} required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all" />
                                    </div>
                                    {/* Email */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-zinc-500">Email Address</label>
                                        <input type="email" value={editForm.email || ''} onChange={(e) => setEditForm({...editForm, email: e.target.value})} required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all" />
                                    </div>
                                    {/* Full Name */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-[13px] font-bold text-zinc-500">Full Name</label>
                                        <input type="text" value={editForm.nama || ''} onChange={(e) => setEditForm({...editForm, nama: e.target.value})} required className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all" />
                                    </div>
                                    {/* Phone Number */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-zinc-500">Phone Number</label>
                                        <input type="text" value={editForm.no_telp || ''} onChange={(e) => setEditForm({...editForm, no_telp: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all" />
                                    </div>
                                    {/* Gender */}
                                    <div className="flex flex-col gap-2">
                                        <label className="text-[13px] font-bold text-zinc-500">Gender</label>
                                        <select value={editForm.jenis_kelamin || ''} onChange={(e) => setEditForm({...editForm, jenis_kelamin: e.target.value})} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all">
                                            <option value="">Select Gender...</option>
                                            <option value="L">Male</option>
                                            <option value="P">Female</option>
                                        </select>
                                    </div>
                                    {/* Address */}
                                    <div className="flex flex-col gap-2 md:col-span-2">
                                        <label className="text-[13px] font-bold text-zinc-500">Address</label>
                                        <textarea value={editForm.alamat || ''} onChange={(e) => setEditForm({...editForm, alamat: e.target.value})} rows={3} className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-[14px] font-bold text-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#161B85]/20 focus:border-[#161B85] transition-all resize-none"></textarea>
                                    </div>
                                </div>

                                {/* Tombol Simpan Aksi Dinamis */}
                                <div className="border-t border-zinc-100 pt-6 mt-2 flex justify-end">
                                    <button 
                                        type="submit" 
                                        disabled={isEditSaving || isUnchanged} 
                                        className={`px-8 py-3 rounded-xl font-bold text-[14px] transition-all flex items-center gap-2 shadow-md
                                            ${isUnchanged 
                                                ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed shadow-none' 
                                                : 'bg-[#161B85] text-white hover:bg-[#0E1154] hover:shadow-lg'
                                            }`}
                                    >
                                        {isEditSaving ? (
                                            <><Loader2 size={18} className="animate-spin" /> Saving...</>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}