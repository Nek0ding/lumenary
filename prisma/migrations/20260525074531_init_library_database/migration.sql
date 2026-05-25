-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('direservasi', 'dibatalkan', 'dipinjam', 'dikembalikan', 'terlambat');

-- CreateEnum
CREATE TYPE "StatusBayar" AS ENUM ('belum_bayar', 'sudah_bayar');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CUSTOMER', 'ADMIN');

-- CreateEnum
CREATE TYPE "JK" AS ENUM ('L', 'P');

-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "nama" VARCHAR(100) NOT NULL,
    "npm" VARCHAR(8) NOT NULL,
    "no_telp" VARCHAR(15) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "alamat" TEXT NOT NULL,
    "jenis_kelamin" "JK" NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CUSTOMER',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id_kategori" SERIAL NOT NULL,
    "nama_kategori" VARCHAR(100) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id_kategori")
);

-- CreateTable
CREATE TABLE "Buku" (
    "id_buku" SERIAL NOT NULL,
    "id_kategori" INTEGER NOT NULL,
    "judul" VARCHAR(200) NOT NULL,
    "penulis" VARCHAR(100) NOT NULL,
    "penerbit" VARCHAR(100) NOT NULL,
    "tahun_terbit" INTEGER NOT NULL,
    "isbn" VARCHAR(30) NOT NULL,
    "stok" INTEGER NOT NULL,
    "cover_buku" VARCHAR(255) NOT NULL,
    "sinopsis" TEXT NOT NULL,
    "rating_rata" DECIMAL(2,1) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Buku_pkey" PRIMARY KEY ("id_buku")
);

-- CreateTable
CREATE TABLE "Peminjaman" (
    "id_peminjaman" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_buku" INTEGER NOT NULL,
    "tanggal_pinjam" DATE NOT NULL,
    "tanggal_kembali" DATE NOT NULL,
    "tanggal_dikembalikan" TIMESTAMP(3),
    "status" "StatusPeminjaman" NOT NULL DEFAULT 'direservasi',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Peminjaman_pkey" PRIMARY KEY ("id_peminjaman")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id_rating" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_buku" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id_rating")
);

-- CreateTable
CREATE TABLE "Denda" (
    "id_denda" SERIAL NOT NULL,
    "id_peminjaman" INTEGER NOT NULL,
    "jumlah_denda" DECIMAL(10,2) NOT NULL,
    "hari_terlambat" INTEGER NOT NULL,
    "status_bayar" "StatusBayar" NOT NULL DEFAULT 'belum_bayar',
    "tanggal_bayar" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Denda_pkey" PRIMARY KEY ("id_denda")
);

-- CreateTable
CREATE TABLE "Favorit" (
    "id_favorit" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "id_buku" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Favorit_pkey" PRIMARY KEY ("id_favorit")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_npm_key" ON "User"("npm");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Buku_isbn_key" ON "Buku"("isbn");

-- CreateIndex
CREATE UNIQUE INDEX "Denda_id_peminjaman_key" ON "Denda"("id_peminjaman");

-- AddForeignKey
ALTER TABLE "Buku" ADD CONSTRAINT "Buku_id_kategori_fkey" FOREIGN KEY ("id_kategori") REFERENCES "Kategori"("id_kategori") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Peminjaman" ADD CONSTRAINT "Peminjaman_id_buku_fkey" FOREIGN KEY ("id_buku") REFERENCES "Buku"("id_buku") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rating" ADD CONSTRAINT "Rating_id_buku_fkey" FOREIGN KEY ("id_buku") REFERENCES "Buku"("id_buku") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Denda" ADD CONSTRAINT "Denda_id_peminjaman_fkey" FOREIGN KEY ("id_peminjaman") REFERENCES "Peminjaman"("id_peminjaman") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorit" ADD CONSTRAINT "Favorit_id_buku_fkey" FOREIGN KEY ("id_buku") REFERENCES "Buku"("id_buku") ON DELETE CASCADE ON UPDATE CASCADE;
