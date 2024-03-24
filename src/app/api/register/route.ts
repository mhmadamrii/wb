import * as z from 'zod';
import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '~/lib/prisma';
import { generateID } from '~/lib/utils';

const userSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email(),
  password: z.string().min(2, {
    message: 'Password at least 2 characters',
  }),
});

export async function POST(req: Request) {
  try {
    const { name, email, password } = userSchema.parse(
      (await req.json()) as {
        name: string;
        email: string;
        password: string;
      },
    );

    const isExistUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExistUser)
      return NextResponse.json(
        {
          user: null,
          message: `user with ${email} is already exists`,
        },
        { status: 409 },
      );

    const hashed_password: string = await hash(
      password,
      12,
    );

    const user = await prisma.user.create({
      data: {
        id: generateID('uuid').toString(),
        name,
        email: email.toLowerCase(),
        password: hashed_password,
      },
    });

    return NextResponse.json(
      {
        user,
        message: 'success create new user',
      },
      {
        status: 201,
      },
    );
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
