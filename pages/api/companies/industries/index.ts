import { getIndustries } from "@/src/services/db/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetIndustriesResponse } from "@/src/types/Company";

type Res = GetIndustriesResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const industries = await getIndustries();
  return res.status(200).json({ items: industries });
};
export default handler;
