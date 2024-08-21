'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/core/types';
import { CookiesProvider } from 'react-cookie';

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return (
    <SessionProvider session={session}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>{children}</CookiesProvider>
    </SessionProvider>
  );
};

export default Providers;
