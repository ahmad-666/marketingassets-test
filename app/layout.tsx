"use client";

import { useEffect } from "react";
import HeaderTop from "@/app/components/home/home-1/HeaderTop";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import Header from "@/app/components/home/home-1/Header";
import MobileMenu from "@/app/components/common/MobileMenu";
import Hero from "@/app/components/home/home-1/Hero";
import Footer from "@/app/components/common/Footer";
import ScrollToTop from "./components/common/ScrollTop";
import { Inter } from "next/font/google";
import Aos from "aos";
import "aos/dist/aos.css";
import "../public/scss/main.scss";
import "../public/scss/global.scss";

if (typeof window !== "undefined") {
  import("bootstrap");
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  useEffect(() => {
    Aos.init({
      duration: 1200,
    });
  }, []);

  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="false">
        <div className="wrapper ovh">
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <HeaderSidebar />
          </div>
          <HeaderTop />
          <Header />
          <MobileMenu />
          <Hero />
          {children}
          <Footer />
        </div>
        <ScrollToTop />
      </body>
    </html>
  );
}
