import UserComment from "@/src/components/details/UserComment";
import type { Comment as EmojiCommentType } from "@/src/types/Emoji";
import type { Comment as CompanyCommentType } from "@/src/types/Company";

type EmojiComment = { type: "emoji" } & {
  comments: Omit<EmojiCommentType, "userEmail">[];
};
type CompanyComment = { type: "company" } & {
  comments: Omit<CompanyCommentType, "userEmail">[];
};
type GeneralProps = {
  totalComments?: number;
  pageSize?: number;
  className?: string;
};
type CommentsSectionProps = (EmojiComment | CompanyComment) & GeneralProps;
export default function CommentsSection(props: CommentsSectionProps) {
  const {
    type,
    comments = [],
    totalComments = 0,
    pageSize = 5,
    className = "",
  } = props;
  return (
    <div className={`${className}`}>
      <div className={`listing_single_description`}>
        <h4 className="fs-6">Users Reviews</h4>
        <div className="mt30">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="py-3 divider-y divider-y-lightgray2"
            >
              <UserComment
                type={type}
                id={comment.id}
                userName={comment.userName}
                date={comment.date}
                comment={comment.comment}
                rate={comment.rate}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
