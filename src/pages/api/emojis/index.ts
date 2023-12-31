import { getEmojis } from "@/src/services/db/emoji";
import { emojiDbToResponse } from "@/src/utils/transforms/emoji";
import type { GetEmojisResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";
import type { NextApiRequest, NextApiResponse } from "next";

type Res = GetEmojisResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { page, pageSize, category, urls, search } = req.query;
    const { count, rows } = await getEmojis({
      page: +page || 1,
      pageSize: +pageSize || null,
      category: category as string,
      urls: (urls as string)?.split(",") || [],
      search: search as string,
    });
    return res.status(200).json({
      items: rows.map((row) => ({ ...emojiDbToResponse(row.dataValues) })),
      meta: { totalCount: count },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
