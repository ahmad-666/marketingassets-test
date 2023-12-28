import { useMemo } from "react";
import { useRouter } from "next/router";
import EmojisList from "@/src/components/emoji/EmojisList";
import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import { getEmojis } from "@/src/services/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { GetEmojis } from "@/src/types/Emoji";

type PageProps = GetEmojis;
const pageSize = 8;
const emojiCategoryId = "flags-emoji";
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page } = context.query;
    const finalPage = +page || 1;
    const { items, totalCount } = await getEmojis({
      category: emojiCategoryId as string,
      page: finalPage,
      pageSize,
    });
    return {
      props: {
        items,
        totalCount,
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};
export default function Page({ items = [], totalCount = 0 }: PageProps) {
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
        description={`Discover a complete list of ${emojiCategoryText} from around the world. Show your patriotism or celebrate cultural diversity with our curated collection. Browse now!`}
      />
      <SectionContainer>
        <EmojisList
          title={`List of All ${emojiCategoryText}`}
          items={items}
          totalItems={totalCount}
          pageSize={pageSize}
          emojiCategoryId={emojiCategoryId}
          page={queries.page}
          showPagination
        />
      </SectionContainer>
    </div>
  );
}
