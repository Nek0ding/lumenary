import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { keteranganDenda, StatusBayar, StatusPeminjaman } from "@/generated/prisma";

const DENDA_PER_HARI = 1000;

function isAuthorized(request: Request): boolean {
    const authHeader = request.headers.get("Authorization");
    return authHeader === `Bearer ${process.env.CRON_SECRET}`;
}

function getTodayWIB(): Date {
    const now = new Date();
    const today = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Jakarta" }));
    today.setHours(0, 0, 0, 0);
    return today;
}

export async function GET(request: Request) {
    if (!isAuthorized(request)) {
        return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    const today = getTodayWIB();

    const results = {
        dendaCreated: 0,
        statusTerlambatUpdated: 0,
        reservasiExpired: 0,
        errors: [] as string[],
    };

    // ── 1. CEK KETERLAMBATAN BARU ─────────────────────────────────────────
    try {
        const terlambat = await prisma.peminjaman.findMany({
            where: {
                status: StatusPeminjaman.dipinjam,
                tanggal_kembali: { lt: today },
                denda: null,
            },
        });

        if (terlambat.length > 0) {
            const dendaBaru = terlambat.map((pinjam) => {
                const hariTerlambat = Math.floor(
                    (today.getTime() - new Date(pinjam.tanggal_kembali).getTime())
                    / (1000 * 60 * 60 * 24)
                );
                return {
                    id_peminjaman: pinjam.id_peminjaman,
                    jumlah_denda: hariTerlambat * DENDA_PER_HARI,
                    hari_terlambat: hariTerlambat,
                    keterangan_denda: keteranganDenda.tidak_ada,
                    status_bayar: StatusBayar.belum_bayar,
                };
            });

            // ✅ Satu transaksi — kalau denda gagal dibuat, status tidak berubah
            await prisma.$transaction(async (tx) => {
                await tx.peminjaman.updateMany({
                    where: { id_peminjaman: { in: terlambat.map(p => p.id_peminjaman) } },
                    data: { status: StatusPeminjaman.terlambat }
                });
                await tx.denda.createMany({ data: dendaBaru });
            });

            results.statusTerlambatUpdated = terlambat.length;
            results.dendaCreated = dendaBaru.length;
        }
    } catch (err) {
        results.errors.push(`Denda check failed: ${err}`);
    }

    // ── 2. UPDATE AKUMULASI DENDA BERJALAN ────────────────────────────────
    try {
        const sudahTerlambat = await prisma.peminjaman.findMany({
            where: {
                status: StatusPeminjaman.terlambat,
                denda: { status_bayar: StatusBayar.belum_bayar },
            },
            include: { denda: true },
        });

        for (const pinjam of sudahTerlambat) {
            if (!pinjam.denda) continue;

            const hariTerlambat = Math.floor(
                (today.getTime() - new Date(pinjam.tanggal_kembali).getTime())
                / (1000 * 60 * 60 * 24)
            );

            // Preservasi komponen denda non-keterlambatan (misal: kerusakan)
            const komponenLain = Number(pinjam.denda.jumlah_denda) - (pinjam.denda.hari_terlambat * DENDA_PER_HARI);
            const totalTerbaru = (hariTerlambat * DENDA_PER_HARI) + (komponenLain > 0 ? komponenLain : 0);

            await prisma.denda.update({
                where: { id_peminjaman: pinjam.id_peminjaman },
                data: {
                    hari_terlambat: hariTerlambat,
                    jumlah_denda: totalTerbaru,
                }
            });
        }
    } catch (err) {
        results.errors.push(`Denda update failed: ${err}`);
    }

    // ── 3. CEK RESERVASI EXPIRED ──────────────────────────────────────────
    try {
        const reservasiExpired = await prisma.peminjaman.findMany({
            where: {
                status: StatusPeminjaman.direservasi,
                tanggal_pinjam: { lt: today },
            },
            select: { id_peminjaman: true, id_buku: true }
        });

        if (reservasiExpired.length > 0) {
            await prisma.$transaction(async (tx) => {
                await tx.peminjaman.updateMany({
                    where: { id_peminjaman: { in: reservasiExpired.map(r => r.id_peminjaman) } },
                    data: { status: StatusPeminjaman.dibatalkan }
                });

                for (const item of reservasiExpired) {
                    await tx.buku.update({
                        where: { id_buku: item.id_buku },
                        data: { stok: { increment: 1 } }
                    });
                }
            });

            results.reservasiExpired = reservasiExpired.length;
        }
    } catch (err) {
        results.errors.push(`Reservasi expiry failed: ${err}`);
    }

    const hasErrors = results.errors.length > 0;
    return NextResponse.json({
        success: !hasErrors,
        message: hasErrors ? "Completed with errors" : "Daily check completed successfully",
        data: results,
    }, { status: hasErrors ? 207 : 200 });
}