import { useState, useEffect, useCallback } from "react";

const useHover = (ref: React.MutableRefObject<HTMLElement>) => {
  const [isHover, setIsHover] = useState(false);
  const mouseEnterHandler = useCallback(() => {
    setIsHover(true);
  }, []);
  const mouseLeaveHandler = useCallback(() => {
    setIsHover(false);
  }, []);
  useEffect(() => {
    const elm = ref.current;
    if (elm) {
      elm.addEventListener("mouseenter", mouseEnterHandler);
      elm.addEventListener("mouseleave", mouseLeaveHandler);
      return () => {
        elm.removeEventListener("mouseenter", mouseEnterHandler);
        elm.removeEventListener("mouseleave", mouseLeaveHandler);
      };
    }
  }, [ref, mouseEnterHandler, mouseLeaveHandler]);
  return isHover;
};
export default useHover;
