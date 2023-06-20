"use client";
import { productManage } from "@/api/productManage";

import classNames from "classnames/bind";
import styles from "../products.module.scss";
import Product from "./Product";
import { useQuery } from "@tanstack/react-query";

const cx = classNames.bind(styles);

interface Props {
  params: { id: string };
}

export const ProductDetail = async ({ params }: Props) => {
  const id = params.id.toString();

  const { isLoading, isError, data } = useQuery(["product"], () =>
    productManage.getProductDetail(id)
  );

  if (isLoading) return <div className="loading">Loading...</div>;

  if (isError) return <div>Error!</div>;

  return (
    <main className={cx("container")}>
      <section className={cx("detail-container")}>
        <h2 className={cx("visually-hidden")}>상품상세페이지</h2>
        <Product data={data} />
      </section>
    </main>
  );
};

export default ProductDetail;
