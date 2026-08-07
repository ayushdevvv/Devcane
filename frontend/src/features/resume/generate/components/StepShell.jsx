import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const StepShell = ({
  step,
  totalSteps,
  title,
  subtitle,
  children,
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled,
  loading,
  backLabel = "Back",
}) => {
  const pct = Math.round(((step + 1) / totalSteps) * 100);

  return (
    <div className="w-full max-w-2xl rounded-3xl border border-[#1a2d4a] bg-[#060d1a]/60 p-6 sm:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">
            Step {step + 1} of {totalSteps}
          </span>
          <span className="text-[10px] font-bold text-slate-600">{pct}%</span>
        </div>
        <div className="h-1.5 w-full bg-[#1a2d4a] rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-500 rounded-full transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <h2 className="text-xl sm:text-2xl font-black text-white mb-1">{title}</h2>
      {subtitle ? (
        <p className="text-slate-500 text-sm mb-6">{subtitle}</p>
      ) : (
        <div className="mb-6" />
      )}

      <div className="space-y-5">{children}</div>

      <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1a2d4a]">
        <button
          type="button"
          onClick={onBack}
          disabled={step === 0}
          className="inline-flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#03070f] disabled:opacity-30 disabled:cursor-not-allowed hover:border-blue-500/30 text-white px-4 py-2.5 text-sm font-bold transition"
        >
          <FiArrowLeft size={14} /> {backLabel}
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={nextDisabled || loading}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
        >
          {loading ? "Working..." : nextLabel} {!loading && <FiArrowRight size={14} />}
        </button>
      </div>
    </div>
  );
};

export default StepShell;