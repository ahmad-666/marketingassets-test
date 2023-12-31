import { getCompany } from "@/src/services/db/company";
import { companyDbToResponse } from "@/src/utils/transforms/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetCompanyResponse } from "@/src/types/Company";
import type { ServerError } from "@/src/types/Common";

type Res = GetCompanyResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { companyId } = req.query;
    const company = await getCompany({ domain: companyId as string });
    if (!company) return res.status(404).json({ message: "company not found" });
    return res.status(200).json({ ...companyDbToResponse(company.dataValues) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
