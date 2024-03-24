'use server';

import { prisma } from '~/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function createBook({
  title,
  description,
  price,
  author,
  imageUrl,
  userId,
}: {
  title: string;
  description: string;
  price: number;
  author: string;
  imageUrl: string;
  userId: string;
}) {
  try {
    return await prisma.book.create({
      data: {
        title,
        description,
        price,
        author,
        imageUrl,
        userId,
      },
    });
  } catch (error) {
    console.log(error);
  } finally {
    revalidatePath('/');
  }
}

export async function getBooks({}) {
  try {
    return await prisma.book.findMany();
  } catch (error) {
    console.log(error);
  }
}

export async function getBookById({ id }: { id: number }) {
  try {
    return await prisma.book.findUnique({
      where: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
  }
}
