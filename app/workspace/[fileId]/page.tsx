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
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect, useState } from "react";

const Workspace = () => {
  const { fileId } = useParams();
  const userId = localStorage.getItem("userId");

const getURl = useMutation(api.pdfStorage.getPdfUrlWithId);
const [pdfUrl, setPdfUrl] = useState<string | null>(null);
const [fileName, setFileName] = useState<string | null>(null);

  // Fetch the PDF URL using the fileId
useEffect(() => {
  const fetchUrl = async () => {
    try {
      const data = await getURl({
       pdfId: fileId as Id<"pdfs">,
      });
      if (data) {
        setPdfUrl(data.url);
        setFileName(data.fileName);
        console.log("PDF URL:", data.url);
      } else {
        console.error("URL not found");
      }
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  };
  fetchUrl();
}, [fileId, getURl]);

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
          <EditorSection
            fileId={fileId as Id<"pdfs">}
            userId={userId as Id<"users">}
            pdfUrl={pdfUrl!}
            fileName={fileName as string}
          />
        </TabsContent>
        <TabsContent value="chat" className="h-screen ">
          <ChatSection fileId={fileId as string} />
        </TabsContent>
      </Tabs>
      <PDFViewer pdfUrl={pdfUrl!} />
    </div>
  );
};

export default Workspace;
