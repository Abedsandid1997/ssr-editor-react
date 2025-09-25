"use client";

import { useState } from "react";
import { TextField, Button, Card, Callout, Spinner } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import SimpleMDE from "react-simplemde-editor";
import { createFormSchema } from "@/validation";
import { url } from "@/utilits";
import ErrorMessage from "@/components/ErrorMessage";

type DocuemntFormData = z.infer<typeof createFormSchema>;
const DocumentForm = ({ document }: { document?: DocuemntFormData }) => {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DocuemntFormData>({
    resolver: zodResolver(createFormSchema),
  });
  return (
    <div className="w-full h-full">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Icon></Callout.Icon>
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}

      <form
        className="space-y-4 w-full h-screen"
        onSubmit={handleSubmit(async (data) => {
          try {
            if (document)
              await axios.patch(
                `${url}/api/document/update/${document._id}`,
                data
              );
            else await axios.post(`${url}/api/document`, data);

            router.push("/");
          } catch (error) {
            setError(`Unexpected error ${error}`);
          }
        })}
      >
        <h1 className="text-3xl font-semibold">Create new document</h1>

        <Card>
          <TextField.Root
            placeholder="Titel på issue"
            defaultValue={document?.title}
            {...register("title")}
            size="3"
          />
          <div className="mt-2">
            <ErrorMessage> {errors.title?.message}</ErrorMessage>
          </div>
        </Card>

        <Card>
          <div className="mb-2 font-medium">Content</div>
          <Controller
            name="content"
            control={control}
            defaultValue={document?.content}
            render={({ field }) => (
              <SimpleMDE placeholder="Description" {...field} />
            )}
          />
          <ErrorMessage> {errors.content?.message}</ErrorMessage>
        </Card>

        <Button disabled={isSubmitting} size="3" className="mt-5">
          {document ? "Update issue" : "Create Issue"}
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default DocumentForm;
