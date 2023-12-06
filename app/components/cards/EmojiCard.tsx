import Link from "next/link";
import "./emojiCard.style.scss";
import type { Emoji } from "@/app/types/Emoji";

type EmojiCardProps = Emoji & Omit<React.ComponentProps<"div">, "id">;

export default function EmojiCard({
  id,
  name,
  emoji,
  score,
  usersScore,
  category,
  className = "",
  ...rest
}: EmojiCardProps) {
  return (
    <div {...rest} className={`emoji-card ${className}`}>
      <div className="car-listing h-100">
        <div className="thumb">
          <div className="tag blue">{category}</div>
          <div className="emoji-container">{emoji}</div>
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
            <Link href={`/emoji/${id}`} className="submit-action">
              Use {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
