import { CheckCircle2 } from "lucide-react";
import Card from "../../shared/components/Card";
import CardHeader from "../../shared/components/CardHeader";

const StrengthCard = ({ strengths = [] }) => (
  <Card>
    <CardHeader icon={CheckCircle2} tone="green" title="Strengths" />
    <div className="space-y-3">
      {strengths.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <CheckCircle2 size={16} className="text-[#22c55e] flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default StrengthCard;