import { Box, Flex } from "@radix-ui/themes";
import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import RunCode from "./RunCode";
import type * as monaco from "monaco-editor";
interface CodeEditorProps {
  content: string;
  onChange: (value: string) => void;
  onSelected?: (text: string) => void;
}

const CodeEditor = ({ content, onChange, onSelected }: CodeEditorProps) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const onMount = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorRef.current = editor;
    editor.focus();

    editor.onMouseUp(() => {
      const selection = editor.getSelection();
      if (!selection) return;

      const selectedText = editor
        .getModel()
        ?.getValueInRange(selection)
        ?.trim();

      if (selectedText && onSelected) {
        onSelected(selectedText);
      }
    });
  };

  return (
    <Flex width="100%">
      <Box width="60%" minHeight="60vh">
        <Editor
          height="100%"
          theme="vs-dark"
          defaultLanguage="javascript"
          value={content}
          onMount={onMount}
          onChange={(value) => {
            if (value !== undefined) {
              onChange(value);
            }
          }}
        />
      </Box>
      <Box width="40%">
        <RunCode code={content} />
      </Box>
    </Flex>
  );
};

export default CodeEditor;
