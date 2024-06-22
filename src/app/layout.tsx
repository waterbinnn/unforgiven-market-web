'use server';

import Head from './head';
import '@/styles/globals.scss';
import Providers from '@/utils/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <Head />
      <body>
        {/* <noscript>
          <iframe
          src={`https://www.googletagmanager.com/ns.html?id=$${process.env.NEXT_PUBLIC_GA_TAG}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
          </noscript> */}

        <div id={'portal-wrap'} />
        <Providers session={session}>{children}</Providers>
      </body>
      <GoogleTagManager gtmId={`${process.env.NEXT_PUBLIC_GA_TAG}`} />
      <GoogleAnalytics gaId={`${process.env.NEXT_PUBLIC_GA_ID}`} />
    </html>
  );
}
