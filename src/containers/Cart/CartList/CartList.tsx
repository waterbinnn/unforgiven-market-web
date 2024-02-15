'use client';

import classNames from 'classnames/bind';
import styles from './CartList.module.scss';

import Loading from '@/app/loading';
import { CartItemType, CartListType } from '@/types/cartTypes';
import { useProductDetail } from '@/hooks';
import { Suspense } from 'react';
import { CartDetail } from '../CartDetail';
import { Button, PaymentForm } from '@/components';
import { useRouter } from 'next/navigation';

import { removeCart } from '@/actions/CartListActions';

const cx = classNames.bind(styles);

export const CartList = ({ data }: { data: CartListType | null }) => {
  const router = useRouter();

  if (!data || !data.results) {
    return;
  }

  //카트에 담긴 아이템 상세 데이터
  const cartDetails = data.results.map((item) => {
    const { data: detail } = useProductDetail(item.product_id.toString());
    return { ...item, detail };
  });

  const payments = cartDetails.map((item) => ({
    price: Number(item.detail?.price),
    quantity: Number(item.quantity),
    shipping: Number(item.detail?.shipping_fee),
  }));

  const totalPrice = payments.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalShippingFee = payments.reduce((sum, item) => sum + item.shipping, 0);

  return (
    <>
      <main className={cx('container')}>
        <h1 className={cx('page-title')}>CART</h1>
        <section className={cx('cart-container')}>
          <h2 className={cx('visually-hidden')}>cart list</h2>

          <Suspense fallback={<Loading />}>
            {/* delete all button  */}
            <button
              type="button"
              onClick={() => removeCart()}
              disabled={data?.count === 0}
              className={cx('del-btn')}
            >
              전체 삭제
            </button>

            {/* cart item list section */}
            <ol className={cx('item-list-wrap')}>
              {data.count > 0 ? (
                cartDetails.map(
                  (product: CartItemType | any, index: number) =>
                    product.detail && <CartDetail product={product} key={`c-d-${index}`} />,
                )
              ) : (
                <div className={cx('no-items-wrap')}>
                  <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
                </div>
              )}
            </ol>
          </Suspense>
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
