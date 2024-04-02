'use client';

import { Button } from '@/components';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';

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
        <Button color="black" type="button" onClick={onLogout} width="50px">
          <img className={cx('logout-image')} src={'/assets/icon-logout.svg'} alt="logout" />
        </Button>
      ) : (
        <Button color="green" type="button" onClick={() => router.push('/signin')} width="100px">
          <div className={cx('btn-wrap')}>LOGIN</div>
        </Button>
      )}
    </>
  );
};
