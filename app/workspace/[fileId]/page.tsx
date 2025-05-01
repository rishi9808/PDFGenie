"use client";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import ChatSection from "@/components/workspace/ChatSection";
import PDFViewer from "@/components/workspace/PDFViewer";
import EditorSection from "@/components/workspace/EditorSection";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

const Workspace = () => {
  const { fileId } = useParams();

  return (
    <div className="grid grid-cols-2 h-screen w-full">
      {/* <ChatSection fileId={fileId as string} /> */}

{/* Tabs for editor and chat */}
      <Tabs defaultValue="editor" className="w-full ">
        <TabsList className="border-b">
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
        <TabsContent value="editor" className="h-screen">
          <EditorSection />
        </TabsContent>
        <TabsContent value="chat" className="h-screen ">
          <ChatSection fileId={fileId as string} />
        </TabsContent>
      </Tabs>
      <PDFViewer fileId={fileId as Id<"pdfs">} />
    </div>
  );
};

export default Workspace;
