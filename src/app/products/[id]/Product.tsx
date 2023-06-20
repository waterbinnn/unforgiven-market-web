import Image from "next/image";
import React from "react";
import CountItem from "../components/CountItem";
import { Button } from "@/components";

import classNames from "classnames/bind";
import styles from "../products.module.scss";
import { ProductListType } from "@/types";

const cx = classNames.bind(styles);

interface Props {
  data: ProductListType;
}

export const Product = ({ data }: Props) => {
  return (
    <>
      <Image
        src={data.image}
        alt={data.product_name}
        width={500}
        height={500}
        placeholder={"blur"}
        blurDataURL={"/assets/default_img.png"}
        className={cx("image")}
      />

      {/* 상품정보 */}
      <div className={cx("detail-data-container")}>
        <div className={cx("detail-info-wrap")}>
          <span className={cx("store")}>{data.store_name}</span>
          <dl className={cx("info-wrap")}>
            <div className={cx("info-data")}>
              <dt className={cx("visually-hidden")}>data name</dt>
              <dd className={cx("info-name")}>{data.product_name}</dd>
            </div>
            <div className={cx("info-data")}>
              <dt className={cx("info-title")}>Price</dt>
              <dd className={cx("info-price")}>
                ￦ {data.price.toLocaleString()}
              </dd>
            </div>
          </dl>
          <span className={cx("shipping-fee")}>
            {data.shipping_fee > 0
              ? `택배배송/${data.shipping_fee.toLocaleString()}원`
              : "택배배송/무료배송"}
          </span>
        </div>

        {/* 수량 컴포넌트  */}
        <CountItem stock={data.stock} price={data.price} />

        {/* 버튼 섹션  */}
        <div className={cx("button-wrap")}>
          <Button color="yellow" size="l" width="60%">
            ORDER
          </Button>
          <Button color="blue" size="l" width="40%">
            CART
          </Button>
        </div>
      </div>
    </>
  );
};

export default Product;
