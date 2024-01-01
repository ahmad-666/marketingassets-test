import { getComments } from "@/src/services/db/university";
import { commentDbToResponse } from "@/src/utils/transforms/university";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCommentsResponse } from "@/src/types/University";
import type { ServerError } from "@/src/types/Common";

type Res = GetCommentsResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { universityId, page, pageSize } = req.query;
    const { count, rows } = await getComments({
      universityId: +universityId,
      page: +page || 1,
      pageSize: +pageSize || null,
    });
    return res.status(200).json({
      items: rows.map((row) => ({
        ...commentDbToResponse(row.dataValues),
      })),
      meta: { totalCount: count },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
