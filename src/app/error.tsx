'use client';

import { Button } from '@waterbin/ui-kit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();

  return (
    <div className={'error-container'}>
      <strong>ERROR</strong>
      <p>Something went wrong!</p>
      <Link href={'/'}>
        <Button fullWidth>메인 페이지로 이동</Button>
      </Link>
    </div>
  );
}
