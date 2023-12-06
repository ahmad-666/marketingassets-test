import ReactQuery from "@/app/providers/ReactQuery";
import ClientLibraries from "@/app/components/ClientLibraries";
import HeaderTop from "@/app/components/home/home-1/HeaderTop";
import HeaderSidebar from "@/app/components/common/HeaderSidebar";
import Header from "@/app/components/home/home-1/Header";
import MobileMenu from "@/app/components/common/MobileMenu";
import Hero from "@/app/components/home/home-1/Hero";
import Footer from "@/app/components/common/Footer";
import ScrollToTop from "./components/common/ScrollTop";
import { Inter } from "next/font/google";
import { getEmojiCategories } from "@/app/services/emoji";
import type { Item, NestedItem } from "./types/Menu";
import "../public/scss/main.scss";
import "../public/scss/global.scss";

const inter = Inter({ subsets: ["latin"] });
export const dynamic = "force-dynamic"; //ssr
export default async function RootLayout({ children }) {
  // const { items: emojiCategoriesResponse } = await getEmojiCategories();
  // const emojisCategories = emojiCategoriesResponse.map((cat) => ({
  //   label: cat.text,
  //   path: `/${cat.category}`,
  // }));

  const menuItems: (Item | NestedItem)[] = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Emojis",
      subMenu: [],
    },
    {
      label: "Logos",
      path: "/logos",
    },
  ];

  return (
    <html lang="en">
      <body className={inter.className} cz-shortcut-listen="false">
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
            <HeaderTop />
            <Header menuItems={menuItems} />
            <MobileMenu menuItems={menuItems} />
            <Hero />
            {children}
            <Footer />
          </div>
          <ScrollToTop />
        </ReactQuery>
      </body>
    </html>
  );
}
