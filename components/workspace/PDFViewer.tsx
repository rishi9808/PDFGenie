interface PDFViewerProps {
  pdfUrl?: string;
}

const PDFViewer = ({  pdfUrl }: PDFViewerProps) => {
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