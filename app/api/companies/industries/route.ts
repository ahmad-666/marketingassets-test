import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";
import { textTransform } from "@/app/utils/textTransform";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const db = await dbConnect();
  const industries = await db.Company.aggregate("industry", "DISTINCT", {
    plain: false,
  });
  return Response.json(
    {
      items: industries.map((industry) => ({
        industry: industry.DISTINCT,
        text: textTransform(industry.DISTINCT),
      })),
    },
    { status: 200 }
  );
}
