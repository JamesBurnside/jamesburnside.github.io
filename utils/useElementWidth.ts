import { RefObject, useEffect, useRef, useState } from "react";

export const useElementWidth = (elementRef: RefObject<HTMLElement>): number | undefined => {
  const [width, setWidth] = useState<number | undefined>(undefined);

  const observer = useRef(
    typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver((entries) => {
      const { width } = entries[0].contentRect;
      setWidth(width);
    })
  );

  useEffect(() => {
    if (elementRef.current) {
      observer.current?.observe(elementRef.current);
    }

    const currentObserver = observer.current;
    return () => {
      currentObserver?.disconnect();
    };
  }, [elementRef, observer]);

  return width;
};
