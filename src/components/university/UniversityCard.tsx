import Link from "next/link";
import Image from "next/image";
import type { University } from "@/src/types/University";

type UniversityCardProps = University & {
  className?: string;
};

export default function UniversityCard({
  id,
  name,
  imgSrc,
  location,
  className = "",
}: UniversityCardProps) {
  return (
    <div className={`${className}`}>
      <div className="car-listing h-100">
        <div className="thumb">
          <div className="tag blue">
            {location.continent}-{location.country}
          </div>
          <div className="img-container d-flex justify-content-center align-items-center">
            <Image
              src={imgSrc}
              alt={name}
              width={500}
              height={500}
              className="d-block w-auto max-w-100 max-h-100"
              style={{
                height: "120px",
              }}
            />
          </div>
        </div>
        <div className="details">
          <div className="wrapper">
            <h3 className="title">{name}</h3>
          </div>
          <div className="listing_footer">
            <Link href={`/university/${name}`} className="submit-action">
              {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
