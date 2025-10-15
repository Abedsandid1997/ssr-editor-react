"use client";
import { useEffect, useState } from "react";
import { TextField, Card, Flex, Box, Grid } from "@radix-ui/themes";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFormSchema, updateFormSchema } from "@/validation";
import socket, { connectSocket } from "@/app/services/socket";
import RichEditor from "./RichEditor";
import CommentForm from "./CommentForm";
import InviteUser from "./InviteUser";
import CommentBox from "./CommentBox";
import CodeEditor from "./CodeEditor";
import { useAuth } from "@/app/AuthContext";
import apiClient from "@/app/services/api-client";

type DocumentFormData = z.infer<typeof updateFormSchema>;
export interface Comment {
  user: { name: string; email: string };
  text: string;
  _id: string;
  selection: string;
}
export default function DocumentEditor({
  document,
}: {
  document: DocumentFormData;
}) {
  const { setValue, watch } = useForm<DocumentFormData>({
    resolver: zodResolver(updateFormSchema),
  });
  const [selectedText, setSelectedText] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<Comment[] | null>(null);
  const [activeComment, setActiveComment] = useState<Comment[] | null>(null);
  const { userId, setToken } = useAuth();
  // const [token, setToken] = useState("");

  // useEffect(() => {
  //   if (token) {
  //     connectSocket(token);
  //   }
  //   socket.emit("create", document._id);
  //   socket.on("content", (data: string) => {
  //     setValue("content", data);
  //   });

  //   socket.emit("get-comments", document._id);
  //   socket.on("get-comments", (allComments) => {
  //     setComments(allComments);
  //     if (document.isCode) setActiveComment(allComments);
  //   });

  //   socket.on("title", (data: string) => {
  //     setValue("title", data);
  //   });
  //   return () => {
  //     socket.disconnect();
  //   };
  // }, [document._id, document.isCode, setValue]);
  useEffect(() => {
    const init = async () => {
      try {
        const res = await apiClient.get("/auth");
        const receivedToken = res.data.token;
        if (!receivedToken) throw new Error("No token received");

        setToken(receivedToken);

        // ✅ Connecta socket först när token finns
        connectSocket(receivedToken);

        // Nu kan du göra allt socket-relaterat här
        socket.emit("create", document._id);

        socket.on("content", (data: string) => {
          setValue("content", data);
        });

        socket.emit("get-comments", document._id);
        socket.on("get-comments", (allComments) => {
          setComments(allComments);
          if (document.isCode) setActiveComment(allComments);
        });

        socket.on("title", (data: string) => {
          setValue("title", data);
        });
      } catch (err) {
        console.error("Failed to init socket:", err);
        setToken("");
      }
    };

    init();

    return () => {
      socket.disconnect();
    };
  }, [document._id, document.isCode, setValue]);

  const handleTitleChange = (text: string) => {
    const data = {
      _id: document._id,
      html: text,
    };
    socket.emit("title", data);
  };

  const handleContentChange = (text: string) => {
    const data = {
      _id: document._id,
      html: text,
    };
    socket.emit("content", data);
  };

  const addComment = () => {
    const data = {
      documentId: document._id,
      selection: selectedText,
      text: comment,
      allText: watch("content") ?? document.content ?? "",
      isCode: document.isCode,
    };
    socket.emit("add_comment", data);
    console.log("get add front end");

    setComment("");
    setSelectedText("");
  };

  const deleteComment = (commentId: string) => {
    const data = {
      documentId: document._id,
      allText: watch("content") ?? document.content ?? "",
      commentId,
      isCode: document.isCode,
    };

    socket.emit("delete_comment", data);
    setComment("");
    setSelectedText("");
    setActiveComment(null);
  };

  const handleMarkClick = (id: string) => {
    const existing = comments?.find((c) => c._id === id);
    if (existing && existing.text) {
      setActiveComment([existing]);
    } else {
      socket.emit("get_comment", id);
    }
  };
  return (
    <Grid columns={{ initial: "1fr", md: "1fr 350px" }} gap="3" width="100%">
      <Box
        className="space-y-4 max-w-[80rem] w-full h-full"
        overflow="auto"
        ml="auto"
      >
        <Card>
          <Flex gap="3">
            <TextField.Root
              value={watch("title") ?? document.title ?? ""}
              placeholder="Document title"
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full"
            />
            {userId === document.owner?._id && (
              <InviteUser documentId={document._id!} />
            )}
          </Flex>
        </Card>
        <Card>
          <div className="mb-2 font-medium">Content</div>
          {document.isCode ? (
            <CodeEditor
              content={watch("content") ?? document.content ?? ""}
              onChange={handleContentChange}
              onSelected={(text) => setSelectedText(text)}
            />
          ) : (
            <RichEditor
              content={watch("content") ?? document.content ?? ""}
              onChange={handleContentChange}
              onSelectText={(text) => setSelectedText(text)}
              onMarkClick={(id) => handleMarkClick(id)}
            />
          )}
        </Card>
      </Box>
      <Flex
        direction={{ initial: "row", md: "column" }}
        gap="3"
        className="w-full"
      >
        <Box width={{ initial: "50%", md: "full" }}>
          <CommentForm
            selectedText={selectedText}
            onChange={(comment) => setComment(comment)}
            onClick={addComment}
          />
        </Box>

        <Box width={{ initial: "50%", md: "full" }}>
          <CommentBox
            activeComment={activeComment}
            onDelete={(commentId) => deleteComment(commentId)}
            isCode={document.isCode!}
          />
        </Box>
      </Flex>
    </Grid>
  );
}
