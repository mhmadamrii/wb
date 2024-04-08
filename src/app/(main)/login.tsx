'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useGlobalPending, useUserData } from '~/lib/store';
import { handleGetUserById } from '~/lib/auth';
import { z } from 'zod';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import {
  signIn,
  useSession,
  getSession,
} from 'next-auth/react';

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
import Spinner from '~/components/spinner';
import { cn } from '~/lib/utils';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export default function Login() {
  const router = useRouter();
  // const { data } = useSession();
  const { setUserLogin } = useUserData();
  const { isLoadingForm, setGlobalPendingForm } =
    useGlobalPending();
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
      setGlobalPendingForm(true);
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      console.log('response', res);

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
          .then(() => {
            router.push(callbackUrl);
          });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setGlobalPendingForm(false);
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
                      className={cn('to-inherit', {
                        'bg-slate-100': isLoadingForm,
                      })}
                      disabled={isLoadingForm}
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
                      className={cn('to-inherit', {
                        'bg-slate-100': isLoadingForm,
                      })}
                      disabled={isLoadingForm}
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className={cn('w-full', {
                'border bg-slate-100 hover:bg-slate-100':
                  isLoadingForm,
              })}
              type="submit"
            >
              {isLoadingForm ? <Spinner /> : 'Login'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
