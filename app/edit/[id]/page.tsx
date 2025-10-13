import { notFound } from "next/navigation";
import { Document } from "@/app/_homeComponents/DocumentCard";
import { Flex } from "@radix-ui/themes";
import { serverApiClient } from "@/app/services/api-server";
import DocumentEditor from "./EditDocumentForm";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const api = await serverApiClient();
  const res = await api.get(`/api/document/${id}`);
  const document: Document = res.data.document;

  if (!document) return notFound();

  return (
    <Flex width="100%" ml="auto">
      <DocumentEditor document={document} />
    </Flex>
  );
}
