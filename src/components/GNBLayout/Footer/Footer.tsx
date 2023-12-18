'use client';

import Link from 'next/link';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

export const Footer = () => {
  return (
    <footer className={cx('footer')}>
      <div className={cx('content-wrap')}>
        <h1 className={cx('title')}>UNFORGIVEN</h1>

        <dl className={cx('info-wrap')}>
          <dt className={cx('info-title')}>Github.</dt>
          <dd className={cx('info-desc')}>
            <Link href={'https://github.com/waterbinnn'} target="_blank">
              https://github.com/waterbinnn
            </Link>
          </dd>
          <dt className={cx('info-title')}>Blog.</dt>
          <dd className={cx('info-desc')}>
            <Link href={'https://velog.io/@ewaterbin'} target="_blank">
              https://velog.io/@ewaterbin
            </Link>
          </dd>
          <dt className={cx('info-title')}>E-mail.</dt>
          <dd className={cx('info-desc')}>
            <Link href="mailto:  ewaterbinn@gmail.com ">ewaterbinn@gmail.com</Link>
          </dd>
        </dl>
      </div>
      <span className={cx('copyright')}>Copyright © Unforgiven All rights reserved</span>
    </footer>
  );
};
