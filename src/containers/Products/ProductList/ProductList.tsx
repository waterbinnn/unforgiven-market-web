'use client';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

import { ProductListType } from '@/types';
import { LoadMore } from './localComponents';

const cx = classNames.bind(styles);

export const ProductList = ({ initialProducts }: { initialProducts: ProductListType[] | null }) => {
  return (
    <>
      <section className={cx('container')}>
        <h2 className={cx('visually-hidden')}>전체상품목록</h2>
        <ul className={cx('list-container')} role="list">
          {initialProducts && <LoadMore initialProducts={initialProducts} />}
        </ul>
      </section>
    </>
  );
};
