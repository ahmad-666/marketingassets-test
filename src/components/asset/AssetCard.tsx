import Image from "next/image";
import styles from "./assetCard.module.scss";

export type AssetCardProps = {
  title: string;
  text: string;
  imgSrc: string;
  className?: string;
};
export default function AssetCard({
  title,
  text,
  imgSrc,
  className = "",
}: AssetCardProps) {
  return (
    <div
      className={`rounded-3 border-1 border-solid border-lightgray2 transition-0-2-linear p-4 d-flex flex-column align-items-center ${styles["asset-card"]} ${className}`}
    >
      <Image
        src={imgSrc}
        alt={title}
        width={200}
        height={200}
        style={{
          width: "60px",
          height: "60px",
        }}
      />
      <h4 className="text-dark-color mt-3 fs-5">{title}</h4>
      <p className="text-body-color mt-3 fz15 text-center fw-bold">{text}</p>
    </div>
  );
}
