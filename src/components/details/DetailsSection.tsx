import Link from "next/link";

type DetailsSectionProps = {
  name: string;
  category: string;
  categoryLink: string;
  score?: number;
  usersScore?: number;
  className?: string;
};

export default function DetailsSection({
  name,
  category,
  categoryLink,
  score,
  usersScore,
  className = "",
}: DetailsSectionProps) {
  return (
    <div className={`${className}`}>
      <div className="single_page_heading_content">
        <div className="car_single_content_wrapper">
          <ul className="car_info">
            <li className="list-inline-item">
              <Link href={categoryLink} className="text-capitalize">
                {category}
              </Link>
            </li>
          </ul>
          <h1 className="title text-capitalize">{name}</h1>
          {score && usersScore && (
            <div className="listign_review">
              <ul className="mb0">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-star fs-6" />
                    </a>
                  </li>
                ))}
                <li className="list-inline-item">{score}</li>
                <li className="list-inline-item">({usersScore} reviews)</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
