import { Register } from '@/containers';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '구매자 회원가입',
};

const SignUp = async () => {
  return <Register type={'BUYER'} />;
};

export default SignUp;
