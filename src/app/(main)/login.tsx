'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  signIn,
  useSession,
  getSession,
} from 'next-auth/react';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '~/components/ui/dialog';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '~/components/ui/form';
import { useUserData } from '~/lib/store';
import { handleGetUserById } from '~/lib/auth';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export default function Login() {
  const router = useRouter();
  // const { data } = useSession();
  const { setUserLogin } = useUserData();
  const searchParams = useSearchParams();
  const callbackUrl =
    searchParams.get('callbackUrl') || '/';

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (!res?.error) {
        getSession()
          .then((res) => {
            handleGetUserById(res.user.id).then((res) => {
              setUserLogin({
                email: res.email,
                name: res.name,
                isSeller: res.isSeller,
                id: res.id,
              });
            });
          })
          .then(() => router.push(callbackUrl));
        // router.push(callbackUrl);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Dialog
      defaultOpen
      onOpenChange={() => router.push('/')}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Login</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
              name="password"
              render={({ field }) => (
                <FormItem>
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
            <Button className="w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
