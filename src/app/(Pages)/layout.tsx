import { GNBLayout } from '@/components';

export default async function Layout({ children }: { children: React.ReactNode }) {
  return <GNBLayout>{children}</GNBLayout>;
}
