import { useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatHeader from "../components/ChatHeader";
import ChatWindow from "../components/ChatWindow";
import PromptInput from "../components/PromptInput";
import { useAIContext } from "../services/ai.context";

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { currentTitle } = useAIContext();

  return (
    <div className="h-screen h-[100dvh] overflow-hidden bg-[#03070f] text-white flex">

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col min-w-0 relative overflow-hidden">

 
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[#22c55e]/4 blur-[100px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#f59e0b]/3 blur-[80px] rounded-full" />
          <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:32px_32px]" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <ChatHeader
            title={currentTitle}
            sidebarOpen={sidebarOpen}
            onToggleSidebar={() => setSidebarOpen(p => !p)}
          />
          <ChatWindow />
          <PromptInput />
        </div>
      </main>
    </div>
  );
};

export default Chat;