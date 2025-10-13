import { Card, Button, TextArea, Text } from "@radix-ui/themes";
import React from "react";

interface CommentFormProps {
  selectedText?: string;
  onChange: (comment: string) => void;
  onClick: () => void;
}

const CommentForm = ({ selectedText, onChange, onClick }: CommentFormProps) => {
  if (!selectedText) return null;
  return (
    <Card className="space-y-[10px]">
      <Text className="text-sm">Text: ({selectedText})</Text>

      <TextArea
        placeholder="Write a comment..."
        onChange={(e) => onChange(e.target.value)}
        className="mt-[10px]"
      />
      <Button onClick={onClick}>Comment</Button>
    </Card>
  );
};

export default CommentForm;
