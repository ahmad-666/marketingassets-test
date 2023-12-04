import EmojisList from "@/app/components/listing/EmojisList";
import axios from "@/app/utils/axios";
import type { Emoji, EmojiResponse } from "@/app/types/Emoji";

type PageProps = {
  params: {
    emojiId: string;
  };
};
export default async function Page({ params: { emojiId } }: PageProps) {
  //from pages components,... other places in client-side send req to localhost:3000/api , from /api folder get those requests and connect to db and return response
  const emojis: Emoji[] = [];
  try {
    const { data } = await axios.get<EmojiResponse[]>(`/emojis/${emojiId}`, {
      params: {
        page: 1,
        pageSize: 8,
      },
    });
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
  } catch (err) {
    throw new Error(err); //will go nearest error.tsx file
    //if we don't have error.tsx file nextjs will show its default popup error
    //beside error.tsx we can create [...not_found] page too
  }
  return (
    <div>
      <EmojisList
        title={`List of All ${emojiId.replace(/-/g, " ")}`}
        items={emojis}
      />
    </div>
  );
}
