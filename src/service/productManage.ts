import { PostProduct, ProductDataListType, ProductListType, UpdateProduct } from '@/types';
import axios, { AxiosPromise } from 'axios';
import { axiosAuth } from './axiosServer';

/**
 * @name productManage
 * @description 상품 관리 api set 입니다.
 */

interface ProductManage {
  /**
   * @description 전체 상품 리스트 조회
   * @name productManage.getProductList
   * @method {GET}
   * @param {page} string
   * @return {AxiosPromise<ProductDataListType>}
   **/
  readonly getProductList: (page?: number) => AxiosPromise<ProductDataListType>;

  /**
   * @description 상품 디테일 조회
   * @name productManage.getProductDetail
   * @method {GET}
   * @return {AxiosPromise<ProductListType>}
   **/
  readonly getProductDetail: (id: string) => AxiosPromise<ProductListType>;

  /**
   * @description 상품 등록 - 판매자
   * @name productManage.postProduct
   * @method {POST}
   * @body {PostProduct} PostProduct
   * @param {token} string
   * @return {AxiosPromise<ProductDataListType>}
   **/
  readonly postProduct: (data: PostProduct, token: String) => AxiosPromise<ProductDataListType>;

  /**
   * @description 상품 수정 - 판매자
   * @name productManage.updateProduct
   * @method {PUT}
   * @body {UpdateProduct} UpdateProduct
   * @param {id} string
   * @param {token} string
   * @return {AxiosPromise<ProductDataListType>}
   **/
  readonly updateProduct: (
    data: UpdateProduct,
    id: string,
    token: String,
  ) => AxiosPromise<ProductDataListType>;

  /**
   * @description 상품 디테일 조회
   * @name productManage.deleteProduct
   * @method {DELETE}
   * @param {id} number
   * @return {AxiosPromise}
   **/
  readonly deleteProduct: (id: number) => AxiosPromise;
}

const productManage: ProductManage = {
  getProductList: (page?: number) => {
    return axiosAuth.get(`products/${page ? `?page=${page}` : ''}`);
  },
  getProductDetail: (id: string) => {
    return axiosAuth.get(`products/${id}`);
  },

  //only seller
  postProduct: (data: PostProduct, token: String) => {
    return axios.post(`${process.env.NEXT_PUBLIC_API_URL}products/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${token}`,
      },
    });
  },
  updateProduct: (data: UpdateProduct, id: string, token: String) => {
    return axios.put(`${process.env.NEXT_PUBLIC_API_URL}products/${id}/`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${token}`,
      },
    });
  },
  deleteProduct: (id: number) => {
    return axiosAuth.delete(`products/${id}`);
  },
};

export { productManage };
