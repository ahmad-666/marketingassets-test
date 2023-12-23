import Image from "next/image";
import Divider from "@/src/components/common/Divider";
import styles from "./emojiCategoryCard.module.scss";

export type EmojiCategoryCardProps = {
  title: string;
  text: string;
  imgSrc: string;
  className?: string;
};

export default function EmojiCategoryCard({
  title,
  text,
  imgSrc,
  className = "",
}: EmojiCategoryCardProps) {
  return (
    <div
      className={`rounded-4 border-1 border-solid border-lightgray2 ${styles["emoji-category-card"]} ${className} `}
    >
      <div className="px-3 py-4 px-sm-4 py-sm-6 d-flex justify-content-center align-items-center">
        <Image
          src={imgSrc}
          alt={title}
          width={400}
          height={400}
          className="w-50 h-auto transition-0-2-linear"
        />
      </div>
      <Divider width="100%" height={2} color="gray-lighten2" />
      <div className="p-4">
        <h4 className="fs-5 text-dark-color">{title}</h4>
        <p className="mt-3 fz15 text-gray">{text}</p>
      </div>
    </div>
  );
}
