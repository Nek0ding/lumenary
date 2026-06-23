-- CreateTable
CREATE TABLE "AuditLog" (
    "id_log" SERIAL NOT NULL,
    "id_user" TEXT,
    "aksi" VARCHAR(50) NOT NULL,
    "entitas" VARCHAR(50) NOT NULL,
    "id_entitas" VARCHAR(50) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "data_lama" JSONB,
    "data_baru" JSONB,
    "ip_address" VARCHAR(45),
    "user_agent" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditLog_pkey" PRIMARY KEY ("id_log")
);

-- AddForeignKey
ALTER TABLE "AuditLog" ADD CONSTRAINT "AuditLog_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE SET NULL ON UPDATE CASCADE;
