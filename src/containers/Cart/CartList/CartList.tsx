'use client';

import { useState } from 'react';

import classNames from 'classnames/bind';
import styles from './CartList.module.scss';

import { CartItemType, CartListType, ProductListType } from '@/types';
import { CartDetail } from '../CartDetail';
import { Button, PaymentForm } from '@/components';
import { useRouter } from 'next/navigation';
import { removeCart } from '@/actions';

import { OrderDetailType, useOrderStore } from '@/store';

const cx = classNames.bind(styles);

export const CartList = ({
  carts,
  detail,
  totalPrice,
  totalShippingFee,
}: {
  carts: CartListType;
  detail: { data: ProductListType | null }[];
  totalPrice: number;
  totalShippingFee: number;
}) => {
  const router = useRouter();
  const { setOrderKind, setOrderDetail } = useOrderStore();
  const [productDetail, _setProductDetail] = useState(detail ? detail.map((v) => v.data) : []);

  const handleOrder = () => {
    const orderList: OrderDetailType[] = [];
    carts.results.map((cart) =>
      productDetail.map((product) => {
        if (product?.product_id === cart.product_id) {
          orderList.push({ ...product, quantity: cart.quantity });
        }
      }),
    );
    setOrderKind('cart_order');
    setOrderDetail(orderList);
    router.push('/order');
  };

  if (!carts || !detail) {
    return (
      <div className={cx('no-items-wrap')}>
        <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <main className={cx('container')}>
        <h1 className={cx('page-title')}>CART</h1>
        <section className={cx('cart-container')}>
          <h2 className={cx('visually-hidden')}>cart list</h2>

          <button
            type="button"
            onClick={() => {
              removeCart();
            }}
            disabled={carts?.count === 0}
            className={cx('del-btn')}
          >
            전체 삭제
          </button>

          <ol className={cx('item-list-wrap')}>
            {carts.count > 0 ? (
              carts.results.map((product: CartItemType | any, index: number) => {
                const productDetailItem = productDetail.find(
                  (detail: any) => detail.product_id === product.product_id,
                );
                return (
                  <CartDetail product={product} detail={productDetailItem!} key={`c-d-${index}`} />
                );
              })
            ) : (
              <div className={cx('no-items-wrap')}>
                <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
              </div>
            )}
          </ol>
        </section>

        <PaymentForm totalPrice={totalPrice} shipping={totalShippingFee} />

        <div className={cx('btn-order-wrap')}>
          <Button size={'m'} color={'yellow'} onClick={handleOrder}>
            ORDER
          </Button>
        </div>
      </main>
    </>
  );
};
