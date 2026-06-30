import { PanelLeftClose, PanelLeftOpen, Settings } from "lucide-react";
import { Link } from "react-router-dom";


const ChatHeader = ({ title, sidebarOpen, onToggleSidebar }) => (
  <header className="h-14 border-b border-[#1a2d4a] bg-[#060d1a] flex items-center justify-between px-4 flex-shrink-0">
    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
      <button
        onClick={onToggleSidebar}
        className="h-9 w-9 rounded-xl flex items-center justify-center text-slate-300 hover:text-white hover:bg-[#0a1428] border border-transparent hover:border-blue-500/30 transition flex-shrink-0"
      >
        {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
      </button>

     
      {!sidebarOpen && (
        <Link to="/dashboard" className="flex items-center gap-2 flex-shrink-0">
     
          <span className="hidden sm:block text-sm font-black text-white">
            Dev<span className="text-blue-400">cane</span>
          </span>
        </Link>
      )}

      <div className="min-w-0 flex-1 border-l border-[#1a2d4a] pl-3 ml-1">
        <p className="text-[14px] sm:text-[15px] font-bold text-white truncate">
          {title || "New Chat"}
        </p>
        <p className="text-[10px] text-slate-500 hidden sm:block">Devcane AI</p>
      </div>
    </div>

    <div className="flex items-center gap-2 flex-shrink-0">
      <div className="hidden sm:flex items-center gap-1.5 bg-blue-500/10 border border-blue-500/25 px-3 py-1.5 rounded-full">
        <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-bold text-blue-400">AI Assistant</span>
      </div>
      <Link to="/settings" className="h-9 w-9 rounded-xl flex items-center justify-center border border-[#1a2d4a] bg-[#0a1428] text-slate-400 hover:text-blue-400 hover:border-blue-500/40 transition">
        <Settings size={16} />
      </Link>
    </div>
  </header>
);

export default ChatHeader;