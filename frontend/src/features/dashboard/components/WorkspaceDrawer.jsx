import {
  FiCode,
  FiFileText,
  FiSettings,
  FiInfo,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const products = [
  {
    title: "AI Assistant",
    desc: "Generate • Debug • Review • Explain",
    icon: FiCode,
    live: true,
    href: "/chat",
  },
  {
    title: "Resume Analyzer",
    desc: "ATS Score • AI Review • PDF Report",
    icon: FiFileText,
    live: true,
    href: "/resume-analysis",
  },
  {
    title: "Resume Builder",
    desc: "Build professional resumes with AI",
    icon: FiFileText,
    live: false,
  },
];

const WorkspaceDrawer = ({ open, onClose }) => (
  <>
    <div
      onClick={onClose}
      className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        open ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    />

    <aside
      className={`fixed top-0 left-0 z-50 h-full w-[min(360px,90vw)] bg-[#060d1a]/98 backdrop-blur-2xl border-r border-[#1a2d4a] shadow-2xl transition-all duration-300 flex flex-col ${
        open ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Header */}

      <div className="flex items-center justify-between px-5 sm:px-7 h-16 sm:h-20 border-b border-[#1a2d4a] flex-shrink-0">
        <Link to="/" onClick={onClose} className="flex items-center gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-black text-white leading-none">
              Dev
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
                cane
              </span>
            </h2>

            <p className="text-[9px] uppercase tracking-widest text-slate-600 mt-0.5">
              AI Workspace
            </p>
          </div>
        </Link>

        <button
          onClick={onClose}
          className="h-9 w-9 rounded-xl bg-[#0a1428] border border-[#1a2d4a] hover:border-red-500/30 hover:text-red-400 flex items-center justify-center text-slate-400 transition"
        >
          <FiX size={16} />
        </button>
      </div>

      {/* Workspace */}

      <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-6">
        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-4 font-bold">
          Workspace
        </p>

        <div className="space-y-2">
          {products.map((item) => {
            const Icon = item.icon;

            const card = (
              <div className="group flex items-start gap-4 rounded-2xl border border-transparent hover:border-[#22c55e]/20 hover:bg-[#0a1428] transition-all duration-300 p-4">
                <div className="h-12 w-12 rounded-2xl bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center flex-shrink-0">
                  <Icon
                    size={20}
                    className={
                      item.live ? "text-[#22c55e]" : "text-slate-500"
                    }
                  />
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-white font-semibold text-sm">
                      {item.title}
                    </h3>

                    {item.live ? (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border border-[#22c55e]/20 bg-[#22c55e]/10 text-[#22c55e]">
                        LIVE
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border border-[#f59e0b]/20 bg-[#f59e0b]/10 text-[#f59e0b]">
                        SOON
                      </span>
                    )}
                  </div>

                  <p className="mt-1 text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            );

            return item.live ? (
              <Link key={item.title} to={item.href} onClick={onClose}>
                {card}
              </Link>
            ) : (
              <div key={item.title}>{card}</div>
            );
          })}
        </div>

        <div className="my-6 border-t border-[#1a2d4a]" />

        {/* Resources */}

        <p className="text-[10px] uppercase tracking-widest text-slate-600 mb-3 font-bold">
          Resources
        </p>

        <div className="space-y-1">
          {[
            { to: "/about", icon: FiInfo, label: "About" },
            { to: "/settings", icon: FiSettings, label: "Settings" },
          ].map(({ to, icon: Icon, label }) => (
            <Link
              key={label}
              to={to}
              onClick={onClose}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-slate-400 hover:text-white hover:bg-[#0a1428] transition"
            >
              <Icon size={15} />
              {label}
            </Link>
          ))}
        </div>
      </div>

    

      <div className="p-5 sm:p-6 border-t border-[#1a2d4a] flex-shrink-0">
        <div className="rounded-2xl border border-[#22c55e]/15 bg-gradient-to-br from-[#22c55e]/10 to-transparent p-5">
          <p className="text-white font-bold text-sm">Devcane v1.1</p>

          <p className="mt-2 text-xs text-slate-500 leading-5">
            AI Assistant and Resume Analyzer are now live. More AI-powered
            developer tools are coming soon.
          </p>
        </div>
      </div>
    </aside>
  </>
);

export default WorkspaceDrawer;