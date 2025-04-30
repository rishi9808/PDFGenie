"use client";
import { Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAction, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { FormEvent, useRef, useState } from "react";
import { Id } from "@/convex/_generated/dataModel";
import { useRouter } from 'next/navigation'

export function UploadPdfButtton() {
  const generateUploadUrl = useMutation(api.pdfStorage.generateUploadUrl);
  const uploadPDF = useMutation(api.pdf.addPdf);
  const fileUrl = useMutation(api.pdfStorage.getFileUrl);
  const embeddPdf = useAction(api.pdfAction.ingest);
  const router = useRouter();

  const userId = localStorage.getItem("userId") ?? "";
  const fileInput = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  async function handleFileUpload(e: FormEvent) {
    e.preventDefault();

    setLoading(true);
    // Step 1: Get a short-lived upload URL
    const postUrl = await generateUploadUrl();
    // Step 2: POST the file to the URL
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": selectedFile!.type },
      body: selectedFile,
    });
    const { storageId } = await result.json();

    const url = await fileUrl({
      storageId,
    });

    console.log(url);

    const pdfId = await uploadPDF({
      storageId: storageId,
      fileName: fileName,
      userId: userId as Id<"users">,
      fileUrl: url!,
    });

  

    const pdfChunkResponse = await fetch(
      'api/process-pdf?url=' + url,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    const pdfChunkData = await pdfChunkResponse.json();
    console.log(pdfChunkData);

    const res = await embeddPdf({
      docs: pdfChunkData.result,
      fileId: pdfId as Id<"pdfs">,
    });

    console.log(res);
    setSelectedFile(null);
    fileInput.current!.value = "";
    setFileName("");
    setLoading(false);
    setOpen(false);
    router.push("/workspace/" + pdfId);
  }
  return (
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button className="mx-2" onClick={()=> setOpen(true)}>
          <Upload /> Upload PDF
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload PDF</DialogTitle>
          <DialogDescription>
            Upload your PDF here with a file name
          </DialogDescription>
        </DialogHeader>
        <Input
          type="file"
          ref={fileInput}
          onChange={(e) => setSelectedFile(e.target.files![0])}
          accept="application/pdf"
          disabled={selectedFile !== null}
        />

        <Input
          type="text"
          placeholder="file name"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <DialogFooter className="">
          <div className="flex space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </DialogClose>
            <Button onClick={handleFileUpload}
            disabled={loading || fileName === "" || selectedFile === null}
            >
            {loading ? (
              <div className="flex">
                <Loader2 className="animate-spin"/>
                Uploading...
              </div>
            ): (
              <span>Upload</span>
            )}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
