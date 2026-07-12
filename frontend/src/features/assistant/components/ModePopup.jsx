import { Sparkles, Bug, SearchCheck, BookOpen } from "lucide-react";

const modes = [
  { id: "generate", label: "Generate Code", icon: Sparkles,    color: "text-[#f59e0b]" },
  { id: "debug",    label: "Debug Code",    icon: Bug,         color: "text-red-400" },
  { id: "review",   label: "Review Code",   icon: SearchCheck, color: "text-[#22c55e]" },
  { id: "explain",  label: "Explain Code",  icon: BookOpen,    color: "text-blue-400" },
];

const ModePopup = ({ open, mode, setMode, onClose }) => {
  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="absolute bottom-14 left-0 w-52 rounded-2xl border border-[#1a2d4a] bg-[#060d1a] shadow-2xl overflow-hidden z-50">
        {modes.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => { setMode(id); onClose(); }}
            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all
              ${mode === id
                ? `bg-[#0a1428] ${color} border-l-2 border-[#22c55e]`
                : "text-slate-400 hover:bg-[#0a1428] hover:text-white border-l-2 border-transparent"
              }`}
          >
            <Icon size={15} className={mode === id ? color : ""} />
            {label}
          </button>
        ))}
      </div>
    </>
  );
};

export default ModePopup;