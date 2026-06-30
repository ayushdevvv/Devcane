import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAIContext } from "../../AI/services/ai.context";
import { FiMessageSquare, FiArrowRight, FiClock, FiCode, FiFileText, FiBook, FiPlus } from "react-icons/fi";
import { BsStars } from "react-icons/bs";

const tools = [
  { icon: FiCode,     label: "AI Assistant",     sub: "Generate, debug, review code", live: true,  to: "/chat",  color: "text-blue-400",  bg: "bg-blue-500/10",  border: "border-blue-500/20" },
  { icon: FiFileText, label: "Resume Analyzer",  sub: "ATS score & AI feedback",      live: false, to: "#",      color: "text-[#f59e0b]", bg: "bg-[#f59e0b]/10", border: "border-[#f59e0b]/20" },
  { icon: FiBook,     label: "Study Hub",        sub: "Roadmaps & learning paths",    live: false, to: "#",      color: "text-[#22c55e]", bg: "bg-[#22c55e]/10", border: "border-[#22c55e]/20" },
];

const RecentActivity = () => {
  const { sessions, fetchSessions, loadChat } = useAIContext();
  const navigate = useNavigate();

  useEffect(() => { fetchSessions(); }, []);

  return (
    <section className="px-4 sm:px-6 pb-16 sm:pb-28">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-14">

        {/* Tools row */}
        <div>
          <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest mb-4 sm:mb-5">Your Tools</p>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {tools.map(({ icon: Icon, label, sub, live, to, color, bg, border }) => (
              <Link
                key={label}
                to={to}
                className={`group relative overflow-hidden rounded-2xl border ${border} bg-[#060d1a] p-5 sm:p-6 transition-all duration-300 ${live ? "hover:-translate-y-1 hover:border-opacity-60" : "opacity-80"}`}
              >
                {!live && (
                  <span className="absolute top-3 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full bg-[#0a1428] border border-[#1a2d4a] text-slate-500">SOON</span>
                )}
                <div className={`h-11 w-11 rounded-xl border flex items-center justify-center mb-4 ${bg} ${border}`}>
                  <Icon size={18} className={color} />
                </div>
                <h3 className="text-[14px] font-bold text-white">{label}</h3>
                <p className="text-slate-500 text-xs mt-1">{sub}</p>
                {live && (
                  <div className="flex items-center gap-1.5 mt-4 text-blue-400 text-xs font-bold">
                    Open <FiArrowRight size={12} className="group-hover:translate-x-1 transition" />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div>
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <p className="text-[10px] sm:text-xs text-[#22c55e] font-bold uppercase tracking-widest">Recent Activity</p>
            {sessions.length > 0 && (
              <button onClick={() => navigate("/chat")} className="text-xs text-blue-400 hover:text-blue-300 transition font-semibold">View all →</button>
            )}
          </div>

          <div className="rounded-2xl sm:rounded-3xl border border-[#1a2d4a] bg-[#060d1a] overflow-hidden">
            {sessions.length === 0 ? (
              <div className="text-center py-14 sm:py-20 px-4">
                <FiClock size={28} className="mx-auto text-slate-700 mb-4" />
                <h3 className="text-base sm:text-lg font-bold text-white">No activity yet</h3>
                <p className="text-slate-500 mt-1.5 text-sm">Start your first AI conversation to see it here.</p>
                <button onClick={() => navigate("/chat")} className="mt-6 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-5 py-2.5 rounded-xl font-bold text-sm transition">
                  <FiPlus size={14} /> Start Chat
                </button>
              </div>
            ) : (
              sessions.slice(0, 6).map((chat) => (
                <button
                  key={chat.sessionId}
                  onClick={() => { loadChat(chat.sessionId); navigate("/chat"); }}
                  className="w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#101827] last:border-0 hover:bg-[#08111d] transition"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    <div className="h-9 w-9 sm:h-10 sm:w-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <FiMessageSquare size={15} className="text-blue-400" />
                    </div>
                    <div className="text-left min-w-0">
                      <h3 className="font-semibold text-sm truncate">{chat.title || "Untitled Chat"}</h3>
                      <p className="text-xs text-slate-600 mt-0.5">Continue conversation</p>
                    </div>
                  </div>
                  <FiArrowRight size={14} className="text-slate-600 flex-shrink-0 ml-3" />
                </button>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default RecentActivity;