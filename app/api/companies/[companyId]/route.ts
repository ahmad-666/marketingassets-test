import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest, { params }) {
  const { companyId } = params;
  const db = await dbConnect();
  const company = await db.Company.findOne({
    where: {
      domain: companyId,
    },
  });
  return Response.json(company, { status: 200 });
}
