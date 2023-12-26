import Link from "next/link";
import styles from "./emojiCard.module.scss";
import type { Emoji } from "@/src/types/Emoji";

type EmojiCardProps = Emoji & {
  className?: string;
};

export default function EmojiCard({
  id,
  url,
  name,
  emoji,
  score,
  usersScore,
  categoryValue,
  categoryText,
  className = "",
}: EmojiCardProps) {
  return (
    <div className={`emoji-card ${className}`}>
      <div className="car-listing h-100">
        <div className="thumb">
          <div className="tag blue">{categoryText}</div>
          <div className={`emoji-container ${styles["emoji-container"]}`}>
            {emoji}
          </div>
        </div>
        <div className="details">
          <div className="wrapper">
            <h3 className="title">{name}</h3>
            <div className="listign_review">
              <ul className="mb0">
                {[...Array(5)].map((_, index) => (
                  <li key={index} className="list-inline-item">
                    <a href="#">
                      <i className="fa fa-star" />
                    </a>
                  </li>
                ))}
                <li className="list-inline-item">{score}</li>
                <li className="list-inline-item">({usersScore} reviews)</li>
              </ul>
            </div>
          </div>
          <div className="listing_footer">
            <Link href={`/emoji/${url}`} className="submit-action">
              Use {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
