'use client';

import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

import { ProductListType } from '@/types';
import { ProductItem } from './localComponents';
import { useCallback, useState } from 'react';
import { getProductList } from '@/actions';
import { Button } from '@/components';

const cx = classNames.bind(styles);

export const ProductList = ({ initialProducts }: { initialProducts: ProductListType[] | null }) => {
  const [products, setProducts] = useState<ProductListType[]>(
    initialProducts ? initialProducts : [],
  );
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const loadMore = useCallback(async () => {
    setIsLoading(true);
    const { data, success } = await getProductList(page + 1);

    if (!success) {
      return;
    }
    if (success && data) {
      setProducts((prev) => [...prev, ...data.results]);
      setPage(page + 1);
      setIsLoading(false);

      if (!data.next) {
        setIsLastPage(true);
      }
    }
  }, [page]);

  return (
    <>
      <section className={cx('container', 'products')}>
        <h2 className={cx('visually-hidden')}>전체상품목록</h2>
        <ul className={cx('list-container')} role="list">
          {products?.map((item) => (
            <ProductItem product={item} key={item.product_id} />
          ))}
        </ul>
        <div className={cx('btn-more-wrap')}>
          {!isLastPage && !isLoading ? (
            <Button size="s" color={'outline'} width={'50%'} onClick={loadMore}>
              + more
            </Button>
          ) : (
            <img src={'/assets/spinner.svg'} width={18} height={18} alt="loading..." />
          )}
        </div>
      </section>
    </>
  );
};
