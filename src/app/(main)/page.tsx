import dynamic from 'next/dynamic';
import Link from 'next/link';
import MobileNavbar from '~/components/mobile-navbar';

import { Navbar, NavbarLoggedIn } from './navbar';
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
  return (
    <>
      <div className="block sm:hidden">
        <MobileNavbar />
      </div>

      <div className="flex h-screen flex-col">
        <div className="hidden sm:block">
          {!session ? (
            <Navbar />
          ) : (
            <NavbarLoggedIn session={session} />
          )}
        </div>
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

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="111"
      height="65"
      fill="none"
      viewBox="0 0 111 65"
    >
      <path
        fill="#000"
        d="M34.485 30.489c.189.04.331.142.426.305a.655.655 0 01.08.508.693.693 0 01-.303.447.714.714 0 01-.528.08c-2.042-.46-4.517-.466-7.424-.02a27.123 27.123 0 01-2.597 3.515 38.748 38.748 0 01-2.758 2.904c-3.828 3.589-7.824 6.304-11.989 8.145-.811.366-1.69.684-2.637.955a9.24 9.24 0 01-2.698.427c-.825 0-1.555-.183-2.19-.549C.621 46.394.276 45.27.831 43.834c.419-.934 1.095-1.841 2.028-2.722a24.313 24.313 0 012.84-2.254c2.515-1.747 5.47-3.358 8.865-4.834 3.61-1.544 7.086-2.648 10.426-3.312.298-.067.595-.128.893-.182.879-1.53 1.467-2.993 1.765-4.388.405-2.045-.163-3.65-1.704-4.814-1.258-.866-2.698-1.347-4.321-1.442-1.61-.108-2.995.102-4.159.63-.094.04-.189.088-.284.142a.717.717 0 01-.527.04.793.793 0 01-.385-.345.718.718 0 01.284-.934c.108-.054.21-.102.304-.143 1.947-1.029 3.847-2.491 5.7-4.387 1.947-2.031 3.03-3.73 3.246-5.098.027-.339-.007-.596-.102-.772a.989.989 0 00-.284-.386c-.067-.054-.203-.061-.405-.02-.866.19-2.171 1.063-3.916 2.62-1.744 1.557-3.732 3.629-5.963 6.215A113.682 113.682 0 009.33 24.72c-1.758 2.41-3.11 4.483-4.057 6.216a.692.692 0 01-.406.325.67.67 0 01-.507-.04.681.681 0 01-.345-.387.789.789 0 01.02-.528c.501-1.043 1.137-2.343 1.908-3.9 1.46-2.925 2.894-5.89 4.3-8.897.717-1.584 1.217-2.769 1.501-3.554.298-.786.473-1.307.528-1.564a.915.915 0 01-.244-.264.719.719 0 01.284-.935c.203-.095.379-.135.527-.122.163 0 .291.027.386.082.094.054.162.101.203.142.203.19.29.474.264.853-.014.379-.15.928-.406 1.645-.325.908-.845 2.16-1.562 3.758a336.48 336.48 0 01-2.07 4.448 111.493 111.493 0 014.423-5.464 88.598 88.598 0 013.387-3.717 45.173 45.173 0 013.916-3.615c1.298-1.07 2.42-1.72 3.367-1.95.392-.068.71-.061.953.02.257.068.453.162.588.284.257.19.48.481.67.874.19.392.257.9.203 1.523-.176 1.11-.656 2.207-1.44 3.29-.771 1.07-1.495 1.944-2.171 2.621a26.394 26.394 0 01-2.921 2.6 8.18 8.18 0 01.994.02c2.042.15 3.753.732 5.132 1.747 1.988 1.53 2.732 3.595 2.231 6.195a15.212 15.212 0 01-1.4 3.86c2.651-.325 4.95-.257 6.898.203zm-14.058 6.744c1.772-1.693 3.246-3.392 4.422-5.099-3.07.637-6.315 1.686-9.737 3.149-3.38 1.476-6.254 3.033-8.62 4.672-2.354 1.652-3.821 3.121-4.403 4.407-.31.732-.148 1.287.487 1.666 1.177.65 3.266.346 6.268-.914 4.017-1.787 7.878-4.414 11.583-7.881zm30.123-8.49a.697.697 0 01.163.507.726.726 0 01-.223.467c-1.299 1.11-2.644 1.896-4.037 2.357-1.38.46-2.678.683-3.895.67-1.203-.014-2.197-.163-2.982-.447a8.848 8.848 0 01-.487-.203 8.012 8.012 0 01-1.663 1.32c-.595.352-1.19.535-1.785.548-.27 0-.541-.054-.811-.162-1.069-.515-1.245-1.713-.528-3.595a9.136 9.136 0 011.258-2.174c.554-.717 1.176-1.266 1.866-1.645.69-.38 1.4-.447 2.13-.203.19.081.318.21.385.386a.604.604 0 01.02.508.773.773 0 01-.364.406.71.71 0 01-.528 0c-.568-.163-1.19.101-1.866.792-.676.677-1.217 1.496-1.623 2.458-.216.569-.325 1.002-.325 1.3 0 .298.041.46.122.487.42.163 1.035-.047 1.846-.63.217-.162.426-.338.629-.527-.487-.407-.757-.867-.811-1.382-.054-.799.324-1.462 1.136-1.99.852-.488 1.616-.535 2.292-.142.135.067.257.189.365.365.108.176.155.42.142.731-.014.312-.142.704-.386 1.178-.148.271-.338.562-.568.874h.02c.663.244 1.522.366 2.577.366s2.19-.204 3.408-.61c1.217-.406 2.4-1.097 3.55-2.072a.667.667 0 01.487-.162c.189.013.351.088.486.223zm-11.765 1.604c.446-.596.71-1.056.791-1.381h-.02c-.176 0-.392.067-.65.203-.134.081-.25.183-.344.305a.595.595 0 00-.142.365c.014.136.135.305.365.508zm26.127-1.605a.696.696 0 01.163.508.725.725 0 01-.224.467c-1.298 1.11-2.643 1.896-4.036 2.357-1.38.46-2.678.683-3.895.67-1.204-.014-2.198-.163-2.982-.447a8.876 8.876 0 01-.487-.203 8.012 8.012 0 01-1.663 1.32c-.595.352-1.19.535-1.785.548-.27 0-.541-.054-.812-.162-1.068-.515-1.244-1.713-.527-3.595a9.136 9.136 0 011.258-2.174c.554-.717 1.176-1.266 1.866-1.645.69-.38 1.4-.447 2.13-.203.19.081.318.21.385.386a.605.605 0 01.02.508.774.774 0 01-.365.406.71.71 0 01-.527 0c-.568-.163-1.19.101-1.866.792-.676.677-1.217 1.496-1.623 2.458-.216.569-.325 1.002-.325 1.3 0 .298.04.46.122.487.42.163 1.035-.047 1.846-.63.216-.162.426-.338.629-.527-.487-.407-.758-.867-.812-1.382-.054-.799.325-1.462 1.136-1.99.852-.488 1.617-.535 2.293-.142a.94.94 0 01.365.365c.108.176.155.42.142.731-.014.312-.142.704-.386 1.178-.148.271-.338.562-.568.874h.02c.663.244 1.522.366 2.577.366s2.19-.204 3.408-.61c1.217-.406 2.4-1.097 3.55-2.072a.667.667 0 01.486-.162c.19.013.352.088.487.223zm-11.765 1.605c.446-.596.71-1.056.791-1.381h-.02c-.176 0-.392.067-.65.203-.135.081-.25.183-.344.305a.595.595 0 00-.142.365c.013.136.135.305.365.508zm27.993-1.544a.701.701 0 01.122.508.704.704 0 01-.264.447 22.617 22.617 0 01-4.604 2.6c-1.596.663-3.037 1.171-4.321 1.523-3.191.826-5.423 1.192-6.694 1.097a.697.697 0 01-.588-.406.71.71 0 01.101-.711 110.49 110.49 0 012.008-2.417c-2.65 2.898-4.875 5.531-6.674 7.901-.148.19-.33.285-.547.285a.64.64 0 01-.345-.102.61.61 0 01-.304-.386.676.676 0 01.02-.487 165.96 165.96 0 018.398-16.088 91.526 91.526 0 012.556-4.042c.717-1.07 1.318-1.896 1.805-2.478.487-.596.88-1.03 1.177-1.3.311-.271.554-.434.73-.488.176-.067.304-.101.385-.101a.99.99 0 01.913.467.717.717 0 01.082.528.688.688 0 01-.305.427.734.734 0 01-.69.02c-.283.176-.885.874-1.805 2.092-.92 1.205-2.204 3.169-3.854 5.89a173.928 173.928 0 00-5.64 10.38 126.686 126.686 0 014.707-5.2c1.582-1.652 2.934-2.925 4.057-3.818a.673.673 0 01.71-.081c.257.121.42.318.487.588.108.38-.17 1.037-.832 1.97-.65.935-1.873 2.452-3.672 4.55-.46.543-.899 1.057-1.318 1.545 1.609-.15 3.665-.61 6.166-1.382a25.132 25.132 0 007.08-3.473.597.597 0 01.487-.142c.19.027.344.122.466.284z"
      ></path>
      <path
        fill="#050402"
        d="M93.088 22.681a.476.476 0 00-.49-.46c-.007 0-.16.004-.41.028a.476.476 0 00.09.949c.215-.02.346-.025.35-.025a.477.477 0 00.46-.492zM86.137 44.319c-.23.091-.468.18-.708.264a.476.476 0 00.315.9c.252-.089.504-.183.745-.28a.477.477 0 00-.352-.884zM89.644 42.882a.476.476 0 00-.666-.099 9.882 9.882 0 01-.61.418.476.476 0 00.507.806c.234-.148.46-.302.67-.459a.477.477 0 00.099-.666zM91.443 41.566a5.908 5.908 0 00.4-.746.475.475 0 10-.87-.385 4.647 4.647 0 01-.333.62.477.477 0 00.803.511zM92.134 37.23a.476.476 0 10-.928.211c.054.239.093.476.115.706a.476.476 0 10.947-.093 6.723 6.723 0 00-.134-.824zM91.126 34.71a14.051 14.051 0 00-.414-.688.476.476 0 10-.801.515c.137.215.267.43.385.64a.475.475 0 10.83-.466zM88.761 31.283a.475.475 0 10-.797.52c.14.215.29.436.445.656a.476.476 0 10.777-.55 19.48 19.48 0 01-.425-.626zM86.708 29.44a.475.475 0 10.884-.352 7.79 7.79 0 01-.239-.69.476.476 0 10-.913.267c.073.251.163.512.268.775zM87.33 24.853a.477.477 0 00-.649.18l-.049.09c-.12.23-.219.476-.29.728a.476.476 0 10.914.262 2.842 2.842 0 01.254-.611.477.477 0 00-.18-.65zM88.576 23.791a.475.475 0 00.637.217c.207-.102.431-.198.666-.284a.477.477 0 00-.327-.895 7.699 7.699 0 00-.76.324.477.477 0 00-.216.638zM82.992 45.265c-.224.047-.353.068-.354.068a.476.476 0 00.154.94c.006 0 .148-.024.394-.075a.477.477 0 00-.194-.933z"
      ></path>
      <path
        fill="#050402"
        d="M82.865 49.553l8.19 4.333c.702.371 1.561.292 2.243-.208 7.953-5.84 10.811-13.377 3.78-20.423-2.263-2.268-4.795-5.357-4.002-7.191.633-1.467 3.375-2.136 8.149-1.99.753.024 1.039-1.015.379-1.364l-3.05-1.614a3.886 3.886 0 00-1.71-.449c-1.477-.046-3.46-.046-5.474.14-5.77.146-9.327 1.363-10.572 3.617-.852 1.542-.582 3.51.803 5.85 1.256 2.118 1.523 3.89.796 5.27-1.938 3.676-10.649 4.235-13.51 4.418-1.032.066-1.367 1.494-.471 1.968l12.487 6.606a.475.475 0 10.444-.842l-9.29-4.915c9.646-.925 17.166-4.534 12.223-12.88-3.082-5.202.492-7.381 6.515-8.075 2.187-.25 4.409-.256 6.02-.205.46.014.897.129 1.295.34l1.116.59c-2.862.025-7.259.439-8.46 3.04-.46.999-.395 2.208.192 3.595.62 1.465 1.853 3.183 3.662 5.107 3.143 3.341 4.091 6.625 2.82 9.76a.476.476 0 10.88.359c1.425-3.511.413-7.135-3.008-10.772-3.165-3.365-4.438-6.01-3.682-7.65.28-.607.808-1.04 1.395-1.359-2.87 2.396.732 6.666 3.38 9.32 2.674 2.678 3.918 5.484 3.699 8.34-.369 4.822-4.775 8.736-7.369 10.64-.384.283-.859.334-1.237.134l-1.36-.72c2.619-1.441 5.358-3.445 7.062-5.893a.476.476 0 10-.78-.544c-.858 1.233-2.941 3.622-7.297 5.9l-5.814-3.075a.476.476 0 00-.444.842zM70.49 41.93l-1.63-.862-.007-.005c-.006-.01-.012-.056.014-.107.03-.06.067-.063.08-.064 5.196-.333 12.33-1.205 14.291-4.924.892-1.691.616-3.778-.819-6.2-1.826-3.085-1.644-5.445 1.646-6.823-2.493 1.836-2.264 4.499-.73 7.203.112.195.149.25.264.454 4.54 7.988-3.976 10.73-13.109 11.328z"
      ></path>
      <path
        fill="#000"
        d="M26.478 42.764h1.57v1.572a1.813 1.813 0 103.623 0v-1.572h1.57c1 0 1.812-.812 1.812-1.814a1.813 1.813 0 00-1.812-1.814h-1.57v-1.572a1.813 1.813 0 00-1.811-1.814c-1 0-1.812.812-1.812 1.814v1.572h-1.57c-1 0-1.811.812-1.811 1.814s.81 1.814 1.811 1.814zM46.195 15.14l-4.928 5.877a1.108 1.108 0 001.356 1.694c.125-.065.24-.156.338-.271l4.927-5.877a1.108 1.108 0 00-.136-1.56 1.104 1.104 0 00-1.557.136zM38.698 23.382a1.104 1.104 0 00.806-1.342L36.43 9.675a1.105 1.105 0 10-2.145.534l3.072 12.366c.148.593.747.954 1.34.807zM33.343 25.12a1.105 1.105 0 101.8-1.285l-4.84-6.796a1.105 1.105 0 10-1.8 1.285l4.84 6.797zM72.28 6.077a.774.774 0 000 1.094l4.945 4.952a.77.77 0 001.092 0 .774.774 0 000-1.094l-4.945-4.952a.772.772 0 00-1.093 0zM61.017 22.1a3.251 3.251 0 003.246-3.25 3.251 3.251 0 00-3.246-3.25 3.252 3.252 0 00-3.245 3.25 3.251 3.251 0 003.245 3.25zm0-4.426a1.176 1.176 0 010 2.352 1.176 1.176 0 010-2.352zM7.79 8.45a2.598 2.598 0 002.596-2.6c0-1.436-1.163-2.6-2.597-2.6a2.598 2.598 0 00-2.596 2.6c0 1.436 1.162 2.6 2.596 2.6z"
      ></path>
    </svg>
  );
};
