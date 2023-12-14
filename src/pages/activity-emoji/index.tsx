import { useRouter } from "next/router";
import EmojisList from "@/src/components/emoji/EmojisList";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji } from "@/src/types/Emoji";

type PageProps = {
  emojis: Emoji[];
  totalEmojis: number;
};
const pageSize = 8;

export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const emojiCategoryId = "activity-emoji";
    const { items: emojis, meta } = await getEmojis({
      category: emojiCategoryId as string,
      page: 1,
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
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({ emojis = [], totalEmojis = 0 }: PageProps) {
  const router = useRouter();
  const emojiCategoryId = "activity-emoji";
  return (
    <div>
      <EmojisList
        title={`List of All ${textNormalize(emojiCategoryId)}`}
        items={emojis}
        totalItems={totalEmojis}
        pageSize={pageSize}
        emojiCategoryId={emojiCategoryId}
      />
    </div>
  );
}
