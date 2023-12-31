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
    <div className={`${className}`}>
      <div className="car-listing h-100">
        <div className="thumb">
          <div className="tag blue">{category}</div>
          <div className="d-flex justify-content-center align-items-center">
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
        <div className="p-2 pt-3">
          <div className="pb15">
            <h3 className="fz13">{name}</h3>
          </div>
          <div className="d-flex justify-content-center pt20 border-top border-lightgray2">
            <Link
              href={`/logo/${domain}`}
              className="p-2 text-white rounded-2 bg-primary-dark text-center"
            >
              Download {name} logo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
