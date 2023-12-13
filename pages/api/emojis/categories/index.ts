import { getCategories } from "@/src/services/db/emoji";
import { textNormalize } from "@/src/utils/textTransform";
import type { NextApiRequest, NextApiResponse } from "next";
import type { GetEmojiCategoriesResponse } from "@/src/types/Emoji";
import type { ServerError } from "@/src/types/Common";

type Res = GetEmojiCategoriesResponse | ServerError;
const handler = async (req: NextApiRequest, res: NextApiResponse<Res>) => {
  try {
    const categories = await getCategories();
    return res.status(200).json({
      items: categories.map((cat) => ({
        category: cat.DISTINCT,
        text: textNormalize(cat.DISTINCT),
      })),
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
export default handler;
