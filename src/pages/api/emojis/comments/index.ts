import { addComment } from "@/src/services/db/emoji";
import { commentDbToResponse } from "@/src/utils/transforms/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { CommentResponse, CommentReqBody } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = CommentResponse | ServerError;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    if (req.method === "OPTIONS") return res.status(200).end();
    else if (req.method === "POST") {
      const { emojiId, userName, userEmail, body, rate } =
        req.body as CommentReqBody;
      const newComment = await addComment({
        emojiId,
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
