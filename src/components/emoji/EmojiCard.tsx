import Link from "next/link";
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
    <div className={`${className}`}>
      <div className="card-with-filter1 bg-white rounded-2 border border-lightgray2 position-relative p-3 h-100">
        <div className="filter1 overflow-hidden rounded-2 position-relative">
          <div
            className="bg-primary-dark rounded-4 text-white fz9 font-600 text-uppercase py-2 px-3 position-absolute z-1"
            style={{
              left: "10px",
              top: "6px",
            }}
          >
            {categoryText}
          </div>
          <div className="text-center" style={{ fontSize: "80px" }}>
            {emoji}
          </div>
        </div>
        <div className="p-2 pt-3">
          <div className="pb15">
            <h3 className="fz13">{name}</h3>
            <ul className="mb0 mt-1">
              {[...Array(5)].map((_, index) => (
                <li key={index} className="d-inline-block me-1">
                  <a href="#" className="fz10 text-primary-color">
                    <i className="fa fa-star" />
                  </a>
                </li>
              ))}
              <li className="d-inline-block me-1 fz14">{score}</li>
              <li className="d-inline-block me-1 fz14">
                ({usersScore} reviews)
              </li>
            </ul>
          </div>
          <div className="d-flex justify-content-center pt20 border-top border-lightgray2">
            <Link
              href={`/emoji/${url}`}
              className="p-2 text-white rounded-2 bg-primary-dark text-center"
            >
              Use {name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
