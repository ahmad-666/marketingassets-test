import { addComment } from "@/src/services/db/company";
import { commentDbToResponse } from "@/src/utils/transforms/company";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CommentResponse, CommentReqBody } from "@/src/types/Company";
import type { ServerError } from "@/src/types/Common";

type Res = CommentResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    if (req.method === "OPTIONS") return res.status(200).end();
    else if (req.method === "POST") {
      const { companyId, userName, userEmail, body, rate } =
        req.body as CommentReqBody;
      const newComment = await addComment({
        companyId,
        userName,
        userEmail,
        body,
        rate,
      });
      return res.status(201).json({
        ...commentDbToResponse(newComment),
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
