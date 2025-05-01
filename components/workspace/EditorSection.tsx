"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Bold, Code2, Italic } from "lucide-react";
import { Button } from "../ui/button";


const EditorSection = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type your notes here...",
      }),
     
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  return (
    <div className="flex flex-col h-screen space-y-2 p-4">
        <div className="flex justify-between">
      <div className="flex space-x-2">
        <Button
          variant={"outline"}
          size="icon"
          onClick={() => editor?.chain().focus().toggleBold().run()}
          className={editor?.isActive("bold") ? "is-active" : ""}
        >
          <Bold className="w-5 h-5" />
        </Button>

        <Button
          variant={"outline"}
          size="icon"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
          className={editor?.isActive("italic") ? "is-active" : ""}
        >
          <Italic className="w-5 h-5" />
        </Button>
        
        <Button
          variant={"outline"}
          size="icon"
          onClick={() => editor?.chain().focus().toggleCode().run()}
          className={editor?.isActive("code") ? "is-active" : ""}
        >
          <Code2 className="w-5 h-5" />
        </Button>
      </div>
        </div>

      <EditorContent
        editor={editor}
        className="border border-gray-300 rounded-md p-4 h-full"
        style={{ minHeight: "200px" }}
      />
    </div>
  );
};

export default EditorSection;
