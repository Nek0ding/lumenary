import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

// ─── Helper: Validate Admin & Secure Route ────────────────────────────────────
async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    if (auth.role !== "ADMIN") {
        return { error: NextResponse.json({ success: false, message: "Access Denied: Admins only." }, { status: 403 }) };
    }
    return { auth };
}

function getClientInfo(request: Request) {
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const user_agent = request.headers.get("user-agent") || "Unknown Device";
    return { ip_address, user_agent };
}

// ─── POST /api/admin/counter/return ──────────────────────────────────────────
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);

    let body: any;
    try { body = await request.json(); } 
    catch { return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 }); }

    const { kode_peminjaman, kondisi_fisik } = body;

    const allowedKondisi = ["TERSEDIA", "RUSAK", "HILANG"];
    if (!allowedKondisi.includes(kondisi_fisik)) {
        return NextResponse.json({ success: false, message: "Invalid physical condition specified." }, { status: 400 });
    }

    try {
        const pinjaman = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman },
            include: { denda: true }
        });

        if (!pinjaman || !["dipinjam", "terlambat"].includes(pinjaman.status)) {
            return NextResponse.json({ success: false, message: "Invalid loan data or the book has already been returned." }, { status: 400 });
        }

        await prisma.$transaction(async (tx) => {
            // 1. Set pinjaman selesai
            const updatedPeminjaman = await tx.peminjaman.update({
                where: { id_peminjaman: pinjaman.id_peminjaman },
                data: { status: "dikembalikan", tanggal_dikembalikan: new Date() }
            });

            // 2. Update status fisik item buku
            if (pinjaman.id_item) {
                await tx.bukuItem.update({
                    where: { id_item: pinjaman.id_item },
                    data: { status: kondisi_fisik as any }
                });
            }

            // 3. PERBAIKAN STOK: 
            // Karena stok sudah dikurangi saat reservasi, kita HANYA mengembalikannya (increment)
            // JIKA buku kembali dalam keadaan NORMAL (TERSEDIA).
            if (kondisi_fisik === "TERSEDIA") {
                await tx.buku.update({
                    where: { id_buku: pinjaman.id_buku },
                    data: { stok: { increment: 1 } }
                });
            }

            // 4. OTOMATIS LUNAS: Jika ada denda, otomatis anggap LUNAS saat confirm return ditekan
            let updatedDenda = null;
            if (pinjaman.denda && pinjaman.denda.status_bayar === "belum_bayar") {
                updatedDenda = await tx.denda.update({
                    where: { id_denda: pinjaman.denda.id_denda },
                    data: { status_bayar: "sudah_bayar", tanggal_bayar: new Date() }
                });
            }

            // 5. Catat log
            await tx.auditLog.create({
                data: {
                    id_user: auth!.id_user,
                    aksi: "RETURN_PROCESS",
                    entitas: "Peminjaman",
                    id_entitas: pinjaman.id_peminjaman.toString(),
                    deskripsi: `Admin ${auth!.nama || 'Admin'} processed return for ${kode_peminjaman}. Condition: ${kondisi_fisik}. ${updatedDenda ? 'Fine settled.' : ''}`,
                    data_lama: pinjaman as any,
                    data_baru: updatedPeminjaman as any,
                    ip_address,
                    user_agent
                }
            });
        });

        return NextResponse.json({ success: true, message: "Book return successfully processed." });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "An internal server error occurred.", detail: err.message }, { status: 500 });
    }
}