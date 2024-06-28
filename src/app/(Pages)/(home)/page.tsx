import { getProductList } from '@/actions';
import { ProductList } from '@/containers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';

const ProductPage = async () => {
  const { data, success } = await getProductList();

  if (!success) {
    return notFound;
  }

  return (
    <Suspense fallback={<Loading />}>
      {<ProductList initialProducts={data ? data.results : []} />}
    </Suspense>
  );
};

export default ProductPage;
