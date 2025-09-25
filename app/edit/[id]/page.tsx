import DocumentForm from "@/app/add/_addComponents/DocumentFormDynamic";
import { Document } from "@/app/_homeComponents/DocumentCard";
import { url } from "@/utilits";
import { Flex } from "@radix-ui/themes";
import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  let document: Document;
  try {
    const res = await axios.get(`${url}/api/document/${id}`);
    document = res.data.document;
  } catch (_error) {
    notFound();
  }
  return (
    <Flex justify="center">
      <DocumentForm document={document} />
    </Flex>
  );
};

export default page;
