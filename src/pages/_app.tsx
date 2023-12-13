import App, {
  type AppProps,
  type AppInitialProps,
  type AppContext,
} from "next/app";
import Layout from "@/src/components/layout";
import type { MenuItems } from "@/src/types/Common";
import "aos/dist/aos.css";
// import "swiper/css";
// import "swiper/css/navigation";
import "@/public/scss/main.scss";
import "@/public/scss/global.scss";
import { getEmojiCategories } from "@/src/services/emoji";

type AppOwnProps = { menuItems: MenuItems };
export default function MyApp({
  Component,
  pageProps,
  menuItems = [],
}: AppProps & AppOwnProps) {
  return (
    <Layout menuItems={menuItems}>
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  try {
    const { items } = await getEmojiCategories();
    return {
      ...ctx,
      menuItems: [
        {
          label: "Home",
          path: "/",
        },
        {
          label: "Emojis",
          subMenu: items.map((item) => ({
            label: item.text,
            path: `/${item.category}`,
          })),
        },
        {
          label: "Logos",
          path: "/logos",
        },
      ],
    };
  } catch (err) {
    return { ...ctx, menuItems: [] };
  }
};
