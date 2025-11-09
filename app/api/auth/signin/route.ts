// import { url } from "@/utilits";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   const body = await req.json();

//   const backendRes = await fetch(`${url}/api/auth/signin`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(body),
//     credentials: "include",
//   });

//   const text = await backendRes.text();

//   const setCookie = backendRes.headers.get("set-cookie");

//   const res = new NextResponse(text, { status: backendRes.status });

//   if (setCookie) {
//     const cleanedCookie = setCookie.replace(/Domain=[^;]+;/, "");
//     res.headers.set("set-cookie", cleanedCookie);
//   }

//   return res;
// }
import { url } from "@/utilits";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await fetch(`${url}/api/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    const data = await backendRes.json();

    const setCookie = backendRes.headers.get("set-cookie");

    const response = NextResponse.json(data, { status: backendRes.status });

    if (setCookie) {
      const cleanedCookie = setCookie.replace(/Domain=[^;]+;/, "");
      response.headers.set("set-cookie", cleanedCookie);
    }

    return response;
  } catch (error) {
    console.error("API route error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
