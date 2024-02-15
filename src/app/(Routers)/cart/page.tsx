import { CartList } from '@/containers';
import { getCartList } from '@/actions/CartListActions';

const Cart = async () => {
  const { data } = await getCartList();

  return <CartList data={data} />;
};

export default Cart;
