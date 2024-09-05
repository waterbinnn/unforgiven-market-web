'use client';

import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import Link from 'next/link';
import { useResize } from '@/utils';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { MobileGnb } from '../MobileGnb';
import { usePathname, useRouter } from 'next/navigation';
import { SignInButton } from '@/components';
import { getUserType } from '@/utils';
import { useCookies } from 'next-client-cookies';
import { Button } from '@waterbin/ui-kit';

const cx = classNames.bind(styles);

export const Header = () => {
  const browserSize = useResize({ throttleMs: 200 });
  const router = useRouter();
  const pathName = usePathname();
  const cookies = useCookies();

  const { userType } = getUserType();

  const [showGnb, setShowGnb] = useState<Boolean>(false);

  const handleGnb = () => {
    setShowGnb((prev) => !prev);
  };

  useEffect(() => {
    if (userType) {
      cookies.set('user_type', userType);
    }
  }, [userType]);

  return (
    <>
      <header className={cx('header')}>
        {browserSize.width >= 768 ? (
          <>
            <div className={cx('search-wrap')}>
              <Link className={cx('header-title')} href={'/'} as={'/'}>
                U.U
              </Link>
            </div>
            <div className={cx('btn-wrap')}>
              {userType === 'SELLER' ? (
                <Button onClick={() => router.push('/seller/dashboard')} color="blue">
                  👨‍🌾 판매자센터
                </Button>
              ) : (
                <Button color="green" rounded onClick={() => router.push('/cart')}>
                  CART
                </Button>
              )}
              <SignInButton />
            </div>
          </>
        ) : (
          <>
            <div className={cx('mobile-header-wrap')}>
              <button
                className={cx('back-btn')}
                type="button"
                onClick={() => router.back()}
                style={{ display: pathName === '/' ? 'none' : 'block' }}
              >
                <Image src={'/assets/icon-back.svg'} alt="back button" width={30} height={30} />
              </button>
              <Link className={cx('header-title')} href={'/'} as={'/'}>
                UNFORGIVEN
              </Link>
              <button className={cx('mobile-menu-btn')} onClick={handleGnb}>
                <Image src={'/assets/icon-plus.svg'} alt="menu" width={30} height={30} />
              </button>
            </div>
          </>
        )}
      </header>
      {showGnb && <MobileGnb setShowGnb={setShowGnb} />}
    </>
  );
};
