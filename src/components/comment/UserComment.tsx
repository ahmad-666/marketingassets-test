import Rating from "@/src/components/common/Rating";
import type { Comment as EmojiCommentType } from "@/src/types/Emoji";
import type { Comment as CompanyCommentType } from "@/src/types/Company";
import type { Comment as UniversityCommentType } from "@/src/types/University";

type EmojiComment = { type: "emoji" } & EmojiCommentType;
type CompanyComment = { type: "company" } & CompanyCommentType;
type UniversityComment = { type: "university" } & UniversityCommentType;
type GeneralCommentsProps = { className?: string };
type UserCommentProps = (EmojiComment | CompanyComment | UniversityComment) &
  GeneralCommentsProps;
export default function UserComment(props: UserCommentProps) {
  const { id, type, userName, comment, rate, date, className = "" } = props;
  return (
    <div className={`${className}`}>
      <div>
        <div className="d-flex justify-content-between align-items-start gap-2">
          <div>
            <p className="fz14 text-dark-color fw-bold">{userName}</p>
            <p className="mt-1 fz13 text-gray">{date}</p>
          </div>
          <div>
            <Rating value={rate} readonly size={15} />
          </div>
        </div>
        <div className="mt-3">
          <p className="fz15 text-dark-color">{comment}</p>
        </div>
      </div>
    </div>
  );
}
