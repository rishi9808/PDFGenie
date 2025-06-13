import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Bot, Send, User } from "lucide-react";
import { useEffect, useState, useRef, useMemo } from "react";

interface ChatSectionProps {
  fileId: string;
}

const ChatSection = ({ fileId }: ChatSectionProps) => {
  const STORE = (typeof window === "undefined" ? null : window)?.sessionStorage;
  const STORE_KEY = "ConvexSessionId";

  function useSessionId() {
    const [sessionId] = useState(
      () => STORE?.getItem(STORE_KEY) ?? crypto.randomUUID()
    );
    // Get or set the ID from our desired storage location, whenever it changes.
    useEffect(() => {
      STORE?.setItem(STORE_KEY, sessionId);
    }, [sessionId]);

    return sessionId;
  }

  const sessionId = useSessionId();
  const remoteMessages = useQuery(api.messages.list, { sessionId });
  const welcomeMessage =
    "Welcome to the PDF assistant! You can ask me questions about the content of the PDF.";

  const messages = useMemo(
    () =>
      [{ isViewer: false, text: welcomeMessage, _id: "0" }].concat(
        (remoteMessages ?? []) as {
          isViewer: boolean;
          text: string;
          _id: string;
        }[]
      ),
    [remoteMessages, welcomeMessage]
  );

  const sendMessage = useMutation(api.messages.send);
  const [isScrolled, setScrolled] = useState(false);
  const [input, setInput] = useState("");

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendMessage({
      message: input,
      fileId: fileId as string,
      sessionId,
    });
    setInput("");
    setScrolled(false);
  };

  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isScrolled) {
      return;
    }
    // Using `setTimeout` to make sure scrollTo works on button click in Chrome
    setTimeout(() => {
      listRef.current?.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: "smooth",
      });
    }, 0);
  }, [messages, isScrolled]);

  return (
    <div className="flex flex-col border-r-2 bg-gray-100 border-gray-300 p-4 relative h-full">
      <div className="flex flex-col h-full">
        <p className="text-gray-600 mb-4">
          Ask questions about the content of the PDF.
        </p>

        <div
          ref={listRef}
          onWheel={() => {
            setScrolled(true);
          }}
          className="flex-1 flex-grow overflow-y-auto mb-16 chat-container"
        >
          <div className="">
            {remoteMessages === undefined ? (
              <>
                <div className="animate-pulse rounded-md bg-black/10 h-5" />
                <div className="animate-pulse rounded-md bg-black/10 h-9" />
              </>
            ) : (
              messages.map((message) => (
                <div key={message._id}>
                  <div
                    className={
                      "text-white text-sm w-full flex " +
                      (message.isViewer ? "justify-end" : "justify-start")
                    }
                  >
                    {!message.isViewer && <Bot className="text-gray-500 mr-2 size-5" />}
                    {message.text === "" ? (
                      <div className="animate-pulse rounded-md bg-blue-300 h-9" />
                    ) : (
                      <div className={"whitespace-pre-wrap flex items-center "}>
                        <p
                          className={
                            "rounded-xl px-3 py-2 " +
                            (message.isViewer
                              ? "bg-purple-400 mt-3  "
                              : "bg-blue-500 mt-3 mr-2 w-fit") +
                            (message.isViewer
                              ? "rounded-tr-none"
                              : "rounded-tl-none")
                          }
                        >
                          {message.text}
                        </p>
                        {message.isViewer && <User className="text-gray-500 ml-2 size-5" />}
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend(e);
          }
        }}
        placeholder="Type your question here..."
        className="bg-white text-black absolute bottom-1 w-[98%] my-2 left-[1%] border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
      />

      <Send
        onClick={handleSend}
        className="absolute bottom-4 right-8 text-gray-500 cursor-pointer"
      />
    </div>
  );
};

export default ChatSection;