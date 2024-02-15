import { getCartList } from '@/actions/CartListActions';

import { useQuery } from '@tanstack/react-query';

export const useCartList = () => {
  return useQuery(['cartList'], () => getCartList());
};
