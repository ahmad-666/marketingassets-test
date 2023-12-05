import EmojisList from "@/app/components/listing/EmojisList";
import type { Emoji } from "@/app/types/Emoji";
import { getEmojis } from "@/app/services/emoji";

type PageProps = {
  params: {
    emojiId: string;
  };
};
export default async function Page({ params: { emojiId } }: PageProps) {
  //from pages components,... other places in client-side send req to localhost:3000/api , from /api folder get those requests and connect to db and return response
  const emojis: Emoji[] = [];
  const data = await getEmojis({ emojiCategory: emojiId });
  data.forEach((emoji) => {
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
        title={`List of All ${emojiId.replace(/-/g, " ")}`}
        items={emojis}
      />
    </div>
  );
}
