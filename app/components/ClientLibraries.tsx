"use client";

import { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";

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
