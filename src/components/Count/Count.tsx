"use client";

import classNames from "classnames/bind";
import styles from "./Count.module.scss";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const cx = classNames.bind(styles);

interface Props {
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
  stock: number;
}

export const Count = ({ count, setCount, stock }: Props) => {
  const [isMinusDisable, setMinusDisable] = useState<boolean>(false);
  const [isPlusDisable, setPlusDisable] = useState<boolean>(false);

  useEffect(() => {
    if (count === 1 || count === 0 || stock === 0) {
      setMinusDisable(true);
    }
  }, [count]);

  const handleMinus = () => {
    if (count === 1) {
      setMinusDisable(true);
    } else {
      if (count === 0) {
        return;
      }
      setCount(count - 1);
      setMinusDisable(false);
    }
  };

  const handlePlus = () => {
    if (count >= stock) {
      alert("재고가 소진되었습니다.");
      if (count === 0) {
        return;
      }
      setCount(stock === 1 ? count : count - 1);
      setPlusDisable(true);
      setPlusDisable(false);
    } else {
      setCount(count + 1);
      setPlusDisable(false);
      setMinusDisable(false);
    }
  };

  return (
    <div className={cx("count-wrap")}>
      <button type="button" onClick={handleMinus} disabled={isMinusDisable}>
        <img
          src="/assets/icon-minus.svg"
          alt="minus"
          className={cx("count-icon")}
        />
      </button>
      <strong className={cx("count-text")}>{count}</strong>
      <button type="button" onClick={handlePlus} disabled={isPlusDisable}>
        <img
          src="/assets/icon-plus.svg"
          alt="plus"
          className={cx("count-icon")}
        />
      </button>
    </div>
  );
};
