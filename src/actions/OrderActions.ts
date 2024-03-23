'use server';

import { orderManage } from '@/service';
import { CartOrderRequest, OneOrderRequest } from '@/types';

const getOrderList = async () => {
  try {
    const res = await orderManage.getList();
    return {
      list: res.data.results,
    };
  } catch (err) {
    return {
      list: [],
    };
  }
};

const postOrder = async (data: OneOrderRequest | CartOrderRequest) => {
  try {
    const res = await orderManage.postOrder(data);
    return {
      res,
      success: true,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
};

export { getOrderList, postOrder };
