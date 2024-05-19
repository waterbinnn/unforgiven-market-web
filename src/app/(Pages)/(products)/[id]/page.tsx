import { getProductDetail } from '@/actions';
import { ProductDetail } from '@/containers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';

interface Props {
  params: { id: string };
}

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  const { data: detail, success } = await getProductDetail(productId);

  if (!success) {
    return notFound;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail detail={detail!} />
    </Suspense>
  );
};

export default ProductDetailPage;
