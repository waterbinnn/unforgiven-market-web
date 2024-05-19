import { throttle } from 'lodash';
import { useEffect, useMemo, useState } from 'react';

type BrowserSizeKey = 'width' | 'height';

type BrowserSizes = {
  [key in BrowserSizeKey]: number;
};

export type { BrowserSizes };

export const useResize: ({ throttleMs }: { throttleMs?: number | undefined }) => BrowserSizes = ({
  throttleMs = 0,
}): BrowserSizes => {
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
    [throttleMs],
  );

  useEffect(() => {
    setBrowserSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    window.addEventListener('resize', onResize);

    return () => window.removeEventListener('resize', onResize);
  }, [onResize]);

  return browserSize;
};
