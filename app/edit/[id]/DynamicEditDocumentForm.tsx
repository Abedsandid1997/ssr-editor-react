import dynamic from "next/dynamic";
import DocumentEditSkeleton from "./DocumentEditSkeleton";

const EditDocumentForm = dynamic(() => import("./EditDocumentForm"), {
  ssr: false,
  loading: () => <DocumentEditSkeleton />,
});
export default EditDocumentForm;
