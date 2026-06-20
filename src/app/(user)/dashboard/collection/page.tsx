import React from "react";
import Image from "next/image";

const collectionBooks = [
  {
    id: 1,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "/images/books/pride-prejudice.jpg",
  },
  {
    id: 2,
    title: "The Way of Kings",
    author: "Brandon Sanderson",
    image: "/images/books/way-of-kings.jpg",
  },
  {
    id: 3,
    title: "The Pragmatic Programmer",
    author: "Andy Hunt, Dave Thomas, W...",
    image: "/images/books/pragmatic-programmer.jpg",
  },
  {
    id: 4,
    title: "Gödel, Escher, Bach:...",
    author: "Douglas R. Hofstadter",
    image: "/images/books/godel-escher-bach.jpg",
  },
  {
    id: 5,
    title: "Meditations",
    author: "Marcus Aurelius, Aaron Pooc...",
    image: "/images/books/meditations.jpg",
  },
  {
    id: 6,
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    image: "/images/books/flowers-algernon.jpg",
  },
];

export default function MyCollectionPage() {
  return (
    <div className="flex-1 bg-[#F9F8FF] p-8 min-h-screen">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1E1E1E] mb-1">My Collection</h1>
          <p className="text-sm text-[#666666]">
            Manage your saved book lists, active reservations, and track your reading preferences in one place.
          </p>
        </div>
        
        {/* Button Edit Collection dengan Gradasi Warna */}
        <button className="self-start md:self-auto bg-gradient-to-r from-[#E5E9F9] via-[#6581D2] to-[#0B1561] hover:opacity-90 text-white px-7 py-2.5 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 shadow-sm">
          Edit Collection
        </button>
      </div>

      {/* --- GRID KOLEKSI BUKU --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
        {collectionBooks.map((book) => (
          <div key={book.id} className="flex flex-col group cursor-pointer">
            {/* Wrapper Cover Buku */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden mb-3 bg-gray-200 shadow-md transform group-hover:-translate-y-1 transition-all duration-300">
              <Image
                src={book.image}
                alt={book.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                className="object-cover"
                priority={book.id <= 3}
              />
            </div>
            
            {/* Detail Informasi Buku */}
            <h3 className="font-bold text-[#1E1E1E] text-base leading-snug line-clamp-1 group-hover:text-[#1A1F71] transition-colors">
              {book.title}
            </h3>
            <p className="text-xs text-[#666666] mt-0.5 line-clamp-1">
              {book.author}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}