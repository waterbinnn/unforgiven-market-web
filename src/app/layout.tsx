import Head from './head';
import '@/styles/globals.scss';
import { GNBLayout } from '@/components';
import Providers from '@/utils/provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html>
      <Head />
      <body>
        <div id={'portal-wrap'} />
        <Providers session={session}>
          <GNBLayout>{children}</GNBLayout>
        </Providers>
      </body>
    </html>
  );
}
