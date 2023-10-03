'use client';
import { productManage } from '@/api/productManage';

import classNames from 'classnames/bind';
import styles from '../products.module.scss';
import Product from './Product';
import { useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import Error from '@/app/error';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

interface Props {
  params: { id: string };
}

const ProductDetail = async ({ params }: Props) => {
  const router = useRouter();
  const id = params.id.toString();

  const { isLoading, isError, data } = useQuery(['product'], () =>
    productManage.getProductDetail(id),
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

  return (
    <main className={cx('container')}>
      <section className={cx('detail-container')}>
        <h2 className={cx('visually-hidden')}>상품상세페이지</h2>
        <Product data={data} />
      </section>
    </main>
  );
};

export default ProductDetail;
