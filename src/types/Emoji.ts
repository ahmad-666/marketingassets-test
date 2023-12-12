//client-side types
export type Emoji = {
  id: string;
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
  emojiId: string;
};
export type EmojisFilters = {
  urls?: string[];
  category?: string;
  page?: number;
  pageSize?: number;
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
export type EmojiDbFilters = {
  url: string;
};
export type EmojisDbFilters = {
  parent?: string | string[];
  url?: string | string[];
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
