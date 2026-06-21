import React from "react";

export default function PenaltyBillPage() {
  return (
    // Menggunakan w-full, h-full, dan display flex untuk memastikan warna background memenuhi seluruh area
    <div className="w-full h-full min-h-screen bg-[#F3EEFF] p-10 pt-16 flex flex-col gap-6">
      
      {/* Search Bar - Sudah ada di layout utama (berdasarkan image_11.png), jadi kita tidak perlu membuatnya lagi */}
      
      {/* --- JUDUL HALAMAN --- */}
      <h1 className="text-3xl font-bold text-[#1E1E1E]">Penalty Bill</h1>

      {/* --- KONTEN UTAMA --- */}
      <div className="flex flex-col gap-6 max-w-5xl">
        
        {/* KOTAK OUTSTANDING BILL (Latar Belakang Putih) */}
        <div className="bg-white rounded-2xl p-8 border border-white shadow-sm">
          <h2 className="text-xs font-bold text-[#1E1E1E] tracking-wider uppercase mb-4">
            CURRENT OUTSTANDING BILL
          </h2>
          
          <div className="text-4xl font-extrabold text-[#1E1E1E] mb-2 tracking-tight">
            Rp 10.000
          </div>
          
          <p className="text-sm text-[#444444] font-medium">
            Total Penalty for 2 Days Overdue on <span className="text-[#1A1F71] font-semibold italic">"Sprint"</span>
          </p>
        </div>

        {/* KOTAK PROSEDUR PEMBAYARAN (Latar Belakang Putih) */}
        <div className="bg-white rounded-2xl p-8 border border-white shadow-sm">
          <h3 className="text-base font-bold text-[#1E1E1E] mb-4">
            Penalty Payment Procedure:
          </h3>
          
          <ol className="list-decimal list-inside space-y-3 text-[#444444] text-sm font-medium leading-relaxed">
            <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</li>
            <li>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</li>
            <li>Ut enim ad minim veniam, quis nostrud exercitation ullamco.</li>
            <li>Duis aute irure dolor in reprehenderit in voluptate velit.</li>
          </ol>
        </div>

      </div>
    </div>
  );
}