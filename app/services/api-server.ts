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

export const getDocument = async (id: string) => {
  const query = `
                   query($id: ID!) {
                        document(id: $id) {
                          _id
                          content
                          title
                          isCode
                          owner {
                          _id
                          }
                          
                        }
                      }
    
    `;
  const variables = { id };
  const api = await serverApiClient();
  const res = await api.post(`/graphql`, { query, variables });
  return res.data.data.document;
};

export const getDocuments = async () => {
  const query = `
        query {
          docuemnts {
            _id
            title
            content
            owner{
            _id
            name
            }
          }
        }
      `;
  const api = await serverApiClient();
  const res = await api.post("/graphql", { query }); // GraphQL POST body
  return res.data.data.docuemnts;
};
