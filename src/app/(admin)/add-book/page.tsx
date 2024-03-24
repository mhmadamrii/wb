'use client';

import { Button } from '~/components/ui/button';
import { createBook } from '~/actions/book.action';
import Link from 'next/link';

export default function AddBook() {
  const handleAddNewBook = async () => {
    try {
      const res = await createBook({
        author: 'testing',
        description: 'lorem ipsum dolor',
        imageUrl: 'https://loremipsum.com',
        price: 3000,
        title: 'Title of new book',
        userId: '4ff9ee3a-6960-4580-81ae-abd3180e02a6',
      });

      console.log('response', res);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing
      elit. Doloremque vero, magnam non cum exercitationem
      porro consectetur reprehenderit nihil corrupti
      voluptatum debitis facere aperiam, ullam quia nulla
      veritatis! Nulla, nobis accusamus.
      <Link href="/">home</Link>
      <Button onClick={handleAddNewBook}>
        Add new book
      </Button>
    </div>
  );
}
