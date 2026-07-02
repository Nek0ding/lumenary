'use client';

import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Mail, Hash, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface UserProfile {
    id_user: number;
    npm: string;
    email: string;
    nama: string;
    no_telp: string;
    alamat: string;
    jenis_kelamin: string;
}

export default function SettingsPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    // State untuk Form yang diketik user
    const [formData, setFormData] = useState({
        nama: '',
        no_telp: '',
        alamat: '',
        jenis_kelamin: ''
    });

    // State untuk menyimpan data asli (sebelum diedit)
    const [initialData, setInitialData] = useState({
        nama: '',
        no_telp: '',
        alamat: '',
        jenis_kelamin: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem('lumenary_token');
            if (!token) {
                window.location.href = '/login';
                return;
            }

            try {
                const res = await fetch('/api/user/profile', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                const resData = await res.json();

                if (res.ok && resData.success) {
                    setProfile(resData.data);

                    const fetchedData = {
                        nama: resData.data.nama || '',
                        no_telp: resData.data.no_telp || '',
                        alamat: resData.data.alamat || '',
                        jenis_kelamin: resData.data.jenis_kelamin || ''
                    };

                    // Set kedua state dengan data dari database
                    setFormData(fetchedData);
                    setInitialData(fetchedData);
                } else {
                    if (res.status === 401) {
                        localStorage.clear();
                        window.location.href = '/login';
                    }
                    setMessage({ text: resData.message || 'Gagal memuat profil', type: 'error' });
                }
            } catch (error) {
                setMessage({ text: 'Terjadi kesalahan jaringan', type: 'error' });
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setMessage({ text: '', type: '' }); // Hapus pesan jika user mulai mengetik lagi
    };

    // LOGIKA PENGECEKAN PERUBAHAN
    // Akan bernilai true jika ada satu saja field yang berbeda dengan data asli
    const hasChanged =
        formData.nama !== initialData.nama ||
        formData.no_telp !== initialData.no_telp ||
        formData.alamat !== initialData.alamat ||
        formData.jenis_kelamin !== initialData.jenis_kelamin;

    const handleSaveChanges = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("1. Tombol ditekan!");
        console.log("2. Apakah ada perubahan data? (hasChanged):", hasChanged);

        // Proteksi tambahan: jangan jalankan fungsi jika tidak ada perubahan
        if (!hasChanged) {
            console.log("3. STOP: Tidak ada perubahan, fungsi dibatalkan.");
            return;
        }

        setSaving(true);
        setMessage({ text: '', type: '' });

        const token = localStorage.getItem('lumenary_token');

        // Validasi Frontend
        if (formData.nama.trim().length < 3) {
            console.log("ERROR: Nama kurang dari 3 karakter");
            setMessage({ text: 'Nama minimal 3 karakter', type: 'error' });
            setSaving(false); return;
        }
        if (!/^[0-9\-\+]{9,15}$/.test(formData.no_telp)) {
            console.log("ERROR: Format nomor telepon salah ->", formData.no_telp);
            setMessage({ text: 'Nomor telepon tidak valid (9-15 digit angka)', type: 'error' });
            setSaving(false); return;
        }
        if (formData.alamat.trim().length < 10) {
            console.log("ERROR: Alamat kurang dari 10 karakter ->", formData.alamat);
            setMessage({ text: 'Alamat terlalu pendek (minimal 10 karakter)', type: 'error' });
            setSaving(false); return;
        }
        if (!["L", "P"].includes(formData.jenis_kelamin)) {
            console.log("ERROR: Gender belum dipilih ->", formData.jenis_kelamin);
            setMessage({ text: 'Pilih jenis kelamin yang valid', type: 'error' });
            setSaving(false); return;
        }
        console.log("4. Validasi lolos! Mengirim request ke API...");

        try {
            const res = await fetch('/api/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            const resData = await res.json();

            if (res.ok && resData.success) {
                setMessage({ text: resData.message, type: 'success' });

                // Update initialData menjadi data yang baru saja di-save
                // Agar tombol Save kembali ter-disable (karena sudah tidak ada perbedaan)
                setInitialData({ ...formData });

                // Update localStorage
                const currentUserStr = localStorage.getItem('lumenary_user');
                if (currentUserStr) {
                    const currentUser = JSON.parse(currentUserStr);
                    currentUser.nama = resData.data.nama;
                    localStorage.setItem('lumenary_user', JSON.stringify(currentUser));
                    window.dispatchEvent(new Event('storage'));
                }
            } else {
                setMessage({ text: resData.message || 'Gagal menyimpan perubahan', type: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Terjadi kesalahan jaringan', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-[70vh] w-full items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#A347FF] animate-spin" />
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-[900px] mx-auto mt-6 animate-in fade-in duration-300">
            {/* Header Section */}
            <div className="mb-8">
                <h1 className="text-[32px] md:text-[36px] font-extrabold text-black leading-tight">Account Settings</h1>
                <p className="text-[14px] md:text-[16px] text-zinc-500 font-medium mt-1">
                    Manage your profile information and account preferences
                </p>
            </div>

            {/* Form Container */}
            <div className="bg-white rounded-[24px] shadow-sm border border-zinc-100 p-6 md:p-10 w-full relative">

                <div className="flex justify-between items-center mb-8 border-b border-zinc-100 pb-4">
                    <h2 className="text-[20px] md:text-[24px] font-bold text-zinc-400">Personal Profile</h2>
                </div>

                {message.text && (
                    <div className={`flex items-center gap-2 p-4 rounded-xl mb-6 font-medium text-[14px] ${message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-emerald-50 text-emerald-600 border border-emerald-100'}`}>
                        {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSaveChanges} className="flex flex-col gap-6">
                    {/* READ ONLY FIELDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                                <Hash size={16} className="text-zinc-400" /> NPM (Student ID)
                            </label>
                            <input
                                type="text"
                                value={profile?.npm || ''}
                                disabled
                                className="w-full bg-zinc-100/70 border border-zinc-200 text-zinc-500 rounded-xl px-4 py-3.5 text-[15px] font-medium cursor-not-allowed"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                                <Mail size={16} className="text-zinc-400" /> Email Address
                            </label>
                            <input
                                type="email"
                                value={profile?.email || ''}
                                disabled
                                className="w-full bg-zinc-100/70 border border-zinc-200 text-zinc-500 rounded-xl px-4 py-3.5 text-[15px] font-medium cursor-not-allowed"
                            />
                        </div>
                    </div>

                    {/* EDITABLE FIELDS */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                            <User size={16} className="text-[#A347FF]" /> Full Name
                        </label>
                        <input
                            type="text"
                            name="nama"
                            value={formData.nama}
                            onChange={handleInputChange}
                            placeholder="Enter your full name"
                            className="w-full bg-zinc-50 border border-zinc-200 text-black rounded-xl px-4 py-3.5 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A347FF]/30 focus:border-[#A347FF] transition-all"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                                <Phone size={16} className="text-[#A347FF]" /> Phone Number
                            </label>
                            <input
                                type="tel"
                                name="no_telp"
                                value={formData.no_telp}
                                onChange={handleInputChange}
                                placeholder="e.g. 08123456789"
                                className="w-full bg-zinc-50 border border-zinc-200 text-black rounded-xl px-4 py-3.5 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A347FF]/30 focus:border-[#A347FF] transition-all"
                            />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                                <User size={16} className="text-[#A347FF]" /> Gender
                            </label>
                            <select
                                name="jenis_kelamin"
                                value={formData.jenis_kelamin}
                                onChange={handleInputChange}
                                className="w-full bg-zinc-50 border border-zinc-200 text-black rounded-xl px-4 py-3.5 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A347FF]/30 focus:border-[#A347FF] transition-all appearance-none cursor-pointer"
                            >
                                <option value="" disabled>Select Gender</option>
                                <option value="L">Male</option>
                                <option value="P">Female</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-[14px] font-bold text-black flex items-center gap-1.5">
                            <MapPin size={16} className="text-[#A347FF]" /> Address
                        </label>
                        <textarea
                            name="alamat"
                            value={formData.alamat}
                            onChange={handleInputChange}
                            placeholder="Enter your full active residential address..."
                            rows={4}
                            className="w-full bg-zinc-50 border border-zinc-200 text-black rounded-xl px-4 py-3.5 text-[15px] font-medium focus:outline-none focus:ring-2 focus:ring-[#A347FF]/30 focus:border-[#A347FF] transition-all resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4 mt-2 border-t border-zinc-100 flex justify-center md:justify-end">
                        <button
                            type="submit"
                            disabled={saving || !hasChanged}
                            className={`w-full md:w-auto px-10 py-4 rounded-full text-[16px] font-extrabold transition-all flex items-center justify-center gap-2 
                                ${!hasChanged || saving
                                    ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed shadow-none'
                                    : 'bg-[#FFE4F3] text-[#FF42A5] hover:-translate-y-0.5 shadow-[0_4px_14px_0_rgba(255,66,165,0.1)]'
                                }`}
                        >
                            {saving ? (
                                <>
                                    <Loader2 size={20} className="animate-spin" />
                                    Saving Data...
                                </>
                            ) : (
                                "Save Changes"
                            )}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}