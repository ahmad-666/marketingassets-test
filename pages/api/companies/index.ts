import { getCompanies } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCompaniesResponse } from "@/src/types/Company";

type Res = GetCompaniesResponse;
const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const { count, rows } = await getCompanies({
    page: 1,
    pageSize: 8,
    industry: "",
  });
  return res.status(200).json({ items: rows, meta: { totalCount: count } });
};
export default handler;
