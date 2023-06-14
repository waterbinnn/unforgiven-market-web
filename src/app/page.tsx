export const dynamic = "force-dynamic"; // this is the fix of params

import { ProductListType } from "@/types/productManage";
import ProductList from "./products/page";
import { productManage } from "@/api/productManage";
import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export default async function Home() {
  const productList = await productManage.getProductList();
  const { data } = productList;

  const list: ProductListType[] = data.results;

  return <ProductList list={list} />;
}
