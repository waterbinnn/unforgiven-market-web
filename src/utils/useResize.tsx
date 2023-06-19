import { throttle } from "lodash";
import { useEffect, useMemo, useState } from "react";

/**
 * @name useResize
 * @description 리사이즈 이벤트가 일어날때 browserSize 를 리턴하는 함수입니다.
 * @requires {throttle}
 * @param {Object} params - An object.
 * @param {number} params.throttleMs - 쓰로틀 ms *
 * @return { width: number;  height: number;} 현재 브라우저의 사이즈 BrowserSizes
 **/

type BrowserSizeKey = "width" | "height";

type BrowserSizes = {
  [key in BrowserSizeKey]: number;
};

export type { BrowserSizes };

export const useResize: ({
  throttleMs,
}: {
  throttleMs?: number | undefined;
}) => BrowserSizes = ({ throttleMs = 0 }): BrowserSizes => {
  const [browserSize, setBrowserSize] = useState<BrowserSizes>({
    width: 0,
    height: 0,
  });

  const onResize = useMemo(
    () =>
      throttle(() => {
        setBrowserSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, throttleMs),
    [throttleMs]
  );

  useEffect(() => {
    setBrowserSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener("resize", onResize);

    return () => window.removeEventListener("resize", onResize);
  }, [onResize]);

  return browserSize;
};
