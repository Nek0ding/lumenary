import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { prisma } from '@/lib/prisma';

// ✅ Gunakan SERVICE_ROLE_KEY untuk server-side
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

    if (!token) {
        return NextResponse.json(
            { success: false, message: 'Token tidak ditemukan' },
            { status: 401 }
        );
    }

    try {
        const { data: { user: authUser }, error } = await supabase.auth.getUser(token);

        if (error || !authUser) {
            return NextResponse.json(
                { success: false, message: 'Token tidak valid atau sudah expired' },
                { status: 401 }
            );
        }

        const user = await prisma.user.findUnique({
            where: { email: authUser.email },
            select: { id_user: true, npm: true, email: true, role: true }
        });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User tidak ditemukan di database' },
                { status: 401 }
            );
        }

        return NextResponse.json({ success: true, user });

    } catch (error) {
        console.error('Error on /api/auth/me:', error);
        return NextResponse.json(
            { success: false, message: 'Internal Server Error' },
            { status: 500 }
        );
    }
}