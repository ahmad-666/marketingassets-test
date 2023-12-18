import { useMemo } from "react";
import { useRouter } from "next/router";
import EmojisList from "@/src/components/emoji/EmojisList";
import MetaData from "@/src/components/common/MetaData";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji } from "@/src/types/Emoji";

type PageProps = {
  emojis: Emoji[];
  totalEmojis: number;
  page: number;
};
const pageSize = 8;
const emojiCategoryId = "food-drink-emoji";
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page } = context.query;
    const finalPage = +page || 1;
    const { items: emojis, meta } = await getEmojis({
      category: emojiCategoryId as string,
      page: finalPage,
      pageSize,
    });
    return {
      props: {
        emojis: emojis.map((emoji) => ({
          id: emoji.url,
          categoryValue: emoji.parent,
          categoryText: textNormalize(emoji.parent),
          name: emoji.text,
          emoji: emoji.emoji,
          score: 5,
          usersScore: emoji.score,
        })),
        totalEmojis: meta.totalCount,
        page: finalPage,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({
  emojis = [],
  totalEmojis = 0,
  page = 1,
}: PageProps) {
  const router = useRouter();
  const emojiCategoryText = useMemo(() => {
    return textNormalize(emojiCategoryId);
  }, []);
  return (
    <div>
      <MetaData
        title={`List of all ${emojiCategoryText} | CUFinder`}
        description={`Discover all the ${emojiCategoryText} you need to satisfy your hunger and thirst. From fast food to fine dining, browse our comprehensive list now!`}
      />
      <EmojisList
        title={`List of All ${emojiCategoryText}`}
        items={emojis}
        totalItems={totalEmojis}
        pageSize={pageSize}
        emojiCategoryId={emojiCategoryId}
        page={page}
        showPagination
      />
    </div>
  );
}
