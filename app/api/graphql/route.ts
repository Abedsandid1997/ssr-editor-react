// app/api/graphql/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text(); // GraphQL-body (JSON)
    const token = req.cookies.get("token")?.value;

    const backendRes = await fetch(
      "https://jsramverk-absn23-d0fkedcwghb0hab0.northeurope-01.azurewebsites.net/graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: token ? `token=${token}` : "",
        },
        body,
        credentials: "include",
      }
    );

    const text = await backendRes.text();
    const res = new NextResponse(text, { status: backendRes.status });

    const setCookie = backendRes.headers.get("set-cookie");
    if (setCookie) {
      const cleaned = setCookie.replace(/Domain=[^;]+;/, "");
      res.headers.set("set-cookie", cleaned);
    }

    return res;
  } catch (err) {
    console.error("GraphQL proxy error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
