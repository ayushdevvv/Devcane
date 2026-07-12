import { CheckCircle2, XCircle } from "lucide-react";

const KeywordCard = ({
  matched = [],
  missing = [],
}) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <h2 className="text-base font-bold text-white mb-5">Keyword Analysis</h2>
    <div className="space-y-5">
      <div>
        <p className="text-xs font-bold text-[#22c55e] uppercase tracking-wider mb-3">Matched</p>
        <div className="flex flex-wrap gap-2">
          {matched.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-xs font-medium">
              <CheckCircle2 size={12} />{item}
            </span>
          ))}
        </div>
      </div>
      <div className="border-t border-[#1a2d4a] pt-5">
        <p className="text-xs font-bold text-red-400 uppercase tracking-wider mb-3">Missing</p>
        <div className="flex flex-wrap gap-2">
          {missing.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium">
              <XCircle size={12} />{item}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default KeywordCard;