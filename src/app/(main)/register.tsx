'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';

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
import { useGlobalPending } from '~/lib/store';
import { cn } from '~/lib/utils';
import Spinner from '~/components/spinner';

const FormSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email(),
  password: z.string().min(2, {
    message: 'Password at least 2 characters',
  }),
});

export default function Register() {
  const { isLoadingForm, setGlobalPendingForm } =
    useGlobalPending();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  async function onSubmit(
    data: z.infer<typeof FormSchema>,
  ) {
    try {
      setGlobalPendingForm(true);
      const res = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        alert(await res.json());
        return;
      }

      router.push('?login=true');
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
          <DialogTitle>Register</DialogTitle>
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
                      placeholder="Email"
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
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className={cn('to-inherit', {
                        'bg-slate-100': isLoadingForm,
                      })}
                      placeholder="Username"
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
              {isLoadingForm ? <Spinner /> : 'Register'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
