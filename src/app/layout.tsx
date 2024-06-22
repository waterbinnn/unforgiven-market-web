'use server';

import Head from './head';
import '@/styles/globals.scss';
import Providers from '@/utils/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { GoogleAnalytics } from '@/lib';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <Head />
      <GoogleAnalytics />
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TNDWLK34"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <div id={'portal-wrap'} />
        <Providers session={session}>{children}</Providers>
      </body>
    </html>
  );
}
