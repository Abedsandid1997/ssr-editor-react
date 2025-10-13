import Link from "@/components/Link";
import { Box, Card, Heading, Inset, Text } from "@radix-ui/themes";
import Image from "next/image";

export type Document = {
  title: string;
  content: string;
  _id: string;
  owner: string;
};

interface Props {
  document: Document;
}
const DocumentCard = ({ document }: Props) => {
  return (
    <Box className="w-full" maxWidth={{ initial: "400px" }}>
      <Card size="5" className="flex flex-col h-[350px] max-h-[350px]">
        <Inset clip="padding-box" side="top">
          <Image
            src="https://images.unsplash.com/photo-1617050318658-a9a3175e34cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
            alt="Bold typography"
            width={600}
            height={200}
            style={{
              objectFit: "cover",
              width: "100%",
              height: 200,
              backgroundColor: "var(--gray-5)",
              display: "block",
            }}
          />
        </Inset>
        <Heading className="pt-[1rem]">
          <Link href={`/${document._id}`}>{document.title}</Link>
        </Heading>

        <Text color="red" size="2" mt="auto">
          <Link href={`/${document._id}`}>Details....</Link>
        </Text>
      </Card>
    </Box>
  );
};

export default DocumentCard;
