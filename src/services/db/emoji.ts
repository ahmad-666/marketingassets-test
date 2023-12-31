import { Op, type WhereOptions } from "sequelize";
import { Emoji, EmojiComment } from "@/src/db/models";
import type {
  EmojiFilters,
  EmojisFilters,
  EmojiTableAttribute,
  CommentReqBody,
  CommentResponse,
  CommentFilters,
} from "@/src/types/Emoji";

export async function getEmoji({ url }: EmojiFilters) {
  const where: WhereOptions<EmojiTableAttribute> = { url };
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
  let where: WhereOptions<EmojiTableAttribute> = {};
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
export async function addComment({
  emojiId,
  userName,
  userEmail,
  body,
  rate,
}: CommentReqBody) {
  const newComment = await EmojiComment.create({
    emojiId,
    userName,
    userEmail,
    body,
    rate,
  });
  return newComment;
}
export async function getComments({
  emojiId,
  page = 1,
  pageSize = null,
}: CommentFilters) {
  let where: WhereOptions<CommentResponse> = {};
  if (emojiId) where.emojiId = emojiId;
  const { count, rows } = await EmojiComment.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
    order: [["createdAt", "DESC"]],
  });
  return { count, rows };
}
