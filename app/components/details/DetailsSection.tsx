import Link from "next/link";

type DetailsSectionProps = {
  name: string;
  industry: string;
  className?: string;
};

export default function DetailsSection({
  name,
  industry,
  className,
}: DetailsSectionProps) {
  return (
    <div className={`${className}`}>
      <div className="single_page_heading_content">
        <div className="car_single_content_wrapper">
          <Link href="/" className="list-inline-item">
            {industry}
          </Link>
          <h2 className="title">{name}</h2>
        </div>
      </div>
    </div>
  );
}
