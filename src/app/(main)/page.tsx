import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { crimson_text } from '~/lib/font';
import { cn } from '~/lib/utils';
import Login from './login';
import Navbar from './navbar';

export default function Home({
  searchParams,
}: {
  searchParams: {
    login: boolean;
  };
}) {
  console.log('searach  params', searchParams);
  return (
    <>
      <div className="flex h-screen flex-col">
        <Navbar />
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

      {searchParams?.login && <Login />}
    </>
  );
}
