import { type Optional } from "sequelize";
import type { ServerMeta } from "./Common";

//Emoji
export type Emoji = {
  id: number;
  url: string;
  name: string;
  emoji: string;
  score: number;
  usersScore: number;
  categoryValue: string;
  categoryText: string;
  description?: string;
  marketing?: string;
  mean?: string;
  response?: string;
  relatedEmojis?: string[];
};
export type GetEmojis = {
  items: Emoji[];
  totalCount: number;
};
export type EmojiFilters = {
  url: string;
};
export type EmojisFilters = {
  urls?: string[];
  category?: string;
  page?: number;
  pageSize?: number;
  search?: string;
};
export type EmojiResponse = {
  aliases: string[];
  description: string;
  emoji: string;
  emoji_list: string[];
  id: number;
  internal_links: string;
  marketing: string;
  mean: string;
  parent: string;
  response: string;
  text: string;
  url: string;
  score: number;
};
export type EmojiCategoryResponse = {
  category: string;
  text: string;
};
export type GetEmojiResponse = EmojiResponse;
export type GetEmojisResponse = {
  items: EmojiResponse[];
} & ServerMeta;
export type GetEmojiCategoriesResponse = {
  items: EmojiCategoryResponse[];
};
export type EmojiTableAttribute = {
  id: number;
  parent: string;
  emoji: string;
  text: string;
  description: string;
  response: string;
  mean: string;
  marketing: string;
  url: string;
  emoji_list: string;
  aliases: string;
  internal_links: string;
  score: number;
};
export type EmojiTableCreationAttribute = Optional<EmojiTableAttribute, "id">;
//Emoji Comment
export type Comment = {
  id: number;
  date: string;
  userName: string;
  userEmail?: string;
  comment: string;
  rate: number;
};
export type GetComments = {
  items: Comment[];
  totalCount: number;
};
export type CommentFilters = {
  emojiId: number;
  page?: number;
  pageSize?: number;
};
export type CommentReqBody = {
  emojiId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type CommentResponse = {
  id: number; //commentId
  createdAt: Date;
  updatedAt: Date;
  emojiId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type GetCommentsResponse = {
  items: CommentResponse[];
} & ServerMeta;
export type CommentTableAttribute = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
  emojiId: number;
};
export type CommentTableCreationAttribute = Optional<
  CommentTableAttribute,
  "id" | "createdAt" | "updatedAt"
>;
