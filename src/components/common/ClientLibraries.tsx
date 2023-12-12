import { useEffect } from "react";
import Aos from "aos";

if (typeof window !== "undefined") {
  import("bootstrap");
}

export default function ClientLibraries() {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);
  return <></>;
}
