import { ProductDataListType, ProductListType } from '@/types';

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
   * @return {ProductDataListType}
   **/
  readonly getProductList: (page?: number) => Promise<ProductDataListType>;

  /**
   * @description 상품 디테일 조회
   * @name productManage.getProductDetail
   * @method {GET}
   * @return {ProductListType}
   **/
  readonly getProductDetail: (id: string) => Promise<ProductListType>;
}
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

const productManage: ProductManage = {
  getProductList: async (page?: number) => {
    const res = await fetch(`${baseUrl}products/${page ? `?page=${page}` : ''}`);
    return res.json();
  },
  getProductDetail: async (id: string) => {
    const res = await fetch(`${baseUrl}products/${id}`);
    return res.json();
  },
};

export { productManage };
