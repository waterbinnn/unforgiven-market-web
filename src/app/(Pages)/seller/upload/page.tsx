import { Upload } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '상품 등록 | 판매자센터',
};

const UploadPage = () => {
  return <Upload isEdit={false} />;
};

export default UploadPage;
