import { getDocuments } from "@/app/services/api-server";
import DocumentCard, { Document } from "./_homeComponents/DocumentCard";
import { Container, Grid } from "@radix-ui/themes";

export default async function DocumentsPage() {
  try {
    const documents: Document[] = await getDocuments();
    return (
      <Container size="4">
        <Grid
          columns={{ initial: "1", sm: "3", xl: "4" }}
          gap="5"
          justify="center"
          align="center"
        >
          {documents.map((document) => (
            <div key={document._id} className="flex justify-center">
              <DocumentCard document={document} />
            </div>
          ))}
        </Grid>
      </Container>
    );
  } catch (err) {
    console.error(err);
    return <p>Failed to fetch documents</p>;
  }
}
