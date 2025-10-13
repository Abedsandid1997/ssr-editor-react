import { cookies } from "next/headers";
import { Container, Grid } from "@radix-ui/themes";
import DocumentCard, { Document } from "./_homeComponents/DocumentCard";
import { url } from "@/utilits";

export default async function Home() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const res = await fetch(`${url}/api/document`, {
    headers: { Cookie: `token=${token}` },
    credentials: "include",
  });

  const documents: Document[] = await res.json();
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
}
