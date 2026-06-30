import { FiCode, FiFileText, FiBookOpen, FiCpu, FiSettings, FiInfo, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";


const products = [
  { title: "AI Assistant",    desc: "Generate • Debug • Review • Explain", icon: FiCode,     live: true,  href: "/chat" },
  { title: "Resume Analyzer", desc: "ATS Score & AI Review",               icon: FiFileText, live: false },
  { title: "Study Hub",       desc: "Roadmaps & Learning Paths",           icon: FiBookOpen, live: false },
  { title: "AI Playground",   desc: "Test prompts & models",               icon: FiCpu,      live: false },
];

const WorkspaceDrawer = ({ open, onClose }) => (
  <>
  
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${open ? "opacity-100 visible" : "opacity-0 invisible"}`}
    />

    {/* Drawer */}
    <aside className={`fixed top-0 left-0 z-50 h-full w-[min(360px,90vw)] bg-[#060d1a]/98 backdrop-blur-2xl border-r border-[#1a2d4a] shadow-2xl transition-all duration-300 flex flex-col ${open ? "translate-x-0" : "-translate-x-full"}`}>

      <div className="flex items-center justify-between px-5 sm:px-7 h-16 sm:h-20 border-b border-[#1a2d4a] flex-shrink-0">
        <Link to="/" onClick={onClose} className="flex items-center gap-3">
         
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-none"> Dev<span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">cane</span></h2>
            <p className="text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">AI Workspace</p>
          </div>
        </Link>
        <button onClick={onClose} className="h-9 w-9 rounded-xl bg-[#0a1428] border border-[#1a2d4a] hover:border-red-500/30 hover:text-red-400 flex items-center justify-center text-slate-400 transition">
          <FiX size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-4 font-bold">Workspace</p>

        <div className="space-y-2">
          {products.map((item) => {
            const Icon = item.icon;
            const content = (
              <div className="group flex items-start gap-3 sm:gap-4 rounded-2xl border border-transparent hover:border-[#22c55e]/20 hover:bg-[#0a1428] transition p-3 sm:p-4">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl sm:rounded-2xl bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className={item.live ? "text-[#22c55e]" : "text-slate-500"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-semibold text-sm truncate">{item.title}</h3>
                    {item.live
                      ? <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] font-bold flex-shrink-0">LIVE</span>
                      : <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/20 text-[#f59e0b] font-bold flex-shrink-0">SOON</span>
                    }
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            );
            return item.live
              ? <Link key={item.title} to={item.href} onClick={onClose}>{content}</Link>
              : <div key={item.title}>{content}</div>;
          })}
        </div>

        <div className="my-6 border-t border-[#1a2d4a]" />

        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3 font-bold">Resources</p>
        <div className="space-y-1">
          {[{ to: "/about", icon: FiInfo, label: "About" }, { to: "/settings", icon: FiSettings, label: "Settings" }].map(({ to, icon: Icon, label }) => (
            <Link key={label} to={to} onClick={onClose} className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-400 hover:text-white hover:bg-[#0a1428] transition text-sm">
              <Icon size={15} /> {label}
            </Link>
          ))}
        </div>
      </div>

      
      <div className="p-5 sm:p-6 border-t border-[#1a2d4a] flex-shrink-0">
        <div className="rounded-2xl border border-[#22c55e]/15 bg-gradient-to-br from-[#22c55e]/8 to-transparent p-4 sm:p-5">
          <p className="text-white font-bold text-sm">Devcane v1.0</p>
          <p className="text-xs text-slate-500 mt-1.5 leading-5">AI Assistant is live. More developer tools arriving soon.</p>
        </div>
      </div>
    </aside>
  </>
);

export default WorkspaceDrawer;