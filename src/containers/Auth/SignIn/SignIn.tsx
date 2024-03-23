'use client';

import classNames from 'classnames/bind';
import styles from './SignIn.module.scss';
import { Button, Input } from '@/components';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignInReq } from '@/types';
import { signIn } from 'next-auth/react';
import CommonStyle from '../../../styles/authStyle.module.scss';
import { message } from 'antd';

const cx = classNames.bind({ ...styles, ...CommonStyle });

interface Props {
  type: 'BUYER' | 'SELLER';
}

export const SignIn = ({ type }: Props) => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm();

  const handleRouter = (path: string) => {
    router.push(path);
  };

  const onSubmit = async (data: any) => {
    const formData: SignInReq = {
      ...data,
      login_type: type,
    };

    try {
      const res = await signIn('credentials', {
        ...formData,
        redirect: false,
      });

      if (res?.ok) {
        router.push('/');
      }
      if (res?.error === 'CredentialsSignin') {
        setErrorMsg('아이디 혹은 비밀번호가 일치하지 않습니다.');
        setValue('username', '');
        setValue('password', '');
        setError('username', { type: 'custom' }, { shouldFocus: true });
        setError('password', { type: 'custom' });
      }
    } catch (error) {
      message.error('문제가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="container">
      <div className={cx('auth-container')}>
        <main className={cx('auth-inner-container')}>
          <h1 className={cx('visually-hidden')}>{type} Login</h1>

          <form className={cx('auth-wrap')} onSubmit={handleSubmit(onSubmit)}>
            <h3 className={cx('title', 'top')}>{type}</h3>
            <h3 className={cx('title', 'bottom')}>LOGIN</h3>
            <div className={cx('inputs-wrap')}>
              <Input
                placeholder="ID"
                {...register('username', {
                  required: '이 필드는 필수 항목입니다.',
                })}
                error={errors.username ? true : false}
                messageText={errors.username?.message ?? null}
                needMessage
                isInputError={errors.username ? 'error' : 'none'}
              />
              <Input
                placeholder="PASSWORD"
                type="password"
                needMessage
                {...register('password', {
                  required: '이 필드는 필수 항목입니다.',
                })}
                messageText={errors.password?.message ?? null}
                error={errors.password ? true : false}
                isInputError={errors.password ? 'error' : 'none'}
              />
              <span className={cx('error-msg')}>{errorMsg}</span>
            </div>
            <div className={cx('btn-wrap')}>
              <Button color="green" size="m" type="submit">
                Login
              </Button>
            </div>
          </form>
          <button
            type="button"
            className={cx('router-btn')}
            onClick={() => handleRouter(type === 'BUYER' ? '/signin/seller' : '/signin')}
          >
            {type === 'BUYER' ? 'SELLER' : 'BUYER'} LOGIN
          </button>
          <button
            className={cx('router-btn')}
            type="button"
            onClick={() => handleRouter('/signup')}
          >
            SIGN UP
          </button>
        </main>
      </div>
    </div>
  );
};
