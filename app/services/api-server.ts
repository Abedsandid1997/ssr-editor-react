import axios from "axios";
import { url } from "@/utilits";
import { cookies } from "next/headers";

export async function serverApiClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return axios.create({
    baseURL: url,
    headers: { Cookie: `token=${token}` },
    withCredentials: true,
  });
}
