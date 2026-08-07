import { Rocket } from "lucide-react";
import Card from "../../shared/components/Card";
import CardHeader from "../../shared/components/CardHeader";

const RoadmapCard = ({ roadmap = [] }) => (
  <Card>
    <CardHeader icon={Rocket} tone="blue" title="Improvement Roadmap" className="mb-5" />

    {roadmap.length === 0 ? (
      <p className="text-slate-500 text-sm">No roadmap generated.</p>
    ) : (
      <div className="space-y-3">
        {roadmap.map((step, i) => (
          <div key={i} className="flex gap-4 bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-4">
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center font-black text-white text-xs flex-shrink-0 shadow-lg shadow-blue-900/30">
              {i + 1}
            </div>
            <p className="text-slate-300 text-sm leading-6">{step}</p>
          </div>
        ))}
      </div>
    )}
  </Card>
);

export default RoadmapCard;