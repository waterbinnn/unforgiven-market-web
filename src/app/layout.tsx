import Head from './head';
import '../styles/globals.scss';
import { GNBLayout } from '@/components';
import Providers from '@/utils/provider';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <Head />
      <body>
        <div id={'portal-wrap'} />
        <Providers>
          <GNBLayout>{children}</GNBLayout>
        </Providers>
      </body>
    </html>
  );
}
