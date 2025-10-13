import { Box } from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";

const DocumentEditSkeleton = () => {
  return (
    <Box className="w-full h-full">
      <Skeleton height="1.5rem" />

      <Skeleton height="30rem" />

      <Skeleton width="8rem" height="2rem" />
    </Box>
  );
};

export default DocumentEditSkeleton;
