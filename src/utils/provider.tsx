'use client';

import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth/core/types';

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};

export default Providers;
