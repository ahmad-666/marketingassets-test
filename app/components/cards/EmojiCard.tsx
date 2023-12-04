import Image from "next/image";
import Link from "next/link";
import "./emojiCard.scss";
import type { Emoji } from "@/app/types/Emoji";

type EmojiCardProps = Emoji & React.ComponentProps<"div">;

export default function EmojiCard({
  id,
  name,
  imgSrc,
  score,
  usersScore,
  category,
  className = "",
  ...rest
}: EmojiCardProps) {
  return (
    <div {...rest} className={`emoji-card ${className}`}>
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
