import Link from "next/link";
import LineTitle from "@/src/components/others/LineTitle";
import AssetCard, { type AssetCardProps as AssetType } from "./AssetCard";

type AssetsListProps = {
  className?: string;
};
type Item = Omit<AssetType, "className"> & { link: string };
const items: Item[] = [
  {
    title: "Emoji",
    text: "Enrich your texts with customized emojis.",
    imgSrc: "/images/assets/emoji.svg",
    link: "/emojis",
  },
  {
    title: "Logo",
    text: "Customize your emails with company logos.",
    imgSrc: "/images/assets/logo.svg",
    link: "/logos",
  },
  {
    title: "Gif",
    text: "Enrich your texts with customized Gifs",
    imgSrc: "/images/assets/gif.svg",
    link: "/",
  },
  {
    title: "Stickers",
    text: "Customize your emails with custom generated stickers.",
    imgSrc: "/images/assets/sticker.svg",
    link: "/",
  },
];
export default function AssetsList({ className = "" }: AssetsListProps) {
  return (
    <div className={`${className}`}>
      <LineTitle title="Various type of assets for innovate marketing" />
      <div className="mt-4 row gap-3">
        {items.map((item) => (
          <Link
            key={item.title}
            href={item.link}
            className="col-12 cols-sm-6 col-md-4 col-lg-3"
          >
            <AssetCard
              title={item.title}
              text={item.text}
              imgSrc={item.imgSrc}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
