// import { Highlight } from "@tiptap/extension-highlight";

// const CommentHighlight = Highlight.extend({
//   name: "commentHighlight",

//   addAttributes() {
//     return {
//       ...this.parent?.(),
//       id: {
//         default: null,
//       },
//       class: {
//         default: "commented",
//       },
//       "data-color": {
//         default: null,
//       },
//     };
//   },

//   parseHTML() {
//     return [
//       {
//         tag: "mark.commented",
//       },
//     ];
//   },

//   renderHTML({ HTMLAttributes }) {
//     return ["mark", HTMLAttributes, 0];
//   },
// });

// export default CommentHighlight;

import { Highlight } from "@tiptap/extension-highlight";
import { Attributes as TiptapHTMLAttributes } from "@tiptap/core";
const CommentHighlight = Highlight.extend({
  name: "commentHighlight",

  addAttributes() {
    return {
      id: {
        default: null,
      },
      class: {
        default: "commented",
      },
      "data-color": {
        default: null,
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "mark.commented",
      },
    ];
  },

  renderHTML({ HTMLAttributes }: { HTMLAttributes: TiptapHTMLAttributes }) {
    return ["mark", HTMLAttributes, 0];
  },
});

export default CommentHighlight;
