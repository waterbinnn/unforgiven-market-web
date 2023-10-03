'use client';

import { Button } from '@/components';
import { useRouter } from 'next/navigation';

interface Props {
  url?: string;
}

export default function Error({ url }: Props) {
  const router = useRouter();
  return (
    <div className={'error-container'}>
      <p>Something went wrong!</p>
      <Button color="yellow" width="300px" onClick={() => router.push(url ?? '/')}>
        Try Again
      </Button>
    </div>
  );
}
