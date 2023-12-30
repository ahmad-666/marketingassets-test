import Link from "next/link";
import Image from "next/image";
import type { Company } from "@/src/types/Company";

type CompanyCardProps = Company & {
  className?: string;
};

export default function CompanyCard({
  id,
  domain,
  name,
  imgSrc,
  category,
  className = "",
}: CompanyCardProps) {
  return (
    <div className={`company-card ${className}`}>
      <div className="car-listing h-100">
        <div className="thumb">
          <div className="tag blue">{category}</div>
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
            <Link href={`/logo/${domain}`} className="submit-action">
              Download {name} logo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
