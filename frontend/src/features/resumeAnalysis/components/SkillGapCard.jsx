import { AlertTriangle } from "lucide-react";

const severity = {
  low:    "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/20",
  medium: "text-orange-400 bg-orange-500/10 border-orange-500/20",
  high:   "text-red-400 bg-red-500/10 border-red-500/20",
};

const SkillGapCard = ({ skillGap = [] }) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-4">
      <AlertTriangle size={15} className="text-[#f59e0b]" />
      <h2 className="text-base font-bold text-white">Skill Gap</h2>
    </div>
    {skillGap.length === 0
      ? <p className="text-slate-500 text-sm">No major skill gaps detected.</p>
      : <div className="space-y-2.5">
          {skillGap.map((item, i) => (
            <div key={i} className="flex justify-between items-center bg-[#0a1428] border border-[#1a2d4a] rounded-xl px-4 py-3">
              <span className="text-slate-300 text-sm font-medium">{item.skill}</span>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border capitalize ${severity[item.severity]}`}>{item.severity}</span>
            </div>
          ))}
        </div>
    }
  </div>
);

export default SkillGapCard;