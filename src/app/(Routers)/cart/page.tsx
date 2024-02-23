import { CartList } from '@/containers';

import { getCartList } from '@/actions/CartListActions';
import { getProductDetail } from '@/actions/ProductActions';
import { getServerSession } from 'next-auth';

const Cart = async () => {
  // const { data: carts } = await getCartList();
  const session = await getServerSession();
  if (!session) {
    return;
  }
  const token = session.token;
  // if (!carts) {
  //   return;
  // }
  // const ids = carts.results.map((v) => v.product_id.toString());

  // const detailPromises = ids.map((v: string) => getProductDetail(v));
  // const detail = await Promise.all(detailPromises);

  // return <CartList carts={carts} detail={detail} />;
  return <CartList token={token} />;
};

export default Cart;
