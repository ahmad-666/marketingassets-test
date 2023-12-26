//client-side types
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
export type Comment = {
  emojiId: number;
  userName: string;
  userEmail: string;
  comment: string;
  rate: number;
};
//server-side types
export type EmojiResponse = {
  aliases: string[];
  description: string;
  emoji: string;
  emoji_list: string[];
  id: number;
  internal_links: string[];
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
  meta: {
    totalCount: number;
  };
};
export type GetEmojiCategoriesResponse = {
  items: EmojiCategoryResponse[];
};
export type CommentReqBody = {
  emojiId: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
export type CommentResponse = {
  id: number;
  userName: string;
  userEmail: string;
  body: string;
  rate: number;
};
