import { Rocket } from "lucide-react";

const RoadmapCard = ({ roadmap = [] }) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-5">
      <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <Rocket size={15} className="text-blue-400" />
      </div>

      <h2 className="text-base font-bold text-white">
        Improvement Roadmap
      </h2>
    </div>

    {roadmap.length === 0 ? (
      <p className="text-slate-500 text-sm">
        No roadmap generated.
      </p>
    ) : (
      <div className="space-y-3">
        {roadmap.map((step, i) => (
          <div
            key={i}
            className="flex gap-4 bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-4"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-500 flex items-center justify-center font-black text-white text-xs flex-shrink-0 shadow-lg shadow-blue-900/30">
              {i + 1}
            </div>

            <p className="text-slate-300 text-sm leading-6">
              {step}
            </p>
          </div>
        ))}
      </div>
    )}
  </div>
);

export default RoadmapCard;