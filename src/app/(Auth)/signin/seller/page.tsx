import { SignIn } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '판매자 로그인',
};

const SellerLogin = async () => {
  return <SignIn type={'SELLER'} />;
};

export default SellerLogin;
