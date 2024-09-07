'use server';

import Head from './head';
import '@/styles/globals.scss';
import { Providers } from '@/utils';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <Head />
      <body>
        <Providers session={session}>
          <div id={'portal-wrap'} />
          {children}
        </Providers>
      </body>
    </html>
  );
}
