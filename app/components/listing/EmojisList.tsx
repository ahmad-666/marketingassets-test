"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { useInfiniteQuery } from "@tanstack/react-query";
import EmojiCard from "@/app/components/cards/EmojiCard";
import SpinnerLoader from "@/app/components/Loaders/SpinnerLoader";
import { getEmojis } from "@/app/services/emoji";
import type { Emoji } from "@/app/types/Emoji";

type EmojisListProps = {
  title: string;
  items: Emoji[];
  totalItems?: number;
  pageSize?: number;
};

export default function EmojisList({
  title,
  items = [],
  totalItems = 0,
  pageSize = 8,
}: EmojisListProps) {
  const { emojiCategoryId } = useParams();
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
    queryKey: ["get-emojis", emojiCategoryId],
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
        emojiCategory: emojiCategoryId as string,
        page: pageParam.page || 1,
        pageSize,
      });
      const newEmojis: Emoji[] = [];
      items.forEach((emoji) => {
        newEmojis.push({
          id: emoji.id,
          category: emoji.parent,
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
    <section>
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
            <div className="row">
              {pages.pages.map((page) =>
                page.map((emoji) => (
                  <EmojiCard
                    className="col-sm-6 col-xl-3"
                    key={emoji.id}
                    id={emoji.id}
                    name={emoji.name}
                    emoji={emoji.emoji}
                    score={emoji.score}
                    usersScore={emoji.usersScore}
                    category={emoji.category}
                  />
                ))
              )}
            </div>
          </div>
        </div>
        {isFetching && <SpinnerLoader className="mt10" />}
        {hasNextPage && (
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
