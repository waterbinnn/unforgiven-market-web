import { cartManage } from '@/service';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (token: string) => {
  return await cartManage.getList(token);
};

export const useCartList = (token: string) => {
  return useQuery({
    queryKey: ['cartList'],
    queryFn: () => fetchData(token),
  });
};
