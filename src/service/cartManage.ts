/**
 * @name cartManage
 * @description 장바구니 api set 입니다.
 */

import { CartList, CartResult, PostCart, UpdateCartQuantity } from '@/types/cartManage';

interface CartManage {
  /**
   * @name cartManage.getList 장바구니 목록 조회
   * @param {token} JWT token
   * @method {GET}
   * @return {CartList}
   */
  readonly getList: (token: string) => Promise<CartList>;

  /**
   * @name cartManage.postCart 장바구니 추가
   * @method {POST}
   * @param {token} JWT token
   * @param {PostCart} body type
   * @return {CartResult}
   */
  readonly postCart: (token: string, data: PostCart) => Promise<CartResult>;

  /**
   * @name cartManage.updateCount 장바구니 아이템 수량 수정
   * @method {PUT}
   * @param {token} JWT token
   * @param {cartId} cart_item_id
   * @param {UpdateCartQuantity} body type
   * @return {UpdateCartQuantity}
   */
  readonly updateCount: (
    token: string,
    cartId: number,
    data: UpdateCartQuantity,
  ) => Promise<UpdateCartQuantity>;

  /**
   * @name cartManage.removeCart 장바구니 삭제
   * @method {DELETE}
   * @param {cartId}
   * @param {token} JWT token
   * @return {Promise<any>}
   */
  readonly removeItem: (token: string, cartId: string) => Promise<any>;

  /**
   * @name cartManage.removeCart 장바구니 삭제
   * @method {DELETE}
   * @param {token} JWT token
   * @return {Promise<any>}
   */
  readonly removeCart: (token: string) => Promise<any>;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const cartManage: CartManage = {
  getList: async (token: string) => {
    const res = await fetch(`${baseUrl}cart/`, {
      method: 'GET',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
    return res.json();
  },

  postCart: async (token: string, data: PostCart) => {
    const res = await fetch(`${baseUrl}cart/`, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  removeItem: async (token: string, cartId: string) => {
    await fetch(`${baseUrl}cart/${cartId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },

  removeCart: async (token: string) => {
    await fetch(`${baseUrl}cart/`, {
      method: 'DELETE',
      headers: {
        Authorization: `JWT ${token}`,
      },
    });
  },

  updateCount: async (token: string, cartId: number, data: UpdateCartQuantity) => {
    const res = await fetch(`${baseUrl}cart/${cartId}/`, {
      method: 'PUT',
      headers: {
        Authorization: `JWT ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return res.json();
  },
};

export { cartManage };
