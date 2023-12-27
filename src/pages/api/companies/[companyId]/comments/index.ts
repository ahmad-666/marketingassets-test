import { getComments } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCommentsResponse } from "@/src/types/Company";
import type { ServerError } from "@/src/types/Common";

type Res = GetCommentsResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { companyId, page, pageSize } = req.query;
    const { count, rows } = await getComments({
      companyId: +companyId,
      page: +page || 1,
      pageSize: +pageSize || null,
    });
    return res.status(200).json({ items: rows, meta: { totalCount: count } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
