import UserComment from "@/src/components/details/UserComment";
import type { Comment as EmojiCommentType } from "@/src/types/Emoji";
import type { Comment as CompanyCommentType } from "@/src/types/Company";
import ContentWrapper from "@/src/components/common/ContentWrapper";

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
    <ContentWrapper
      header="H5"
      title="Users Reviews"
      className={`${className}`}
    >
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="py-3 divider-y divider-y-lightgray2">
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
    </ContentWrapper>
  );
}
