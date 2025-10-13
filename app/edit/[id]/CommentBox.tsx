import React from "react";
import { Comment } from "./EditDocumentForm";
import { Card, Flex, Text } from "@radix-ui/themes";
import { AiFillDelete } from "react-icons/ai";
interface CommentBoxProps {
  activeComment: Comment[] | null;
  onDelete: (documentId: string) => void;
  isCode: boolean;
}
const CommentBox = ({ activeComment, onDelete, isCode }: CommentBoxProps) => {
  if (!activeComment || activeComment.length === 0) return null;

  return (
    <>
      {activeComment.map((comment) => (
        <Card mt="2" key={comment._id} className="bg-yellow-200">
          <Flex align="center" justify="between">
            <Text className="font-semibold">{comment.user?.name}</Text>
            <AiFillDelete
              className="text-zinc-400 cursor-pointer hover:text-red-400 transition-transform hover:scale-110"
              size={18}
              onClick={() => onDelete(comment._id)}
            />
          </Flex>

          {isCode && (
            <Text>
              Selected: ( {comment.selection})<br />
            </Text>
          )}
          <Text>{comment.text}</Text>
        </Card>
      ))}
    </>
  );
};

export default CommentBox;
