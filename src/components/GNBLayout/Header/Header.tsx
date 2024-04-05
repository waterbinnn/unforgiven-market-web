'use client';

import classNames from 'classnames/bind';

import styles from './Header.module.scss';
import { Button } from '../../Button';
import Link from 'next/link';
import { useResize } from '@/utils/useResize';
import Image from 'next/image';
import { useState } from 'react';
import { MobileGnb } from '../MobileGnb';
import { usePathname, useRouter } from 'next/navigation';
import { SignInButton } from '@/components/SignInButton';
import { getUserType } from '@/utils';

const cx = classNames.bind(styles);

export const Header = () => {
  const browserSize = useResize({ throttleMs: 200 });
  const router = useRouter();
  const pathName = usePathname();
  const { userType } = getUserType();

  const [showGnb, setShowGnb] = useState<Boolean>(false);

  const handleGnb = () => {
    setShowGnb((prev) => !prev);
  };

  return (
    <>
      <header className={cx('header')}>
        {browserSize.width >= 768 ? (
          <>
            <div className={cx('search-wrap')}>
              <Link className={cx('header-title')} href={'/'} as={'/'}>
                UNFORGIVEN
              </Link>
            </div>
            <div className={cx('btn-wrap')}>
              {userType === 'SELLER' ? (
                <Button
                  color="outline"
                  width="100px"
                  onClick={() => router.push('/seller/dashboard')}
                >
                  👨‍🌾 판매자센터
                </Button>
              ) : (
                <Button onClick={() => router.push('/cart')} color="outline" width="100px">
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
