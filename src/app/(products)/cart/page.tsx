'use client';

import { useSession } from 'next-auth/react';

export default function Cart() {
  const { data } = useSession();
  return (
    <div>
      <span className="text-2xl">
        {JSON.stringify(data)}
      </span>
    </div>
  );
}
