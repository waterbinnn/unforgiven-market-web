'use client';

import classNames from 'classnames/bind';
import styles from './CartList.module.scss';

import { cartManage } from '@/service/cartManage';
import Loading from '@/app/loading';
import { CartResult } from '@/types/cartManage';
import { useCartList } from '@/hooks';
import { Suspense } from 'react';
import Error from '@/app/error';
import { CartDetail } from '../CartDetail';

const cx = classNames.bind(styles);
interface Props {
  token: string;
}
export const CartList = ({ token }: Props) => {
  const { isLoading, isError, data } = useCartList(token);

  const handleRemoveCart = async () => {
    if (!token) {
      return;
    }
    try {
      await cartManage.removeCart(token ?? '');
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) return <Loading />;
  if (isError)
    return <Error errorMsg={'불러오기를 실패했습니다. 다시 시도해 주세요.'} url={'/cart'} />;

  console.log(data);

  return (
    <>
      <main className={cx('container')}>
        <h1 className={cx('page-title')}>CART</h1>
        <section className={cx('cart-container')}>
          <h2 className={cx('visually-hidden')}>cart items</h2>

          <Suspense fallback={<Loading />}>
            <button
              type="button"
              onClick={handleRemoveCart}
              disabled={data?.count === 0}
              className={cx('del-btn')}
            >
              전체 삭제
            </button>
            <ol className={cx('item-list-wrap')}>
              {data && data?.count === 0 ? (
                <div className={cx('no-items-wrap')}>
                  <p className={cx('text')}>장바구니에 담은 물건이 없습니다.</p>
                </div>
              ) : (
                data &&
                data?.results.map((item: CartResult, index: number) => (
                  <CartDetail detail={item} key={`c-d-${index}`} token={token ?? ''} />
                ))
              )}
            </ol>
          </Suspense>
        </section>
      </main>
    </>
  );
};
