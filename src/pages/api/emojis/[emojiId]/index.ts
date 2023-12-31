import { getEmoji } from "@/src/services/db/emoji";
import { emojiDbToResponse } from "@/src/utils/transforms/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = GetEmojiResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { emojiId } = req.query;
    const emoji = await getEmoji({ url: emojiId as string });
    if (!emoji) return res.status(404).json({ message: "emoji not found" });
    return res.status(200).json({
      ...emojiDbToResponse(emoji.dataValues),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
