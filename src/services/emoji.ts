import axios from "@/src/utils/axios";
import dayjs from "dayjs";
import { textNormalize } from "@/src/utils/textTransform";
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

export const getEmoji = async ({ url }: EmojiFilters) => {
  const { data } = await axios.get<GetEmojiResponse>(`/emojis/${url}`);
  const normalizeData: Emoji = {
    id: data.id,
    url: data.url,
    emoji: data.emoji,
    name: data.text,
    categoryText: textNormalize(data.parent),
    categoryValue: data.parent,
    score: 4.9,
    usersScore: data.score,
    description: data.description,
    marketing: data.marketing,
    mean: data.mean,
    response: data.response,
    relatedEmojis: data.emoji_list,
  };
  return normalizeData;
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
  const normalizeData: GetEmojis = {
    items: data.items.map((emoji) => ({
      id: emoji.id,
      url: emoji.url,
      categoryValue: emoji.parent,
      categoryText: textNormalize(emoji.parent),
      name: emoji.text,
      emoji: emoji.emoji,
      score: 4.9,
      usersScore: emoji.score,
    })),
    totalCount: data.meta.totalCount,
  };
  return normalizeData;
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
  return data;
};
export const getComments = async ({
  emojiId,
  page = 1,
  pageSize,
}: CommentFilters) => {
  const { data } = await axios.get<GetCommentsResponse>(
    `/emojis/${emojiId}/comments`,
    {
      params: {
        page,
        pageSize,
      },
    }
  );
  const normalizeData: GetComments = {
    items: data.items.map((comment) => ({
      id: comment.id,
      date: dayjs(comment.createdAt).format("YYYY/MM/DD HH:mm"),
      userName: comment.userName,
      userEmail: comment.userEmail,
      comment: comment.body,
      rate: comment.rate,
    })),
    totalCount: data.meta.totalCount,
  };
  return normalizeData;
};
