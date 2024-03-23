/**
 * @name cartManage
 * @description 장바구니 api set 입니다.
 */

import { CartListType, CartResult, PostCart, UpdateCartQuantity } from '@/types';
import { AxiosPromise } from 'axios';

import { axiosAuth } from './axiosServer';

interface CartManage {
  /**
   * @name cartManage.getList 장바구니 목록 조회
   * @method {GET}
   * @return {CartList}
   */
  readonly getList: () => AxiosPromise<CartListType>;

  /**
   * @name cartManage.postCart 장바구니 추가
   * @method {POST}
   * @param {PostCart} body type
   * @return {CartResult}
   */
  readonly postCart: (data: PostCart) => AxiosPromise<CartResult>;

  /**
   * @name cartManage.updateCount 장바구니 아이템 수량 수정
   * @method {PUT}
   * @param {cartId} cart_item_id
   * @param {UpdateCartQuantity} body type
   * @return {UpdateCartQuantity}
   */
  readonly updateCount: (
    cartId: number,
    data: UpdateCartQuantity,
  ) => AxiosPromise<UpdateCartQuantity>;

  /**
   * @name cartManage.removeCart 장바구니 삭제
   * @method {DELETE}
   * @param {cartId}
   * @return {AxiosPromise}
   */
  readonly removeItem: (cartId: string) => AxiosPromise;

  /**
   * @name cartManage.removeCart 장바구니 삭제
   * @method {DELETE}
   * @return {AxiosPromise}
   */
  readonly removeCart: () => AxiosPromise;
}

const cartManage: CartManage = {
  getList: () => {
    return axiosAuth.get(`cart/`);
  },

  postCart: (data: PostCart) => {
    return axiosAuth.post(`cart/`, data);
  },

  removeItem: (cartId: string) => {
    return axiosAuth.delete(`cart/${cartId}`);
  },

  removeCart: () => {
    return axiosAuth.delete(`cart/`);
  },

  updateCount: (cartId: number, data: UpdateCartQuantity) => {
    return axiosAuth.put(`cart/${cartId}/`, data);
  },
};

export { cartManage };
