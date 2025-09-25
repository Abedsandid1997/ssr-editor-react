import React from "react";
import DocumentForm from "./_addComponents/DocumentFormDynamic";
import { Flex } from "@radix-ui/themes";

const page = () => {
  return (
    <Flex justify="center">
      <DocumentForm />
    </Flex>
  );
};

export default page;
