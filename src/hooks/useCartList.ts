import { cartManage } from '@/service';
import { useQuery } from '@tanstack/react-query';

export const useCartList = (token: string) => {
  const getCartList = async (token: string) => {
    return await cartManage.getList(token);
  };

  return useQuery(['cartList'], () => getCartList(token));
};
