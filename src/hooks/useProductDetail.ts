import { productManage } from '@/service';
import { CartItemType } from '@/types';
import { useQuery } from '@tanstack/react-query';

const fetchData = async (id: string) => {
  return await productManage.getProductDetail(id);
};

export const useProductDetail = (id: string) => {
  return useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => fetchData(id),
  });
};
