import { ParsedUrlQuery } from 'querystring';
import { ShoppingMethod } from './sellerTypes';

interface PostProduct {
  image?: File | string; //이미지 파일(*.jpg, *.gif, *.png),
  product_name: string;
  price: number;
  shipping_method: ShoppingMethod | string;
  shipping_fee: number;
  stock: number;
  product_info: string;
}

interface UpdateProduct extends Omit<PostProduct, 'image'> {}
interface ProductListType extends PostProduct {
  product_id: number;
  created_at: string;
  updated_at: string;
  store_name?: string;
}

interface ProductDataListType {
  count: number;
  next: string | null;
  previous: null;
  results: ProductListType[];
}

interface ProductListParams {
  page: string;
}

interface ProductListParamsWithQuery extends ParsedUrlQuery, ProductListParams {}

export type {
  ProductDataListType,
  PostProduct,
  ProductListType,
  ProductListParams,
  ProductListParamsWithQuery,
  UpdateProduct,
};
