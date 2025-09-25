import { url } from "@/utilits";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditButton = ({ id }: { id: string }) => {
  return (
    <Button>
      <Link href={`/edit/${id}`}> Edit</Link>
    </Button>
  );
};

export default EditButton;
