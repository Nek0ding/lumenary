import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { keteranganDenda as KeteranganDendaEnum } from "@prisma/client";

const DENDA_PER_HARI = 5000;

async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    if (auth.role !== "ADMIN") {
        return {
            error: NextResponse.json(
                { success: false, message: "Access Denied: Admins only." },
                { status: 403 }
            ),
        };
    }
    return { auth };
}

function getClientInfo(request: Request) {
    const ip_address =
        request.headers.get("x-forwarded-for") ||
        request.headers.get("x-real-ip") ||
        "Unknown IP";
    const user_agent = request.headers.get("user-agent") || "Unknown Device";
    return { ip_address, user_agent };
}

/**
 * POST /api/admin/counter/fine/revert
 *
 * Dipanggil saat admin mengubah kondisi kembali ke NORMAL setelah fine fisik (RUSAK/HILANG)
 * sudah dicatat. Endpoint ini:
 * - Mengembalikan jumlah_denda ke hanya komponen keterlambatan (hari × DENDA_PER_HARI)
 * - Reset keterangan_denda ke 'tidak_ada'
 * - Jika denda terlambat = 0, hapus record denda sepenuhnya
 * - Catat audit log
 */
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);

    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
    }

    const { kode_peminjaman } = body;

    if (!kode_peminjaman || typeof kode_peminjaman !== "string" || !kode_peminjaman.trim()) {
        return NextResponse.json({ success: false, message: "Loan code is required." }, { status: 400 });
    }

    try {
        const pinjaman = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman: kode_peminjaman.trim() },
            include: { denda: true },
        });

        if (!pinjaman) {
            return NextResponse.json({ success: false, message: "Loan record not found." }, { status: 404 });
        }

        // Hanya loan aktif yang bisa di-revert
        if (!["dipinjam", "terlambat"].includes(pinjaman.status)) {
            return NextResponse.json(
                { success: false, message: `Cannot revert fine on a loan with status: ${pinjaman.status.toUpperCase()}.` },
                { status: 409 }
            );
        }

        // Tidak ada denda untuk di-revert
        if (!pinjaman.denda) {
            return NextResponse.json({
                success: true,
                message: "No fine record to revert.",
                data: { total_denda: 0 },
            });
        }

        // Denda fisik yang keterangan-nya bukan tidak_ada adalah yang perlu di-revert
        const keteranganFisik: KeteranganDendaEnum[] = [
            KeteranganDendaEnum.sobek,
            KeteranganDendaEnum.noda,
            KeteranganDendaEnum.rusak_total,
            KeteranganDendaEnum.kehilangan_buku,
        ];

        if (!keteranganFisik.includes(pinjaman.denda.keterangan_denda)) {
            // Tidak ada komponen fisik — tidak perlu revert
            return NextResponse.json({
                success: true,
                message: "No physical fine component to revert.",
                data: { total_denda: Number(pinjaman.denda.jumlah_denda) },
            });
        }

        const hariTerlambat = pinjaman.denda.hari_terlambat;
        const dendaTerlambat = hariTerlambat * DENDA_PER_HARI;
        const dendaLama = Number(pinjaman.denda.jumlah_denda);

        await prisma.$transaction(async (tx) => {
            if (dendaTerlambat === 0) {
                // Tidak ada komponen terlambat → hapus record denda sepenuhnya
                await tx.denda.delete({
                    where: { id_denda: pinjaman.denda!.id_denda },
                });
            } else {
                // Ada komponen terlambat → update: sisa hanya denda terlambat, reset keterangan
                await tx.denda.update({
                    where: { id_denda: pinjaman.denda!.id_denda },
                    data: {
                        jumlah_denda: dendaTerlambat,
                        keterangan_denda: KeteranganDendaEnum.tidak_ada,
                    },
                });
            }

            // Kembalikan status loan ke 'dipinjam' bila tidak ada keterlambatan
            if (hariTerlambat === 0 && pinjaman.status === "terlambat") {
                await tx.peminjaman.update({
                    where: { id_peminjaman: pinjaman.id_peminjaman },
                    data: { status: "dipinjam" },
                });
            }

            await tx.auditLog.create({
                data: {
                    id_user: auth!.id_user,
                    aksi: "FINE_REVERT",
                    entitas: "Denda",
                    id_entitas: pinjaman.denda!.id_denda.toString(),
                    deskripsi: `Admin ${auth!.nama ?? "Admin"} reverted physical fine for loan ${kode_peminjaman.trim()}. Was: Rp ${dendaLama.toLocaleString("id-ID")} [${pinjaman.denda!.keterangan_denda}]. Reverted to: Rp ${dendaTerlambat.toLocaleString("id-ID")} (overdue only).`,
                    data_lama: pinjaman.denda as any,
                    data_baru: { jumlah_denda: dendaTerlambat, keterangan_denda: "tidak_ada" } as any,
                    ip_address,
                    user_agent,
                },
            });
        });

        return NextResponse.json({
            success: true,
            message: "Physical fine removed. Only overdue component remains.",
            data: { total_denda: dendaTerlambat },
        });
    } catch (err: any) {
        console.error("[fine/revert] POST error:", err);
        return NextResponse.json(
            { success: false, message: "An internal server error occurred.", detail: err.message },
            { status: 500 }
        );
    }
}