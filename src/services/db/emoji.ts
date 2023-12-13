import { Emoji } from "@/src/db/models";
import type {
  EmojiFilters,
  EmojisFilters,
  EmojiDbFilters,
  EmojisDbFilters,
} from "@/src/types/Emoji";

export async function getEmoji({ emojiId }: EmojiFilters) {
  const where: EmojiDbFilters = { url: emojiId };
  const emoji = await Emoji.findOne({
    where,
  });
  return emoji;
}
export async function getEmojis({
  category,
  urls,
  page = 1,
  pageSize,
}: EmojisFilters) {
  let where: EmojisDbFilters = {};
  if (urls) where.url = urls;
  if (category) where.parent = category;
  const { count, rows } = await Emoji.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize || null,
    where,
  });
  return { count, rows };
}
export async function getCategories() {
  const categories = await Emoji.aggregate("parent", "DISTINCT", {
    plain: false,
  });
  return categories as { DISTINCT: string }[];
}
