"use client";

import { Select } from "@radix-ui/themes";
import React from "react";
import { User } from "./InviteUser";

interface UserSelectProps {
  users: User[];
  value: string;
  onChange: (email: string) => void;
}

const SelectUser = ({ users, value, onChange }: UserSelectProps) => {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger>{value || "Select a user"}</Select.Trigger>
      <Select.Content>
        <Select.Group>
          <Select.Label>Registered Users</Select.Label>
          {users.map((user) => (
            <Select.Item key={user._id} value={user.email}>
              {user.name} ({user.email})
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
};

export default SelectUser;
