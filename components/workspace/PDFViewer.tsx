import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation} from "convex/react";
import { useEffect, useState } from "react";

interface PDFViewerProps {
  fileId: Id<"pdfs">;
}

const PDFViewer = ({ fileId }: PDFViewerProps) => {
  const getURl = useMutation(api.pdfStorage.getPdfUrlWithId);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getURl({ pdfId: fileId });
        if (url) {
          setPdfUrl(url);
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
    <div className="h-full">
      {pdfUrl ? (
        <iframe src={pdfUrl + "#toolbar=0"} width={"100%"} height={"100%"} />
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="animate-pulse text-center">
            <div className="h-32 w-32 rounded-md bg-gray-300 mx-auto mb-4"></div>
            <div className="h-4 w-48 bg-gray-300 rounded mx-auto"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;