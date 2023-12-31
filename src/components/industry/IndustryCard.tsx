import Link from "next/link";
import type { Industry } from "@/src/types/Company";

type IndustryCardProps = Industry & {
  className?: string;
};

export default function IndustryCard({
  id,
  name,
  className = "",
}: IndustryCardProps) {
  return (
    <div className={`${className}`}>
      <div className="industry-card bg-white overflow-hidden rounded-2 border border-lightgray2 position-relative p-3 h-100">
        <div className="p-2 pt-3">
          <div className="pb15">
            <h3 className="title text-capitalize text-dark-color font-600 text-center fs-5 lh-base text-break">
              {name}
            </h3>
          </div>
          <div className="d-flex justify-content-center pt20 border-top border-lightgray2">
            <Link
              href={`/industry/${id}`}
              className="p-2 text-white rounded-2 bg-primary-dark text-center"
            >
              View Collection
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
