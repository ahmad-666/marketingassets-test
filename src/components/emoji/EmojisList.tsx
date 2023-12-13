import { useMemo } from "react";
import { useRouter } from "next/router";
import { useInfiniteQuery } from "@tanstack/react-query";
import EmojiCard from "./EmojiCard";
import SpinnerLoader from "@/src/components/loaders/SpinnerLoader";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { Emoji } from "@/src/types/Emoji";

type EmojisListProps = {
  title: string;
  items: Emoji[];
  totalItems?: number;
  pageSize?: number;
  emojiList?: string[];
  showMore?: boolean;
  className?: string;
};

export default function EmojisList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
  showMore = true,
  emojiList = [],
  className = "",
}: EmojisListProps) {
  const router = useRouter();
  const { emojiCategoryId, emojiId } = router.query;
  const totalPages = useMemo(() => {
    return Math.ceil(totalItems / pageSize);
  }, [pageSize, totalItems]);
  const {
    isFetching,
    data: pages,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    initialData: { pages: [[...items]], pageParams: [{ page: 1 }] },
    refetchOnMount: false,
    queryKey: ["get-emojis", emojiCategoryId, emojiId, pageSize],
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      const currentPage = lastPageParam.page;
      if (currentPage === totalPages) return null; //no next-page
      return {
        page: currentPage + 1,
      };
    },
    initialPageParam: {
      page: 1,
    },
    queryFn: async ({ pageParam }) => {
      const { items } = await getEmojis({
        category: emojiCategoryId as string,
        urls: emojiList,
        page: pageParam.page || 1,
        pageSize,
      });
      const newEmojis: Emoji[] = [];
      items.forEach((emoji) => {
        newEmojis.push({
          id: emoji.url,
          categoryValue: emoji.parent,
          categoryText: textNormalize(emoji.parent),
          name: emoji.text,
          emoji: emoji.emoji,
          score: 5,
          usersScore: emoji.score,
        });
      });
      return newEmojis;
    },
  });
  return (
    <section className={`${className}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos-delay="100" data-aos="fade-up">
            <div className="row align-items-stretch">
              {pages.pages.map((page) =>
                page.map((emoji) => (
                  <EmojiCard
                    className="col-sm-6 col-xl-3 p10"
                    key={emoji.id}
                    id={emoji.id}
                    name={emoji.name}
                    emoji={emoji.emoji}
                    score={emoji.score}
                    usersScore={emoji.usersScore}
                    categoryValue={emoji.categoryValue}
                    categoryText={emoji.categoryText}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {isFetching && <SpinnerLoader className="mt10" />}
        {showMore && hasNextPage && (
          <div className="row mt20">
            <div className="col-lg-12">
              <div className="text-center">
                <button
                  className="btn more_listing"
                  onClick={() => {
                    fetchNextPage();
                  }}
                >
                  Show More
                  <span className="icon">
                    <span className="fas fa-plus" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
