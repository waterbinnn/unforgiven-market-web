import { ProductDataListType, ProductListType } from "@/types/productManage";
import axios, { AxiosPromise } from "axios";
/**
 * @name productManage
 * @description 상품 관리 api set 입니다.
 */

interface ProductManage {
  /**
   * @description 전체 상품 리스트 조회
   * @name productManage.getProductList
   * @method {GET}
   * @return {AxiosPromise<ProductDataListType>}
   **/
  // readonly getProductList: (
  //   pageParam: string
  // ) => AxiosPromise<ProductDataListType>;

  /**
   * @description 상품 디테일 조회
   * @name productManage.getProductDetail
   * @method {GET}
   * @return {Promise<ProductListType>}
   **/
  readonly getProductDetail: (id: string) => Promise<ProductListType>;
}

const productManage: ProductManage = {
  // getProductDetail: (id: string) => {
  //   return fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/products/${id}`);
  // },
};

export { productManage };
