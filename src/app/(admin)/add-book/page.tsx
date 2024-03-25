'use client';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '~/components/ui/button';
import { createBook } from '~/actions/book.action';
import { useSession } from 'next-auth/react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { useUserData } from '~/lib/store';
import { useRouter } from 'next/navigation';

const FormSchema = z.object({
  author: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  title: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  price: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  description: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
});

export default function AddBook() {
  const router = useRouter();
  const { data: userData } = useSession();
  const { user } = useUserData();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      author: '',
      title: '',
      description: '',
      price: '',
    },
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    try {
      const res = await createBook({
        author: data.author,
        description: data.description,
        imageUrl: 'https://loremipsum.com',
        price: parseInt(data.price),
        title: data.title,
        userId: userData.user.id,
      });

      if (res) {
        form.reset();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {user.isSeller ? (
        <div className="flex flex-col justify-center gap-10">
          <div>
            <Link href="/">Home</Link>

            <h1 className="text-3xl">Add Book</h1>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="shadcn"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Type your message here."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </div>
      ) : (
        <div>
          <h1>You must join seller mode</h1>
        </div>
      )}
    </>
  );
}
