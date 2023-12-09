import { NextRequest } from "next/server";
import { dbConnect } from "@/app/helper";
import type { GetCompaniesFilters } from "@/app/types/Company";

export const dynamic = "force-dynamic";
export async function GET(request: NextRequest) {
  const urlQueries = request.nextUrl.searchParams;
  const industry = urlQueries.get("industry");
  const page = +urlQueries.get("page") || 1;
  const pageSize = +urlQueries.get("pageSize") || null;
  const db = await dbConnect();
  let where: GetCompaniesFilters = {};
  if (industry) where.industry = industry;
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
