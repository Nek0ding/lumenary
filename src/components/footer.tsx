import Link from 'next/link';

export default function Footer() {
    return (
        // Ditambahkan px-6 untuk mobile, md:px-8 untuk desktop, dan flex justify-center
        <footer className="w-full pt-8 pb-4 px-6 md:px-8 border-t border-zinc-100 text-zinc-500 font-medium flex justify-center">
            
            {/* Wrapper pembatas lebar agar sejajar dengan konten utama (max-w-1200px) */}
            <div className="w-full max-w-[1200px] flex flex-col gap-[24px] md:gap-[32px]">
                
                <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-[32px]">
                    <div className="flex flex-col gap-[12px] max-w-[460px]">
                        <div className="flex items-center gap-3">
                            <img className="w-[40px] h-[40px] md:w-[50px] md:h-[50px] object-contain" src="/logo.png" alt="Logo" />
                            <div className="flex flex-col gap-[2px]">
                                <span className="text-[#161B85] text-[20px] md:text-[24px] font-bold leading-none">Lumenary</span>
                                <span className="text-[#492073] text-[7px] md:text-[8px] font-bold uppercase tracking-[0.05em] leading-none">GUNADARMA LIBRARY</span>
                            </div>
                        </div>
                        <p className="text-zinc-600 text-[14px] md:text-[16px] font-medium leading-relaxed mt-2">
                            Gunadarma University library application that provides online library book booking services to Gunadarma University students.
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-x-8 md:gap-x-[48px] gap-y-[12px] text-[14px] md:text-[16px] text-zinc-600 w-full lg:w-auto mt-2 lg:mt-0">
                        <div className="flex flex-col gap-[12px] md:gap-[16px]">
                            <a href="#" className="hover:text-black font-medium">Home</a>
                            <a href="#" className="hover:text-black font-medium">Explore Books</a>
                            <a href="#" className="hover:text-black font-medium">About Us</a>
                            <a href="#" className="hover:text-black font-medium">FAQ</a>
                        </div>
                        <div className="flex flex-col gap-[12px] md:gap-[16px]">
                            <a href="#" className="hover:text-black font-medium">Book Reservation</a>
                            <a href="#" className="hover:text-black font-medium">Seat Booking</a>
                            <a href="#" className="hover:text-black font-medium">Loan Rules</a>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col sm:flex-row justify-between items-center text-[13px] md:text-[16px] font-medium border-t border-zinc-100 pt-5 text-zinc-600 gap-2 sm:gap-0">
                    <span>© Copyrights - All Right Reserved 2026</span>
                    <span>Developed by Group 5, Gunadarma University</span>
                </div>
                
            </div>
        </footer>
    );
}