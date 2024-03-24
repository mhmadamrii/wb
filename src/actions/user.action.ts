'use server';

import { prisma } from '~/lib/prisma';

export async function getUserById({
  userId,
}: {
  userId: string;
}) {
  try {
    const res = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
  }
}
