'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState } from 'react';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { Session } from 'next-auth/core/types';

export const Providers = ({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session | null;
}) => {
  const reactQueryOption = {
    queries: {
      suspense: true, // Suspense 컴포넌트를 사용하여 쿼리 로딩 상태를 처리할지 여부를 나타내는 플래그.
      refetchOnMount: true, // 컴포넌트가 마운트될 때마다 쿼리를 리페치할지 여부를 나타내는 플래그.
      refetchInterval: 60 * 1000, // 주기적으로 쿼리를 리페치하는 간격(밀리초).
    },
  };
  const [queryClient] = useState(
    () =>
      new QueryClient({
        // defaultOptions: reactQueryOption,
      }),
  );

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default Providers;
