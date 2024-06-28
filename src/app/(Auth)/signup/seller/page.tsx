import { Register } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '판매자 회원가입',
};

const SellerSignUp = async () => {
  return <Register type={'SELLER'} />;
};

export default SellerSignUp;
