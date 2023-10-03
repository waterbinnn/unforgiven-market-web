'use client';
import classNames from 'classnames/bind';
import styles from '../products.module.scss';

import { useInfiniteQuery } from '@tanstack/react-query';
import InfiniteScroll from 'react-infinite-scroll-component';
import ProductItem from './ProductItem';
import Loading from '@/app/loading';
import { ProductListType } from '@/types';
import Error from '@/app/error';
import { useRouter } from 'next/navigation';

const cx = classNames.bind(styles);

const INIT_URL = `${process.env.NEXT_PUBLIC_API_URL}products/`;

const fetchProducts = async (pageParam: string) => {
  const res = await fetch(pageParam);
  const data = await res.json();
  return data;
};

const ProductList = () => {
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage, isFetching, isLoading, isError } = useInfiniteQuery(
    ['productsList'],
    ({ pageParam = INIT_URL }) => fetchProducts(pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.next || undefined,
    },
  );

  if (isLoading) return <Loading />;
  if (isError) return <Error />;

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
              data?.pages?.map((data) => {
                return (
                  data &&
                  data.results.map((item: ProductListType) => {
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

export default ProductList;
