import Image from "next/image";
import Link from "next/link";
import "./baseCard.scss";

type BaseCardProps = {
  id: string;
  name: string;
  imgSrc: string;
  score: number;
  usersScore: number;
  category: string;
};

export default function BaseCard({
  id,
  name,
  imgSrc,
  score,
  usersScore,
  category,
}: BaseCardProps) {
  return (
    <div className="base-card">
      <div className="car-listing">
        <div className="thumb">
          <div className="tag blue">{category}</div>
          <Image
            width={300}
            height={300}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
            src={imgSrc}
            alt={`${name}-${category}`}
          />
        </div>
        <div className="details">
          <div className="wrapper">
            <h6 className="title">{name}</h6>
            <div className="listign_review">
              <ul className="mb0">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="list-inline-item">
                    <i className="fa fa-star" />
                  </li>
                ))}
                <li className="list-inline-item">{score}</li>
                <li className="list-inline-item">({usersScore} reviews)</li>
              </ul>
            </div>
          </div>
          <div className="listing_footer">
            <Link href={`/emoji/${id}`}>Use {name}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
