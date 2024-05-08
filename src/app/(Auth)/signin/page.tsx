import { LoadingSpinner } from '@/components';
import { SignIn } from '@/containers';
import { Suspense } from 'react';

const Login = async () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SignIn type={'BUYER'} />
    </Suspense>
  );
};

export default Login;
