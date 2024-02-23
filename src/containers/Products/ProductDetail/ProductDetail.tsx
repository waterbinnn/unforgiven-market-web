'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Button, Count, AddCartButton } from '@/components';

import classNames from 'classnames/bind';
import styles from './ProductDetail.module.scss';
import { PostCart, ProductListType } from '@/types';

const cx = classNames.bind(styles);

interface Props {
  detail: ProductListType;
}

export const ProductDetail = ({ detail }: Props) => {
  const [count, setCount] = useState<number>(1);

  //장바구니 추가 버튼에 들어가는 객체
  const cartReq: PostCart = {
    check: false,
    product_id: detail.product_id,
    quantity: count,
  };

  return (
    <main className={cx('container')}>
      <section className={cx('detail-container')}>
        <h2 className={cx('visually-hidden')}>상품상세페이지</h2>
        <div className={cx('image-wrap', { soldout: detail.stock === 0 })}>
          <Image
            src={detail.image}
            alt={detail.product_name}
            width={500}
            height={500}
            placeholder={'blur'}
            blurDataURL={'/assets/default_img.png'}
            className={cx('image')}
          />
        </div>

        {/* 상품정보 */}
        <div className={cx('detail-detail-container')}>
          <div className={cx('detail-info-wrap')}>
            <span className={cx('store')}>{detail.store_name}</span>
            <dl className={cx('info-wrap')}>
              <div className={cx('info-detail')}>
                <dt className={cx('visually-hidden')}>product name</dt>
                <dd className={cx('info-name')}>{detail.product_name}</dd>
              </div>
              <div className={cx('info-detail')}>
                <dt className={cx('visually-hidden')}>Price</dt>
                <dd className={cx('info-price')}>￦ {detail.price.toLocaleString()}</dd>
              </div>
            </dl>
            <span className={cx('shipping-fee')}>
              {detail.shipping_fee > 0
                ? `택배배송/${detail.shipping_fee.toLocaleString()}원`
                : '택배배송/무료배송'}
            </span>
          </div>
          {detail.stock < 5 && detail.stock > 1 && (
            <p className={cx('stock-info')}>
              현재 {detail.stock}개의 재고가 남아있습니다. 구매를 서두르세요!
            </p>
          )}
          {detail.stock === 0 && <p className={cx('stock-info')}>품절된 상품입니다.</p>}

          {/* 수량 */}
          <div className={cx('count')}>
            <Count count={count} setCount={setCount} stock={detail.stock} />
            <div className={cx('total-wrap')}>
              <h3 className={cx('title')}>total</h3>
              <div className={cx('total-num-wrap')}>
                <span className={cx('detail-title')}>Total Item</span>
                <strong className={cx('detail-num')}>{count}</strong>
              </div>
              <strong className={cx('detail-fee')}>
                ￦ {(detail.price * count).toLocaleString('ko-KR')}
              </strong>
            </div>
          </div>

          {/* 버튼 섹션  */}
          <div className={cx('button-wrap')}>
            <AddCartButton
              disabled={detail.stock ? false : true}
              width={'40%'}
              color={'black'}
              req={cartReq}
            />
            <Button color={'outline'} size="l" width="60%" disabled={detail.stock ? false : true}>
              ORDER
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};
