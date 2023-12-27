import { type NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // if (request.method === "OPTIONS") {
  //   //OPTIONS is for preflight request of CORS and we should handle it and for all OPTIONS request we should return response
  //   return NextResponse.json(
  //     {},
  //     {
  //       status: 200,
  //       //headers:{}
  //     }
  //   );
  //   //we can also use: return new NextResponse("", {status: 200,headers:{}});
  // }
  return NextResponse.next();
}

export const config = {
  //matcher: "/api/:path*", //route handlers
};
