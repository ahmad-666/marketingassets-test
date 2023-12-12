import { getEmoji } from "@/src/services/db/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiResponse } from "@/src/types/Emoji";

type Res = GetEmojiResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const { emojiId } = req.query;
  const emoji = await getEmoji({ emojiId: emojiId as string });
  return res.status(200).json(emoji);
};
export default handler;
