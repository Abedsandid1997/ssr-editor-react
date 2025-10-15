import { url } from "@/utilits";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const res = await fetch(`${url}/api/auth/logout`, {
      method: "POST",
      credentials: "include", // viktigt för cookies
    });

    const data = await res.json();

    // Valfritt: rensa cookie i Edge/Next (om du också lagrat något lokalt)
    const response = NextResponse.json(data, { status: res.status });
    response.cookies.set("token", "", { maxAge: 0 }); // tar bort ev. token i Next edge
    return response;
  } catch (error) {
    return NextResponse.json({ message: "Logout failed" }, { status: 500 });
  }
}
