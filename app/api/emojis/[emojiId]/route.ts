import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/helper";

export const dynamic = "force-dynamic"; //prevent static route
export async function GET(request: NextRequest, { params }) {
  const { emojiId } = params;
  const urlQueries = request.nextUrl.searchParams;
  const page = +urlQueries.get("page") || 1;
  const pageSize = +urlQueries.get("pageSize") || 8;
  const db = await dbConnect();
  const { count, rows } = await db.Emoji.findAndCountAll({
    offset: (page - 1) * pageSize,
    limit: pageSize,
    where: {
      parent: emojiId,
    },
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

//export const dynamic = "force-dynamic"; //prevent static route
//export const revalidate = 1000
// export async function GET(request: NextRequest, { params }) {
//access to this route via sending GET request to http://localhost:3000/api/emojis/something
//request.method, request.url, request.body, request.nextUrl.href,request.nextUrl.searchParams,request.nextUrl.searchParams.get("name"),request.nextUrl.pathname,params.emojiId
//   const { emojiId } = params;
//   const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await res.json();

//   return Response.json(data,{status,statusText,headers});
//   Response.redirect()
//   Response.error()
//   new Response("error",{status:400})
// }
