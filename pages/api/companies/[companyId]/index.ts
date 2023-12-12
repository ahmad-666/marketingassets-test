import { getCompany } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCompanyResponse } from "@/src/types/Company";

type Res = GetCompanyResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const { companyId } = req.query;
  const company = await getCompany({ companyId: companyId as string });
  return res.status(200).json(company);
};
export default handler;
