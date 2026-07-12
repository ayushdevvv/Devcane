import { BsStars } from "react-icons/bs";
import { FiArrowLeft, FiSettings, FiAlertCircle, FiZap } from "react-icons/fi";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import ResumeUploadCard from "../components/ResumeUploadCard";
import { useResumeAnalysis } from "../services/ResumeAnalysis.context";

const formatReset = (resetAt) => {
  if (!resetAt) return "";
  return new Date(resetAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const QuotaBadge = ({ quota }) => {
  if (!quota) return null;

  const { remaining, limit, resetAt } = quota;
  const used = limit - remaining;
  const pct = Math.round((remaining / limit) * 100);
  const exhausted = remaining <= 0;
  const low = remaining > 0 && remaining <= 2;

  if (exhausted) return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-2xl px-5 py-4">
        <FiAlertCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-red-400 font-bold text-sm">Daily limit reached</p>
          <p className="text-slate-500 text-xs mt-0.5">
            You've used all {limit} analyses today.
            {resetAt && <> Resets at <span className="text-red-400 font-semibold">{formatReset(resetAt)}</span>.</>}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto mb-6">
      <div className={`rounded-2xl border px-5 py-4 ${low ? "border-[#f59e0b]/25 bg-[#f59e0b]/5" : "border-[#1a2d4a] bg-[#060d1a]"}`}>
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <FiZap size={13} className={low ? "text-[#f59e0b]" : "text-blue-400"} />
            <span className="text-xs font-bold text-slate-400">Daily Resume Quota</span>
          </div>
          <span className={`text-xs font-black ${low ? "text-[#f59e0b]" : "text-white"}`}>
            {remaining} <span className="text-slate-600 font-normal">/ {limit} left</span>
          </span>
        </div>

        
        <div className="h-1.5 w-full bg-[#1a2d4a] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${low ? "bg-[#f59e0b]" : "bg-blue-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <p className="text-[10px] text-slate-600">
            {used} used today
          </p>
          {resetAt && (
            <p className="text-[10px] text-slate-600">
              Resets at <span className={`font-semibold ${low ? "text-[#f59e0b]" : "text-slate-400"}`}>{formatReset(resetAt)}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

const ResumeUpload = () => {
  const navigate = useNavigate();
  const { analyzeResume, quota } = useResumeAnalysis();

  const handleAnalyze = async (formData) => {
    try {
      const analysis = await analyzeResume(formData);
      if (!analysis?._id) { toast.error("Couldn't analyze your resume."); return; }
      toast.success("Resume analyzed successfully!");
      navigate(`/resume-analysis/${analysis._id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#03070f] text-white relative overflow-x-hidden">

      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-blue-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[350px] h-[300px] bg-[#22c55e]/5 blur-[110px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {/* Sticky topbar */}
      <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#03070f]/80 backdrop-blur-xl border-b border-[#1a2d4a]">
        <Link to="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#060d1a] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:border-blue-500/30 transition">
          <FiArrowLeft size={15} /> Dashboard
        </Link>
        <Link to="/settings"
          className="inline-flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#060d1a] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:border-blue-500/30 transition">
          <FiSettings size={15} /> Settings
        </Link>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">

        {/* Hero */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">
            <BsStars size={12} /> AI-Powered Analysis
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
            Resume <span className="text-blue-400">Analyzer</span>
          </h1>
          <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-md mx-auto">
            Upload your resume and get instant ATS score, keyword gaps, strengths and a personalized improvement roadmap.
          </p>
        </div>

        {/* Quota badge */}
        <QuotaBadge quota={quota} />

        {/* Upload card */}
        <div className="w-full max-w-3xl">
          <ResumeUploadCard onAnalyze={handleAnalyze} disabled={quota?.remaining <= 0} />
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;