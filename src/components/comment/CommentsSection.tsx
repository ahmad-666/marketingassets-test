import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import ContentWrapper from "@/src/components/common/ContentWrapper";
import UserComment from "@/src/components/comment/UserComment";
import Pagination from "@/src/components/common/Pagination";
import SpinnerLoader from "@/src/components/common/SpinnerLoader";
import { getComments as getEmojiComments } from "@/src/services/emoji";
import { getComments as getCompanyComments } from "@/src/services/company";
import type { Comment as EmojiCommentType } from "@/src/types/Emoji";
import type { Comment as CompanyCommentType } from "@/src/types/Company";

type EmojiComment = { type: "emoji" } & {
  comments: EmojiCommentType[];
};
type CompanyComment = { type: "company" } & {
  comments: CompanyCommentType[];
};
type GeneralProps = {
  targetId: number;
  totalComments?: number;
  pageSize?: number;
  className?: string;
};
type CommentsSectionProps = (EmojiComment | CompanyComment) & GeneralProps;
export default function CommentsSection(props: CommentsSectionProps) {
  const {
    type,
    targetId,
    comments = [],
    totalComments = 0,
    pageSize = 5,
    className = "",
  } = props;
  const [page, setPage] = useState(1);
  const changePage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);
  const { isFetching: emojiCommentsLoading, data: emojiComments } = useQuery<
    EmojiCommentType[]
  >({
    refetchOnMount: false,
    queryKey: ["get-emoji-comments", type, targetId, page, pageSize],
    initialData: comments as EmojiCommentType[],
    queryFn: async () => {
      if (type === "emoji") {
        const { items } = await getEmojiComments({
          page,
          pageSize,
          emojiId: targetId,
        });
        return items;
      }
      return [];
    },
  });
  const { isFetching: companyCommentsLoading, data: companyComments } =
    useQuery<CompanyCommentType[]>({
      refetchOnMount: false,
      queryKey: ["get-company-comments", type, targetId, page, pageSize],
      initialData: comments as CompanyCommentType[],
      queryFn: async () => {
        if (type === "company") {
          const { items } = await getCompanyComments({
            page,
            pageSize,
            companyId: targetId,
          });
          return items;
        }
        return [];
      },
    });
  return (
    <ContentWrapper
      header="H5"
      title="Users Reviews"
      className={`${className}`}
    >
      <div>
        <div>
          {type === "emoji" &&
            emojiComments.map((comment) => (
              <UserComment
                key={comment.id}
                className="py-3 divider-y divider-y-lightgray2"
                type={type}
                id={comment.id}
                userName={comment.userName}
                date={comment.date}
                comment={comment.comment}
                rate={comment.rate}
              />
            ))}
          {type === "company" &&
            companyComments.map((comment) => (
              <UserComment
                key={comment.id}
                className="py-3 divider-y divider-y-lightgray2"
                type={type}
                id={comment.id}
                userName={comment.userName}
                date={comment.date}
                comment={comment.comment}
                rate={comment.rate}
              />
            ))}
        </div>
        {(emojiCommentsLoading || companyCommentsLoading) && (
          <SpinnerLoader className="mt20" size={40} />
        )}
        <Pagination
          className="mt20 mx-auto"
          page={page}
          setPage={changePage}
          pageSize={pageSize}
          totalItems={totalComments}
        />
      </div>
    </ContentWrapper>
  );
}
