import { getOrderList, getProductDetail } from '@/actions';
import { OrderList } from '@/containers';
import { OrderDetailType } from '@/store';
import { OrderListData } from '@/types';

interface NewItem {
  productDetail: OrderDetailType | unknown;
}

const OrderComplete = async () => {
  const { list } = await getOrderList();

  let orderDetails: {
    id: number;
    listData: OrderListData['results'][0];
    productDetail: NewItem[];
  }[] = [];

  await Promise.all(
    list.map(async (item) => {
      const itemData = await Promise.all(
        item.order_items.map(async (orderItem, index) => {
          let newItem = {
            id: orderItem,
            productDetail: {} as OrderDetailType as unknown,
          };

          let { data } = await getProductDetail(String(orderItem));
          newItem.productDetail = { ...data, quantity: item.order_quantity[index] };

          return newItem;
        }),
      );
      orderDetails.push({ id: item.order_number, listData: item, productDetail: itemData });
      orderDetails.sort((a, b) => b.id - a.id);
    }),
  );

  return <OrderList orderDetails={orderDetails} />;
};

export default OrderComplete;
