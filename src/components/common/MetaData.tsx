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
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={fullPath} />
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta name="twitter:card" content={card} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:site" content={baseUrl} />
      <meta name="twitter:description" content={description} />
      <link rel="canonical" href={fullPath} />
      <link
        rel="icon"
        href={`${baseUrl}/images/logos/logo.ico`}
        sizes="16x16"
        type="icon/png"
      />
    </Head>
  );
}
