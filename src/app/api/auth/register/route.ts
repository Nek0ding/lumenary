import {NextResponse} from 'next/server';
import {prisma} from "@/lib/prisma";
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try{
        const body = await request.json();
        const{
            id_user,
            npm,
            email,
            password
        } = body;

        if(!id_user || !npm || !email || !password){
            return NextResponse.json(
                {
                    success: false,
                    message: "Semua field harus diisi!"
                },
                {status:400}
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userBaru = await prisma.user.create({
            data: {
                id_user: id_user,
                npm: npm,
                email:email,
                password: hashedPassword,
                role: 'CUSTOMER',
                nama: null,
                no_telp: null,
                alamat: null,
                jenis_kelamin: null,
            }
        });

        return NextResponse.json(
            {
                success: true,
                message: "Registrasi berhasil!",
                data: {
                    id_user: userBaru.id_user,
                    npm: userBaru.npm,
                    email: userBaru.email,
                    
                }
            },
            {status: 201}
        );
    } catch(error:any){
        console.error("Error during registration:", error);
        if(error.code === 'P2002'){
            return NextResponse.json(
                {
                    success: false,
                    message: "Gagal registrasi! Email atau NPM sudah terdaftar."
                },
                {status: 400}
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "Internal Server Error"
            },
            {status: 500}
        );
    }
}