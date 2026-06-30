import { BsStars } from "react-icons/bs";
import { FiCode, FiMessageSquare, FiPlus, FiCopy } from "react-icons/fi";

const WorkspacePreview = () => (
  <section className="relative px-4 sm:px-6 pb-20 sm:pb-28">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-14">
        <p className="text-[10px] sm:text-xs text-[#22c55e] font-bold uppercase tracking-widest mb-3">Preview</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">See it in action</h2>
        <p className="mt-3 text-slate-500 text-sm sm:text-[15px]">A real look at the Devcane workspace</p>
      </div>

      <div className="rounded-2xl sm:rounded-[30px] border border-[#1a2d4a] bg-[#060d1a] shadow-[0_40px_120px_rgba(0,0,0,.5)] overflow-hidden">

        
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[#1a2d4a] bg-[#03070f]">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]/60" />
              <div className="h-2.5 w-2.5 rounded-full bg-[#22c55e]/60" />
            </div>
            <div className="px-3 py-1.5 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-xs text-slate-400 hidden sm:block">
              Devcane Workspace
            </div>
            <span className="text-xs text-slate-400 sm:hidden font-medium">Devcane</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl border border-[#22c55e]/20 bg-[#22c55e]/8 text-[10px] sm:text-xs text-[#22c55e] font-bold">
              AI Assistant
            </div>
            <button className="h-7 w-7 sm:h-9 sm:w-9 rounded-lg sm:rounded-xl bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center text-slate-400">
              <FiPlus size={13} />
            </button>
          </div>
        </div>

        
        <div className="flex flex-col lg:grid lg:grid-cols-[220px_1fr]">

        
          <aside className="hidden lg:block border-r border-[#1a2d4a] bg-[#03070f] p-4">
            <button className="w-full rounded-xl bg-[#22c55e] text-white py-2.5 font-bold text-sm">
              + New Chat
            </button>
            <div className="mt-5">
              <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3 font-bold">Recent Chats</p>
              <div className="space-y-1.5">
                {["JWT Authentication", "React Hooks", "Node API Review", "Tailwind Design"].map((chat) => (
                  <button key={chat} className="w-full text-left px-3 py-2.5 rounded-xl bg-[#060d1a] border border-transparent hover:border-[#22c55e]/15 text-xs text-slate-400 transition">
                    {chat}
                  </button>
                ))}
              </div>
            </div>
          </aside>

         
          <div className="lg:hidden flex items-center gap-2 px-4 py-3 border-b border-[#1a2d4a] bg-[#03070f] overflow-x-auto scrollbar-none">
            <button className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#22c55e] text-white text-xs font-bold">
              <FiPlus size={11} /> New
            </button>
            {["JWT Auth", "React Hooks", "Node API"].map((chat) => (
              <button key={chat} className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-xs text-slate-400 whitespace-nowrap">
                {chat}
              </button>
            ))}
          </div>

          <main className="flex flex-col bg-[#060d1a]">
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
             
              <div className="flex justify-end">
                <div className="rounded-2xl rounded-br-sm bg-gradient-to-r from-[#22c55e] to-[#16a34a] px-4 py-3 max-w-[85%] sm:max-w-md text-white text-xs sm:text-sm shadow-lg">
                  Review my authentication middleware and optimize it.
                </div>
              </div>

              {/* AI */}
              <div className="flex gap-2.5 sm:gap-3">
                <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center shadow-lg flex-shrink-0">
                  <BsStars size={13} className="text-white" />
                </div>
                <div className="flex-1 min-w-0 rounded-2xl rounded-tl-sm bg-[#0a1428] border border-[#1a2d4a] p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#f59e0b] text-[9px] sm:text-[10px] uppercase tracking-widest font-black">Devcane AI</span>
                    <button className="text-slate-600"><FiCopy size={12} /></button>
                  </div>
                  <p className="text-slate-300 text-xs sm:text-sm leading-6 sm:leading-7">
                    Your auth flow is working, but the middleware performs repeated DB lookups. Cache the decoded token payload for better scalability.
                  </p>
                  <div className="mt-3 sm:mt-4 rounded-xl bg-[#03070f] border border-[#22c55e]/10 overflow-hidden">
                    <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-b border-[#1a2d4a]">
                      <div className="flex items-center gap-1.5 text-[#22c55e] text-[10px] sm:text-xs font-bold">
                        <FiCode size={11} /> javascript
                      </div>
                      <button className="text-slate-600"><FiCopy size={11} /></button>
                    </div>
                    <pre className="p-3 sm:p-4 text-[11px] sm:text-xs text-[#22c55e] mono leading-6 overflow-x-auto">
{`const decoded = jwt.verify(token, SECRET);
req.user = decoded;
next();`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>

            
            <div className="border-t border-[#1a2d4a] bg-[#03070f] p-3 sm:p-4">
              <div className="rounded-xl sm:rounded-2xl border border-[#1a2d4a] bg-[#060d1a] p-3 sm:p-4">
                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <button className="h-7 w-7 rounded-lg bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center text-slate-500">
                    <FiPlus size={12} />
                  </button>
                  <div className="flex items-center gap-1.5 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/8 px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs text-[#22c55e] font-bold">
                    <FiMessageSquare size={10} /> Debug
                  </div>
                </div>
                <div className="rounded-lg sm:rounded-xl bg-[#0a1428] border border-[#1a2d4a] px-3 sm:px-4 py-2.5 sm:py-3 text-slate-600 text-xs sm:text-sm">
                  Ask Devcane anything...
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  </section>
);

export default WorkspacePreview;