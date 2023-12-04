import axios from "@/app/utils/axios";
import type { EmojiResponse } from "@/app/types/Emoji";

type GetEmojis = {
  emojiCategory: string;
  page?: number;
  pageSize?: number;
};
export const getEmojis = async ({
  emojiCategory,
  page = 1,
  pageSize = 8,
}: GetEmojis) => {
  const { data } = await axios.get<EmojiResponse[]>(
    `/emojis/${emojiCategory}`,
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  return data;
};
