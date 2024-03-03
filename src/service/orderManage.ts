import { OrderListData, OneOrderRequest, CartOrderRequest, OrderResult } from '@/types';

interface OrderManage {
  /**
   * 주문 목록 가져오기
   * @name getList
   * @method GET
   * @param {token} JWT token
   * @return {OrderListData}
   */
  readonly getList: (token: string) => Promise<OrderListData>;

  /**
   * 주문 생성하기
   * @name postOrder
   * @method POST
   * @param {token} JWT token
   * @body {OrderRequest}
   * @return {OrderResult}
   */
  readonly postOrder: (
    token: string,
    data: OneOrderRequest | CartOrderRequest,
  ) => Promise<OrderResult>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const orderManage: OrderManage = {
  getList: async (token: string) => {
    const res = await fetch(`${baseUrl}order/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return res.json();
  },

  postOrder: async (token: string, data: OneOrderRequest | CartOrderRequest) => {
    const res = await fetch(`${baseUrl}order/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};
