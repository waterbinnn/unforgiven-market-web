'use client';

import classNames from 'classnames/bind';
import styles from './LoadMore.module.scss';
import ProductStyle from '../../ProductList.module.scss';

import { useInView } from 'react-intersection-observer';
import { ProductListType } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { getProductList } from '@/actions';
import { ProductItem } from '@/containers';
import Loading from '@/app/loading';

const cx = classNames.bind({ ...styles, ...ProductStyle });

export const LoadMore = ({ initialProducts }: { initialProducts: ProductListType[] }) => {
  const { ref, inView } = useInView();

  const [product, setProduct] = useState<ProductListType[]>(initialProducts);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    const { data, success } = await getProductList(page + 1);

    if (!success) {
      return;
    }

    if (success) {
      setIsLoading(true);
      setProduct((prev) => [...prev, ...data?.results!]);
      setPage(page + 1);
      setIsLoading(false);
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <>
      {product?.map((item) => (
        <ProductItem product={item} key={item.product_id} />
      ))}

      <div className={cx('wrapper')} ref={ref}>
        {inView && isLoading && <Loading />}
      </div>
    </>
  );
};
