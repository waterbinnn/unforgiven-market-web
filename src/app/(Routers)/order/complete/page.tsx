import { getOrderList, getProductDetail } from '@/actions';
import { OrderList } from '@/containers';
import { OrderDetailType } from '@/store';
import { OrderListData } from '@/types';

export const page = async () => {
  const { list } = await getOrderList();

  interface NewItem {
    productDetail: OrderDetailType | unknown;
  }

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
    }),
  );

  return <OrderList orderDetails={orderDetails} />;
};

export default page;
