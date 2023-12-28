import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import getQueryClient from '@/utils/getQueryClient';
import { cartManage } from '@/service';
import { Hydrate, dehydrate } from '@tanstack/react-query';
import { CartList } from '@/containers';

const Cart = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.token;
  if (!token) {
    return;
  }

  //pre-fetching
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(['cartList'], () => cartManage.getList(token));
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <CartList token={token} />
    </Hydrate>
  );
};

export default Cart;
