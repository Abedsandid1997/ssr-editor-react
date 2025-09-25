"use client";

import dynamic from "next/dynamic";
import DocumentFormSkeleton from "./DocumentFormSkeleton";

const DocumentForm = dynamic(
  () => import("@/app/add/_addComponents/DocumentForm"),
  {
    ssr: false,
    loading: () => <DocumentFormSkeleton />,
  }
);

export default DocumentForm;
