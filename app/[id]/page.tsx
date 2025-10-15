import { notFound } from "next/navigation";
import { Box, Card, Container, Flex, Heading } from "@radix-ui/themes";
import EditButton from "./_idComponents/EditButton";
import DeleteButton from "./_idComponents/DeleteButton";
import HtmlText from "../HtmlText";
import { Document } from "../_homeComponents/DocumentCard";
import { getDocument } from "../services/api-server";

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  const document: Document = await getDocument(id);
  if (!document) return notFound();
  return (
    <Container size="4">
      <Box className="md:col-span-4">
        <Flex direction="column" gap="3" className="max-w-full">
          <Heading>{document.title}</Heading>
          <Card className="prose max-w-full">
            <Flex justify="between">
              <HtmlText>{document.content}</HtmlText>
              <Flex gap="1">
                <EditButton id={document._id} />
                <DeleteButton id={document._id} />
              </Flex>
            </Flex>
          </Card>
        </Flex>
      </Box>
    </Container>
  );
}
