"use client";

import classNames from "classnames/bind";
import styles from "./Count.module.scss";

const cx = classNames.bind(styles);

interface Props {
  count: number;
  isMinusDisable?: boolean;
  isPlusDisable?: boolean;
  handleMinus: () => void;
  handlePlus: () => void;
}

export const Count = ({
  count,
  handleMinus,
  handlePlus,
  isMinusDisable,
  isPlusDisable,
}: Props) => {
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
