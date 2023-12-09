import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, { params }) {
  const { emojiId } = params;
  const db = await dbConnect();
  const emoji = await db.Emoji.findOne({
    where: {
      url: emojiId,
    },
  });
  return Response.json(emoji, { status: 200 });
}
