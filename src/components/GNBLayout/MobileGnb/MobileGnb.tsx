'use client';
import classNames from 'classnames/bind';
import styles from './MobileGnb.module.scss';
import { useRouter } from 'next/navigation';

import { BaseModal } from '@/components';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import { signOut, useSession } from 'next-auth/react';

const cx = classNames.bind(styles);

interface Props {
  setShowGnb: Dispatch<SetStateAction<Boolean>>;
}

export const MobileGnb = ({ setShowGnb }: Props) => {
  const { data: session } = useSession();
  const userType = session?.user_type;

  const router = useRouter();

  const handleRouter = (page: string) => {
    router.push(page);
    setShowGnb(!setShowGnb);
  };

  const handleLogout = () => {
    signOut();
    handleRouter('/');
  };

  return (
    <BaseModal selector={'#portal-wrap'} onOverlayClick={() => setShowGnb(false)} isGnb={true}>
      <section className={cx('mobile-gnb-container')}>
        <h2 className={cx('visually-hidden')}>Menu</h2>
        <button className={cx('close-btn')} onClick={() => setShowGnb(false)}>
          <Image src={'/assets/icon-plus.svg'} alt="menu" width={50} height={50} />
        </button>
        <nav className={cx('gnb-wrap')}>
          {userType === 'SELLER' ? (
            <button
              className={cx('gnb-korean')}
              type="button"
              onClick={() => handleRouter('/seller-center')}
            >
              판매자센터
            </button>
          ) : (
            <button className={cx('gnb-btn')} type="button" onClick={() => handleRouter('/cart')}>
              CART
            </button>
          )}
          {session ? (
            <button className={cx('gnb-btn')} type="button" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className={cx('gnb-btn')} type="button" onClick={() => handleRouter('/signin')}>
              LOGIN
            </button>
          )}
        </nav>
      </section>
    </BaseModal>
  );
};
