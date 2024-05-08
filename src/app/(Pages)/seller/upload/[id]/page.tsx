import { getProductDetail } from '@/actions';
import { Upload } from '@/containers';

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
