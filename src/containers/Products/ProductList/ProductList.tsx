'use client';
import classNames from 'classnames/bind';
import styles from './ProductList.module.scss';

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import Loading from '@/app/loading';
import { ProductListType } from '@/types';
import Error from '@/app/error';
import { ProductItem } from './localComponents';

const cx = classNames.bind(styles);

const INIT_URL = `${process.env.NEXT_PUBLIC_API_URL}products/`;

export const ProductList = () => {
  const getProducts = async (pageParam: string) => {
    const res = await fetch(pageParam);
    const data = await res.json();
    return data;
  };

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ['productsList'],
    ({ pageParam = INIT_URL }) => getProducts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    },
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error errorMsg="다시 시도해 주세요." url={'/'} />;

  return (
    <>
      {isFetching && <Loading />}
      <section className={cx('container')}>
        <h2 className={cx('visually-hidden')}>전체상품목록</h2>
        <InfiniteScroll
          loader={<Loading />}
          next={fetchNextPage}
          hasMore={hasNextPage || false}
          dataLength={data ? data.pages.reduce((total, page) => total + page.results.length, 0) : 0}
        >
          <div className={cx('list-container')}>
            {data ? (
              data?.pages?.map((page) => {
                return (
                  page &&
                  page.results.map((item: ProductListType) => {
                    return <ProductItem key={item.product_id} product={item} />;
                  })
                );
              })
            ) : (
              <></>
            )}
          </div>
        </InfiniteScroll>
      </section>
    </>
  );
};
