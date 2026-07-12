import { CheckCircle2 } from "lucide-react";

const StrengthCard = ({ strengths = [] })=> (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <h2 className="text-base font-bold text-[#22c55e] mb-4">✦ Strengths</h2>
    <div className="space-y-3">
      {strengths.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <CheckCircle2 size={16} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export default StrengthCard;