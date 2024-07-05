'use client';

import classNames from 'classnames/bind';
import styles from '../ProductList.module.scss';
import { ProductListType } from '@/types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const cx = classNames.bind(styles);

interface Props {
  product: ProductListType;
}

export const ProductItem = ({ product }: Props) => {
  const router = useRouter();

  const handleGoToDetail = () => {
    router.push(`/product/${product.product_id}`);
  };

  return (
    <li
      className={cx('product-item', {
        soldOut: product.stock === 0,
      })}
      onClick={handleGoToDetail}
    >
      <div className={cx('product-image-wrap')}>
        <Image
          className={cx('product-image')}
          src={product.image as string}
          alt={product.product_name}
          placeholder={'blur'}
          blurDataURL={'/assets/default_img.png'}
          loading="lazy"
          fill
        />
      </div>
      <dl className={cx('info-wrap')}>
        <div className={cx('store-name-wrap')}>
          <dt className={cx('visually-hidden')}>store name</dt>
          <dd className={cx('store-name')}>{product.store_name}</dd>
        </div>
        <div className={cx('data-wrap')}>
          <dt className={cx('visually-hidden')}>store name</dt>
          <dd className={cx('data-info', 'name')}>{product.product_name}</dd>
        </div>
        <div className={cx('data-wrap')}>
          <dt className={cx('visually-hidden')}>Price</dt>
          <dd className={cx('data-info')}>￦ {product.price.toLocaleString('ko-KR')}</dd>
        </div>
      </dl>
    </li>
  );
};
