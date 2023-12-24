import { useState, useEffect, useCallback } from "react";

const useMediaQuery = (query: string) => {
  const [isMatch, setIsMatch] = useState(false);
  const mediaChangeHandler = useCallback((e: MediaQueryListEvent) => {
    setIsMatch(e.matches);
  }, []);
  useEffect(() => {
    const media = window.matchMedia(query);
    setIsMatch(media.matches);
    media.addEventListener("change", mediaChangeHandler);
    return () => {
      media.removeEventListener("change", mediaChangeHandler);
    };
  }, [query, mediaChangeHandler]);
  return isMatch;
};
export default useMediaQuery;
