import { useEffect, useRef } from "react";
import { useChatContext } from "../services/chat.context";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import Hero from "./Hero";

const ChatWindow = () => {
  const { messages, loading } = useChatContext();
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  if (messages.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto flex flex-col">
        <Hero />
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-3xl mx-auto px-3 sm:px-4 py-6 sm:py-8 space-y-5 sm:space-y-6">
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;