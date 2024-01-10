'use client';
import React, { useState } from 'react';
import { Button, ButtonProps } from '../Button';
import { cartManage } from '@/service';
import { PostCart } from '@/types/cartManage';
import { ContentsModal } from '../Modal';
import { useRouter } from 'next/navigation';

interface Props {
  width: string;
  token: string;
  color: ButtonProps['color'];
  req: PostCart;
  disabled: boolean;
}

export const AddCartButton = ({ width, token, req, color, disabled }: Props) => {
  const router = useRouter();

  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const handleAddCart = async () => {
    if (!token) {
      setIsLoginModal(true);
    } else {
      try {
        const res = await cartManage.postCart(token, req);
        setIsSuccessModal(true);

        /*@ts-ignore */
        if (res.FAIL_message) {
          setIsError(true);
          setIsSuccessModal(false);
          return;
        }
      } catch (err) {
        setIsError(true);
        console.log(err);
      }
    }
  };

  return (
    <>
      <Button
        type={'button'}
        width={width}
        onClick={handleAddCart}
        color={color}
        size={'l'}
        disabled={disabled}
      >
        CART
      </Button>
      {isLoginModal && (
        <ContentsModal
          contents={
            <>
              <p>로그인이 필요합니다.</p>
              <p>로그인 페이지로 이동하시겠습니까?</p>
            </>
          }
          okText={'LOGIN'}
          isInfo={false}
          onOk={() => router.push('/signin')}
          onClose={() => setIsLoginModal(false)}
        />
      )}
      {isSuccessModal && (
        <ContentsModal
          contents={
            <>
              <p>장바구니에 추가되었습니다.</p>
              <p>장바구니로 이동하시겠습니까?</p>
            </>
          }
          okText={'장바구니로 이동'}
          isInfo={false}
          onOk={() => router.push('/cart')}
          onClose={() => setIsSuccessModal(false)}
        />
      )}
      {isError && (
        <ContentsModal
          contents={
            <>
              <p>문제가 발생했습니다. </p>
            </>
          }
          okText={'확인'}
          isInfo={true}
          onOk={() => setIsError(false)}
          onClose={() => setIsError(false)}
        />
      )}
    </>
  );
};
