type ShoppingMethod = 'PARCEL' | 'DELIVERY';

interface CommonListData {
  count: number;
  next: string;
  previous: string;
}

interface SellerListData extends CommonListData {
  results: SellerListResult[];
}

interface SellerListResult {
  product_id: number;
  product_name: string;
  seller: number;
  seller_store: string;
  image: string;
  price: number;
  shipping_method: ShoppingMethod;
  shipping_fee: number;
  stock: number;
  products_info: string;
}

interface PostProduct {
  product_name: string;
  image: string; //이미지 파일(*.jpg, *.gif, *.png),
  price: number;
  shipping_method: ShoppingMethod;
  shipping_fee: number;
  stock: number;
  product_info: string;
}

interface PostProductResult extends SellerListResult {
  created_at: String;
  updated_at: String;
}

interface PostProductResData extends CommonListData {
  results: PostProductResult[];
}

export type {
  SellerListData,
  SellerListResult,
  PostProduct,
  PostProductResult,
  PostProductResData,
};
