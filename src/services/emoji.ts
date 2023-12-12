import axios from "@/src/utils/axios";
import type {
  GetEmojiArgs,
  GetEmojisArgs,
  GetEmojiResponse,
  GetEmojisResponse,
  GetEmojiCategoriesResponse,
} from "@/src/types/Emoji";

export const getEmoji = async ({ emojiId }: GetEmojiArgs) => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${emojiId}`);
  return data;
};
export const getEmojis = async ({
  urls,
  category,
  page = 1,
  pageSize,
}: GetEmojisArgs) => {
  const { data } = await axios.get<GetEmojisResponse>(`/emojis`, {
    params: {
      urls: urls?.join(","),
      category,
      page,
      pageSize,
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
