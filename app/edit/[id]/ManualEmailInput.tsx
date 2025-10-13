"use client";

import { TextField } from "@radix-ui/themes";
import React from "react";

interface ManualEmailInputProps {
  value: string;
  onChange: (email: string) => void;
  placeholder?: string;
}

const ManualEmailInput = ({
  value,
  onChange,
  placeholder,
}: ManualEmailInputProps) => {
  return (
    <TextField.Root
      placeholder={placeholder || "Or enter email manually"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default ManualEmailInput;
