import { getCategories } from "@/src/services/db/emoji";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiCategoriesResponse } from "@/src/types/Emoji";

type Res = GetEmojiCategoriesResponse;
const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  const categories = await getCategories();
  return res.status(200).json({ items: categories });
};
export default handler;
