import { getCompanies } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCompaniesResponse } from "@/src/types/Company";
import type { ServerError } from "@/src/types/Common";

type Res = GetCompaniesResponse | ServerError;
const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { page, pageSize, industry } = req.query;
    const { count, rows } = await getCompanies({
      page: +page || 1,
      pageSize: +pageSize || null,
      industry: industry as string,
    });
    return res.status(200).json({ items: rows, meta: { totalCount: count } });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
