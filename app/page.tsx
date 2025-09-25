import axios from "axios";
import { url } from "@/utilits";
import { Grid } from "@radix-ui/themes";
import DocumentCard, { Document } from "./DocumentCard";
import { notFound } from "next/navigation";

export default async function Home() {
  const res = await fetch(`${url}/api/document`, { cache: "no-store" });
  if (!res.ok) notFound();
  const documents: Document[] = await res.json();
  return (
    <Grid
      columns={{ initial: "1", sm: "2", lg: "3", xl: "4" }}
      gap="5"
      justify="center"
      align="center"
    >
      {documents?.map((document) => (
        <div key={document._id} className="flex justify-center">
          <DocumentCard
            title={document.title}
            content={document.content}
            _id={document._id}
          />
        </div>
      ))}
    </Grid>
  );
}
