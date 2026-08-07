import { FiAlertCircle, FiZap } from "react-icons/fi";

const formatReset = (resetAt) => {
  if (!resetAt) return "";
  return new Date(resetAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const QuotaBadge = ({ quota, label = "Daily Quota" }) => {
  if (!quota) return null;

  const { remaining, limit, resetAt } = quota;
  const used = limit - remaining;
  const pct = Math.round((remaining / limit) * 100);
  const exhausted = remaining <= 0;
  const low = remaining > 0 && remaining <= 2;

  if (exhausted) {
    return (
      <div className="w-full max-w-3xl mx-auto mb-6">
        <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-2xl px-5 py-4">
          <FiAlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-red-400 font-bold text-sm">Daily limit reached</p>
            <p className="text-slate-500 text-xs mt-0.5">
              You've used all {limit} today.
              {resetAt && (
                <>
                  {" "}
                  Resets at <span className="text-red-400 font-semibold">{formatReset(resetAt)}</span>.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className={`rounded-2xl border px-5 py-4 ${low ? "border-[#f59e0b]/25 bg-[#f59e0b]/5" : "border-[#1a2d4a] bg-[#060d1a]"}`}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <FiZap size={13} className={low ? "text-[#f59e0b]" : "text-blue-400"} />
            <span className="text-xs font-bold text-slate-400">{label}</span>
          </div>
          <span className={`text-xs font-black ${low ? "text-[#f59e0b]" : "text-white"}`}>
            {remaining} <span className="text-slate-600 font-normal">/ {limit} left</span>
          </span>
        </div>

        <div className="h-1.5 w-full bg-[#1a2d4a] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${low ? "bg-[#f59e0b]" : "bg-blue-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-slate-600">{used} used today</p>
          {resetAt && (
            <p className="text-[10px] text-slate-600">
              Resets at <span className={`font-semibold ${low ? "text-[#f59e0b]" : "text-slate-400"}`}>{formatReset(resetAt)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuotaBadge;