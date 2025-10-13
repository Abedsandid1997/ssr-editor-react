"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import MenuBar from "./MenuBar";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";
import CommentHighlight from "./CommentHighlight ";

interface RichEditorProps {
  content: string;
  onChange: (content: string) => void;
  onSelectText?: (text: string) => void;
  onMarkClick?: (commentId: string) => void;
}

const RichEditor = ({
  content,
  onChange,
  onSelectText,
  onMarkClick,
}: RichEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc ml-3",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal ml-3",
          },
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CommentHighlight.configure({ multicolor: true }),
    ],
    content: content,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[55vh]  border rounded-md bg-slate-50 py-2 px-3",
      },
      handleDOMEvents: {
        mouseup: () => {
          const selection = window.getSelection();
          if (!selection || selection.rangeCount === 0) return;

          const range = selection.getRangeAt(0);

          const cloned = range.cloneContents();
          const div = document.createElement("div");
          div.appendChild(cloned);
          const selectedHTML = div.innerHTML;

          if (selectedHTML && onSelectText) {
            onSelectText(selectedHTML.trim());
          }

          return false;
        },
      },
    },

    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  useEffect(() => {
    if (!editor) return;

    if (content && content !== editor.getHTML()) {
      editor.commands.setContent(content, { emitUpdate: false });
    }
  }, [content, editor]);

  useEffect(() => {
    if (!editor) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === "MARK" && target.classList.contains("commented")) {
        const id = target.getAttribute("id");
        if (id && onMarkClick) {
          onMarkClick(id);
        }
      }
    };

    const dom = editor.view.dom;
    dom.addEventListener("mouseover", handleClick);
    return () => dom.removeEventListener("mouseover", handleClick);
  }, [editor, onMarkClick]);

  return (
    <>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </>
  );
};

export default RichEditor;
