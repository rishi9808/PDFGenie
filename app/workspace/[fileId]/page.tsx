"use client";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useMutation } from "convex/react";
import { Bot, Send, User } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";

const Workspace = () => {
  const { fileId } = useParams();
  console.log(fileId);

  const getURl = useMutation(api.pdfStorage.getPdfUrlWithId);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [userQuery, setUserQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    [
      {
        role: "system",
        content:
          "Hello! I am a PDF assistant. You can ask me questions about the content of the PDF.",
      },
    ]
  );
  
  // Add a ref to the chat container
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom function
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const llmResponse = useAction(api.pdfAction.llmResponse);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userQuery) return;
    setLoading(true);
    setError(null);
    setMessages((prev) => [...prev, { role: "user", content: userQuery }]);
    try {
      const response = await llmResponse({
        query: userQuery,
        fileId: fileId as Id<"pdfs">,
      });
      console.log(response);
      if (response) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: response.answer ?? "Sorry, I couldn't find an answer.",
          },
        ]);
        setError(null);
      } else {
        setError("No response from LLM");
      }
    } catch (error) {
      console.error("Error fetching LLM response:", error);
      setError("Error processing your request");
    } finally {
      // Clear the input field after submission
      setUserQuery("");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        const url = await getURl({ pdfId: fileId as Id<"pdfs"> });
        console.log(url);
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
    <div className="grid grid-cols-2  h-screen overflow-hidden ">
      {/* chat section */}
      <div className="border-r-2 bg-gray-100 border-gray-300 p-4 relative">
        <div>
          <p className="text-gray-600 mb-4">
            Ask questions about the content of the PDF.
          </p>

          <div 
            ref={chatContainerRef} 
            className="flex flex-col h-[80vh] overflow-y-auto mb-2 chat-container pb-16"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 ${message.role === "user" ? "text-right" : "text-left"}`}
              >
                <div className="flex items-center gap-2">

                {message.role === "user" ? (
                  <User className="size-5 inline-block mr-2 text-blue-500" />
                ) : (
                  <Bot className=" size-5 inline-block mr-2 text-gray-500" />
                )}
                <span
                  className={`inline-block px-4 py-2 rounded-lg ${message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"}`}
                >
                  {message.content}
                </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 text-left">
                <span className="inline-block px-4 py-2 rounded-lg bg-gray-300 text-black animate-pulse">
                  ...
                </span>
              </div>
            )}
            {error && (
              <div className="mb-2 text-left">
                <span className="inline-block px-4 py-2 rounded-lg bg-red-500 text-white">
                  {error}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Input
        value={userQuery}
        onChange={(e) => setUserQuery(e.target.value)}
        placeholder="Type your question here..."
        className="bg-white text-black absolute bottom-1 w-[48%] my-2 left-[1%] border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
        disabled={loading}
      />

      <Send
        onClick={handleSubmit}
        className="absolute bottom-4 left-[46%] text-gray-500 cursor-pointer"
      />

      <div>
        <iframe src={pdfUrl + "#toolbar=0"} width={"100%"} height={"100%"} />
      </div>
    </div>
  );
};

export default Workspace;
