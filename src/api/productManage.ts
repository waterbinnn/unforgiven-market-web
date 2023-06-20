import { ProductDataListType, ProductListType } from "@/types/productManage";

/**
 * @name productManage
 * @description 상품 관리 api set 입니다.
 */

interface ProductManage {
  /**
   * @description 전체 상품 리스트 조회
   * @name productManage.getProductList
   * @method {GET}
   * @return {ProductDataListType}
   **/
  readonly getProductList: () => Promise<ProductDataListType>;

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
  getProductList: async () => {
    const res = await fetch(`${baseUrl}/products/`);
    return res.json();
  },
  getProductDetail: async (id: string) => {
    const res = await fetch(`${baseUrl}/products/${id}`);
    return res.json();
  },
};

export { productManage };
