import classNames from "classnames/bind";
import styles from "./products.module.scss";
import axios from "axios";
import { Hydrate, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/utils/getQueryClient";
import ProductList from "./components/ProductList";

const cx = classNames.bind(styles);

const URL = "https://openmarket.weniv.co.kr/products/";

const getProducts = async () => {
  const res = await fetch(URL);
  const data = await res.json();
  return data;
};

export const ProductPage = async () => {
  const queryClient = getQueryClient();
  await queryClient.prefetchInfiniteQuery(["productsList"], getProducts);
  const dehydrateState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydrateState}>
      <ProductList />
    </Hydrate>
  );
};

export default ProductPage;
