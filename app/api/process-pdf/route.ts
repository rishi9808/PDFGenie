import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
export async function GET(request: Request) {
  const reqUrl = request.url;

  // extract the url from the request
  const { searchParams } = new URL(reqUrl);
  const pdfUrl = searchParams.get("url");

  // check if the url is valid
  if (!pdfUrl) {
    return new Response(JSON.stringify({ error: "PDF URL is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // convert the url to a blob
  const blob = await fetch(pdfUrl).then((res) => res.blob());

  // load the pdf
  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();

  // split the document into chunks
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });

  const chunks = await textSplitter.splitDocuments(docs);

  return new Response(JSON.stringify({ result: chunks }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
