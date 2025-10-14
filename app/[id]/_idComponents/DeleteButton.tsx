"use client";
import { RiDeleteBin5Line } from "react-icons/ri";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import apiClient from "@/app/services/api-client";
const DeleteButton = ({ id }: { id: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      const mutation = `
      mutation DeleteDocument ($id:ID!){
          deleteDocument(id: $id) 
        }
      `;

      const variables = { id };
      console.log(variables);

      await apiClient.post(`/graphql`, {
        query: mutation,
        variables,
      });
      // await apiClient.delete(`/api/document/delete/${id}`);

      router.push("/");
    } catch (error) {
      console.error("Error deleting document:", error);
      setError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          {!isSubmitting ? (
            <RiDeleteBin5Line
              size="1.5rem"
              className="text-red-400 cursor-pointer transition-all duration-150  hover:text-red-600 hover:scale-105"
            />
          ) : (
            <Spinner />
          )}
        </AlertDialog.Trigger>
        <AlertDialog.Content maxWidth="450px">
          <AlertDialog.Title>Delete document</AlertDialog.Title>
          <AlertDialog.Description size="2">
            Are you sure? This document will no longer be available.
          </AlertDialog.Description>

          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button className="!cursor-pointer" variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                className="!cursor-pointer"
                variant="solid"
                color="red"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>

      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>
            This document could not be deleted.
          </AlertDialog.Description>
          <Button
            mt="3"
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteButton;
