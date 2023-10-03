import { ParsedUrlQuery } from 'querystring';

interface ProductListType {
  product_id: number;
  created_at: string;
  updated_at: string;
  product_name: string;
  image: string;
  price: number;
  shipping_method: string;
  shipping_fee: number;
  stock: number;
  products_info: string;
  seller: number;
  store_name: string;
}

interface ProductDataListType {
  count: number;
  next: string;
  previous: null;
  results: ProductListType[];
}

interface ProductListParams {
  page: string;
}

interface ProductListParamsWithQuery extends ParsedUrlQuery, ProductListParams {}

export type { ProductDataListType, ProductListType, ProductListParams, ProductListParamsWithQuery };
