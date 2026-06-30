import { BsStars } from "react-icons/bs";

const TypingIndicator = () => (
  <div className="flex justify-start px-2">
    <div className="flex items-start gap-3">
      <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-[#f59e0b]/20">
        <BsStars size={13} className="text-white" />
      </div>
      <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl rounded-tl-sm overflow-hidden shadow-xl">
        <div className="px-4 py-2.5 border-b border-[#1a2d4a]">
          <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-widest">Devcane AI</span>
        </div>
        <div className="px-5 py-4 flex items-center gap-1.5">
          <span className="text-xs text-slate-600 mono mr-2">Thinking</span>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-2 w-2 rounded-full bg-[#22c55e] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: "0.8s" }}
            />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default TypingIndicator;