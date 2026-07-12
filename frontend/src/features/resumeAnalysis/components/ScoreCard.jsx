import { Award } from "lucide-react";

const ScoreCard = ({ score }) => {
  const pct = Math.max(0, Math.min(score, 100));

  const color =
    score >= 80
      ? "#22c55e"
      : score >= 65
      ? "#3b82f6"
      : score >= 50
      ? "#f59e0b"
      : "#ef4444";

  const label =
    score >= 90
      ? "Excellent"
      : score >= 80
      ? "Strong"
      : score >= 65
      ? "Good"
      : score >= 50
      ? "Average"
      : "Needs Improvement";

  const circumference = 2 * Math.PI * 48;
  const offset = circumference - (pct / 100) * circumference;

  return (
    <div className="rounded-3xl border border-[#1a2d4a] bg-[#060d1a] p-6 sm:p-8 shadow-xl shadow-black/40">

      <div className="flex flex-col sm:flex-row items-center justify-between gap-8">

        {/* Left */}
        <div className="flex-1 w-full">

          <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500 font-bold">
            Overall ATS Score
          </p>

          <div className="mt-3 flex items-end gap-2">
            <h2
              className="text-5xl sm:text-6xl font-black"
              style={{ color }}
            >
              {score}
            </h2>

            <span className="text-slate-500 text-2xl mb-1">
              /100
            </span>
          </div>

          <span
            className="inline-flex mt-4 px-3 py-1 rounded-full border text-xs font-bold"
            style={{
              color,
              borderColor: `${color}40`,
              background: `${color}15`,
            }}
          >
            {label}
          </span>

          <p className="mt-5 text-sm text-slate-500 leading-6 max-w-md">
            ATS compatibility calculated using keyword relevance, formatting,
            readability and recruiter expectations.
          </p>

        </div>

        {/* Circular Score */}
        <div className="relative h-36 w-36 flex-shrink-0">

          <svg
            className="-rotate-90"
            width="144"
            height="144"
          >
            <circle
              cx="72"
              cy="72"
              r="48"
              stroke="#1a2d4a"
              strokeWidth="10"
              fill="none"
            />

            <circle
              cx="72"
              cy="72"
              r="48"
              stroke={color}
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              style={{
                transition: "stroke-dashoffset .8s ease",
              }}
            />
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Award
              size={24}
              style={{ color }}
            />

            <span
              className="mt-1 text-2xl font-black"
              style={{ color }}
            >
              {score}
            </span>
          </div>

        </div>

      </div>

      {/* Progress */}

      <div className="mt-8">

        <div className="flex justify-between text-[10px] text-slate-600 mb-2">
          <span>0</span>
          <span>50</span>
          <span>100</span>
        </div>

        <div className="h-2 rounded-full bg-[#111b2f] overflow-hidden">

          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${pct}%`,
              background: color,
            }}
          />

        </div>

      </div>

    </div>
  );
};

export default ScoreCard;