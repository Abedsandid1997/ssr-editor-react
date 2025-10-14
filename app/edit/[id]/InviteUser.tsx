"use client";

import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";
import SelectUser from "./SelectUser";
import ManualEmailInput from "./ManualEmailInput";
import apiClient, { getUsers } from "@/app/services/api-client";
import { FaShareSquare } from "react-icons/fa";
import { useAuth } from "@/app/AuthContext";
import axios from "axios";

export interface User {
  _id: string;
  name: string;
  email: string;
}

interface InviteUserProps {
  documentId: string;
}

const InviteUser = ({ documentId }: InviteUserProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserEmail, setSelectedUserEmail] = useState<string>("");
  const [manualEmail, setManualEmail] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const { userName } = useAuth();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  const handleInvite = async () => {
    const emailToSend = selectedUserEmail || manualEmail;
    if (!emailToSend) {
      setError("Please select a user or enter an email");
      return;
    }

    try {
      setIsSubmitting(true);
      await apiClient.post(`/api/user/documents/${documentId}/share`, {
        email: emailToSend,
        name: userName,
      });
      setSuccess("Invitation sent!");
      setError(null);
      setManualEmail("");
      setSelectedUserEmail("");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Failed to send invitation");
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to send invitation");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="green" disabled={isSubmitting}>
          Share <FaShareSquare />
          {isSubmitting && <Spinner />}
        </Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content maxWidth="450px">
        <AlertDialog.Title>Invite a user</AlertDialog.Title>
        <AlertDialog.Description size="2">
          Select a registered user or type an email to invite.
        </AlertDialog.Description>

        <Flex direction="column" gap="3" mt="4">
          <SelectUser
            users={users}
            value={selectedUserEmail}
            onChange={setSelectedUserEmail}
          />

          <ManualEmailInput value={manualEmail} onChange={setManualEmail} />

          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}

          <Flex justify="end" gap="2">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </AlertDialog.Cancel>

            <AlertDialog.Action>
              <Button
                color="green"
                onClick={handleInvite}
                disabled={isSubmitting}
              >
                Share
              </Button>
            </AlertDialog.Action>
          </Flex>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default InviteUser;
