import { jsonNormalize } from "@/src/utils/textTransform";
import type {
  EmojiTableAttribute,
  EmojiResponse,
  CommentTableAttribute,
  CommentResponse,
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
