import { Button } from '@/components';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import classNames from 'classnames/bind';

import styles from './SignInButton.module.scss';
import { useUserType } from '@/hooks';
const cx = classNames.bind(styles);

export const SignInButton = () => {
  const { data: session } = useSession();
  const { removeUserType } = useUserType();

  const router = useRouter();

  const onLogout = () => {
    signOut();
    removeUserType;
    router.push('/');
  };

  return (
    <>
      {session ? (
        <Button color="black" type="button" onClick={onLogout} width="fit-content">
          <img className={cx('logout-image')} src={'/assets/icon-logout.svg'} alt="logout" />
        </Button>
      ) : (
        <Button color="green" type="button" onClick={() => router.push('/signin')}>
          <div className={cx('btn-wrap')}>LOGIN</div>
        </Button>
      )}
    </>
  );
};
