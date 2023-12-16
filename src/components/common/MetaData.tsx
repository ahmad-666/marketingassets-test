import { useMemo } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

type MetaDataProps = {
  baseUrl?: string;
  title?: string;
  description?: string;
  siteName?: string;
  type?: string;
  card?: string;
  image?: string;
};

export default function MetaData({
  baseUrl = process.env.NEXT_PUBLIC_FRONT_BASE_URL, //front-url
  title = "The Ultimate Free Marketing Assets | CUFinder",
  description = "Get all the marketing assets you need to promote your brand with CUFinder. From logos to graphics, we've got you covered. Browse and download now!",
  siteName = "CUFinder Marketing Assets",
  type = "website",
  card = "summery",
  image = `${process.env.NEXT_PUBLIC_FRONT_BASE_URL}/images/logos/logo.png`, //this image is for og:image,... and can be different than favicon
}: MetaDataProps) {
  const router = useRouter();
  const asPath = router.asPath;
  const fullPath = useMemo(() => {
    return `${baseUrl}${asPath}`;
  }, [baseUrl, asPath]);
  return (
    <Head>
      <meta key="charset" charSet="UTF-8" />
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta key="IE=edge" http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta key="ie=edge" http-equiv="X-UA-Compatible" content="ie=edge" />
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:site_name" property="og:site_name" content={siteName} />
      <meta key="og:url" property="og:url" content={fullPath} />
      <meta key="og:image" property="og:image" content={image} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:type" property="og:type" content={type} />
      <meta key="twitter:card" name="twitter:card" content={card} />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:site" name="twitter:site" content={baseUrl} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <link key="canonical" rel="canonical" href={fullPath} />
      <link
        key="icon"
        rel="icon"
        href={`${baseUrl}/images/logos/logo.ico`}
        sizes="16x16"
        type="icon/png"
      />
    </Head>
  );
}
