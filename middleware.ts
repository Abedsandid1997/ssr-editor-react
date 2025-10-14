import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verfiyAuth } from "./lib/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  console.log(token, "hhhhhhhhhhhhhhhhhhhhhhhh");
  if (!token) {
    return NextResponse.redirect(
      new URL(`/signin?redirect=${req.url}`, req.url)
    );
  }

  const verfiedToken = await verfiyAuth(token).catch((err) => {
    console.log(err);
  });

  if (!verfiedToken) {
    return NextResponse.redirect(
      new URL(`/signin?redirect=${req.url}`, req.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/add", "/edit/:path*"],
};
