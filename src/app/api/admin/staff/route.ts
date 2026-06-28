import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createClient } from "@supabase/supabase-js";
import bcrypt from "bcryptjs";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// ─── Helpers ──────────────────────────────────────────────────────────────────
async function validateAdmin(request: Request) {
    const auth = await requireAuth(request);
    if (auth instanceof NextResponse) return { error: auth };
    if (auth.role !== "ADMIN") {
        return { error: NextResponse.json({ success: false, message: "Access Denied: Restricted to Administrators." }, { status: 403 }) };
    }
    return { auth };
}

function getClientInfo(request: Request) {
    const ip_address = request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "Unknown IP";
    const user_agent = request.headers.get("user-agent") || "Unknown Device";
    return { ip_address, user_agent };
}

// ─── CEK ADMIN UTAMA (SUPER ADMIN) ────────────────────────────────────────────
async function checkPrimaryAdmin(userId: string) {
    // Cari admin dengan created_at paling awal (paling lama)
    const firstAdmin = await prisma.user.findFirst({
        where: { role: "ADMIN" },
        orderBy: { created_at: "asc" },
        select: { id_user: true }
    });
    return firstAdmin?.id_user === userId;
}

// ─── GET: Fetch All Admin Staff ───────────────────────────────────────────────
export async function GET(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    try {
        const staff = await prisma.user.findMany({
            where: {
                role: "ADMIN",
                OR: [
                    { nama: { contains: search, mode: "insensitive" } },
                    { npm: { contains: search, mode: "insensitive" } },
                    { email: { contains: search, mode: "insensitive" } }
                ]
            },
            select: { id_user: true, nama: true, npm: true, email: true, no_telp: true, jenis_kelamin: true, created_at: true },
            orderBy: { created_at: "asc" } // Admin utama otomatis ada di paling atas
        });

        const staffWithLoginData = await Promise.all(staff.map(async (s) => {
            const { data: authData } = await supabaseAdmin.auth.admin.getUserById(s.id_user);
            return { ...s, last_login: authData?.user?.last_sign_in_at || null };
        }));

        // Kirim metadata ke frontend apakah user saat ini adalah admin utama
        const isPrimaryAdmin = await checkPrimaryAdmin(auth.id_user);

        return NextResponse.json({ 
            success: true, 
            data: staffWithLoginData,
            meta: { isPrimaryAdmin, currentUserId: auth.id_user }
        });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "Internal server error.", detail: err.message }, { status: 500 });
    }
}

// ─── POST: Create New Admin Staff ─────────────────────────────────────────────
export async function POST(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    // PROTEKSI: Hanya Admin Utama yang bisa menambah staff baru
    const isPrimaryAdmin = await checkPrimaryAdmin(auth.id_user);
    if (!isPrimaryAdmin) {
        return NextResponse.json({ success: false, message: "Action Prohibited: Only the Primary Administrator can create new staff accounts." }, { status: 403 });
    }

    const { ip_address, user_agent } = getClientInfo(request);

    try {
        const body = await request.json();
        const { nama, email, npm, password, no_telp, jenis_kelamin } = body;

        if (!nama || !email || !npm || !password) return NextResponse.json({ success: false, message: "Name, email, NPM/ID, and password are required." }, { status: 400 });
        if (password.length < 6) return NextResponse.json({ success: false, message: "Password must be at least 6 characters long." }, { status: 400 });

        const existingUser = await prisma.user.findFirst({ where: { OR: [{ email }, { npm }] } });
        if (existingUser) {
            const conflictField = existingUser.email === email ? "Email" : "NPM/ID";
            return NextResponse.json({ success: false, message: `${conflictField} is already registered.` }, { status: 409 });
        }

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email, password, email_confirm: true, user_metadata: { nama, role: "ADMIN" }
        });
        if (authError || !authData.user) return NextResponse.json({ success: false, message: `Auth creation failed: ${authError?.message}` }, { status: 500 });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        await prisma.$transaction(async (tx) => {
            const newAdmin = await tx.user.create({
                data: { id_user: authData.user.id, nama, email, npm, password: hashedPassword, no_telp: no_telp || null, jenis_kelamin: jenis_kelamin || null, role: "ADMIN" }
            });
            await tx.auditLog.create({
                data: { id_user: auth.id_user, aksi: "CREATE_STAFF", entitas: "User", id_entitas: newAdmin.id_user, deskripsi: `Primary Admin ${auth.nama} registered a new staff member: ${newAdmin.nama}`, ip_address, user_agent }
            });
        });

        return NextResponse.json({ success: true, message: "New staff member successfully created." }, { status: 201 });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
}

