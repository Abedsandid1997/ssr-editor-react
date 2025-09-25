import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const EditButton = ({ id }: { id: string }) => {
  return (
    <Button asChild className="w-full cursor-pointer">
      <Link href={`/edit/${id}`}>Edit</Link>
    </Button>
  );
};

export default EditButton;
