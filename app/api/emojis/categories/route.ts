import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";
import { textTransform } from "@/app/utils/textTransform";

// export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const db = await dbConnect();
  const categories = await db.Emoji.aggregate("parent", "DISTINCT", {
    plain: false,
  });
  return Response.json(
    {
      items: categories.map((cat) => ({
        category: cat.DISTINCT,
        text: textTransform(cat.DISTINCT),
      })),
    },
    { status: 200 }
  );
}
