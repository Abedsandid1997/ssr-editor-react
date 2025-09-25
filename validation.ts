import { z } from "zod";

export const createFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(20),
  content: z.string().min(1, "Content is required").max(65535),
  _id: z.string().optional(),
});
