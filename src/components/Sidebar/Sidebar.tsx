'use client';

import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

export const Sidebar = ({ count }: { count: number }) => {
  const router = useRouter();

  return (
    <nav role="navigation" className={cx('sidebar-container')}>
      <ol className={cx('sidebar-wrap')}>
        <li
          tabIndex={0}
          className={cx('menu', 'active')}
          onClick={() => router.push('/seller/dashboard')}
        >
          판매중인 상품 ({count})
        </li>
        <li className={cx('menu')}>주문/배송</li>
        <li className={cx('menu')}>문의/리뷰</li>
        <li className={cx('menu')}>통계</li>
        <li className={cx('menu')}>스토어 설정</li>
      </ol>
    </nav>
  );
};
