import { getEmoji } from "@/src/services/db/emoji";
import { jsonNormalize } from "@/src/utils/textTransform";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = GetEmojiResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { id } = req.query;
    const emoji = await getEmoji({ emojiId: id as string });
    if (!emoji) return res.status(404).json({ message: "emoji not found" });
    return res.status(200).json({
      ...emoji.dataValues,
      aliases: JSON.parse(jsonNormalize(emoji.aliases)),
      emoji_list: JSON.parse(jsonNormalize(emoji.emoji_list)),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;