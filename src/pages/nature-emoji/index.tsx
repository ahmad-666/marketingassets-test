import { useMemo } from "react";
import { useRouter } from "next/router";
import EmojisList from "@/src/components/emoji/EmojisList";
import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { Emoji } from "@/src/types/Emoji";

type PageProps = {
  emojis: Emoji[];
  totalEmojis: number;
};
const pageSize = 8;
const emojiCategoryId = "nature-emoji";
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
          score: 4.9,
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
  const emojiCategoryText = useMemo(() => {
    return textNormalize(emojiCategoryId);
  }, []);
  const queries = useMemo(() => {
    const { page } = router.query;
    return {
      page: +page || 1,
    };
  }, [router.query]);
  return (
    <div>
      <MetaData
        title={`List of all ${emojiCategoryText} | CUFinder`}
        description={`Explore a complete list of ${emojiCategoryText}, including animals, plants, and weather icons. Get in touch with the natural world and express yourself. Browse now!`}
      />
      <SectionContainer>
        <EmojisList
          title={`List of All ${emojiCategoryText}`}
          items={emojis}
          totalItems={totalEmojis}
          pageSize={pageSize}
          emojiCategoryId={emojiCategoryId}
          page={queries.page}
          showPagination
        />
      </SectionContainer>
    </div>
  );
}
