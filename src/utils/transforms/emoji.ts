import dayjs from "dayjs";
import { jsonNormalize, textNormalize } from "@/src/utils/textTransform";
import type {
  EmojiTableAttribute,
  EmojiResponse,
  Emoji,
  CommentTableAttribute,
  CommentResponse,
  Comment,
} from "@/src/types/Emoji";

export const emojiDbToResponse = (
  emoji: EmojiTableAttribute
): EmojiResponse => {
  return {
    ...emoji,
    aliases: JSON.parse(jsonNormalize(emoji.aliases)),
    emoji_list: JSON.parse(jsonNormalize(emoji.emoji_list)),
  };
};
export const commentDbToResponse = (
  comment: CommentTableAttribute
): CommentResponse => {
  return {
    ...comment,
  };
};
export const emojiResponseToClient = (emoji: EmojiResponse): Emoji => {
  return {
    ...emoji,
    id: emoji.id,
    url: emoji.url,
    emoji: emoji.emoji,
    name: emoji.text,
    categoryText: textNormalize(emoji.parent),
    categoryValue: emoji.parent,
    score: 4.9,
    usersScore: emoji.score,
    description: emoji.description,
    marketing: emoji.marketing,
    mean: emoji.mean,
    response: emoji.response,
    relatedEmojis: emoji.emoji_list,
  };
};
export const commentResponseToClient = (comment: CommentResponse): Comment => {
  return {
    ...comment,
    id: comment.id,
    date: dayjs(comment.createdAt).format("YYYY/MM/DD"),
    userName: comment.userName,
    userEmail: comment.userEmail,
    comment: comment.body,
    rate: comment.rate,
  };
};
