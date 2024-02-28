import { getOrderList } from '@/actions';
import { OrderList } from '@/containers';

export const page = async () => {
  const res = await getOrderList();

  return <OrderList />;
};

export default page;
