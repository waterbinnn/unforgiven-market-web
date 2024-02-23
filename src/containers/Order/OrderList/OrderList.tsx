import classNames from 'classnames/bind';
import styles from './OrderList.module.scss';
import { OrderDetail } from '../OrderDetail';

const cx = classNames.bind(styles);

export const Order = () => {
  return (
    <main className={cx('container')}>
      <h1>ORDER</h1>
      <section className={cx('order-container')}>
        <h2 className={cx('visually-hidden')}>order list</h2>
        <ol>
          <OrderDetail />
        </ol>
      </section>
    </main>
  );
};
