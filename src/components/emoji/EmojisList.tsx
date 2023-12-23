import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import EmojiCard from "@/src/components/emoji/EmojiCard";
import SpinnerLoader from "@/src/components/common/SpinnerLoader";
import Pagination from "@/src/components/common/Pagination";
import useMountedEffect from "@/src/hooks/useMountedEffect";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { Emoji } from "@/src/types/Emoji";

type EmojisListProps = {
  title: string;
  items: Emoji[];
  totalItems?: number;
  page?: number;
  pageSize?: number;
  search?: string;
  emojiList?: string[];
  emojiCategoryId?: string;
  showPagination?: boolean;
  className?: string;
};
type Query = {
  newPage: number;
};

export default function EmojisList({
  title,
  items = [],
  totalItems = 0,
  page = 1,
  pageSize = 8,
  search,
  showPagination = true,
  emojiList = [],
  emojiCategoryId,
  className = "",
}: EmojisListProps) {
  const router = useRouter();
  const { emojiId } = router.query;
  const [pageVal, setPageVal] = useState(page);
  const containerRef = useRef<HTMLDivElement>(null!);
  const filterUpdated = useRef(false);
  const setUrlQueries = useCallback(
    ({ newPage }: Query) => {
      if (showPagination) {
        router.replace(
          {
            pathname: router.pathname,
            query: {
              ...router.query,
              page: newPage,
            },
          },
          undefined,
          { scroll: false }
        );
      }
    },
    [showPagination, router]
  );
  const changePage = useCallback((newVal: number) => {
    setPageVal(newVal);
    filterUpdated.current = true;
  }, []);
  const scrollToContainer = useCallback(() => {
    if (showPagination) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showPagination]);
  const { isFetching, data: emojis } = useQuery<Emoji[]>({
    refetchOnMount: false,
    enabled: filterUpdated.current,
    initialData: [...items],
    queryKey: [
      "get-emojis",
      emojiCategoryId,
      emojiId,
      emojiList,
      pageVal,
      pageSize,
      search,
    ],
    queryFn: async () => {
      const { items } = await getEmojis({
        category: emojiCategoryId || undefined,
        urls: emojiList,
        page: pageVal || 1,
        pageSize,
        search,
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
      setUrlQueries({ newPage: pageVal });
      scrollToContainer();
      filterUpdated.current = false;
      return newEmojis;
    },
  });
  useMountedEffect(() => {
    setPageVal(1);
    filterUpdated.current = true;
  }, [search]);
  return (
    <section className={`${className}`}>
      <div className="container" ref={containerRef}>
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="main-title text-center text-capitalize">
              <h2>{title}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12" data-aos-delay="100" data-aos="fade-up">
            <div className="row align-items-stretch">
              {emojis.map((emoji) => (
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
              ))}
            </div>
          </div>
        </div>
        {isFetching && <SpinnerLoader className="mt10" />}
        {!!(totalItems && showPagination) && (
          <div className="row mt20">
            <div className="col-lg-12">
              <Pagination
                className="d-flex justify-content-center"
                page={pageVal}
                setPage={changePage}
                totalItems={totalItems}
                pageSize={pageSize}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
