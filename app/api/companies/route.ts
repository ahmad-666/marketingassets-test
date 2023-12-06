import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const urlQueries = request.nextUrl.searchParams;
  const industry = urlQueries.get("industry") || undefined;
  const page = +urlQueries.get("page") || 1;
  const pageSize = +urlQueries.get("pageSize") || 8;
  const db = await dbConnect();
  let where = undefined;
  if (industry) {
    where = {
      industry,
    };
  }
  const { count, rows } = await db.Company.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where,
  });
  return Response.json(
    {
      items: rows,
      meta: {
        totalCount: count,
      },
    },
    { status: 200 }
  );
}
