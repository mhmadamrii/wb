import Link from 'next/link';

import { LogOut, User, MessageCircle } from 'lucide-react';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

const ProfileDefault = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="33"
      viewBox="0 0 24 24"
    >
      <path
        fill="#494c4e"
        d="M12 0C5.37 0 0 5.37 0 12a11.964 11.964 0 002.19 6.92A12 12 0 0012 24a12 12 0 0010.83-6.82C23.58 15.61 24 13.86 24 12c0-6.63-5.37-12-12-12zm0 22c-3.32 0-6.28-1.63-8.1-4.14.79-.42 1.67-.77 2.6-1.06l.12.34C7.34 19.12 9.84 20 12 20s4.66-.88 5.38-2.86l.12-.34c.93.29 1.81.64 2.6 1.06A9.999 9.999 0 0112 22zm-1.84-7.92c-.16-.41-.39-.82-.69-1.21-.58-.76-.9-1.74-.9-2.76C8.57 7.84 10.11 6 12 6s3.43 1.84 3.43 4.11c0 1.02-.32 2-.9 2.76-.3.39-.53.8-.69 1.21-.21.5-.32 1.02-.32 1.52v.21c0 .1.03.19.1.26.07.1.19.18.34.19.52.05 1.04.12 1.54.2-.31.86-1.79 1.54-3.5 1.54s-3.19-.68-3.5-1.54c.5-.08 1.02-.15 1.54-.2.15-.01.27-.09.34-.19.07-.07.1-.16.1-.26v-.21c0-.5-.11-1.02-.32-1.52zm10.95 2.02c-.9-.47-1.87-.88-2.92-1.2-.05-.02-.11-.03-.17-.05-.67-.2-1.36-.37-2.08-.5.05-.09.12-.18.18-.26.85-1.11 1.31-2.52 1.31-3.98C17.43 6.74 15 4 12 4s-5.43 2.74-5.43 6.11c0 1.46.47 2.87 1.31 3.98.07.08.13.17.18.26-.72.13-1.41.3-2.08.5-.06.02-.12.03-.17.05-1.05.32-2.02.73-2.92 1.2A9.71 9.71 0 012 12C2 6.49 6.49 2 12 2s10 4.49 10 10c0 1.46-.31 2.85-.89 4.1z"
      ></path>
    </svg>
  );
};

export default function UserMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Link href="/profile">
          <ProfileDefault />
        </Link>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuLabel>User Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">
          <MessageCircle className="mr-2 h-4 w-4" />
          <span>Complain</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => signOut()}
        >
          <LogOut className="mr-2 h-4 w-4 text-red-500" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
