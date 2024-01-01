import { addComment } from "@/src/services/db/university";
import { commentDbToResponse } from "@/src/utils/transforms/university";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CommentResponse, CommentReqBody } from "@/src/types/University";
import type { ServerError } from "@/src/types/Common";

type Res = CommentResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    if (req.method === "OPTIONS") return res.status(200).end();
    else if (req.method === "POST") {
      const { universityId, userName, userEmail, body, rate } =
        req.body as CommentReqBody;
      const newComment = await addComment({
        universityId,
        userName,
        userEmail,
        body,
        rate,
      });
      return res.status(201).json({
        ...commentDbToResponse(newComment.dataValues),
      });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
