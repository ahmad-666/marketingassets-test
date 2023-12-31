import axios from "@/src/utils/axios";
import {
  emojiResponseToClient,
  commentResponseToClient,
} from "@/src/utils/transforms/emoji";
import type {
  EmojiFilters,
  EmojisFilters,
  GetEmojiResponse,
  GetEmojisResponse,
  GetEmojiCategoriesResponse,
  CommentResponse,
  CommentReqBody,
  CommentFilters,
  GetCommentsResponse,
  GetComments,
  GetEmojis,
  Emoji,
} from "@/src/types/Emoji";
import { type AxiosResponse } from "axios";

export const getEmoji = async ({ url }: EmojiFilters): Promise<Emoji> => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${url}`);
  return emojiResponseToClient(data);
};
export const getEmojis = async ({
  urls,
  category,
  page = 1,
  pageSize,
  search,
}: EmojisFilters): Promise<GetEmojis> => {
  const { data } = await axios.get<GetEmojisResponse>(`/emojis`, {
    params: {
      urls: urls?.join(",") || undefined,
      category,
      page,
      pageSize,
      search,
    },
  });
  return {
    items: data.items.map((emoji) => ({
      ...emojiResponseToClient(emoji),
    })),
    totalCount: data.meta.totalCount,
  };
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
  body,
  rate,
}: CommentReqBody) => {
  const { data } = await axios.post<
    CommentResponse,
    AxiosResponse<CommentResponse>,
    CommentReqBody
  >("/emojis/comments", {
    emojiId,
    userName,
    userEmail,
    body,
    rate,
  });
  return commentResponseToClient(data);
};
export const getComments = async ({
  emojiId,
  page = 1,
  pageSize,
}: CommentFilters): Promise<GetComments> => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/emojis/${emojiId}/comments`,
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  return {
    items: data.items.map((comment) => ({
      ...commentResponseToClient(comment),
    })),
    totalCount: data.meta.totalCount,
  };
};
