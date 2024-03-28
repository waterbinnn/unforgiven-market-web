import Loading from '@/app/loading';
import { SignIn } from '@/containers';
import { Suspense } from 'react';

const Login = async () => {
  return (
    <Suspense fallback={<Loading />}>
      <SignIn type={'BUYER'} />
    </Suspense>
  );
};

export default Login;
