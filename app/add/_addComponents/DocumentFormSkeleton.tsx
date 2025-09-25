import { Box } from "@radix-ui/themes";
import Skeleton from "@/components/Skeleton";
const DocumentFormSkeleton = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton height="1.5rem" />

      <Skeleton height="30rem" />

      <Skeleton width="8rem" height="2rem" />
    </Box>
  );
};

export default DocumentFormSkeleton;
