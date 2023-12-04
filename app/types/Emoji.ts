export type Emoji = {
  id: number;
  name: string;
  emoji: string;
  score: number;
  usersScore: number;
  category: string;
};
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