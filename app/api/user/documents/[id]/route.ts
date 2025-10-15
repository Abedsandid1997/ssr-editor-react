import { url } from "@/utilits";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;
  const body = await request.json();
  const token = request.cookies.get("token")?.value;
  try {
    const backendRes = await fetch(`${url}/api/user/documents/${id}/share`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: token ? `token=${token}` : "",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const data = await backendRes.json();
    return NextResponse.json(data, { status: backendRes.status });
  } catch (error) {
    console.error("Error sharing document:", error);
    return NextResponse.json(
      { message: "Failed to share document" },
      { status: 500 }
    );
  }
}
