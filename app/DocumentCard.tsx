import Link from "@/components/Link";
import { url } from "@/utilits";
import { Box, Card, Heading, Inset, Strong, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

export interface Document {
  title: string;
  content: string;
  _id: string;
}
const DocumentCard = ({ title, content, _id }: Document) => {
  return (
    <Box className="w-full" maxWidth={{ initial: "400px" }}>
      <Card size="5" className="flex flex-col h-[350px] max-h-[350px]">
        <Inset clip="padding-box" side="top" pb="current">
          <img
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            style={{
              display: "block",
              objectFit: "cover",
              width: "100%",
              height: 140,
              backgroundColor: "var(--gray-5)",
            }}
          />
        </Inset>
        <Heading>
          <Link href={`/${_id}`}>{title}</Link>
        </Heading>
        <Box className="prose">
          <ReactMarkdown>
            {content.length > 20 ? content.slice(0, 20) + "..." : content}
          </ReactMarkdown>
        </Box>
      </Card>
    </Box>
  );
};

export default DocumentCard;
