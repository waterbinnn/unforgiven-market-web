'use client';

import classNames from 'classnames/bind';
import styles from './CartList.module.scss';

import { CartItemType } from '@/types/cartTypes';
import { useEffect, useState } from 'react';
import { CartDetail } from '../CartDetail';
import { Button, PaymentForm } from '@/components';
import { useRouter } from 'next/navigation';

import { getCartList, removeCart } from '@/actions/CartListActions';
import { useQuery } from '@tanstack/react-query';
import { useCartList } from '@/hooks';
import { getServerSession } from 'next-auth';

const cx = classNames.bind(styles);

// export const CartList = ({ carts, detail }: { carts: any; detail: any[] }) => {
export const CartList = ({ token }: { token: string }) => {
  const router = useRouter();

  // const [cartDetail, setCartDetail] = useState(detail.map((detail) => detail));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalShippingFee, setTotalShippingFee] = useState(0);

  const { data, isLoading, isError } = useCartList(token);

  // if (!data || !data.results || data.count === 0) {
  if (!data) {
    return (
      <div className={cx('no-items-wrap')}>
        <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
      </div>
    );
  }

  console.log(data);

  // useEffect(() => {
  //   const payments = detail.map((item) => ({
  //     price: Number(item.data.price),
  //     quantity: Number(item.quantity),
  //     shipping: Number(item.data.shipping_fee),
  //   }));
  //   // const quantity = data.map((v) => v.);
  //   // console.log('q', quantity);

  //   // setTotalPrice(payments.reduce((sum, item) => sum + item.price * item.quantity, 0));
  //   // setTotalShippingFee(payments.reduce((sum, item) => sum + item.shipping, 0));
  // }, []);

  if (isLoading || !data) return <div className={cx('container')}>loading</div>;
  if (isError) return <div className={cx('container')}>error</div>;

  return (
    <>
      <main className={cx('container')}>
        <h1 className={cx('page-title')}>CART</h1>
        <section className={cx('cart-container')}>
          <h2 className={cx('visually-hidden')}>cart list</h2>

          <button
            type="button"
            onClick={() => removeCart()}
            disabled={data?.count === 0}
            className={cx('del-btn')}
          >
            전체 삭제
          </button>

          <ol className={cx('item-list-wrap')}>
            {data.count > 0 ? (
              data.results.map((product: CartItemType | any, index: number) => (
                <CartDetail product={product} key={`c-d-${index}`} />
              ))
            ) : (
              <div className={cx('no-items-wrap')}>
                <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
              </div>
            )}
          </ol>
        </section>

        {/* total price payment form  */}
        <PaymentForm totalPrice={totalPrice} shipping={totalShippingFee} />

        <div className={cx('btn-order-wrap')}>
          <Button size={'m'} color={'yellow'} onClick={() => router.push('/order')}>
            ORDER
          </Button>
        </div>
      </main>
    </>
  );
};
