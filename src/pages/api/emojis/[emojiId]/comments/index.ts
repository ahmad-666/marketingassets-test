import { getComments } from "@/src/services/db/emoji";
import { commentDbToResponse } from "@/src/utils/transforms/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCommentsResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = GetCommentsResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { emojiId, page, pageSize } = req.query;
    const { count, rows } = await getComments({
      emojiId: +emojiId,
      page: +page || 1,
      pageSize: +pageSize || null,
    });
    return res
      .status(200)
      .json({
        items: rows.map((row) => ({ ...commentDbToResponse(row) })),
        meta: { totalCount: count },
      });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
