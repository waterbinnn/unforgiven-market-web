'use client';

import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import { OrderTable } from '@/components/OrderTable/OrderTable';

const cx = classNames.bind(styles);

export const OrderList = () => {
  return (
    <div className={cx('container')}>
      <h1 className={cx('page-title')}>ORDER LIST</h1>
      <div className={cx('order-container')}>
        <OrderTable>
          <div>d</div>
        </OrderTable>
      </div>
    </div>
  );
};
