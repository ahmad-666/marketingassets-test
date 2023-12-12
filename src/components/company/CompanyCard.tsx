import Link from "next/link";
import Image from "next/image";
import styles from "./companyCard.module.scss";
import type { Company } from "@/src/types/Company";

type CompanyCardProps = Company & {
  className?: string;
};

export default function CompanyCard({
  id,
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
          <div
            className={`img-container d-flex justify-content-center align-items-center ${styles["img-container"]}`}
          >
            <Image src={imgSrc} alt={name} width={500} height={500} />
          </div>
        </div>
        <div className="details">
          <div className="wrapper">
            <h6 className="title">{name}</h6>
          </div>
          <div className="listing_footer">
            <Link href={`/logo/${id}`} className="submit-action">
              Download {name} logo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
