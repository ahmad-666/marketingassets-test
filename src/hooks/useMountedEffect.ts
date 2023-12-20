import { type DependencyList, useEffect, useRef } from "react";

const useMountedEffect = (cb: () => void, deps: DependencyList = []) => {
  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) isMounted.current = true;
    else {
      cb();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
export default useMountedEffect;
