'use client';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';
import { LoadMore } from '@/components/LoadMore';

const cx = classNames.bind(styles);

export const ProductList = () => {
  return (
    <>
      <section className={cx('container')}>
        <h2 className={cx('visually-hidden')}>전체상품목록</h2>
        <ul className={cx('list-container')} role="list">
          <LoadMore />
        </ul>
      </section>
    </>
  );
};
