import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import GlowBackground from "../../shared/components/GlowBackground";
import TopBar from "../../shared/components/TopBar";
import PageHero from "../../shared/components/PageHero";
import QuotaBadge from "../../shared/components/QuotaBadge";

import ResumeUploadCard from "../components/ResumeUploadCard";
import { useResumeAnalysis } from "../services/Analysis.context";

const ResumeUpload = () => {
  const navigate = useNavigate();
  const { analyzeResume, quota, loading } = useResumeAnalysis();

  const handleAnalyze = async (formData) => {
    try {
      const analysis = await analyzeResume(formData);
      if (!analysis?._id) {
        toast.error("Couldn't analyze your resume.");
        return;
      }
      toast.success("Resume analyzed successfully!");
      navigate(`/resume-analysis/${analysis._id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-[#020817] flex items-center justify-center">
      <div className="flex flex-col items-center gap-5">
        <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
        <p className="text-white text-lg font-semibold">
          Analyzing
        </p>
      </div>
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#03070f] text-white relative overflow-x-hidden">
      <GlowBackground />
      <TopBar backTo="/dashboard" backLabel="Dashboard" />

      <div className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">
        <PageHero
          badge="AI-Powered Analysis"
          title="Resume"
          highlight="Analyzer"
        />

        <QuotaBadge quota={quota} label="Daily Resume Quota" />

        <div className="w-full max-w-3xl">
          <ResumeUploadCard onAnalyze={handleAnalyze} disabled={quota?.remaining <= 0} />
        </div>
      </div>
    </div>
  );
};

export default ResumeUpload;