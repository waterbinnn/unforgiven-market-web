import { productManage } from '@/api/productManage';

import classNames from 'classnames/bind';
import styles from '../products.module.scss';
import Product from './ProductDetail';
import { Hydrate, dehydrate, useQuery } from '@tanstack/react-query';
import Loading from '@/app/loading';
import Error from '@/app/error';
import getQueryClient from '@/utils/getQueryClient';

const cx = classNames.bind(styles);

interface Props {
  params: { id: string };
}

const ProductDetail = async ({ params }: Props) => {
  const productId = params.id.toString();

  //pre-fetching
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['productDetail'], () =>
    productManage.getProductDetail(productId),
  );
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <main className={cx('container')}>
        <section className={cx('detail-container')}>
          <h2 className={cx('visually-hidden')}>상품상세페이지</h2>
          <Product productId={productId} />
        </section>
      </main>
    </Hydrate>
  );
};

export default ProductDetail;
