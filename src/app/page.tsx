import { getProductList } from '@/actions';
import { ProductList } from '@/containers';
import { notFound } from 'next/navigation';

const Main = async () => {
  const { data, success } = await getProductList(1);

  if (!success) {
    return notFound;
  }

  return <ProductList initialProducts={data?.results!} />;
};

export default Main;
