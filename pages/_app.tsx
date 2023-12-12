import App, {
  type AppProps,
  type AppInitialProps,
  type AppContext,
} from "next/app";
import Layout from "@/src/components/layout";
import type { MenuItems } from "@/src/types/Common";

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

  return { ...ctx, menuItems: [] };
};
