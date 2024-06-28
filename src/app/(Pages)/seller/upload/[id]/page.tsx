import { getProductDetail } from '@/actions';
import { Upload } from '@/containers';
import { Metadata } from 'next';

export const generateMetadata = (): Metadata => {
  return {
    title: `상품 수정 | 판메자센터`,
  };
};
interface Props {
  params: { id: string };
}

const UploadDetailPage = async ({ params }: Props) => {
  const productId = params.id.toString();
  const { data: detail } = await getProductDetail(productId);
  const isEdit = true;
  return <Upload detail={detail!} productId={productId} isEdit={isEdit} />;
};

export default UploadDetailPage;
