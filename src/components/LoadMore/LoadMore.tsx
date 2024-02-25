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

let page = 2;

export const LoadMore = () => {
  const { ref, inView } = useInView();
  const [item, setItem] = useState<ProductListType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (inView) {
      getProductList(page).then((res) => {
        if (!res) {
          return;
        }
        if (res.results) {
          setIsLoading(true);
          setItem([...item, ...res.results]);
          page++;
          setIsLoading(false);
        }
      });
    }
  }, [inView, page, isLoading]);

  return (
    <>
      {item?.map((item, index) => (
        <ProductItem product={item} key={`item-${index}`} />
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
