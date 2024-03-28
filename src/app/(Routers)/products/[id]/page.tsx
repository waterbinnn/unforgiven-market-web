import { getProductDetail } from '@/actions';
import { ProductDetail } from '@/containers';
import { notFound } from 'next/navigation';

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  const { data: detail, success } = await getProductDetail(productId);

  if (!success) {
    return notFound;
  }

  return <ProductDetail detail={detail!} />;
};

export default ProductDetailPage;
