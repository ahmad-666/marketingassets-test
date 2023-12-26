import axios from "@/src/utils/axios";
import type {
  EmojiFilters,
  EmojisFilters,
  GetEmojiResponse,
  GetEmojisResponse,
  GetEmojiCategoriesResponse,
  CommentResponse,
  Comment,
  CommentReqBody,
} from "@/src/types/Emoji";
import { type AxiosResponse } from "axios";

export const getEmoji = async ({ url }: EmojiFilters) => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${url}`);
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
export const addComment = async ({
  emojiId,
  userName,
  userEmail,
  comment,
  rate,
}: Comment) => {
  const { data } = await axios.post<
    CommentResponse,
    AxiosResponse<CommentResponse>,
    CommentReqBody
  >("/emojis/comments", {
    emojiId,
    userName,
    userEmail,
    body: comment,
    rate,
  });
  return data;
};
