import { LoadingSpinner } from '@/components';
import { SignIn } from '@/containers';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: '구매자 로그인',
};

const Login = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignIn type={'BUYER'} />
    </Suspense>
  );
};

export default Login;
