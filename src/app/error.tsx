'use client';

import { Button } from '@/components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div className={'error-container'}>
      <strong>ERROR</strong>
      <p>Something went wrong!</p>
      <Link href={'/'}>
        <Button size="m" width="100%">
          메인 페이지로 이동
        </Button>
      </Link>
    </div>
  );
}
