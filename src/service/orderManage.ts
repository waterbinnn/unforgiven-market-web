import { OrderListData, OneOrderRequest, CartOrderRequest, OrderResult } from '@/types';

import { AxiosPromise } from 'axios';

import { axiosAuth } from './axiosInstance';

interface OrderManage {
  /**
   * 주문 목록 가져오기
   * @name getList
   * @method GET
   * @return {AxiosPromise<OrderListData>}
   */
  readonly getList: () => AxiosPromise<OrderListData>;

  /**
   * 주문 생성하기
   * @name postOrder
   * @method POST
   * @body {OrderRequest}
   * @return {AxiosPromise<OrderResult>}
   */
  readonly postOrder: (data: OneOrderRequest | CartOrderRequest) => AxiosPromise<OrderResult>;
}

export const orderManage: OrderManage = {
  getList: () => {
    return axiosAuth.get(`order/`);
  },
  postOrder: (data: OneOrderRequest | CartOrderRequest) => {
    return axiosAuth.post(`order/`, data);
  },
};
