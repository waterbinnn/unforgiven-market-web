import { cartManage } from '@/service';

import { useQuery } from '@tanstack/react-query';

const fetchData = async (token: string) => {
  // const session = await getServerSession(authOptions);
  // const token = session?.token.toString();
  return await cartManage.getList(token);
};

export const useCartList = (token: string) => {
  return useQuery(['cartList'], () => fetchData(token));
};
