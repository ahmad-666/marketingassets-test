import Header from "./Header";
import Footer from "./Footer";
import ClientLibraries from "@/src/components/common/ClientLibraries";
import ReactQuery from "@/src/providers/ReactQuery";
import { Inter } from "next/font/google";
import type { MenuItems } from "@/src/types/Common";

type LayoutProps = {
  children: React.ReactNode;
  menuItems: MenuItems;
  className?: string;
};
const inter = Inter({ subsets: ["latin"] });
export default function Layout({
  children,
  menuItems = [],
  className = "",
}: LayoutProps) {
  return (
    <div className={`${inter.className} ${className}`}>
      <ClientLibraries />
      <ReactQuery>
        <Header menuItems={menuItems} />
        <main>{children}</main>
        <Footer />
      </ReactQuery>
    </div>
  );
}
