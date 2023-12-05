import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const db = await dbConnect();
  const categories = await db.Emoji.aggregate("parent", "DISTINCT", {
    plain: false,
  });
  return Response.json(
    {
      items: categories.map((cat) => ({
        category: cat.DISTINCT,
        text: cat.DISTINCT.replace(/-/g, " ")
          .split(" ")
          .map((word) => `${word[0].toUpperCase()}${word.substr(1)}`)
          .join(" "),
      })),
    },
    { status: 200 }
  );
}
