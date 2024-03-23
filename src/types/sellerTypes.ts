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
  store_name: string;
  image: string;
  price: number;
  shipping_method: ShoppingMethod;
  shipping_fee: number;
  stock: number;
  products_info: string;
}

export type { SellerListData, SellerListResult, ShoppingMethod };
