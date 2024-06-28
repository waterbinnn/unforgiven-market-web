import { getProductDetail } from '@/actions';
import { ProductDetail } from '@/containers';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Loading from './loading';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export const generateMetadata = (): Metadata => {
  return {
    title: `상품 상세`,
  };
};

const ProductDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();

  const { data: detail, success } = await getProductDetail(productId);

  if (!success) {
    return notFound;
  }

  return (
    <Suspense fallback={<Loading />}>
      <ProductDetail detail={detail ? detail : ([] as any)} />
    </Suspense>
  );
};

export default ProductDetailPage;
