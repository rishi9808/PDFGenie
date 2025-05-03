
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { Blocks, Bold, Code2, Italic } from "lucide-react";
import { Button } from "../ui/button";
import Blockquote from "@tiptap/extension-blockquote";
import { all, createLowlight } from "lowlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import css from "highlight.js/lib/languages/css";
import js from "highlight.js/lib/languages/javascript";
import ts from "highlight.js/lib/languages/typescript";
import html from "highlight.js/lib/languages/xml";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { toast } from "sonner";
import { useEffect } from "react";

const EditorSection = ({
  fileId,
  userId,
  fileName,
  pdfUrl,
}: {
  fileId: Id<"pdfs">;
  userId: Id<"users">;
  fileName: string;
  pdfUrl: string;
}) => {
  // Save the workspace
  const saveWorkspace = useMutation(api.workspace.saveWorkspace);

  // check if editor has any content
  const workspaceContent = useQuery(api.workspace.getWorkspace, {
    fileId: fileId,
});

  const handleSave = async () => {
    // Save the content of the editor
    const content = editor?.getJSON();
    console.log("Saved content:", content);
    try {
      await saveWorkspace({
        fileId: fileId,
        userId: userId,
        fileName: fileName,
        pdfUrl: pdfUrl,
        editorContent: JSON.stringify(content),
      });
      toast.success("Workspace saved successfully!");
    } catch (error) {
      console.error("Error saving workspace:", error);
      toast.error("Error saving workspace");
    }
  };

  const lowlight = createLowlight(all);
  // This is only an example, all supported languages are already loaded above
  // but you can also register only specific languages to reduce bundle-size
  lowlight.register("html", html);
  lowlight.register("css", css);
  lowlight.register("js", js);
  lowlight.register("ts", ts);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Type your notes here...",
      }),
      Blockquote,
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Heading.configure({
        levels: [1, 2],
      }),
      HorizontalRule,
    ],
    editorProps: {
      attributes: {
        class: "focus:outline-none",
      },
    },
  });

  useEffect(() => {
    if (workspaceContent?.success) {
      const content = JSON.parse(workspaceContent.data?.editorContent);
      editor?.commands.setContent(content);
    }
  }, [workspaceContent, editor]);

  return (
    <div className="flex flex-col h-screen space-y-2 p-4">
      <div className="flex justify-between">
        <div className="flex space-x-2">
          <Button
            variant={"outline"}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={
              editor?.isActive("heading", { level: 1 }) ? "bg-blue-400" : ""
            }
          >
            H1
          </Button>

          <Button
            variant={"outline"}
            onClick={() =>
              editor?.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={
              editor?.isActive("heading", { level: 2 }) ? "bg-blue-400" : ""
            }
          >
            H2
          </Button>

          <Button
            variant={"outline"}
            size="icon"
            onClick={() => editor?.chain().focus().toggleBold().run()}
            className={editor?.isActive("bold") ? "bg-blue-400" : ""}
          >
            <Bold className="w-5 h-5" />
          </Button>

          <Button
            variant={"outline"}
            size="icon"
            onClick={() => editor?.chain().focus().toggleItalic().run()}
            className={editor?.isActive("italic") ? "bg-blue-400" : ""}
          >
            <Italic className="w-5 h-5" />
          </Button>

          <Button
            variant={"outline"}
            onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
            className={editor?.isActive("codeBlock") ? "bg-blue-400" : ""}
          >
            <Code2 className="w-5 h-5" />
          </Button>

          <Button
            variant={"outline"}
            onClick={() => editor?.chain().focus().toggleBlockquote().run()}
            className={editor?.isActive("blockquote") ? "bg-blue-400" : ""}
          >
            <Blocks className="w-5 h-5" />
          </Button>

          <Button
            variant={"outline"}
            onClick={() => editor?.chain().focus().setHorizontalRule().run()}
          >
            -
          </Button>
        </div>
        <Button
          variant={"outline"}
          onClick={handleSave}
          className="bg-blue-500 text-white hover:bg-blue-600"
        >
          Save
        </Button>
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
