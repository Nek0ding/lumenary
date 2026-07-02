'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useSearchParams } from 'next/navigation'; // Tambahkan untuk membaca parameter pencarian URL
import {
    Plus, X, UploadCloud, ChevronLeft, ChevronRight,
    BookOpen, Layers, SlidersHorizontal,
    ArrowUpDown, Package, Star, AlertCircle, CheckCircle2,
    BookMarked, Hash, Calendar, Building2, Edit3, Save, XCircle, Trash2, AlertTriangle
} from 'lucide-react';
import { authFetch } from '@/lib/authFetch';
import toast from 'react-hot-toast';

// ─── Types ────────────────────────────────────────────────────────────────────
interface BukuItem {
    id_item:        number;
    kode_buku:      string;
    status:         string;
    asal_perolehan: string;
}

interface Buku {
    id_buku:      number;
    judul:        string;
    penulis:      string;
    penerbit:     string;
    tahun_terbit: number;
    isbn:         string;
    stok:         number;
    cover_buku:   string;
    sinopsis:     string;
    rating_rata:  number;
    kategori:     { id_kategori: number; nama_kategori: string };
    items:        BukuItem[];
}

interface Meta {
    total:      number;
    page:       number;
    limit:      number;
    totalPages: number;
}

const ASAL_OPTIONS = ["PEMBELIAN", "HIBAH", "DONASI", "WARISAN", "LAINNYA"] as const;

const ASAL_LABELS: Record<string, string> = {
    PEMBELIAN: "Purchase",
    HIBAH:     "Grant",
    DONASI:    "Donation",
    WARISAN:   "Inheritance",
    LAINNYA:   "Other",
};

const STATUS_COLOR: Record<string, string> = {
    TERSEDIA: "bg-emerald-50 text-emerald-800 border-emerald-300",
    DIPINJAM: "bg-amber-50 text-amber-800 border-amber-300",
    RUSAK:    "bg-red-50 text-red-800 border-red-300",
    HILANG:   "bg-zinc-100 text-zinc-700 border-zinc-400",
};

const STATUS_LABELS: Record<string, string> = {
    TERSEDIA: "Available",
    DIPINJAM: "Borrowed",
    RUSAK:    "Damaged",
    HILANG:   "Lost",
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
    return (
        <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${STATUS_COLOR[status] || STATUS_COLOR.RUSAK}`}>
            {STATUS_LABELS[status] || status}
        </span>
    );
}

function FieldLabel({ children }: { children: React.ReactNode }) {
    return <label className="block text-[11px] font-extrabold text-zinc-600 uppercase tracking-widest mb-1">{children}</label>;
}

function InputField({ label, error, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string }) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <input
                {...props}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-bold text-zinc-900 bg-white transition-all placeholder:text-zinc-400
                    focus:outline-none focus:ring-2 focus:ring-[#161B85]/30 focus:border-[#161B85]
                    ${error ? 'border-red-400 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'}
                    ${props.className || ''}`}
            />
            {error && <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
        </div>
    );
}

