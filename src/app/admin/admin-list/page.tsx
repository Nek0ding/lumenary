'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Search, Plus, X, UserCog, Mail, KeyRound, Hash, Phone, Building2,
  ShieldCheck, Trash2, Save, AlertTriangle, ShieldAlert, Loader2
} from 'lucide-react';
import { authFetch } from '@/lib/authFetch';
import toast from 'react-hot-toast';

interface Staff {
  id_user: string;
  nama: string;
  npm: string;
  email: string;
  no_telp: string | null;
  jenis_kelamin: 'L' | 'P' | null;
  created_at: string;
  last_login?: string | null;
}

function formatTimeAgo(dateString: string | null | undefined) {
  if (!dateString) return { text: "Never logged in", active: false };
  const seconds = Math.round((new Date().getTime() - new Date(dateString).getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (seconds < 60) return { text: "Active just now", active: true };
  if (minutes < 60) return { text: `Active ${minutes} mins ago`, active: true };
  if (hours < 24) return { text: `Offline for ${hours}h`, active: false };
  if (days === 1) return { text: "Offline since yesterday", active: false };
  return { text: `Offline for ${days} days`, active: false };
}

export default function StaffDirectoryPage() {
  const [staffList, setStaffList] = useState<Staff[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Meta Permissions
  const [isPrimaryAdmin, setIsPrimaryAdmin] = useState(false);
  const [currentUserId, setCurrentUserId] = useState('');

  // Modal States
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null);

  // Form
  const [formData, setFormData] = useState({ nama: '', email: '', npm: '', password: '', no_telp: '', jenis_kelamin: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const fetchStaff = useCallback(async (search = '') => {
    setIsLoading(true);
    try {
      const res = await authFetch(`/api/admin/staff?search=${encodeURIComponent(search)}`);
      const json = await res.json();
      if (json.success) {
        setStaffList(json.data);
        setIsPrimaryAdmin(json.meta.isPrimaryAdmin);
        setCurrentUserId(json.meta.currentUserId);
      } else toast.error(json.message);
    } catch {
      toast.error("Failed to fetch staff data.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => fetchStaff(searchQuery), 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, fetchStaff]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const openAddModal = () => {
    setFormData({ nama: '', email: '', npm: '', password: '', no_telp: '', jenis_kelamin: '' });
    setShowAddModal(true);
  };

  const openEditModal = (staff: Staff) => {
    setFormData({
      nama: staff.nama, email: staff.email, npm: staff.npm, password: '',
      no_telp: staff.no_telp || '', jenis_kelamin: staff.jenis_kelamin || ''
    });
    setSelectedStaff(staff);
    setShowDeleteConfirm(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const isEdit = !!selectedStaff;

    const payload: Record<string, any> = { ...formData };
    if (isEdit) {
      payload.id_user = selectedStaff.id_user;
      if (!payload.password) delete payload.password;
    }

    try {
      const res = await authFetch('/api/admin/staff', {
        method: isEdit ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();

      if (json.success) {
        toast.success(json.message);
        setShowAddModal(false);
        setSelectedStaff(null);
        fetchStaff(searchQuery);
      } else toast.error(json.message);
    } catch {
      toast.error("Server connection error.");
    } finally { setIsSubmitting(false); }
  };

  const handleDelete = async () => {
    if (!selectedStaff) return;
    setIsSubmitting(true);
    try {
      const res = await authFetch(`/api/admin/staff?id_user=${selectedStaff.id_user}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        toast.success(json.message);
        setSelectedStaff(null);
        fetchStaff(searchQuery);
      } else toast.error(json.message);
    } catch {
      toast.error("Server connection error.");
    } finally { setIsSubmitting(false); }
  };

  return (
    <div className="p-8 bg-[#F8F5FF] min-h-screen font-sans">

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Staff Directory</h1>
          <p className="text-zinc-500 font-semibold mt-1 text-sm">
            Manage campus library administrative accounts and privileges.
          </p>
        </div>
        {/* Hanya Primary Admin yang bisa melihat tombol Add */}
        {isPrimaryAdmin && (
          <button onClick={openAddModal} className="px-5 py-3 bg-[#161B85] text-white font-extrabold rounded-xl flex items-center gap-2 hover:bg-[#0E1154] transition-all shadow-md shadow-[#161B85]/20">
            <Plus size={16} /> Add New Staff
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-zinc-200 p-2 mb-6 shadow-sm flex items-center gap-3">
        <div className="pl-4 text-zinc-400"><Search size={20} /></div>
        <input type="text" placeholder="Search staff by name, ID, or email..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="flex-1 py-2.5 bg-transparent font-bold text-sm text-zinc-900 focus:outline-none" />
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white border border-zinc-200 rounded-3xl shadow-sm">
          <div className="flex flex-col items-center gap-4">
            <Loader2 size={40} className="text-[#161B85] animate-spin" />
            <p className="text-sm font-extrabold text-zinc-500 animate-pulse">
              Loading Staff Directory...
            </p>
          </div>
        </div>
      ) : staffList.length === 0 ? (
        <div className="text-center py-16 bg-white border border-zinc-200 rounded-3xl text-zinc-400 shadow-sm">
          <UserCog size={48} className="mx-auto mb-4 opacity-50" />
          <p className="text-sm font-extrabold">No staff members found.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {staffList.map((staff, idx) => {
            const { text: loginText, active: isActive } = formatTimeAgo(staff.last_login);
            const isPrimary = idx === 0; // The first in the sorted list is the primary admin
            const isMe = staff.id_user === currentUserId;
            const canEdit = isPrimaryAdmin || isMe; // Bisa diedit jika Super Admin, atau ini adalah profilnya sendiri

            return (
              <div
                key={staff.id_user}
                onClick={() => canEdit ? openEditModal(staff) : null}
                className={`bg-white border rounded-2xl p-5 flex items-center justify-between transition-all group ${canEdit
                    ? 'border-zinc-200 cursor-pointer hover:border-[#161B85]/30 hover:shadow-md'
                    : 'border-zinc-100 opacity-80 cursor-not-allowed'
                  }`}
              >
                <div className="flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center ${isPrimary ? 'bg-amber-50 border-amber-200 text-amber-600' : 'bg-[#F0F2FF] border-[#C7CBF9] text-[#161B85]'}`}>
                    {isPrimary ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
                  </div>
                  <div>
                    <h3 className={`text-base font-extrabold text-zinc-900 ${canEdit && 'group-hover:text-[#161B85]'} transition-colors`}>
                      {staff.nama} {isMe && <span className="text-[10px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full ml-1">YOU</span>}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-mono font-bold bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
                        EMP-{staff.npm.slice(-4)}
                      </span>
                      <span className="text-[10px] font-bold text-zinc-400 flex items-center gap-1.5">
                        · <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-zinc-300'}`}></span> {loginText}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`text-[10px] font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest border ${isPrimary ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-[#161B85] bg-[#F0F2FF] border-[#161B85]/10'
                    }`}>
                    {isPrimary ? 'Primary Admin' : 'Administrator'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ─── Add / Edit Modal ─────────────────────────────────────────────────── */}
      {(showAddModal || selectedStaff) && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl relative flex flex-col max-h-[90vh] border border-zinc-200 overflow-hidden">

            <div className="flex items-center justify-between p-6 border-b border-zinc-200 bg-zinc-50/50">
              <div>
                <h2 className="text-xl font-extrabold text-zinc-900 flex items-center gap-2">
                  <UserCog className="text-[#161B85]" size={22} />
                  {selectedStaff ? 'Edit Profile' : 'Register New Staff'}
                </h2>
                <p className="text-xs text-zinc-500 font-semibold mt-1">
                  {selectedStaff ? 'Update details.' : 'Provide details to grant access.'}
                </p>
              </div>
              <button onClick={() => { setShowAddModal(false); setSelectedStaff(null); }} className="p-2 bg-white rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors border border-zinc-200">
                <X size={18} />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {showDeleteConfirm ? (
                <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
                  <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mb-4">
                    <AlertTriangle size={32} />
                  </div>
                  <h3 className="text-xl font-extrabold text-zinc-900 mb-2">Delete {selectedStaff?.nama}?</h3>
                  <p className="text-sm text-zinc-500 font-medium mb-6">
                    This will permanently remove their admin access from the system. This action cannot be undone.
                  </p>
                  <div className="flex gap-3 w-full max-w-sm">
                    <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-3 bg-white border border-zinc-200 text-zinc-600 font-extrabold rounded-xl hover:bg-zinc-50">Cancel</button>
                    <button onClick={handleDelete} disabled={isSubmitting} className="flex-1 py-3 bg-red-600 text-white font-extrabold rounded-xl hover:bg-red-700 flex items-center justify-center gap-2 disabled:opacity-50">
                      {isSubmitting ? 'Deleting...' : <><Trash2 size={16} /> Confirm</>}
                    </button>
                  </div>
                </div>
              ) : (
                <form id="staffForm" onSubmit={handleSave} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Full Name *</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><UserCog size={16} /></div>
                        <input required type="text" name="nama" value={formData.nama} onChange={handleInputChange} placeholder="John Doe" className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Staff ID (NPM/NIK) *</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><Hash size={16} /></div>
                        <input required type="text" name="npm" value={formData.npm} onChange={handleInputChange} placeholder="ID Number" className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold font-mono text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Email Address *</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><Mail size={16} /></div>
                        <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="admin@lumenary.com" className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Phone Number</label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><Phone size={16} /></div>
                        <input type="text" name="no_telp" value={formData.no_telp} onChange={handleInputChange} placeholder="0812..." className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30" />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">
                        {selectedStaff ? 'Reset Password (Optional)' : 'Password *'}
                      </label>
                      <div className="relative">
                        <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400"><KeyRound size={16} /></div>
                        <input required={!selectedStaff} minLength={6} type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder={selectedStaff ? "Leave blank to keep current" : "Min. 6 characters"} className="w-full bg-white border border-zinc-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-extrabold text-zinc-500 uppercase tracking-widest mb-1.5 ml-1">Gender</label>
                      <select name="jenis_kelamin" value={formData.jenis_kelamin} onChange={handleInputChange} className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-sm font-bold text-zinc-900 focus:outline-none focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85]/30">
                        <option value="" disabled>Select gender</option>
                        <option value="L">Male</option>
                        <option value="P">Female</option>
                      </select>
                    </div>
                  </div>
                </form>
              )}
            </div>

            {!showDeleteConfirm && (
              <div className="p-6 border-t border-zinc-200 bg-zinc-50 flex items-center justify-between">
                {/* Hanya tampilkan tombol delete jika user ini adalah Primary Admin, yang diedit bukan dirinya sendiri, dan bukan form "Add New" */}
                {selectedStaff && isPrimaryAdmin && selectedStaff.id_user !== currentUserId ? (
                  <button type="button" onClick={() => setShowDeleteConfirm(true)} className="text-red-500 hover:text-red-700 bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-colors">
                    <Trash2 size={14} /> Remove Access
                  </button>
                ) : <div />}

                <div className="flex gap-3">
                  <button onClick={() => { setShowAddModal(false); setSelectedStaff(null); }} className="px-5 py-2.5 text-zinc-600 bg-white border border-zinc-200 font-extrabold text-sm rounded-xl hover:bg-zinc-50 transition-colors">
                    Cancel
                  </button>
                  <button type="submit" form="staffForm" disabled={isSubmitting} className="px-6 py-2.5 bg-[#161B85] text-white font-extrabold text-sm rounded-xl flex items-center gap-2 hover:bg-[#0E1154] disabled:opacity-50 transition-colors shadow-md shadow-[#161B85]/20">
                    {isSubmitting ? 'Saving...' : <><Save size={16} /> Save Changes</>}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}