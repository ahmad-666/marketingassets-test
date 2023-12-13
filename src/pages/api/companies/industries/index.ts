import { getIndustries } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetIndustriesResponse } from "@/src/types/Company";
import type { ServerError } from "@/src/types/Common";

type Res = GetIndustriesResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const industries = await getIndustries();
    return res.status(200).json({
      items: industries.map((industry) => ({
        industry: industry.DISTINCT,
        text: industry.DISTINCT,
      })),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
