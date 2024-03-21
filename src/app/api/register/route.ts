import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';

export async function POST(req: Request) {
  try {
    const { name, email, password } =
      (await req.json()) as {
        name: string;
        email: string;
        password: string;
      };

    const hashed_password: string = await hash(
      password,
      12,
    );

    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json({
      user,
      message: 'success create new user',
    });
  } catch (error: any) {
    console.log('[ERROR RETREIVING DATA]', error);
    return new NextResponse(
      JSON.stringify({
        status: 'error',
        message: error.message as string,
      }),
      { status: 500 },
    );
  }
}
