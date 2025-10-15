import { url } from "@/utilits";
import axios from "axios";
import { DocumentFormData } from "../add/_addComponents/DocumentForm";

const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

export default apiClient;

export const getUsers = async () => {
  const query = `
    query {
      users {
        name
        email
        _id
      }
    }`;
  const res = await apiClient.post("/graphql", { query });
  console.log(res.data);
  return res.data.data.users;
};

export const addDocument = async (
  data: DocumentFormData,
  codeMode: boolean
) => {
  const mutation = `
    mutation AddDocument($document: AddDocumentInput!) {
      addDocument(document: $document) {
        title
        content
        isCode
        _id
        owner {
          _id
          name
          email
        }
      }
    }`;

  const variables = { document: { ...data, isCode: codeMode } };
  await apiClient.post("/graphql", { query: mutation, variables });
};
