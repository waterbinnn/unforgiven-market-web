'use client';

import classNames from 'classnames/bind';
import styles from './CartList.module.scss';

import { cartManage } from '@/service/cartManage';
import Loading from '@/app/loading';
import { CartItemType, CartResult } from '@/types/cartManage';
import { useCartList } from '@/hooks';
import { Suspense, useEffect } from 'react';
import Error from '@/app/error';
import { CartDetail } from '../CartDetail';
import { Button, PaymentForm } from '@/components';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCartStore } from '@/store/useCart';

const cx = classNames.bind(styles);
interface Props {
  token: string;
}
export const CartList = ({ token }: Props) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { isLoading, isError, data } = useCartList(token);

  const { cartItems, fetchCartDetail } = useCartStore();

  useEffect(() => {
    fetchCartDetail(token);
  }, []);

  const payments = cartItems.map((item: CartItemType) => ({
    price: Number(item.detail.price),
    quantity: Number(item.quantity),
    shipping: Number(item.detail.shipping_fee),
  }));

  const totalPrice = payments.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalShippingFee = payments.reduce((sum, item) => sum + item.shipping, 0);

  const { mutate: mutateDeleteCart } = useMutation(() => cartManage.removeCart(token), {
    onSuccess: () => {
      queryClient.invalidateQueries(['cartList']);
    },
  });

  if (isLoading) return <Loading />;
  if (isError)
    return <Error errorMsg={'불러오기를 실패했습니다. 다시 시도해 주세요.'} url={'/cart'} />;

  return (
    <>
      <main className={cx('container')}>
        <h1 className={cx('page-title')}>CART</h1>
        <section className={cx('cart-container')}>
          <h2 className={cx('visually-hidden')}>cart list</h2>

          <Suspense fallback={<Loading />}>
            <button
              type="button"
              onClick={() => mutateDeleteCart()}
              disabled={data?.count === 0}
              className={cx('del-btn')}
            >
              전체 삭제
            </button>
            <ol className={cx('item-list-wrap')}>
              {cartItems.length > 0 ? (
                data.results.map((detail: CartResult, index: number) => (
                  <CartDetail token={token} detail={detail} key={`c-d-${index}`} />
                ))
              ) : (
                <div className={cx('no-items-wrap')}>
                  <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
                </div>
              )}
            </ol>
          </Suspense>
        </section>
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
