import { useMemo } from "react";
import { useRouter } from "next/router";
import EmojisList from "@/src/components/emoji/EmojisList";
import MetaData from "@/src/components/common/MetaData";
import SectionContainer from "@/src/components/common/SectionContainer";
import { getEmojis } from "@/src/services/emoji";
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { GetEmojis } from "@/src/types/Emoji";

type PageProps = GetEmojis;
const pageSize = 8;
export const getServerSideProps: GetServerSideProps<PageProps> = async (
  context: GetServerSidePropsContext
) => {
  try {
    const { page, search } = context.query;
    const finalPage = +page || 1;
    const { items, totalCount } = await getEmojis({
      page: finalPage,
      pageSize,
      search: search as string,
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
          items={items}
          totalItems={totalCount}
          pageSize={pageSize}
          page={queries.page}
          search={queries.search}
          showPagination
        />
      </SectionContainer>
    </div>
  );
}
