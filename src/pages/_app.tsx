import App, {
  type AppProps,
  type AppInitialProps,
  type AppContext,
} from "next/app";
import Layout from "@/src/components/layout";
import MetaData from "@/src/components/common/MetaData";
import type { MenuItems } from "@/src/types/Common";
import { Inter } from "next/font/google";
import "aos/dist/aos.css";
// import "swiper/css";
// import "swiper/css/navigation";
import "@/public/scss/main.scss";
import "@/public/scss/global.scss";
import { getEmojiCategories } from "@/src/services/emoji";

type AppOwnProps = { menuItems: MenuItems };
const inter = Inter({ subsets: ["latin"] });
export default function MyApp({
  Component,
  pageProps,
  menuItems = [],
}: AppProps & AppOwnProps) {
  return (
    <Layout className={`${inter.className}`} menuItems={menuItems}>
      <MetaData />
      <Component {...pageProps} />
    </Layout>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  const ctx = await App.getInitialProps(context);
  try {
    //const { items } = await getEmojiCategories();
    return {
      ...ctx,
      menuItems: [
        {
          label: "Home",
          path: "/",
        },
        {
          label: "Emojis",
          subMenu: [
            {
              label: "People Emojis",
              path: "/people-emoji",
            },
            {
              label: "Nature Emojis",
              path: "/nature-emoji",
            },
            {
              label: "Food & Drink Emojis",
              path: "/food-drink-emoji",
            },
            {
              label: "Activity Emojis",
              path: "/activity-emoji",
            },
            {
              label: "Travel & Places Emojis",
              path: "/travel-places-emoji",
            },
            {
              label: "Objects Emojis",
              path: "/objects-emoji",
            },
            {
              label: "Symbols Emojis",
              path: "/symbols-emoji",
            },
            {
              label: "Flags Emojis",
              path: "/flags-emoji",
            },
          ],
          // subMenu: items.map((item) => ({
          //   label: item.text,
          //   path: `/${item.category}`,
          // })),
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
