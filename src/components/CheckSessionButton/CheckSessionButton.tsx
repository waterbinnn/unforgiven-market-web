'use client';

import { useState } from 'react';
import { Button } from '@waterbin/design-system';
import { ContentsModal } from '../Modal';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

interface Props {
  type: 'cart' | 'order';
  color: string;
  disabled: boolean;
  onClick?: () => void;
}

export const CheckSessionButton = ({ type, disabled, color, onClick }: Props) => {
  const router = useRouter();

  const { data: session } = useSession();

  const [isLoginModal, setIsLoginModal] = useState<boolean>(false);
  const [isSuccessModal, setIsSuccessModal] = useState<boolean>(false);

  const handleClick = async () => {
    if (!session) {
      setIsLoginModal(true);
    } else {
      if (type === 'cart') {
        await setIsSuccessModal(true);
      }
      onClick && onClick();
    }
  };

  return (
    <>
      <Button type={'button'} block onClick={handleClick} color={color} disabled={disabled}>
        {type === 'cart' ? 'CART' : 'ORDER'}
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
      {type === 'cart' && isSuccessModal && (
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
