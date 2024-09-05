'use client';

import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';
import { Button } from '@waterbin/ui-kit';
import styles from './SignInButton.module.scss';

const cx = classNames.bind(styles);
export const SignInButton = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const onLogout = () => {
    signOut();
    router.push('/');
  };

  return (
    <>
      {session ? (
        <Button
          variant={'icon'}
          size="icon"
          rounded
          type="button"
          onClick={onLogout}
          icon={<img className={cx('logout-image')} src={'/assets/icon-logout.svg'} alt="logout" />}
        />
      ) : (
        <Button rounded color="blue" onClick={() => router.push('/signin')}>
          LOGIN
        </Button>
      )}
    </>
  );
};
