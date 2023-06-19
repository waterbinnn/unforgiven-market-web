"use client";

import { Count } from "@/components";
import { use, useEffect, useState } from "react";
import classNames from "classnames/bind";

import styles from "../products.module.scss";

const cx = classNames.bind(styles);

interface Props {
  stock: number;
  price: number;
}

export const CountItem = ({ stock, price }: Props) => {
  const [count, setCount] = useState<number>(1);
  const [isMinusDisable, setMinusDisable] = useState<boolean>(false);
  const [isPlusDisable, setPlusDisable] = useState<boolean>(false);

  useEffect(() => {
    if (count === 1) {
      setMinusDisable(true);
    }
  }, [count]);

  const handleMinus = () => {
    if (count === 1) {
      setMinusDisable(true);
    } else {
      setCount(count - 1);
      setMinusDisable(false);
    }
  };

  const handlePlus = () => {
    if (count >= stock) {
      alert("재고가 소진되었습니다.");
      setCount(count - 1);
      setPlusDisable(true);
      setPlusDisable(false);
    } else {
      setCount(count + 1);
      setPlusDisable(false);
      setMinusDisable(false);
    }
  };

  return (
    <div className={cx("count")}>
      <Count
        count={count}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        isMinusDisable={isMinusDisable}
        isPlusDisable={isPlusDisable}
      />
      <div className={cx("total-wrap")}>
        <h3 className={cx("title")}>total</h3>
        <div className={cx("total-num-wrap")}>
          <span className={cx("data-title")}>Total Item</span>
          <strong className={cx("data-num")}>{count}</strong>
        </div>
        <strong className={cx("data-fee")}>
          ￦ {(price * count).toLocaleString()}
        </strong>
      </div>
    </div>
  );
};

export default CountItem;
