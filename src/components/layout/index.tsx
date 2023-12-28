import ClientLibraries from "@/src/components/common/ClientLibraries";
import ReactQuery from "@/src/providers/ReactQuery";
import SnackbarProvider from "@/src/providers/Snackbar";
import HeaderTop from "./HeaderTop";
import HeaderSidebar from "./HeaderSidebar";
import Header from "./Header";
import MobileMenu from "./MobileMenu";
//import Hero from "./Hero";
import Landing from "@/src/components/others/Landing";
import Footer from "./Footer";
import ScrollToTop from "./ScrollTop";
import Container from "@/src/components/common/Container";
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
        <SnackbarProvider>
          <div className="wrapper ovh">
            <div
              className="offcanvas offcanvas-end"
              tabIndex={-1}
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <HeaderSidebar />
            </div>
            <Container>
              <HeaderTop />
              <Header menuItems={menuItems} />
              <MobileMenu menuItems={menuItems} />
              <Landing />
            </Container>
            {/* <Hero /> */}
            <main className="pt-5">{children}</main>
            <Footer />
          </div>
        </SnackbarProvider>
        <ScrollToTop />
      </ReactQuery>
    </div>
  );
}
