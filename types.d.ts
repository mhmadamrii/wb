import type { DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user?: DefaultUser & {
      id: string;
    };
    isSeller: boolean;
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: string;
  }
}
