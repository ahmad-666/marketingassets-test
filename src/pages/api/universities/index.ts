import { getUniversities } from "@/src/services/db/university";
import { universityDbToResponse } from "@/src/utils/transforms/university";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetUniversitiesResponse } from "@/src/types/University";
import type { ServerError } from "@/src/types/Common";

type Res = GetUniversitiesResponse | ServerError;
const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { page, pageSize, search } = req.query;
    const { count, rows } = await getUniversities({
      page: +page || 1,
      pageSize: +pageSize || null,
      search: search as string,
    });
    return res.status(200).json({
      items: rows.map((row) => ({
        ...universityDbToResponse(row),
      })),
      meta: { totalCount: count },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
