'use client';

import { useState } from 'react';
import { Button, ButtonProps } from '../Button';
import { PostCart } from '@/types';
import { ContentsModal } from '../Modal';
import { useRouter } from 'next/navigation';
import { postCart } from '@/actions';
import { useSession } from 'next-auth/react';

interface Props {
  width: string;
  color: ButtonProps['color'];
  req: PostCart;
  disabled: boolean;
  onClick?: () => void;
}

export const AddCartButton = ({ width, req, color, disabled, onClick }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  const handleAddCart = async () => {
    if (!session) {
      setIsLoginModal(true);
    } else {
      await postCart(req);
      await setIsSuccessModal(true);
      onClick && onClick();
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
    </>
  );
};
