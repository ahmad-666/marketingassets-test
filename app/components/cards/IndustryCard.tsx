import Link from "next/link";
import "./industryCard.style.scss";
import type { Industry } from "@/app/types/Company";

type IndustryCardProps = Industry & Omit<React.ComponentProps<"div">, "id">;

export default function IndustryCard({
  id,
  name,
  className = "",
  ...rest
}: IndustryCardProps) {
  return (
    <div {...rest} className={`industry-card ${className}`}>
      <div className="car-listing h-100">
        <div className="details">
          <div className="wrapper">
            <h6 className="title text-center fs-5 lh-base text-break">
              {name}
            </h6>
          </div>
          <div className="listing_footer">
            <Link href={`/industries/${id}`} className="submit-action">
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
