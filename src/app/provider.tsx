'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { getUserById } from '~/actions/user.action';
import { useUserData } from '~/lib/store';

type Props = {
  children?: React.ReactNode;
};

const WrapperUserData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <>{children}</>;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WrapperUserData>{children}</WrapperUserData>
    </SessionProvider>
  );
};
