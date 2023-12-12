import IndustryCard from "./IndustryCard";
import type { Industry } from "@/src/types/Company";

type IndustryListProps = {
  title: string;
  items: Industry[];
  className?: string;
};

export default function IndustriesList({
  title,
  items = [],
  className = "",
}: IndustryListProps) {
  return (
    <div className={`${className}`}>
      <div className="main-title">
        <h3>{title}</h3>
      </div>
      <div
        className="row align-items-stretch"
        data-aos-delay="100"
        data-aos="fade-up"
      >
        {items.map((industry) => (
          <IndustryCard
            className="col-sm-6 col-xl-3 p10"
            key={industry.id}
            id={industry.id}
            name={industry.name}
          />
        ))}
      </div>
    </div>
  );
}
