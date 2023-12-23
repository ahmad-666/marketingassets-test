import { useMemo } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import AssetFilter from "@/src/components/layout/AssetFilter";
import styles from "./landing.module.scss";

type LandingProps = {
  className?: string;
};
export default function Landing({ className = "" }: LandingProps) {
  const router = useRouter();
  const isHome = useMemo(() => {
    return router.pathname === "/";
  }, [router.pathname]);
  return (
    <div className={`${className}`}>
      <div className="d-flex flex-column-reverse align-items-center flex-lg-row justify-content-lg-between gap-4">
        <div className="flex-grow-1">
          {isHome && (
            <>
              <h1 className="fw-700 fs-1 text-dark-color">
                All things you need for Personalized Marketing Messages
              </h1>
              <p className="text-gray fz16 mt-3">
                Customized Emojis, Logos, Gifs, Stickers, ...
              </p>
            </>
          )}
          <AssetFilter className="mt-5" />
        </div>
        {isHome && (
          <Image
            src="/images/background/banner-main.svg"
            alt="main-banner"
            width={700}
            height={700}
            className={`h-auto flex-shrink-0 ${styles.img}`}
          />
        )}
      </div>
    </div>
  );
}
