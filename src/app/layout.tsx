import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { Toaster } from 'react-hot-toast';

// 1. Inisialisasi font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta', // (Opsional) Jika nanti butuh variable Tailwind
});

export const metadata: Metadata = {
  title: "Lumenary - Gunadarma Library",
  description: "The ultimate digital gateway to streamline your book borrowing experience.",
  icons: {
    icon: '/logo.png', // Akan otomatis mengambil logo.png dari folder public
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <body className={`${plusJakartaSans.className} min-h-full flex flex-col bg-white`}>
        <Toaster
          position="top-right"
          containerClassName="hot-toast-container"
          reverseOrder={false}
          toastOptions={{
            style: {
              zIndex: 9999999, // Pastikan ini lebih tinggi dari z-index modal Anda
            },
          }}
        />
        {children}
      </body>
    </html>
  );
}