import axios from "@/app/utils/axios";
import type {
  GetEmojiCategoryResponse,
  GetEmojisResponse,
} from "@/app/types/Emoji";

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
