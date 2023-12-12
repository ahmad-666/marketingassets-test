import { getEmojis } from "@/src/services/db/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojisResponse } from "@/src/types/Emoji";

type Res = GetEmojisResponse;

const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const { count, rows } = await getEmojis({
    page: 1,
    pageSize: 8,
    category: "",
    urls: [],
  });
  return res.status(200).json({ items: rows, meta: { totalCount: count } });
};
export default handler;
