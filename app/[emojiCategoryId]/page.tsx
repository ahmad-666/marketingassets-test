import EmojisList from "@/app/components/listing/EmojisList";
import type { Emoji } from "@/app/types/Emoji";
import { getEmojis } from "@/app/services/emoji";

type PageProps = {
  params: {
    emojiCategoryId: string;
  };
};
const pageSize = 8;
// export const dynamic = "force-dynamic"; //ssr
export default async function Page({ params: { emojiCategoryId } }: PageProps) {
  //from pages components,... other places in client-side send req to localhost:3000/api , from /api folder get those requests and connect to db and return response
  const emojis: Emoji[] = [];
  const { items, meta } = await getEmojis({
    emojiCategory: emojiCategoryId,
    page: 1,
    pageSize,
  });
  const totalEmojis = meta.totalCount;
  items.forEach((emoji) => {
    emojis.push({
      id: emoji.id,
      category: emoji.parent,
      name: emoji.text,
      emoji: emoji.emoji,
      score: 5,
      usersScore: emoji.score,
    });
  });
  return (
    <div>
      <EmojisList
        title={`List of All ${emojiCategoryId.replace(/-/g, " ")}`}
        items={emojis}
        totalItems={totalEmojis}
        pageSize={pageSize}
      />
    </div>
  );
}
