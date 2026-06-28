import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { keteranganDenda as KeteranganDendaEnum } from "@prisma/client";

// ─── Konstanta Denda ───────────────────────────────────────────────────────────
// Semua nominal HANYA didefinisikan di server — client tidak boleh kirim jumlah
const DENDA_PER_HARI = 5000;

// Map keterangan → denda fisik (server-side only)
const DENDA_FISIK_MAP: Record<string, number> = {
    sobek:           30000,
    noda:            30000,
    rusak_total:     100000,
    kehilangan_buku: 100000,
};

// Map keterangan → kondisi_fisik yang valid (security: cegah mismatch dari client)
const KETERANGAN_KONDISI_MAP: Record<string, string> = {
    sobek:           "RUSAK",
    noda:            "RUSAK",
    rusak_total:     "RUSAK",
    kehilangan_buku: "HILANG",
};

const KETERANGAN_LABEL: Record<string, string> = {
    sobek:           "Torn pages",
    noda:            "Stained",
    rusak_total:     "Total damage",
    kehilangan_buku: "Lost book",
};

// Keterangan yang diizinkan (allowlist ketat — hanya nilai valid dari enum Prisma)
const ALLOWED_KETERANGAN: KeteranganDendaEnum[] = [
    KeteranganDendaEnum.sobek,
    KeteranganDendaEnum.noda,
    KeteranganDendaEnum.rusak_total,
    KeteranganDendaEnum.kehilangan_buku,
];

// ─── Helper ───────────────────────────────────────────────────────────────────
function hitungHariTerlambat(tanggalKembali: Date): number {
    const now      = new Date();
    const todayWIB = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    todayWIB.setHours(0, 0, 0, 0);
    const dueDate = new Date(tanggalKembali);
    dueDate.setHours(0, 0, 0, 0);
    return Math.max(0, Math.floor((todayWIB.getTime() - dueDate.getTime()) / (1000 * 60 * 60 * 24)));
}

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

