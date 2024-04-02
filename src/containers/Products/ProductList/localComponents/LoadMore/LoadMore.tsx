'use client';

import classNames from 'classnames/bind';
import styles from './LoadMore.module.scss';
import ProductStyle from '../../ProductList.module.scss';

import { useInView } from 'react-intersection-observer';
import { ProductListType } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { getProductList } from '@/actions';
import { ProductItem } from '@/containers';

const cx = classNames.bind({ ...styles, ...ProductStyle });

export const LoadMore = ({ initialProducts }: { initialProducts: ProductListType[] }) => {
  const { ref, inView } = useInView({
    root: null,
    threshold: 0.3,
  });

  const [products, setProducts] = useState<ProductListType[]>(initialProducts);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    const { data, success } = await getProductList(page + 1);

    if (!success) {
      return;
    }
    if (success && data) {
      setIsLoading(true);
      setProducts((prev) => [...prev, ...data.results]);
      setPage(page + 1);
      setIsLoading(false);

      if (!data.next) {
        setIsLastPage(true);
      }
    }
  }, [page]);

  useEffect(() => {
    if (inView) {
      if (!isLastPage) {
        loadMore();
      }
    }
  }, [inView]);

  return (
    <>
      {products?.map((item) => (
        <ProductItem product={item} key={item.product_id} />
      ))}

      <div className={cx('wrapper')} ref={ref}>
        {inView && isLoading && (
          <img
            className={cx('image')}
            src={'/assets/spinner.svg'}
            width={50}
            height={50}
            alt="loading..."
          />
        )}
      </div>
    </>
  );
};
