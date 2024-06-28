import { CartList } from '@/containers';

import { getCartList, getProductDetail } from '@/actions';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '장바구니',
};

const Cart = async () => {
  const { data: carts } = await getCartList();

  if (!carts) {
    return <div>empty</div>;
  }

  const ids = carts.results.map((v) => v.product_id.toString());

  const detailPromises = ids.map((v: string) => getProductDetail(v));
  const detail = await Promise.all(detailPromises);

  if (!detail) {
    return <div>no data</div>;
  }

  const quantity = carts.results.map((item) => item.quantity);
  const payments = detail.map((item) => ({
    price: Number(item.data?.price),
    shipping: Number(item.data?.shipping_fee),
  }));

  const totalPrice = payments.reduce((sum, item, index) => sum + item.price * quantity[index], 0);
  const totalShippingFee = payments.reduce((sum, item) => sum + item.shipping, 0);

  return (
    <CartList
      carts={carts}
      detail={detail}
      totalPrice={totalPrice}
      totalShippingFee={totalShippingFee}
    />
  );
};

export default Cart;
