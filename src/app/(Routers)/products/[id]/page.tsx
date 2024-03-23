import { getProductDetail } from '@/actions';
import { ProductDetail } from '@/containers';

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  const { data: detail } = await getProductDetail(productId);

  if (!detail) {
    return <div>no data</div>;
  }

  return <ProductDetail detail={detail} />;
};

export default ProductDetailPage;
