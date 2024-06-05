'use server';

import Head from './head';
import '@/styles/globals.scss';
import Providers from '@/utils/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import GoogleAnalytics from '@/components/GoogleAnalytics/GoogleAnalytics';
import { GoogleTagManager } from '@next/third-parties/google';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      {/* <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GA_ID as string} /> */}
      <Head />
      <GoogleAnalytics />
      <body>
        <div id={'portal-wrap'} />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
