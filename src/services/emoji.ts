import axios from "@/src/utils/axios";
import type {
  EmojiFilters,
  EmojisFilters,
  GetEmojiResponse,
  GetEmojisResponse,
  GetEmojiCategoriesResponse,
} from "@/src/types/Emoji";

export const getEmoji = async ({ emojiId }: EmojiFilters) => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${emojiId}`);
  return data;
};
export const getEmojis = async ({
  urls,
  category,
  page = 1,
  pageSize,
  search,
}: EmojisFilters) => {
  const { data } = await axios.get<GetEmojisResponse>(`/emojis`, {
    params: {
      urls: urls?.join(",") || undefined,
      category,
      page,
      pageSize,
      search,
    },
  });
  return data;
};
export const getEmojiCategories = async () => {
  const { data } = await axios.get<GetEmojiCategoriesResponse>(
    "/emojis/categories"
  );
  return data;
};
