import { Lightbulb } from "lucide-react";
import Card from "../../shared/components/Card";
import CardHeader from "../../shared/components/CardHeader";

const ATSRecommendationCard = ({ tips = [] }) => (
  <Card>
    <CardHeader icon={Lightbulb} tone="amber" title="ATS Recommendations" />
    <div className="space-y-2.5">
      {tips.map((tip, i) => (
        <div key={i} className="flex gap-3 items-start bg-[#0a1428] border border-[#1a2d4a] rounded-xl px-4 py-3">
          <span className="text-[#f59e0b] font-black text-xs mt-0.5 flex-shrink-0">
            {String(i + 1).padStart(2, "0")}
          </span>
          <p className="text-slate-300 text-sm leading-relaxed">{tip}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default ATSRecommendationCard;