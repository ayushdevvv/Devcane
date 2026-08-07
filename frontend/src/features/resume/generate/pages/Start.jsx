import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { FiEdit3 } from "react-icons/fi";
import { toast } from "react-toastify";

import GlowBackground from "../../shared/components/GlowBackground";
import TopBar from "../../shared/components/TopBar";
import PageHero from "../../shared/components/PageHero";
import UploadCard from "../../shared/components/UploadCard";
import OrDivider from "../../shared/components/OrDivider";
import QuotaBadge from "../../shared/components/QuotaBadge";

import { useResumeGenerate } from "../services/generate.context";

const GenerateStart = () => {
  const navigate = useNavigate();

  const {
    submitImport,
    loading,
    quota,
  } = useResumeGenerate();

  const [file, setFile] = useState(null);

  const handleGenerate = async () => {
    if (!file) {
      toast.error("Please choose a resume file first.");
      return;
    }

    try {
      const built = await submitImport(file);
      toast.success("Resume generated successfully!");
      navigate(`/resume-generate/${built._id}`);
    } catch {}
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020817] flex items-center justify-center">
        <div className="flex flex-col items-center gap-5">
          <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
          <p className="text-white font-semibold text-lg">
            Generating your resume...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020817] relative overflow-hidden">
      <GlowBackground />
      <TopBar />

      <div className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">
        <PageHero
          badge="AI Resume Builder"
          title="Build"
          highlight="Resume"
          subtitle="Import your existing resume to polish it instantly, or build a brand new one from scratch."
        />

        <QuotaBadge
          quota={quota}
          label="Daily Resume Generation Quota"
        />

        <div className="w-full max-w-xl rounded-3xl border border-[#1a2d4a] bg-[#060d1a]/60 p-6 sm:p-8">
          <UploadCard
            title="Import Resume"
            subtitle="PDF, PNG or JPG · we'll rewrite and polish it"
            file={file}
            onFileChange={setFile}
          />

          {file && (
            <button
              onClick={handleGenerate}
              disabled={quota?.remaining <= 0}
              className="w-full mt-5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white px-5 py-3 rounded-xl text-sm font-bold transition"
            >
              Generate
            </button>
          )}

          <OrDivider />

          <Link
            to="/resume-generate/build"
            className={`w-full inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-bold transition ${
              quota?.remaining <= 0
                ? "pointer-events-none opacity-50 border-slate-700"
                : "border-[#1a2d4a] bg-[#03070f] hover:border-blue-500/30 text-white"
            }`}
          >
            <FiEdit3 size={15} />
            Build From Scratch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GenerateStart;
