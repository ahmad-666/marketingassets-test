import Image from "next/image";

type ImageGalleryProps = {
  name: string;
  imgSrc: string;
  className?: string;
};

export default function ImageGallery({
  name,
  imgSrc,
  className = "",
}: ImageGalleryProps) {
  return (
    <div className={`${className}`}>
      <div className="d-flex justify-content-center align-items-center">
        <Image
          src={imgSrc}
          alt={name}
          width={600}
          height={600}
          style={{
            width: "auto",
            height: "250px",
          }}
        />
      </div>
    </div>
  );
}
