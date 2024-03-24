import dynamic from 'next/dynamic';
import Link from 'next/link';
import Navbar from './navbar';

import { getServerSession } from 'next-auth';
import { crimson_text } from '~/lib/font';
import { cn } from '~/lib/utils';
import { authOptions } from '~/lib/auth';
import { getBooks } from '~/actions/book.action';

const Login = dynamic(() => import('./login'), {
  ssr: false,
  loading: () => <span>Loading...</span>,
});

const Register = dynamic(() => import('./register'), {
  ssr: false,
  loading: () => <span>Loading...</span>,
});

export default async function Home({
  searchParams,
}: {
  searchParams: {
    login: boolean;
    register: boolean;
  };
}) {
  const session = await getServerSession(authOptions);
  const books = await getBooks({});
  console.log('all books', books);
  return (
    <>
      <div className="flex h-screen flex-col">
        {!session ? (
          <Navbar />
        ) : (
          <span>Welcome home {session.user.name}</span>
        )}
        <main className="flex flex-1 flex-col">
          <div
            className={cn(
              'flex flex-1 flex-col items-center justify-start pt-11 text-center align-middle text-[43px]',
              crimson_text.className,
            )}
          >
            <h1>With us, you can shop online & help</h1>
            <h1>save your high street at the same time</h1>
          </div>

          <div className="flex-1 bg-slate-100">
            <span>
              Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Perspiciatis sunt cumque qui
              vero excepturi tempora praesentium consequatur
              velit deleniti maiores fuga, magni quas ab
              laudantium atque recusandae eveniet, veniam
              quo?
            </span>
          </div>
        </main>
      </div>

      <div>
        {books.map((item, id) => (
          <div key={item.id}>
            <h1 className="text-2xl font-bold">
              {item.title}
            </h1>
            <Link href={`/books/${item.id}`}>Detail</Link>
          </div>
        ))}
      </div>

      {searchParams?.login && <Login />}
      {searchParams?.register && <Register />}
    </>
  );
}