function SelectField({ label, error, children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string }) {
    return (
        <div>
            <FieldLabel>{label}</FieldLabel>
            <select
                {...props}
                className={`w-full px-4 py-3 rounded-xl border text-sm font-bold text-zinc-900 bg-white transition-all
                    focus:outline-none focus:ring-2 focus:ring-[#161B85]/30 focus:border-[#161B85]
                    ${error ? 'border-red-400 bg-red-50' : 'border-zinc-300 hover:border-zinc-400'}`}
            >
                {children}
            </select>
            {error && <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
        </div>
    );
}

// ─── Modal: Add New Book ──────────────────────────────────────────────────────
function AddBookModal({
    categories,
    onClose,
    onSuccess,
}: {
    categories: { id_kategori: number; nama_kategori: string }[];
    onClose:    () => void;
    onSuccess:  () => void;
}) {
    const [file, setFile]       = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors]   = useState<Record<string, string>>({});
    const currentYear           = new Date().getFullYear();
    const fileRef               = useRef<HTMLInputElement>(null);

    const validate = (fd: FormData): Record<string, string> => {
        const e: Record<string, string> = {};
        const judul    = String(fd.get("judul") || "").trim();
        const penulis  = String(fd.get("penulis") || "").trim();
        const penerbit = String(fd.get("penerbit") || "").trim();
        const isbn     = String(fd.get("isbn") || "").replace(/-/g, "");
        const tahun    = parseInt(String(fd.get("tahun_terbit") || ""));
        const id_kat   = fd.get("id_kategori");
        const stok     = parseInt(String(fd.get("stok") || ""));
        const asal     = String(fd.get("asal_perolehan") || "");

        if (!judul)                                              e.judul           = "Title is required.";
        if (!penulis)                                            e.penulis         = "Author is required.";
        if (!penerbit)                                           e.penerbit        = "Publisher is required.";
        if (!/^\d{9}[\dX]$|^\d{13}$/.test(isbn))               e.isbn            = "ISBN must be 10 or 13 digits.";
        if (isNaN(tahun) || tahun < 1000 || tahun > currentYear) e.tahun_terbit    = `Year must be between 1000–${currentYear}.`;
        if (!id_kat)                                             e.id_kategori     = "Category is required.";
        if (isNaN(stok) || stok < 1 || stok > 100)               e.stok            = "Stock must be between 1–100.";
        if (!asal)                                               e.asal_perolehan  = "Acquisition source is required.";
        if (!file)                                               e.cover           = "Book cover image is required.";
        return e;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (!selected) return;
        if (!selected.type.startsWith("image/")) {
            toast.error("File rejected. Only image formats are allowed (.jpg, .png, .webp).");
            e.target.value = "";
            return;
        }
        if (selected.size > 5 * 1024 * 1024) {
            toast.error("File size must not exceed 5MB.");
            e.target.value = "";
            return;
        }
        setFile(selected);
        setPreview(URL.createObjectURL(selected));
        setErrors(prev => ({ ...prev, cover: "" }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fd   = new FormData(e.currentTarget);
        const errs = validate(fd);
        if (Object.keys(errs).length > 0) { setErrors(errs); return; }

        setLoading(true);
        if (file) fd.append("cover", file);

        try {
            const res    = await authFetch("/api/admin/buku", { method: "POST", body: fd });
            const result = await res.json();
            if (result.success) {
                toast.success(result.message || "Book added successfully!");
                onSuccess();
                onClose();
            } else {
                toast.error(result.message || "Failed to save book.");
            }
        } catch {
            toast.error("Failed to connect to server.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[990] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[92vh] border border-zinc-200">
                {/* Header */}
                <div className="flex items-start justify-between p-8 border-b border-zinc-200 shrink-0">
                    <div>
                        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Add New Book Collection</h2>
                        <p className="text-sm text-zinc-700 font-semibold mt-0.5">
                            Fill in the book metadata and initial stock. Physical item codes are auto-generated from the ISBN.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 transition-colors p-1 rounded-lg hover:bg-zinc-100">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-y-auto">
                    {/* ── Left Column: Book Metadata ── */}
                    <div className="p-8 space-y-4 border-r border-zinc-200">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-[#161B85]/10 rounded-lg"><BookOpen size={15} className="text-[#161B85]" /></div>
                            <span className="text-xs font-extrabold text-[#161B85] tracking-widest uppercase">Book Metadata</span>
                        </div>

                        <InputField label="Title *" name="judul" placeholder="e.g. Pride and Prejudice" error={errors.judul} maxLength={200} />

                        <div className="grid grid-cols-2 gap-3">
                            <InputField label="Author *" name="penulis" placeholder="Jane Austen" error={errors.penulis} maxLength={100} />
                            <InputField label="ISBN *" name="isbn" placeholder="978-XXXXXXXXX" error={errors.isbn} maxLength={30} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <InputField label="Publisher *" name="penerbit" placeholder="T. Egerton" error={errors.penerbit} maxLength={100} />
                            <InputField label="Publish Year *" name="tahun_terbit" type="number" placeholder={String(currentYear)} min={1000} max={currentYear} error={errors.tahun_terbit} />
                        </div>

                        <div>
                            <FieldLabel>Synopsis</FieldLabel>
                            <textarea
                                name="sinopsis"
                                rows={5}
                                placeholder="Write a brief description of the book..."
                                className="w-full px-4 py-3 rounded-xl border border-zinc-300 text-sm font-bold text-zinc-900 bg-white placeholder:text-zinc-400
                                    focus:outline-none focus:ring-2 focus:ring-[#161B85]/30 focus:border-[#161B85]
                                    hover:border-zinc-400 transition-all resize-none"
                            />
                        </div>
                    </div>

                    {/* ── Right Column: Asset & Stock ── */}
                    <div className="p-8 space-y-4 flex flex-col">
                        <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-[#161B85]/10 rounded-lg"><Layers size={15} className="text-[#161B85]" /></div>
                            <span className="text-xs font-extrabold text-[#161B85] tracking-widest uppercase">Asset & Physical Stock</span>
                        </div>

                        {/* Cover Upload */}
                        <div>
                            <FieldLabel>Book Cover (image) *</FieldLabel>
                            <label
                                className={`relative flex flex-col items-center justify-center border-2 border-dashed rounded-2xl cursor-pointer overflow-hidden transition-all
                                    ${errors.cover ? 'border-red-400 bg-red-50' : 'border-zinc-300 hover:border-[#161B85] bg-zinc-50'}`}
                                style={{ height: preview ? "auto" : "140px" }}
                            >
                                {preview ? (
                                    <div className="relative w-full">
                                        <img src={preview} alt="Preview" className="w-full max-h-56 object-contain" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                                            <span className="text-white text-sm font-extrabold">Change Image</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-1 p-6">
                                        <UploadCloud size={32} className="text-zinc-400" />
                                        <span className="text-sm font-extrabold text-zinc-600">Click to upload cover</span>
                                        <span className="text-xs font-semibold text-zinc-500">PNG, JPG, WEBP · Max 5MB</span>
                                    </div>
                                )}
                                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            </label>
                            {errors.cover && <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={11} />{errors.cover}</p>}
                        </div>

                        <SelectField label="Category *" name="id_kategori" error={errors.id_kategori} defaultValue="">
                            <option value="" disabled>Select a category...</option>
                            {categories.map(c => <option key={c.id_kategori} value={c.id_kategori}>{c.nama_kategori}</option>)}
                        </SelectField>

                        <div className="grid grid-cols-2 gap-3">
                            <InputField
                                label="Initial Stock *"
                                name="stok"
                                type="number"
                                defaultValue={1}
                                min={1}
                                max={100}
                                error={errors.stok}
                            />
                            <SelectField label="Acquisition Source *" name="asal_perolehan" error={errors.asal_perolehan} defaultValue="">
                                <option value="" disabled>Select source...</option>
                                {ASAL_OPTIONS.map(a => <option key={a} value={a}>{ASAL_LABELS[a]}</option>)}
                            </SelectField>
                        </div>

                        <div className="bg-[#F0F2FF] border border-[#C7CBF9] rounded-xl p-4 mt-1">
                            <p className="text-xs text-[#161B85] font-extrabold flex items-center gap-1.5"><AlertCircle size={14}/> Auto-generated item codes</p>
                            <p className="text-xs text-[#4B52B0] font-semibold mt-1 leading-relaxed">
                                The system will create <strong>N</strong> physical items (matching stock count) with codes formatted as:{" "}
                                <code className="bg-white px-1.5 py-0.5 rounded border border-[#C7CBF9] font-bold">{"[last 6 ISBN digits]-001"}</code>,{" "}
                                <code className="bg-white px-1.5 py-0.5 rounded border border-[#C7CBF9] font-bold">{"...-002"}</code>, and so on.
                            </p>
                        </div>

                        <div className="flex-1" />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#161B85] hover:bg-[#0E1154] disabled:opacity-60 text-white py-4 rounded-xl
                                font-extrabold text-base transition-all shadow-lg shadow-[#161B85]/20 flex items-center justify-center gap-2 mt-2"
                        >
                            {loading ? (
                                <><span className="animate-spin">⏳</span> Saving...</>
                            ) : (
                                <><CheckCircle2 size={20} /> Save Book Collection</>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

// ─── Modal: Book Detail & Stock Management ────────────────────────────────────
function DetailModal({
    book,
    categories,
    onClose,
    onStockUpdated,
    onDeleteSuccess
}: {
    book:           Buku;
    categories:     { id_kategori: number; nama_kategori: string }[];
    onClose:        () => void;
    onStockUpdated: (updatedBook: Buku) => void;
    onDeleteSuccess:() => void;
}) {
    const [items, setItems]           = useState<BukuItem[]>(book.items || []);
    const [jumlah, setJumlah]         = useState(1);
    const [asal, setAsal]             = useState<string>(ASAL_OPTIONS[0]);
    const [isAdding, setIsAdding]     = useState(false);
    const [formErrors, setFormErrors] = useState<Record<string, string>>({});

    // State untuk edit form
    const [isEditing, setIsEditing]   = useState(false);
    const [isSavingEdit, setIsSavingEdit] = useState(false);
    const [editData, setEditData]     = useState({
        judul: book.judul,
        penulis: book.penulis,
        id_kategori: book.kategori?.id_kategori || "",
        isbn: book.isbn,
        penerbit: book.penerbit,
        tahun_terbit: book.tahun_terbit,
        sinopsis: book.sinopsis
    });

    // State untuk upload cover baru
    const [editFile, setEditFile] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);

    // State untuk delete confirmation
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleAddStock = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: Record<string, string> = {};
        if (jumlah < 1 || jumlah > 50) errs.jumlah = "Quantity must be between 1–50.";
        if (!asal)                      errs.asal   = "Acquisition source is required.";
        if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }

        setIsAdding(true);
        try {
            const res    = await authFetch("/api/admin/buku/add-stock", {
                method: "POST",
                body:   JSON.stringify({ id_buku: book.id_buku, jumlah_tambah: jumlah, asal_perolehan: asal }),
            });
            const result = await res.json();
            if (result.success) {
                toast.success(result.message);
                const newItems = [...items, ...result.newItems];
                setItems(newItems);
                onStockUpdated({ ...book, items: newItems, stok: book.stok + jumlah });
                setJumlah(1);
                setFormErrors({});
            } else {
                toast.error(result.message || "Failed to add stock.");
            }
        } catch {
            toast.error("Failed to connect to server.");
        } finally {
            setIsAdding(false);
        }
    };

    const handleSaveEdit = async () => {
        setIsSavingEdit(true);
        const fd = new FormData();
        fd.append("id_buku", book.id_buku.toString());
        fd.append("judul", editData.judul);
        fd.append("penulis", editData.penulis);
        fd.append("id_kategori", editData.id_kategori.toString());
        fd.append("isbn", editData.isbn);
        fd.append("penerbit", editData.penerbit);
        fd.append("tahun_terbit", editData.tahun_terbit.toString());
        fd.append("sinopsis", editData.sinopsis);
        
        if (editFile) fd.append("cover", editFile);

        try {
            const res = await authFetch("/api/admin/buku", {
                method: "PUT",
                body: fd
            });
            const result = await res.json();
            if (result.success) {
                toast.success("Book metadata successfully updated!");
                setIsEditing(false);
                setEditFile(null); // Clear pending upload state
                onStockUpdated({
                    ...book,
                    ...editData,
                    cover_buku: result.data?.cover_buku || book.cover_buku,
                    kategori: categories.find(c => c.id_kategori === Number(editData.id_kategori)) || book.kategori
                });
            } else {
                toast.error(result.message || "Failed to update book.");
            }
        } catch (error) {
            toast.error("Server connection error during update.");
        } finally {
            setIsSavingEdit(false);
        }
    };

    const handleDeleteBook = async () => {
        setIsDeleting(true);
        try {
            const res = await authFetch(`/api/admin/buku?id_buku=${book.id_buku}`, { method: 'DELETE' });
            const result = await res.json();
            if (result.success) {
                toast.success("Book collection successfully deleted.");
                onDeleteSuccess(); // Trigger parent refresh & close
            } else {
                toast.error(result.message || "Failed to delete book.");
            }
        } catch (error) {
            toast.error("Server connection error during deletion.");
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const availableCount = items.filter(i => i.status === "TERSEDIA").length;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[990] flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl relative flex flex-col max-h-[92vh] border border-zinc-200">
                
                {/* ── Confirm Delete Overlay ── */}
                {showDeleteConfirm && (
                    <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-50 rounded-3xl flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-200">
                        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4 shadow-sm border border-red-200">
                            <AlertTriangle size={32} />
                        </div>
                        <h3 className="text-2xl font-extrabold text-zinc-900 mb-2">Delete Book Collection?</h3>
                        <p className="text-sm font-semibold text-zinc-600 max-w-sm mb-6 leading-relaxed">
                            Are you sure you want to permanently delete <strong>"{book.judul}"</strong>? This will also remove all physical copy records associated with this book. This action cannot be undone.
                        </p>
                        <div className="flex items-center gap-3">
                            <button 
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="px-6 py-3 font-bold text-zinc-600 bg-white border border-zinc-300 rounded-xl hover:bg-zinc-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button 
                                onClick={handleDeleteBook}
                                disabled={isDeleting}
                                className="px-6 py-3 font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-lg shadow-red-600/20 disabled:opacity-50"
                            >
                                {isDeleting ? "Deleting..." : <><Trash2 size={16} /> Yes, Delete</>}
                            </button>
                        </div>
                    </div>
                )}

                {/* Header */}
                <div className="flex items-start justify-between p-8 border-b border-zinc-200 shrink-0">
                    <div>
                        <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">Collection Detail</h2>
                        <p className="text-sm text-zinc-700 font-semibold mt-0.5">
                            View book metadata and manage physical copy units.
                        </p>
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-zinc-900 p-2 rounded-xl hover:bg-zinc-100 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-y-auto flex-1">
                    {/* ── Left Column: Book Info ── */}
                    <div className="p-8 flex flex-col border-r border-zinc-200">
                        <div className="space-y-5 flex-1">
                            {/* Edit Toggle Button */}
                            <div className="flex justify-end mb-2">
                                {!isEditing ? (
                                    <button 
                                        onClick={() => setIsEditing(true)} 
                                        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold bg-zinc-100 text-zinc-700 rounded-lg hover:bg-zinc-200 transition-colors border border-zinc-200"
                                    >
                                        <Edit3 size={14} /> Edit Info
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button 
                                            onClick={() => {
                                                setIsEditing(false);
                                                setEditFile(null);
                                                setEditPreview(null);
                                                setEditData({
                                                    judul: book.judul, penulis: book.penulis, id_kategori: book.kategori?.id_kategori || "",
                                                    isbn: book.isbn, penerbit: book.penerbit, tahun_terbit: book.tahun_terbit, sinopsis: book.sinopsis
                                                });
                                            }} 
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold bg-red-50 text-red-600 rounded-lg hover:bg-red-100 border border-red-200"
                                        >
                                            <XCircle size={14} /> Cancel
                                        </button>
                                        <button 
                                            onClick={handleSaveEdit} 
                                            disabled={isSavingEdit}
                                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold bg-[#161B85] text-white rounded-lg hover:bg-[#0E1154] disabled:opacity-70"
                                        >
                                            <Save size={14} /> {isSavingEdit ? 'Saving...' : 'Save Edit'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="flex gap-5 items-start">
                                {/* Cover Image Display or Upload */}
                                {!isEditing ? (
                                    <div className="w-28 h-40 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 shadow-md border border-zinc-200">
                                        <img src={book.cover_buku} alt={book.judul} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <label className="relative block w-28 h-40 rounded-2xl overflow-hidden bg-zinc-100 shrink-0 shadow-md border-2 border-dashed border-[#161B85]/50 cursor-pointer group">
                                        <img src={editPreview || book.cover_buku} alt={book.judul} className="w-full h-full object-cover group-hover:opacity-40 transition-opacity" />
                                        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 bg-[#161B85]/20 backdrop-blur-[2px] transition-opacity">
                                            <UploadCloud size={24} className="text-white mb-1 shadow-sm" />
                                            <span className="text-[10px] font-bold text-white uppercase tracking-wider">Change</span>
                                        </div>
                                        <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                                            const f = e.target.files?.[0];
                                            if (f) {
                                                if (!f.type.startsWith("image/")) { toast.error("Must be an image file."); return; }
                                                setEditFile(f); setEditPreview(URL.createObjectURL(f)); 
                                            }
                                        }} />
                                    </label>
                                )}
                                
                                {/* Info Render: Editing vs ReadOnly */}
                                <div className="flex-1 space-y-2">
                                    {isEditing ? (
                                        <>
                                            <input 
                                                value={editData.judul} 
                                                onChange={e => setEditData({...editData, judul: e.target.value})}
                                                className="w-full text-lg font-extrabold text-zinc-900 border-b border-zinc-300 focus:border-[#161B85] focus:outline-none pb-1 bg-zinc-50 px-2 rounded-t"
                                                placeholder="Book Title"
                                            />
                                            <input 
                                                value={editData.penulis} 
                                                onChange={e => setEditData({...editData, penulis: e.target.value})}
                                                className="w-full text-sm font-bold text-zinc-700 border-b border-zinc-300 focus:border-[#161B85] focus:outline-none pb-1 bg-zinc-50 px-2"
                                                placeholder="Author"
                                            />
                                            <select 
                                                value={editData.id_kategori}
                                                onChange={e => setEditData({...editData, id_kategori: e.target.value})}
                                                className="w-full text-xs font-bold text-[#161B85] border border-[#161B85]/30 rounded-lg px-2 py-1 bg-[#F0F2FF] focus:outline-none focus:ring-1 focus:ring-[#161B85]"
                                            >
                                                {categories.map(c => <option key={c.id_kategori} value={c.id_kategori}>{c.nama_kategori}</option>)}
                                            </select>
                                        </>
                                    ) : (
                                        <>
                                            <h3 className="text-lg font-extrabold text-zinc-900 leading-snug">{book.judul}</h3>
                                            <p className="text-sm font-bold text-zinc-600">{book.penulis}</p>
                                            <span className="inline-block text-[11px] font-extrabold text-[#161B85] bg-[#F0F2FF] px-3 py-1 rounded-full border border-[#161B85]/20">
                                                {book.kategori?.nama_kategori}
                                            </span>
                                        </>
                                    )}
                                    
                                    <div className="flex items-center gap-1 text-amber-500 pt-1">
                                        <Star size={14} fill="currentColor" />
                                        <span className="text-xs font-extrabold text-zinc-700">
                                            {book.rating_rata ? Number(book.rating_rata).toFixed(1) : "No rating"}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-4 gap-y-4">
                                {[
                                    { 
                                        icon: <Hash size={14} />, label: "ISBN", 
                                        isEditMode: isEditing,
                                        editInput: <input value={editData.isbn} onChange={e => setEditData({...editData, isbn: e.target.value})} className="w-full text-sm font-bold text-zinc-900 border-b border-zinc-300 focus:border-[#161B85] focus:outline-none bg-zinc-50 px-1" />,
                                        staticVal: book.isbn 
                                    },
                                    { 
                                        icon: <Building2 size={14} />, label: "Publisher", 
                                        isEditMode: isEditing,
                                        editInput: <input value={editData.penerbit} onChange={e => setEditData({...editData, penerbit: e.target.value})} className="w-full text-sm font-bold text-zinc-900 border-b border-zinc-300 focus:border-[#161B85] focus:outline-none bg-zinc-50 px-1" />,
                                        staticVal: book.penerbit 
                                    },
                                    { 
                                        icon: <Calendar size={14} />, label: "Year", 
                                        isEditMode: isEditing,
                                        editInput: <input type="number" value={editData.tahun_terbit} onChange={e => setEditData({...editData, tahun_terbit: Number(e.target.value)})} className="w-full text-sm font-bold text-zinc-900 border-b border-zinc-300 focus:border-[#161B85] focus:outline-none bg-zinc-50 px-1" />,
                                        staticVal: book.tahun_terbit 
                                    },
                                    { 
                                        icon: <Package size={14} />, label: "Total Stock", 
                                        isEditMode: false,
                                        editInput: null,
                                        staticVal: `${book.stok} copies` 
                                    },
                                ].map(({ icon, label, isEditMode, editInput, staticVal }) => (
                                    <div key={label}>
                                        <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                                            {icon}
                                            <span className="text-[10px] font-extrabold uppercase tracking-widest">{label}</span>
                                        </div>
                                        {isEditMode ? editInput : <p className="text-sm font-extrabold text-zinc-900">{staticVal}</p>}
                                    </div>
                                ))}
                            </div>

                            <div>
                                <div className="flex items-center gap-1.5 text-zinc-500 mb-2">
                                    <BookMarked size={14} />
                                    <span className="text-[10px] font-extrabold uppercase tracking-widest">Synopsis</span>
                                </div>
                                
                                {isEditing ? (
                                    <textarea 
                                        value={editData.sinopsis}
                                        onChange={e => {
                                            const val = e.target.value;
                                            setEditData(prev => ({ ...prev, sinopsis: val }));
                                        }}
                                        rows={4}
                                        className="w-full text-xs text-zinc-900 font-semibold leading-relaxed border border-zinc-300 focus:border-[#161B85] focus:ring-1 focus:ring-[#161B85] focus:outline-none rounded-xl p-3 bg-zinc-50"
                                    />
                                ) : (
                                    <div className="bg-zinc-50 rounded-xl p-4 max-h-40 overflow-y-auto border border-zinc-200">
                                        <p className="text-xs text-zinc-700 font-semibold leading-relaxed text-justify">
                                            {book.sinopsis || "No synopsis available."}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Delete Button at the very bottom left */}
                        <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center">
                            <button 
                                onClick={() => setShowDeleteConfirm(true)}
                                className="flex items-center gap-2 text-xs font-extrabold text-red-500 hover:text-red-700 transition-colors bg-red-50 hover:bg-red-100 px-3 py-2 rounded-xl"
                            >
                                <Trash2 size={16} /> Delete Collection
                            </button>
                        </div>
                    </div>

                    {/* ── Right Column: Physical Item Management ── */}
                    <div className="p-8 flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <span className="text-xs font-extrabold text-[#161B85] uppercase tracking-widest">
                                    Physical Copies ({items.length})
                                </span>
                                <p className="text-[11px] text-zinc-500 font-bold mt-0.5">
                                    {availableCount} available · {items.length - availableCount} borrowed/damaged
                                </p>
                            </div>
                            <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                                <span className="text-[10px] text-emerald-700 font-extrabold uppercase tracking-wider">Available</span>
                            </div>
                        </div>

                        {/* Scrollable item list */}
                        <div className="flex-1 overflow-y-auto space-y-2 bg-zinc-50 rounded-2xl p-4 border border-zinc-200 min-h-0 max-h-72">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full py-8 text-zinc-400">
                                    <Package size={36} className="mb-3 opacity-50" />
                                    <span className="text-xs font-bold text-zinc-500">No physical copies registered yet.</span>
                                </div>
                            ) : items.map((item, i) => (
                                <div key={item.id_item || i} className="flex items-center justify-between bg-white px-3.5 py-3 rounded-xl border border-zinc-200 shadow-sm gap-2">
                                    <div>
                                        <span className="font-mono font-extrabold text-xs text-zinc-900 tracking-wider">{item.kode_buku}</span>
                                        <span className="text-[10px] text-zinc-500 font-bold ml-2">· {ASAL_LABELS[item.asal_perolehan] || item.asal_perolehan}</span>
                                    </div>
                                    <StatusBadge status={item.status} />
                                </div>
                            ))}
                        </div>

                        {/* Add stock form */}
                        <form onSubmit={handleAddStock} className="bg-[#F0F2FF] border border-[#C7CBF9] rounded-2xl p-5 space-y-4">
                            <div className="flex items-center gap-2 mb-1">
                                <div className="bg-[#161B85] p-1 rounded-full"><Plus size={12} className="text-white" /></div>
                                <span className="text-xs font-extrabold text-[#161B85] uppercase tracking-widest">Add Stock Units</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <FieldLabel>Quantity *</FieldLabel>
                                    <input
                                        type="number"
                                        value={jumlah}
                                        onChange={e => { setJumlah(parseInt(e.target.value) || 1); setFormErrors(p => ({ ...p, jumlah: "" })); }}
                                        min={1}
                                        max={50}
                                        className={`w-full px-4 py-3 rounded-xl border text-sm font-bold text-zinc-900 bg-white
                                            focus:outline-none focus:ring-2 focus:ring-[#161B85]/30 focus:border-[#161B85]
                                            ${formErrors.jumlah ? 'border-red-400' : 'border-zinc-300 hover:border-zinc-400'}`}
                                    />
                                    {formErrors.jumlah && <p className="text-[11px] text-red-600 font-bold mt-1 flex items-center gap-1"><AlertCircle size={11} />{formErrors.jumlah}</p>}
                                </div>
                                <div>
                                    <SelectField label="Acquisition Source *" name="asal_perolehan" error={formErrors.asal} value={asal} onChange={e => {
                                        setAsal(e.target.value);
                                        setFormErrors(prev => ({ ...prev, asal: "" }));
                                    }}>
                                        {ASAL_OPTIONS.map(a => <option key={a} value={a}>{ASAL_LABELS[a]}</option>)}
                                    </SelectField>
                                </div>
                            </div>

                            <p className="text-[11px] text-[#4B52B0] font-semibold leading-relaxed">
                                This will add <strong>{jumlah}</strong> new unit{jumlah > 1 ? "s" : ""}. Item codes are auto-generated from the ISBN.
                            </p>

                            <button
                                type="submit"
                                disabled={isAdding}
                                className="w-full bg-[#161B85] hover:bg-[#0E1154] disabled:opacity-60 text-white py-3.5
                                    rounded-xl font-extrabold text-sm transition-all shadow-md shadow-[#161B85]/20 flex items-center justify-center gap-2 mt-2"
                            >
                                {isAdding ? "Saving..." : <><Plus size={18} /> Add {jumlah} Unit{jumlah > 1 ? "s" : ""}</>}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Book Card ────────────────────────────────────────────────────────────────
function BookCard({ book, onClick }: { book: Buku; onClick: () => void }) {
    const available = book.items?.filter(i => i.status === "TERSEDIA").length ?? book.stok;

    return (
        <div
            onClick={onClick}
            className="bg-white rounded-3xl border border-zinc-200 shadow-sm
                hover:shadow-xl hover:-translate-y-1 transition-all duration-300
                cursor-pointer flex flex-col overflow-hidden group"
        >
            <div className="relative w-full bg-zinc-100 overflow-hidden" style={{ paddingBottom: "130%" }}>
                <img
                    src={book.cover_buku}
                    alt={book.judul}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder-book.png"; }}
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-md text-[#161B85] text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm border border-white/50">
                        {book.kategori?.nama_kategori}
                    </span>
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <h3 className="text-sm font-extrabold text-zinc-900 leading-snug line-clamp-2 flex-1">{book.judul}</h3>
                <p className="text-[13px] text-zinc-600 font-bold mt-1.5 truncate">{book.penulis}</p>

                <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold
                        ${available > 0 ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'}`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${available > 0 ? 'bg-emerald-500' : 'bg-red-500'}`}></span>
                        {available > 0 ? `${available} available` : "Out of stock"}
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                        <Star size={14} fill="currentColor" />
                        <span className="text-[12px] font-extrabold text-zinc-700">
                            {book.rating_rata ? Number(book.rating_rata).toFixed(1) : "—"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function InventoryPage() {
    const searchParams = useSearchParams(); // Membaca URL Query Parameters
    
    // Sinkronisasi kata kunci pencarian dari URL bar secara real-time
    const searchWord = searchParams.get('search') || '';

    const [books, setBooks]                       = useState<Buku[]>([]);
    const [categories, setCategories]             = useState<{ id_kategori: number; nama_kategori: string }[]>([]);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy]                     = useState("created_at");
    const [order, setOrder]                       = useState<"asc" | "desc">("desc");
    const [meta, setMeta]                         = useState<Meta>({ total: 0, page: 1, limit: 12, totalPages: 1 });
    const [loading, setLoading]                   = useState(true);
    const [showAddModal, setShowAddModal]         = useState(false);
    const [selectedBook, setSelectedBook]         = useState<Buku | null>(null);

    const getLimit = useCallback(() => {
        if (typeof window === "undefined") return 12;
        const w = window.innerWidth;
        if (w < 640)  return 4;
        if (w < 1024) return 6;
        if (w < 1280) return 9;
        return 12;
    }, []);

    const fetchData = useCallback(async (page = 1, category = "all", sort = sortBy, ord = order, search = searchWord) => {
        setLoading(true);
        const limit = getLimit();
        try {
            // Integrasikan parameter search ke dalam rute endpoint API
            const res    = await authFetch(
                `/api/admin/buku?page=${page}&limit=${limit}&id_kategori=${category}&sortBy=${sort}&order=${ord}&search=${encodeURIComponent(search)}`
            );
            const result = await res.json();
            if (result.success) {
                setBooks(result.data);
                setCategories(result.categories || []);
                setMeta(result.meta);
            } else {
                toast.error(result.message || "Failed to load data.");
            }
        } catch {
            toast.error("Failed to connect to server.");
        } finally {
            setLoading(false);
        }
    }, [getLimit, sortBy, order, searchWord]);

    useEffect(() => {
        fetchData(meta.page, selectedCategory, sortBy, order, searchWord);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [meta.page, selectedCategory, sortBy, order, searchWord]);

    useEffect(() => {
        const handler = () => fetchData(1, selectedCategory, sortBy, order, searchWord);
        window.addEventListener("resize", handler);
        return () => window.removeEventListener("resize", handler);
    }, [fetchData, selectedCategory, sortBy, order, searchWord]);

    const handleCategoryChange = (cat: string) => {
        setSelectedCategory(cat);
        setMeta(p => ({ ...p, page: 1 }));
    };

    const handleSort = (field: string) => {
        if (sortBy === field) setOrder(prev => prev === "asc" ? "desc" : "asc");
        else { setSortBy(field); setOrder("desc"); }
        setMeta(p => ({ ...p, page: 1 }));
    };

    const handleStockUpdated = (updated: Buku) => {
        setBooks(prev => prev.map(b => b.id_buku === updated.id_buku ? updated : b));
        setSelectedBook(updated);
    };

    const handleItemDeleted = () => {
        setSelectedBook(null); // Close the modal
        fetchData(1, selectedCategory, sortBy, order, searchWord); // Refresh list
    };

    const sortOptions = [
        { value: "created_at",   label: "Newest" },
        { value: "judul",        label: "Title A–Z" },
        { value: "penulis",      label: "Author" },
        { value: "stok",         label: "Stock" },
        { value: "tahun_terbit", label: "Year" },
    ];

    return (
        <div className="p-6 lg:p-8 bg-[#F8F7FF] min-h-screen font-sans">
            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Inventory Management</h1>
                    <p className="text-sm text-zinc-600 font-semibold mt-1.5">
                        {meta.total > 0 ? `${meta.total} collections registered` : "Manage physical stock and digital catalog."}
                    </p>
                </div>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="bg-[#161B85] hover:bg-[#0E1154] active:scale-95 text-white px-6 py-3.5 rounded-2xl
                        font-extrabold text-sm flex items-center gap-2 transition-all shadow-lg shadow-[#161B85]/20 shrink-0"
                >
                    <Plus size={18} /> Add New Book
                </button>
            </div>

            {/* ── Filters & Sort Bar ── */}
            <div className="bg-white rounded-2xl border border-zinc-200 p-4 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex flex-wrap gap-2.5 flex-1">
                        <button
                            onClick={() => handleCategoryChange("all")}
                            className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                                selectedCategory === "all"
                                ? "bg-[#161B85] text-white shadow-md shadow-[#161B85]/20"
                                : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                            }`}
                        >
                            All Categories
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id_kategori}
                                onClick={() => handleCategoryChange(cat.id_kategori.toString())}
                                className={`px-5 py-2.5 rounded-xl font-extrabold text-xs transition-all ${
                                    selectedCategory === cat.id_kategori.toString()
                                    ? "bg-[#161B85] text-white shadow-md shadow-[#161B85]/20"
                                    : "bg-zinc-50 text-zinc-700 border border-zinc-200 hover:bg-zinc-100 hover:border-zinc-300"
                                }`}
                            >
                                {cat.nama_kategori}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-start gap-3 shrink-0">
                        <select
                            value={sortBy}
                            onChange={e => handleSort(e.target.value)}
                            className="text-xs font-extrabold text-zinc-800 border border-zinc-300 rounded-xl px-4 py-2.5
                                bg-white focus:outline-none focus:ring-2 focus:ring-[#161B85]/30 cursor-pointer hover:border-zinc-400 transition-colors"
                        >
                            {sortOptions.map(o => (
                                <option key={o.value} value={o.value}>{o.label}</option>
                            ))}
                        </select>
                        <button
                            onClick={() => setOrder(p => p === "asc" ? "desc" : "asc")}
                            className="p-2.5 border border-zinc-300 rounded-xl bg-white hover:bg-zinc-50 transition-colors"
                            title={order === "asc" ? "Ascending" : "Descending"}
                        >
                            <ArrowUpDown size={16} className={`transition-transform duration-300 ${order === "asc" ? "rotate-180" : ""} text-zinc-700`} />
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Grid ── */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
                    {Array.from({ length: getLimit() }).map((_, i) => (
                        <div key={i} className="bg-white rounded-3xl overflow-hidden border border-zinc-100 animate-pulse">
                            <div className="bg-zinc-200" style={{ paddingBottom: "130%" }} />
                            <div className="p-5 space-y-3">
                                <div className="h-5 bg-zinc-200 rounded-lg w-3/4" />
                                <div className="h-4 bg-zinc-200 rounded-lg w-1/2" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : books.length === 0 ? (
                <div className="bg-white rounded-3xl border border-zinc-200 p-16 text-center shadow-sm">
                    <BookOpen size={56} className="mx-auto text-zinc-300 mb-5" />
                    <p className="text-zinc-800 font-extrabold text-lg">No books found.</p>
                    <p className="text-zinc-500 text-sm font-semibold mt-2">
                        Try a different category or add a new collection.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
                    {books.map(book => (
                        <BookCard
                            key={book.id_buku}
                            book={book}
                            onClick={() => setSelectedBook(book)}
                        />
                    ))}
                </div>
            )}

            {/* ── Pagination ── */}
            {!loading && books.length > 0 && (
                <div className="mt-10 bg-white rounded-2xl border border-zinc-200 px-6 py-4 flex flex-col sm:flex-row
                    justify-between items-center gap-4 shadow-sm">
                    <span className="text-sm font-extrabold text-zinc-600">
                        Showing {(meta.page - 1) * meta.limit + 1}–{Math.min(meta.page * meta.limit, meta.total)} of {meta.total} books
                    </span>
                    <div className="flex items-center gap-2">
                        <button
                            disabled={meta.page <= 1}
                            onClick={() => setMeta(p => ({ ...p, page: p.page - 1 }))}
                            className="p-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50
                                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronLeft size={18} className="text-zinc-800" />
                        </button>

                        <div className="flex items-center gap-1.5">
                            {Array.from({ length: Math.min(5, meta.totalPages) }, (_, i) => {
                                let page: number;
                                if (meta.totalPages <= 5)            page = i + 1;
                                else if (meta.page <= 3)             page = i + 1;
                                else if (meta.page >= meta.totalPages - 2) page = meta.totalPages - 4 + i;
                                else                                 page = meta.page - 2 + i;
                                return (
                                    <button
                                        key={page}
                                        onClick={() => setMeta(p => ({ ...p, page }))}
                                        className={`w-10 h-10 rounded-xl text-sm font-extrabold transition-all ${
                                            meta.page === page
                                            ? "bg-[#161B85] text-white shadow-md shadow-[#161B85]/20"
                                            : "text-zinc-600 hover:bg-zinc-100 border border-transparent hover:border-zinc-200"
                                        }`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            disabled={meta.page >= meta.totalPages}
                            onClick={() => setMeta(p => ({ ...p, page: p.page + 1 }))}
                            className="p-2.5 rounded-xl border border-zinc-300 bg-white hover:bg-zinc-50
                                disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            <ChevronRight size={18} className="text-zinc-800" />
                        </button>
                    </div>
                </div>
            )}

            {/* ── Modals ── */}
            {showAddModal && (
                <AddBookModal
                    categories={categories}
                    onClose={() => setShowAddModal(false)}
                    onSuccess={() => fetchData(1, selectedCategory, sortBy, order, searchWord)}
                />
            )}

            {selectedBook && (
                <DetailModal
                    book={selectedBook}
                    categories={categories}
                    onClose={() => setSelectedBook(null)}
                    onStockUpdated={handleStockUpdated}
                    onDeleteSuccess={handleItemDeleted}
                />
            )}
        </div>
    );
}