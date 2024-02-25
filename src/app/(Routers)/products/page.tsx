import { getProductList } from '@/actions';
import { ProductList } from '@/containers';

const ProductPage = async () => {
  const data = await getProductList(1);

  if (!data) {
    return;
  }
  return <ProductList data={data.results} />;
};

export default ProductPage;
