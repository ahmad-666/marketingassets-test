import { Op, type WhereOptions } from "sequelize";
import { Emoji } from "@/src/db/models";
import type {
  EmojiFilters,
  EmojisFilters,
  EmojiResponse,
} from "@/src/types/Emoji";

export async function getEmoji({ emojiId }: EmojiFilters) {
  const where: WhereOptions<EmojiResponse> = { url: emojiId };
  const emoji = await Emoji.findOne({
    where,
  });
  return emoji;
}
export async function getEmojis({
  category,
  urls = [],
  page = 1,
  pageSize = null,
  search,
}: EmojisFilters) {
  let where: WhereOptions<EmojiResponse> = {};
  if (urls?.length) where.url = urls;
  if (category) where.parent = category;
  if (search)
    where.text = {
      [Op.substring]: search,
    };
  const { count, rows } = await Emoji.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
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
