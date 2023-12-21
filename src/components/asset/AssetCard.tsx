import Image from "next/image";

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
    <div className={`${className}`}>
      <div className="rounded-3 border-1 border-solid border-lightgray transition-0-2-linear p-2 d-flex flex-column align-items-center">
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
        <h4 className="text-dark-color mt-2 fs-4">{title}</h4>
        <p className="text-body-color mt-2 fz16">{text}</p>
      </div>
    </div>
  );
}
