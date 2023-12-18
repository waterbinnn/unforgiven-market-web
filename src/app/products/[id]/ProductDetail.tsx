'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import CountItem from '../components/CountItem';
import { Button } from '@/components';

import classNames from 'classnames/bind';
import styles from '../products.module.scss';
import { AddCartButton } from '@/components/AddCartButton/AddCartButton';
import { PostCart } from '@/types/cartManage';
import { useSession } from 'next-auth/react';
import { useProductDetail } from '@/hooks';
import Error from '@/app/error';
import Loading from '@/app/loading';

const cx = classNames.bind(styles);

interface Props {
  productId: string;
}

const ProductDetail = ({ productId }: Props) => {
  const { data: session } = useSession();
  const token = session?.token;

  const [count, setCount] = useState<number>(1);

  const { isLoading, isError, data } = useProductDetail(productId);

  if (!data) {
    return;
  }

  const cartReq: PostCart = {
    check: false,
    product_id: data.product_id,
    quantity: count,
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <Error
        errorMsg={'불러오기를 실패했습니다. 다시 시도해 주세요.'}
        url={`products/${productId}`}
      />
    );

  return (
    <>
      <div className={cx('image-wrap', { soldout: data.stock === 0 })}>
        <Image
          src={data.image}
          alt={data.product_name}
          width={500}
          height={500}
          placeholder={'blur'}
          blurDataURL={'/assets/default_img.png'}
          className={cx('image')}
        />
      </div>

      {/* 상품정보 */}
      <div className={cx('detail-data-container')}>
        <div className={cx('detail-info-wrap')}>
          <span className={cx('store')}>{data.store_name}</span>
          <dl className={cx('info-wrap')}>
            <div className={cx('info-data')}>
              <dt className={cx('visually-hidden')}>product name</dt>
              <dd className={cx('info-name')}>{data.product_name}</dd>
            </div>
            <div className={cx('info-data')}>
              <dt className={cx('visually-hidden')}>Price</dt>
              <dd className={cx('info-price')}>￦ {data.price.toLocaleString()}</dd>
            </div>
          </dl>
          <span className={cx('shipping-fee')}>
            {data.shipping_fee > 0
              ? `택배배송/${data.shipping_fee.toLocaleString()}원`
              : '택배배송/무료배송'}
          </span>
        </div>
        {data.stock < 5 && data.stock > 1 && (
          <p className={cx('stock-info')}>
            현재 {data.stock}개의 재고가 남아있습니다. 구매를 서두르세요!
          </p>
        )}
        {data.stock === 0 && <p className={cx('stock-info')}>품절된 상품입니다.</p>}

        {/* 수량 컴포넌트  */}
        <CountItem
          stock={data.stock}
          price={data.price}
          count={data.stock > 1 ? count : 0}
          setCount={setCount}
        />

        {/* 버튼 섹션  */}
        <div className={cx('button-wrap')}>
          <AddCartButton
            disabled={data.stock ? false : true}
            width={'40%'}
            color={'black'}
            token={token ?? ''}
            req={cartReq}
          />
          <Button color={'outline'} size="l" width="60%" disabled={data.stock ? false : true}>
            ORDER
          </Button>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
