import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FiPlus, FiMessageSquare, FiTrash2, FiGrid } from "react-icons/fi";
import { useAIContext } from "../services/ai.context";

const Sidebar = ({ open, onClose }) => {
  const { sessions, sessionId, newChat, fetchSessions, loadChat, removeSession } = useAIContext();

  useEffect(() => { fetchSessions(); }, []);

  const handleNewChat = () => {
    newChat();
    onClose?.();
  };

  const handleLoadChat = (id) => {
    loadChat(id);
    onClose?.();
  };

  return (
    <>
      {open && (
        <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30" onClick={onClose} />
      )}

      <aside className={`
        fixed lg:relative z-40 h-full
        bg-[#060d1a] border-r border-[#1a2d4a]
        transition-all duration-300 overflow-hidden flex-shrink-0
        ${open ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-0"}
      `}>
        <div className="w-64 h-full flex flex-col">

          {/* Logo */}
          <div className="px-5 pt-5 pb-4 border-b border-[#1a2d4a]">
            <Link to="/dashboard" className="flex items-center gap-2.5 mb-5">
              <div>
                <h1 className="text-white font-bold text-[14px] tracking-wide">
                  Dev<span className="text-blue-400">cane</span>
                </h1>
                <p className="text-[10px] text-slate-600">AI Developer Workspace</p>
              </div>
            </Link>

            <button
              onClick={handleNewChat}
              className="w-full h-10 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] flex items-center justify-center gap-2 font-bold text-sm text-white transition-all hover:shadow-lg hover:shadow-[#22c55e]/20"
            >
              <FiPlus size={15} /> New Chat
            </button>
          </div>

          {/* Sessions */}
          <div className="flex-1 overflow-y-auto px-3 py-4">
            <p className="text-[10px] uppercase tracking-widest text-slate-600 px-2 mb-3 font-bold">
              Recent Chats
            </p>

            {sessions.length === 0 ? (
              <div className="mt-8 text-center">
                <FiMessageSquare size={24} className="text-slate-700 mx-auto mb-3" />
                <p className="text-xs text-slate-600">No conversations yet</p>
              </div>
            ) : (
              <div className="space-y-1">
                {sessions.map((chat) => (
                  <div
                    key={chat.sessionId}
                    onClick={() => handleLoadChat(chat.sessionId)}
                    className={`group flex items-center gap-2.5 px-3 py-2.5 rounded-xl cursor-pointer transition-all
                      ${sessionId === chat.sessionId
                        ? "bg-[#22c55e]/10 border border-[#22c55e]/25 text-white"
                        : "text-slate-400 hover:bg-[#0a1428] hover:text-white border border-transparent"
                      }`}
                  >
                    <FiMessageSquare size={13} className="flex-shrink-0 opacity-60" />
                    <span className="flex-1 truncate text-[13px]">{chat.title || "Untitled"}</span>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSession(chat.sessionId); }}
                      className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-red-500/20 hover:text-red-400 transition-all"
                    >
                      <FiTrash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Back to Dashboard — bottom left */}
          <div className="px-3 pt-2">
            <Link
              to="/dashboard"
              onClick={onClose}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-slate-400 hover:text-white hover:bg-[#0a1428] border border-transparent hover:border-[#1a2d4a] transition-all text-[13px] font-medium"
            >
              <FiGrid size={14} />
              Back to Dashboard
            </Link>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1a2d4a] mt-2">
            <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-3">
              <p className="text-xs font-bold text-white">Devcane Free</p>
              <p className="text-[11px] text-slate-600 mt-0.5">Unlimited AI conversations</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;