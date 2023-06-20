"use client";

import { Count } from "@/components";
import { useState } from "react";
import classNames from "classnames/bind";

import styles from "../products.module.scss";

const cx = classNames.bind(styles);

interface Props {
  stock: number;
  price: number;
}

export const CountItem = ({ stock, price }: Props) => {
  const [count, setCount] = useState<number>(1);

  return (
    <div className={cx("count")}>
      <Count count={count} setCount={setCount} stock={stock} />
      <div className={cx("total-wrap")}>
        <h3 className={cx("title")}>total</h3>
        <div className={cx("total-num-wrap")}>
          <span className={cx("data-title")}>Total Item</span>
          <strong className={cx("data-num")}>{count}</strong>
        </div>
        <strong className={cx("data-fee")}>
          ￦ {(price * count).toLocaleString("ko-KR")}
        </strong>
      </div>
    </div>
  );
};

export default CountItem;
