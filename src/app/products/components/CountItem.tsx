"use client";

import { Count } from "@/components";
import { use, useEffect, useState } from "react";

interface Props {
  stock: number;
}

export const CountItem = ({ stock }: Props) => {
  const [count, setCount] = useState<number>(0);
  const [isMinusDisable, setMinusDisable] = useState<boolean>(true);
  const [isPlusDisable, setPlusDisable] = useState<boolean>(false);

  useEffect(() => {
    if (count === 0) {
      setMinusDisable(true);
    }
  }, [count]);

  const handleMinus = () => {
    if (count === 0) {
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
    } else {
      setCount(count + 1);
      setPlusDisable(false);
      setMinusDisable(false);
    }
  };

  return (
    <>
      <Count
        count={count}
        handleMinus={handleMinus}
        handlePlus={handlePlus}
        isMinusDisable={isMinusDisable}
        isPlusDisable={isPlusDisable}
      />
    </>
  );
};

export default CountItem;
