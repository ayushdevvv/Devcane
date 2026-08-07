import { CircleAlert } from "lucide-react";
import Card from "../../shared/components/Card";
import CardHeader from "../../shared/components/CardHeader";

const WeaknessCard = ({ weaknesses = [] }) => (
  <Card>
    <CardHeader icon={CircleAlert} tone="red" title="Weaknesses" />
    <div className="space-y-3">
      {weaknesses.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <CircleAlert size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  </Card>
);

export default WeaknessCard;