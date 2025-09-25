import { url } from "@/utilits";
import axios from "axios";
import { Document } from "../_homeComponents/DocumentCard";
import { Box, Card, Flex, Grid, Heading } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";
import EditButton from "./_idComponents/EditButton";
import DeleteButton from "./_idComponents/DeleteButton";
import { notFound } from "next/navigation";

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
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <Flex direction="column" gap="3" className="max-w-full">
          <Heading>{document.title}</Heading>
          <Card className="prose max-w-full">
            <ReactMarkdown>{document.content}</ReactMarkdown>{" "}
          </Card>
        </Flex>
      </Box>
      <Box>
        <Flex direction="column" gap="3">
          <EditButton id={document._id} />
          <DeleteButton id={document._id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default page;