// ─── POST /api/admin/counter/fine ─────────────────────────────────────────────
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { ip_address, user_agent } = getClientInfo(request);

    // ── Parse body ──────────────────────────────────────────────────────────────
    let body: any;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ success: false, message: "Invalid JSON body." }, { status: 400 });
    }

    const { kode_peminjaman, kondisi_fisik, keterangan_denda } = body;

    // ── Validasi input ──────────────────────────────────────────────────────────

    // 1. kode_peminjaman harus string non-kosong
    if (!kode_peminjaman || typeof kode_peminjaman !== "string" || !kode_peminjaman.trim()) {
        return NextResponse.json({ success: false, message: "Loan code is required." }, { status: 400 });
    }

    // 2. kondisi_fisik hanya boleh RUSAK atau HILANG (tidak boleh TERSEDIA)
    if (!["RUSAK", "HILANG"].includes(kondisi_fisik)) {
        return NextResponse.json(
            { success: false, message: "Physical condition must be 'RUSAK' or 'HILANG'." },
            { status: 400 }
        );
    }

    // 3. keterangan_denda harus ada di allowlist
    if (!keterangan_denda || !ALLOWED_KETERANGAN.includes(keterangan_denda as KeteranganDendaEnum)) {
        return NextResponse.json(
            { success: false, message: "Invalid keterangan_denda value." },
            { status: 400 }
        );
    }

    // 4. SECURITY: Validasi konsistensi keterangan ↔ kondisi_fisik
    // Mencegah manipulasi dari client (misal: kirim kondisi_fisik=RUSAK dengan keterangan=kehilangan_buku)
    if (KETERANGAN_KONDISI_MAP[keterangan_denda] !== kondisi_fisik) {
        return NextResponse.json(
            {
                success: false,
                message: `Mismatch: keterangan '${keterangan_denda}' is not valid for condition '${kondisi_fisik}'.`,
            },
            { status: 422 }
        );
    }

    // 5. Nominal denda fisik ditentukan SEPENUHNYA oleh server berdasarkan keterangan
    // Client tidak boleh kirim angka denda — ini mencegah manipulasi harga
    const dendaFisik = DENDA_FISIK_MAP[keterangan_denda];

    // ── Database ──────────────────────────────────────────────────────────────
    try {
        const pinjaman = await prisma.peminjaman.findUnique({
            where: { kode_peminjaman: kode_peminjaman.trim() },
            include: { denda: true },
        });

        if (!pinjaman) {
            return NextResponse.json({ success: false, message: "Loan record not found." }, { status: 404 });
        }

        // Hanya loan dengan status aktif yang boleh dikenai denda
        if (!["dipinjam", "terlambat"].includes(pinjaman.status)) {
            return NextResponse.json(
                {
                    success: false,
                    message: `Cannot record a fine on a loan with status: ${pinjaman.status.toUpperCase()}.`,
                },
                { status: 409 }
            );
        }

        let resultDenda: any;
        let dendaTerlambatKomponen: number;
        let hariTerlambatFinal: number;

        await prisma.$transaction(async (tx) => {
            if (pinjaman.denda) {
                // Denda sudah ada (terlambat sebelumnya) — update dengan tambahkan komponen fisik
                // Gunakan hari_terlambat dari record yang ada (tidak hitung ulang untuk menghindari perubahan)
                hariTerlambatFinal     = pinjaman.denda.hari_terlambat;
                dendaTerlambatKomponen = hariTerlambatFinal * DENDA_PER_HARI;
                const totalDenda       = dendaTerlambatKomponen + dendaFisik;

                resultDenda = await tx.denda.update({
                    where: { id_denda: pinjaman.denda.id_denda },
                    data: {
                        jumlah_denda:     totalDenda,
                        keterangan_denda: keterangan_denda as KeteranganDendaEnum,
                    },
                });
            } else {
                // Belum ada denda — buat baru dengan hitung hari terlambat saat ini
                hariTerlambatFinal     = hitungHariTerlambat(pinjaman.tanggal_kembali);
                dendaTerlambatKomponen = hariTerlambatFinal * DENDA_PER_HARI;
                const totalDenda       = dendaTerlambatKomponen + dendaFisik;

                resultDenda = await tx.denda.create({
                    data: {
                        id_peminjaman:    pinjaman.id_peminjaman,
                        jumlah_denda:     totalDenda,
                        hari_terlambat:   hariTerlambatFinal,
                        keterangan_denda: keterangan_denda as KeteranganDendaEnum,
                        status_bayar:     "belum_bayar",
                    },
                });

                // Update status loan menjadi terlambat bila memang sudah lewat jatuh tempo
                if (hariTerlambatFinal > 0 && pinjaman.status === "dipinjam") {
                    await tx.peminjaman.update({
                        where: { id_peminjaman: pinjaman.id_peminjaman },
                        data:  { status: "terlambat" },
                    });
                }
            }

            // Audit log
            await tx.auditLog.create({
                data: {
                    id_user:    auth!.id_user,
                    aksi:       "FINE_RECORD",
                    entitas:    "Denda",
                    id_entitas: resultDenda.id_denda.toString(),
                    deskripsi:  `Admin ${auth!.nama ?? "Admin"} recorded fine [${KETERANGAN_LABEL[keterangan_denda]}] for loan ${kode_peminjaman.trim()}. Overdue: ${hariTerlambatFinal!}d × Rp ${DENDA_PER_HARI.toLocaleString("id-ID")} = Rp ${dendaTerlambatKomponen!.toLocaleString("id-ID")}. Physical: Rp ${dendaFisik.toLocaleString("id-ID")}. Total: Rp ${Number(resultDenda.jumlah_denda).toLocaleString("id-ID")}.`,
                    data_lama:  (pinjaman.denda as any) ?? null,
                    data_baru:  resultDenda as any,
                    ip_address,
                    user_agent,
                },
            });
        });

        return NextResponse.json({
            success: true,
            message: `Fine recorded: ${KETERANGAN_LABEL[keterangan_denda]}. Total: Rp ${Number(resultDenda!.jumlah_denda).toLocaleString("id-ID")}`,
            data: {
                keterangan_denda,
                hari_terlambat:   hariTerlambatFinal!,
                denda_terlambat:  dendaTerlambatKomponen!,
                denda_fisik:      dendaFisik,
                total_denda:      Number(resultDenda!.jumlah_denda),
            },
        });
    } catch (err: any) {
        console.error("[fine] POST error:", err);
        return NextResponse.json(
            { success: false, message: "An internal server error occurred.", detail: err.message },
            { status: 500 }
        );
    }
}