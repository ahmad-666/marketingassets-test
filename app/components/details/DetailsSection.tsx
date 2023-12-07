import Link from "next/link";

type DetailsSectionProps = {
  name: string;
  industry: string;
  className?: string;
};

export default function DetailsSection({
  name,
  industry,
  className = "",
}: DetailsSectionProps) {
  return (
    <div className={`${className}`}>
      <div className="single_page_heading_content">
        <div className="car_single_content_wrapper">
          <ul className="car_info mb20-md">
            <li className="list-inline-item">
              <Link href={`/industries/${industry}`}>{industry}</Link>
            </li>
          </ul>
          <h2 className="title">{name}</h2>
        </div>
      </div>
    </div>
  );
}
