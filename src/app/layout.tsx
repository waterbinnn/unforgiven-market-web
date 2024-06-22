'use server';

import Head from './head';
import '@/styles/globals.scss';
import Providers from '@/utils/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleTagManager } from '@next/third-parties/google';
import { GoogleAnalytics } from '@/lib';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <Head />
      <body>
        <div id={'portal-wrap'} />
        <Providers session={session}>{children}</Providers>
      </body>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA_TAG}`} />
      <GoogleAnalytics />
    </html>
  );
}
