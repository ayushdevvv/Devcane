import { CircleAlert } from "lucide-react";

const WeaknessCard = ({ weaknesses = [] }) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <h2 className="text-base font-bold text-red-400 mb-4">✦ Weaknesses</h2>
    <div className="space-y-3">
      {weaknesses.map((item, i) => (
        <div key={i} className="flex gap-3 items-start">
          <CircleAlert size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
          <p className="text-slate-300 text-sm leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  </div>
);

export default WeaknessCard;