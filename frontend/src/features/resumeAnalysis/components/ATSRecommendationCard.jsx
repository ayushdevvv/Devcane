import { Lightbulb } from "lucide-react";

const ATSRecommendationCard = ({ tips = [] }) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="h-8 w-8 rounded-lg bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center">
        <Lightbulb size={15} className="text-[#f59e0b]" />
      </div>
      <h2 className="text-base font-bold text-white">ATS Recommendations</h2>
    </div>
    <div className="space-y-2.5">
      {tips.map((tip, i) => (
        <div key={i} className="flex gap-3 items-start bg-[#0a1428] border border-[#1a2d4a] rounded-xl px-4 py-3">
          <span className="text-[#f59e0b] font-black text-xs mt-0.5 flex-shrink-0">{String(i + 1).padStart(2, "0")}</span>
          <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ATSRecommendationCard;