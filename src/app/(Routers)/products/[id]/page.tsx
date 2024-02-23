import Error from '@/app/error';
import { ProductDetail } from '@/containers';

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  return <ProductDetail productId={productId} />;
};

export default ProductDetailPage;
