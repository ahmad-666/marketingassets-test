import { getEmoji } from "@/src/services/db/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = GetEmojiResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { emojiId } = req.query;
    const emoji = await getEmoji({ emojiId: emojiId as string });
    return res.status(200).json({
      ...emoji.dataValues,
      aliases: JSON.parse(emoji.aliases.replace(/'/g, '"')),
      emoji_list: JSON.parse(emoji.emoji_list.replace(/'/g, '"')),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
