import Image from "next/image";
import Divider from "../common/Divider";

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
    <div className={`${className}`}>
      <div className="rounded-3 border-1 border-solid border-lightgray">
        <div className="p-3 d-flex justify-content-center align-items-center">
          <Image
            src={imgSrc}
            alt={title}
            width={400}
            height={400}
            className="w-75 h-auto"
          />
        </div>
        <Divider width="100%" height={2} color="gray-lighten" />
        <div className="p-3">
          <h4 className="fs-4 text-dark-color">{title}</h4>
          <p className="mt-2 fz16 text-lightgray">{text}</p>
        </div>
      </div>
    </div>
  );
}
