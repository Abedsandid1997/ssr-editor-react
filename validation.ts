import { z } from "zod";

export const createFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(20),
  content: z.string().min(1, "Content is required").max(65535),
  _id: z.string().optional(),
  owner: z.string().optional(),
  isCode: z.boolean().optional(),
});

export const createUserValidation = z.object({
  name: z.string().min(1, "Name is required").max(55, "Name is too long"),
  email: z.email(),
  password: z.string().min(8),
});
