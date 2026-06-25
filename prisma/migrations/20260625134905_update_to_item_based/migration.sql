/*
  Warnings:

  - A unique constraint covering the columns `[id_user,id_buku]` on the table `Favorit` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_buku,id_user]` on the table `Rating` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "StatusItem" AS ENUM ('TERSEDIA', 'DIPINJAM', 'RUSAK', 'HILANG');

-- AlterTable
ALTER TABLE "Buku" ALTER COLUMN "stok" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Peminjaman" ADD COLUMN     "id_item" INTEGER,
ALTER COLUMN "tanggal_dikembalikan" SET DATA TYPE DATE;

-- CreateTable
CREATE TABLE "BukuItem" (
    "id_item" SERIAL NOT NULL,
    "id_buku" INTEGER NOT NULL,
    "kode_buku" VARCHAR(50) NOT NULL,
    "asal_perolehan" VARCHAR(100) NOT NULL,
    "status" "StatusItem" NOT NULL DEFAULT 'TERSEDIA',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BukuItem_pkey" PRIMARY KEY ("id_item")
);

-- CreateIndex
CREATE UNIQUE INDEX "BukuItem_kode_buku_key" ON "BukuItem"("kode_buku");

-- CreateIndex
CREATE UNIQUE INDEX "Favorit_id_user_id_buku_key" ON "Favorit"("id_user", "id_buku");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_id_buku_id_user_key" ON "Rating"("id_buku", "id_user");

-- AddForeignKey
ALTER TABLE "BukuItem" ADD CONSTRAINT "BukuItem_id_buku_fkey" FOREIGN KEY ("id_buku") REFERENCES "Buku"("id_buku") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_id_item_fkey" FOREIGN KEY ("id_item") REFERENCES "BukuItem"("id_item") ON DELETE SET NULL ON UPDATE CASCADE;
