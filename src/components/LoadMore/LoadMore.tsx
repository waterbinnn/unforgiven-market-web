'use client';

import Image from 'next/image';
import classNames from 'classnames/bind';
import styles from './LoadMore.module.scss';
import ProductStyle from '../../containers/Products/ProductList/ProductList.module.scss';
import { useInView } from 'react-intersection-observer';
import { ProductListType } from '@/types';
import { useEffect, useState } from 'react';
import { getProductList } from '@/actions';
import { ProductItem } from '@/containers/Products/ProductList/localComponents';

const cx = classNames.bind({ ...styles, ...ProductStyle });

export const LoadMore = () => {
  const { ref, inView } = useInView();

  const [product, setProduct] = useState<ProductListType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onLoad = async () => {
    const next = page + 1;

    await getProductList(page).then((res) => {
      if (!res) {
        return;
      }
      if (res.results) {
        setIsLoading(true);
        setProduct([...product, ...res.results]);
        setPage(next);
        setIsLoading(false);
      }
    });
  };

  useEffect(() => {
    if (inView) {
      onLoad();
    }
  }, [inView]);

  return (
    <>
      {product?.map((item) => (
        <ProductItem product={item} key={item.product_id} />
      ))}

      <section className={cx('wrapper')} ref={ref}>
        <h2 className="visually-hidden">load more</h2>
        {inView && isLoading && (
          <div>
            <Image src={'/assets/spinner.svg'} width={50} height={50} alt="loading..." />
          </div>
        )}
      </section>
    </>
  );
};