// ─── PUT: Update Admin Details ────────────────────────────────────────────────
export async function PUT(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    try {
        const body = await request.json();
        const { id_user, nama, email, npm, no_telp, jenis_kelamin, password } = body;

        // PROTEKSI EDIT: Admin Non-Utama hanya bisa mengedit ID mereka sendiri
        const isPrimaryAdmin = await checkPrimaryAdmin(auth.id_user);
        if (!isPrimaryAdmin && auth.id_user !== id_user) {
            return NextResponse.json({ success: false, message: "Access Denied: You only have permission to edit your own profile." }, { status: 403 });
        }

        if (!id_user) return NextResponse.json({ success: false, message: "Staff ID is required." }, { status: 400 });
        const existingAdmin = await prisma.user.findUnique({ where: { id_user } });
        if (!existingAdmin) return NextResponse.json({ success: false, message: "Staff member not found." }, { status: 404 });

        if (email !== existingAdmin.email || npm !== existingAdmin.npm) {
            const conflict = await prisma.user.findFirst({ where: { OR: [{ email }, { npm }], NOT: { id_user } } });
            if (conflict) {
                const conflictField = conflict.email === email ? "Email" : "NPM/ID";
                return NextResponse.json({ success: false, message: `${conflictField} is already registered by another user.` }, { status: 409 });
            }
        }

        const authUpdates: any = {};
        if (email && email !== existingAdmin.email) authUpdates.email = email;
        if (password && password.length >= 6) authUpdates.password = password;

        if (Object.keys(authUpdates).length > 0) {
            const { error: authUpdateError } = await supabaseAdmin.auth.admin.updateUserById(id_user, authUpdates);
            if (authUpdateError) return NextResponse.json({ success: false, message: `Failed to sync auth data: ${authUpdateError.message}` }, { status: 500 });
        }

        const updateData: any = { nama, email, npm, no_telp, jenis_kelamin };
        if (password && password.length >= 6) updateData.password = await bcrypt.hash(password, 10);

        const { ip_address, user_agent } = getClientInfo(request);

        await prisma.$transaction(async (tx) => {
            const updatedUser = await tx.user.update({ where: { id_user }, data: updateData });
            await tx.auditLog.create({
                data: { id_user: auth.id_user, aksi: "UPDATE_STAFF", entitas: "User", id_entitas: id_user, deskripsi: `Staff profile updated: ${updatedUser.nama}`, data_lama: existingAdmin as any, data_baru: updatedUser as any, ip_address, user_agent }
            });
        });

        return NextResponse.json({ success: true, message: "Profile successfully updated." });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
}

// ─── DELETE: Remove Admin Staff ───────────────────────────────────────────────
export async function DELETE(request: Request) {
    const { error, auth } = await validateAdmin(request);
    if (error) return error;

    // PROTEKSI: Hanya Admin Utama yang bisa menghapus staff
    const isPrimaryAdmin = await checkPrimaryAdmin(auth.id_user);
    if (!isPrimaryAdmin) {
        return NextResponse.json({ success: false, message: "Action Prohibited: Only the Primary Administrator can delete staff accounts." }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id_user = searchParams.get("id_user");

    if (!id_user) return NextResponse.json({ success: false, message: "Staff ID is required." }, { status: 400 });
    if (id_user === auth.id_user) return NextResponse.json({ success: false, message: "Action Prohibited: Primary Administrator cannot delete their own active account." }, { status: 403 });

    try {
        const adminToDelete = await prisma.user.findUnique({ where: { id_user } });
        if (!adminToDelete) return NextResponse.json({ success: false, message: "Staff member not found." }, { status: 404 });

        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id_user);
        if (authError) return NextResponse.json({ success: false, message: `Failed to remove auth identity: ${authError.message}` }, { status: 500 });

        const { ip_address, user_agent } = getClientInfo(request);

        await prisma.$transaction(async (tx) => {
            await tx.user.delete({ where: { id_user } });
            await tx.auditLog.create({
                data: { id_user: auth.id_user, aksi: "DELETE_STAFF", entitas: "User", id_entitas: id_user, deskripsi: `Primary Admin permanently deleted staff: ${adminToDelete.nama}`, data_lama: adminToDelete as any, ip_address, user_agent }
            });
        });

        return NextResponse.json({ success: true, message: "Staff member successfully deleted from the system." });
    } catch (err: any) {
        return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
    }
}