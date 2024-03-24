'use client';

import { SessionProvider } from 'next-auth/react';
import { useSession } from 'next-auth/react';
import { useEffect, useRef } from 'react';
import { getUserById } from '~/actions/user.action';
import { useStore } from '~/lib/store';

type Props = {
  children?: React.ReactNode;
};

const WrapperUserData = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data } = useSession();
  const renders = useRef(0);
  console.log(
    'component renders tidak dalam resnya',
    renders.current++,
  );

  useEffect(() => {
    if (data) {
      const authenticated = useStore((state) => state.user);
      const setUser = useStore(
        (state) => state.setAuthenticatedUser,
      );
      getUserById({ userId: data.user.id })
        .then((res) => {
          // console.log('response user', res),
          console.log(
            'component renders',
            renders.current++,
          );
          setUser(res);
        })
        .finally(() =>
          console.log('authenticated', authenticated),
        );
    }
  }, []);
  return <>{children}</>;
};

export const NextAuthProvider = ({ children }: Props) => {
  return (
    <SessionProvider>
      <WrapperUserData>{children}</WrapperUserData>
    </SessionProvider>
  );
};
