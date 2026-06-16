/*
  Warnings:

  - A unique constraint covering the columns `[kode_peminjaman]` on the table `Peminjaman` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `kode_peminjaman` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Peminjaman" ADD COLUMN     "kode_peminjaman" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Peminjaman_kode_peminjaman_key" ON "Peminjaman"("kode_peminjaman");
