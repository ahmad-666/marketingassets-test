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
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page, search } = context.query;
    const finalPage = +page || 1;
    const { items: emojis, meta } = await getEmojis({
      page: finalPage,
      pageSize,
      search: search as string,
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
  const queries = useMemo(() => {
    const { page, search } = router.query;
    return {
      page: +page || 1,
      search: (search as string) || "",
    };
  }, [router.query]);
  return (
    <div>
      <MetaData
        title={`List of all ${queries.search} emojis | CUFinder`}
        description={`Explore a complete list of ${queries.search}, featuring faces, emotions, professions, and activities. Find the perfect emoji to express yourself. Browse now!`}
      />
      <SectionContainer>
        <EmojisList
          title={`List of All ${queries.search} Emojis`}
          items={emojis}
          totalItems={totalEmojis}
          pageSize={pageSize}
          page={queries.page}
          search={queries.search}
          showPagination
        />
      </SectionContainer>
    </div>
  );
}
