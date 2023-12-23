import ClientLibraries from "@/src/components/common/ClientLibraries";
import ReactQuery from "@/src/providers/ReactQuery";
import HeaderTop from "./HeaderTop";
import HeaderSidebar from "./HeaderSidebar";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
//import Hero from "./Hero";
import Landing from "@/src/components/others/Landing";
import Footer from "./Footer";
import ScrollToTop from "./ScrollTop";
import SectionContainer from "@/src/components/common/SectionContainer";
import type { MenuItems } from "@/src/types/Common";

type LayoutProps = {
  children: React.ReactNode;
  menuItems: MenuItems;
  className?: string;
};

export default function Layout({
  children,
  menuItems = [],
  className = "",
}: LayoutProps) {
  return (
    <div className={`${className}`}>
      <ClientLibraries />
      <ReactQuery>
        <div className="wrapper ovh">
          <div
            className="offcanvas offcanvas-end"
            tabIndex={-1}
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <HeaderSidebar />
          </div>
          <SectionContainer>
            <HeaderTop />
            <Header menuItems={menuItems} />
          </SectionContainer>
          <MobileMenu menuItems={menuItems} />
          {/* <Hero /> */}
          <SectionContainer>
            <Landing />
          </SectionContainer>
          <main className="py-5">{children}</main>
          <Footer />
        </div>
        <ScrollToTop />
      </ReactQuery>
    </div>
  );
}
