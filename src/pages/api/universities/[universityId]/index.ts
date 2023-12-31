import { getUniversity } from "@/src/services/db/university";
import { universityDbToResponse } from "@/src/utils/transforms/university";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetUniversityResponse } from "@/src/types/University";
import type { ServerError } from "@/src/types/Common";

type Res = GetUniversityResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const { universityId } = req.query;
    const university = await getUniversity({ name: universityId as string });
    if (!university)
      return res.status(404).json({ message: "university not found" });
    return res
      .status(200)
      .json({ ...universityDbToResponse(university.dataValues) });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
