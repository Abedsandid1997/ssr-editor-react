import React from "react";
import { Container, Flex } from "@radix-ui/themes";
import DocumentForm from "./_addComponents/DocumentFormDynamic";

const page = () => {
  return (
    <Container size="4">
      <Flex justify="center">
        <DocumentForm />
      </Flex>
    </Container>
  );
};

export default page;
