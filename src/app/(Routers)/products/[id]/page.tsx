import { productManage } from '@/service/productManage';

import { Hydrate, dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/utils/getQueryClient';
import { ProductDetail } from '@/containers';

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  //pre-fetching
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['productDetail'], () =>
    productManage.getProductDetail(productId),
  );
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <ProductDetail productId={productId} />
    </Hydrate>
  );
};

export default ProductDetailPage;
