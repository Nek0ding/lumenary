'use client';

import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

const initialStaffData = [
  {
    id: 'EMP-9821',
    name: 'Sarah Jenkins',
    role: 'SENIOR LIBRARIAN',
    status: 'Active 10 mins ago',
    isActive: true,
  },
  {
    id: 'EMP-8842',
    name: 'Robert Fox',
    role: 'INVENTORY ASSISTANT',
    status: 'Offline for 2h',
    isActive: false,
  },
  {
    id: 'EMP-9384',
    name: 'Eleanor Wright',
    role: 'JUNIOR ASSOCIATE',
    status: 'Active 4h ago',
    isActive: false,
  },
];

export default function StaffDirectory() {
  const [staffList, setStaffList] = useState(initialStaffData);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    npm: '',
    email: '',
    password: '',
    phone: '',
    gender: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.npm || !formData.email) return;

    const newStaff = {
      id: `EMP-${formData.npm.slice(-4)}`,
      name: formData.name,
      role: 'JUNIOR ASSOCIATE',
      status: 'Just created',
      isActive: false,
    };

    setStaffList([newStaff, ...staffList]);
    setIsModalOpen(false);
    setFormData({ name: '', npm: '', email: '', password: '', phone: '', gender: '' });
  };

  const filteredStaff = staffList.filter((staff) =>
    staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    staff.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-7xl mx-auto font-['Plus_Jakarta_Sans',sans-serif] px-1">
      {/* Breadcrumb */}
      <div className="text-[14px] text-zinc-700 mb-2 flex items-center gap-1.5 font-medium">
        <span className="text-zinc-500 font-normal">Dashboard</span> 
        <span className="text-zinc-800 text-[12px] font-bold">&gt;</span> 
        <span className="text-zinc-900 font-bold">Staff Directory</span>
      </div>

      {/* Header Title & Button Container */}
      <div className="flex items-start justify-between gap-4 mb-6 w-full">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-extrabold text-black tracking-tight leading-tight">
            Staff Directory
          </h1>
          <p className="text-[15px] md:text-[16px] text-zinc-700 mt-2 font-medium">
            Manage campus library membership and track borrowing habits.
          </p>
        </div>
        
        {/* Tombol Gradasi Biru Bulat Sempurna */}
        <button
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(to right, #CAD9F6 0%, #2A48C4 45%, #080E42 100%)',
            borderRadius: '12px'
          }}
          className="flex-shrink-0 inline-flex items-center justify-center gap-1 text-white px-5 py-2.5 font-bold text-[14px] shadow-md transition-all whitespace-nowrap hover:opacity-90"
        >
          <span className="text-[16px] font-medium mr-0.5">+</span> Add New Staff
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          placeholder="Search staff by name, ID, or role..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-[46px] pl-12 pr-4 text-black bg-white rounded-2xl text-[14px] border border-zinc-200 focus:outline-none focus:border-indigo-400 shadow-sm transition-all placeholder-zinc-400 font-medium"
        />
      </div>

      {/* Staff List Cards Container dengan Jarak Berjarak (gap-5) */}
      <div className="flex flex-col gap-5">
        {filteredStaff.map((staff) => (
          <div
            key={staff.id}
            className={`flex flex-col sm:flex-row sm:items-center justify-between p-5 bg-white rounded-2xl border transition-all relative overflow-hidden shadow-[0_2px_8px_rgba(0,0,0,0.04)] ${
              staff.isActive 
                ? 'border-blue-400/80 ring-[0.5px] ring-blue-300 border-l-[5px] border-l-[#161B85]' 
                : 'border-zinc-200/90'
            }`}
          >
            <div className="flex items-center">
              <div>
                <h3 className="font-bold text-black text-[16px] tracking-tight">{staff.name}</h3>
                <div className="flex items-center gap-1.5 text-[12px] mt-1.5 font-semibold">
                  <span className="bg-zinc-100 text-zinc-500 px-1.5 py-0.5 rounded text-[11px] font-bold">
                    {staff.id}
                  </span>
                  <span className="text-zinc-300">•</span>
                  <span className={`inline-flex items-center gap-1 ${staff.isActive ? 'text-emerald-500' : 'text-zinc-400'}`}>
                    {staff.isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />}
                    {staff.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Badge Role Kapsul Sebelah Kanan */}
            <div className="mt-3 sm:mt-0 self-end sm:self-center">
              <span className={`text-[10px] font-black tracking-wider px-3 py-1 rounded-full ${
                staff.isActive 
                  ? 'bg-blue-100/70 text-blue-600' 
                  : 'bg-zinc-100 text-zinc-500'
              }`}>
                {staff.role}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MODAL ADD NEW ADMIN ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsModalOpen(false)} />
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="text-lg font-bold text-zinc-900">Add New Admin Account</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-1 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">NPM / ID Staff</label>
                  <input type="text" name="npm" required value={formData.npm} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Gender</label>
                  <select name="gender" required value={formData.gender} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]">
                    <option value="">Select Gender</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Email Address</label>
                <input type="email" name="email" required value={formData.email} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Password</label>
                <input type="password" name="password" required value={formData.password} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]" />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Phone Number</label>
                <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} className="w-full h-[42px] px-3 text-black bg-white rounded-lg text-[14px] border border-zinc-200 focus:outline-none focus:border-[#161B85]" />
              </div>
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-zinc-500 hover:text-zinc-700 text-[14px] font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded-lg bg-[#161B85] text-white text-[14px] font-bold shadow-sm">Save Account</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}