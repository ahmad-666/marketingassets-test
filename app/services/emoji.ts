import axios from "@/app/utils/axios";
import type {
  GetEmojiCategoryResponse,
  GetEmojisResponse,
  GetEmojiResponse,
} from "@/app/types/Emoji";

type GetEmojis = {
  emojiCategory: string;
  page?: number;
  pageSize?: number;
};
type GetEmoji = {
  emojiId: string;
};
export const getEmojis = async ({
  emojiCategory,
  page = 1,
  pageSize = 8,
}: GetEmojis) => {
  const { data } = await axios.get<GetEmojisResponse>(
    `/emojis/categories/${emojiCategory}`,
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  return data;
};
export const getEmojiCategories = async () => {
  const { data } = await axios.get<GetEmojiCategoryResponse>(
    "/emojis/categories"
  );
  return data;
};
export const getEmoji = async ({ emojiId }: GetEmoji) => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${emojiId}`);
  return data;
};
