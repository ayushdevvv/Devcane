import { useState, useRef } from "react";
import { SendHorizontal, Plus, X, Sparkles, Bug, SearchCheck, BookOpen, AlertCircle } from "lucide-react";
import { useAIContext } from "../services/ai.context";
import ModePopup from "./ModePopup";

const modeConfig = {
  generate: { label: "Generate",  icon: Sparkles,    color: "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10" },
  debug:    { label: "Debug",     icon: Bug,         color: "text-red-400 border-red-400/30 bg-red-400/10" },
  review:   { label: "Review",    icon: SearchCheck, color: "text-[#22c55e] border-[#22c55e]/30 bg-[#22c55e]/10" },
  explain:  { label: "Explain",   icon: BookOpen,    color: "text-blue-400 border-blue-400/30 bg-blue-400/10" },
};

const formatResetTime = (resetAt) => {
  if (!resetAt) return "";
  const date = new Date(resetAt);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const PromptInput = () => {
  const [prompt, setPrompt] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const textareaRef = useRef(null);
  const { sendMessage, loading, mode, setMode, quota } = useAIContext();

  const currentMode = modeConfig[mode] || modeConfig.generate;
  const ModeIcon = currentMode.icon;
  const quotaExhausted = quota && quota.remaining <= 0;
  const quotaLow = quota && quota.remaining > 0 && quota.remaining <= 5;

  const resize = () => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
  };

  const submit = async () => {
    if (!prompt.trim() || loading || quotaExhausted) return;
    const text = prompt;
    setPrompt("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
    await sendMessage(text);
  };


  if (quotaExhausted) {
    return (
      <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2 bg-gradient-to-t from-[#03070f] via-[#03070f]/95 to-transparent">
        <div className="max-w-3xl mx-auto">
          <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/5 p-5 sm:p-6 text-center">
            <div className="h-11 w-11 rounded-2xl bg-[#f59e0b]/10 border border-[#f59e0b]/25 flex items-center justify-center mx-auto mb-3">
              <AlertCircle size={20} className="text-[#f59e0b]" />
            </div>
            <h3 className="text-white font-bold text-[15px]">Today's quota completed</h3>
            <p className="text-slate-400 text-sm mt-1.5">
              You've used all {quota.limit} messages for today.
              {quota.resetAt && (
                <> Resets at <span className="text-[#f59e0b] font-semibold">{formatResetTime(quota.resetAt)}</span>.</>
              )}
            </p>
          </div>
          <p className="text-center text-[10px] text-slate-700 mt-2">
            Devcane AI can make mistakes. Always verify critical code.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-3 sm:px-6 pb-4 sm:pb-6 pt-2 bg-gradient-to-t from-[#03070f] via-[#03070f]/95 to-transparent">
      <div className="max-w-3xl mx-auto">
        <div className={`relative rounded-2xl border transition-all duration-200 bg-[#060d1a]
          ${loading
            ? "border-[#22c55e]/40 shadow-[0_0_25px_rgba(34,197,94,0.08)]"
            : "border-[#1a2d4a] hover:border-[#22c55e]/30 focus-within:border-[#22c55e]/50 focus-within:shadow-[0_0_25px_rgba(34,197,94,0.08)]"
          }`}
        >
          
          <div className="flex items-center justify-between gap-2 px-4 pt-3 pb-1">
            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  onClick={() => setPopupOpen(p => !p)}
                  className="h-7 w-7 rounded-lg bg-[#0a1428] border border-[#1a2d4a] hover:border-[#22c55e]/40 hover:text-[#22c55e] text-slate-500 flex items-center justify-center transition flex-shrink-0"
                >
                  {popupOpen ? <X size={13} /> : <Plus size={13} />}
                </button>
                <ModePopup
                  open={popupOpen}
                  mode={mode}
                  setMode={setMode}
                  onClose={() => setPopupOpen(false)}
                />
              </div>

              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${currentMode.color}`}>
                <ModeIcon size={11} />
                {currentMode.label}
              </div>
            </div>

        
            {quota && (
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold flex-shrink-0
                ${quotaLow
                  ? "text-[#f59e0b] border-[#f59e0b]/30 bg-[#f59e0b]/10"
                  : "text-slate-500 border-[#1a2d4a] bg-[#0a1428]"
                }`}
              >
                {quota.remaining}/{quota.limit} left
              </div>
            )}
          </div>

     
          <textarea
            ref={textareaRef}
            rows={1}
            value={prompt}
            onChange={(e) => { setPrompt(e.target.value); resize(); }}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); submit(); } }}
            placeholder="Ask Devcane anything..."
            disabled={loading}
            className="w-full bg-transparent outline-none resize-none text-white placeholder:text-slate-600 text-[14px] sm:text-[15px] leading-relaxed min-h-[52px] max-h-[160px] px-4 pt-2 pb-12 disabled:opacity-50"
          />

         
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-3 text-[10px] sm:text-[11px] text-slate-700">
              <span className={prompt.length > 3500 ? "text-[#f59e0b]" : ""}>{prompt.length}/4000</span>
            </div>
            <button
              onClick={submit}
              disabled={loading || !prompt.trim()}
              className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center shadow-lg shadow-[#22c55e]/20"
            >
              <SendHorizontal size={14} className="text-white" />
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-600 mt-2">
          Devcane AI can make mistakes. Always verify critical code.
        </p>
      </div>
    </div>
  );
};

export default PromptInput;