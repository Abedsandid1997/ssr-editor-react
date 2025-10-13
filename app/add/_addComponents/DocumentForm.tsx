"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Card,
  Callout,
  Spinner,
  Switch,
  Flex,
  Text,
} from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createFormSchema } from "@/validation";
import ErrorMessage from "@/components/ErrorMessage";
import apiClient from "@/app/services/api-client";
import RichEditor from "@/app/edit/[id]/RichEditor";
import CodeEditor from "@/app/edit/[id]/CodeEditor";

type DocumentFormData = z.infer<typeof createFormSchema>;

const DocumentForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [codeMode, setCodeMode] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DocumentFormData>({
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
        className="space-y-4 w-full"
        onSubmit={handleSubmit(async (data) => {
          try {
            await apiClient.post(`/api/document`, {
              ...data,
              isCode: codeMode,
            });

            router.push("/");
          } catch (error) {
            setError(`Unexpected error ${error}`);
          }
        })}
      >
        <Card>
          <TextField.Root
            placeholder="Titel..."
            {...register("title")}
            size="3"
          />
          <div className="mt-2">
            <ErrorMessage> {errors.title?.message}</ErrorMessage>
          </div>
        </Card>

        <Card>
          <Flex className="mb-2 font-medium" justify="between" align="center">
            Content{" "}
            <Text>
              Code
              <Switch
                variant="surface"
                checked={codeMode}
                color="green"
                onCheckedChange={(checked) => setCodeMode(checked)}
                ml="2"
                className="!transition-all !duration-200 !ease-in-out !scale-100 data-[state=checked]:!scale-110"
              />
            </Text>
          </Flex>
          {codeMode ? (
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <CodeEditor
                  content={field.value ?? ""}
                  onChange={(contnet) => field.onChange(contnet)}
                />
              )}
            />
          ) : (
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <RichEditor
                  content={field.value ?? ""}
                  onChange={(contnet) => field.onChange(contnet)}
                />
              )}
            />
          )}
          <ErrorMessage> {errors.content?.message}</ErrorMessage>
        </Card>

        <Button
          disabled={isSubmitting}
          size="3"
          className="mt-5 !cursor-pointer"
        >
          Create document
          {isSubmitting && <Spinner />}
        </Button>
      </form>
    </div>
  );
};

export default DocumentForm;
