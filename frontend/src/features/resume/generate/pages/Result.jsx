import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

import GlowBackground from "../../shared/components/GlowBackground";
import TopBar from "../../shared/components/TopBar";
import PageHero from "../../shared/components/PageHero";
import GeneratedResult from "../../shared/components/GeneratedResult";

import { useResumeGenerate } from "../services/generate.context";
import { downloadGeneratedResume } from "../services/generate.api";

const GenerateResult = () => {
  const { id } = useParams();
  const { resume, loading, getResume } = useResumeGenerate();

  useEffect(() => {
    if (id) getResume(id);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#03070f] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-blue-400" />
          </div>
          <p className="text-slate-500 text-sm">Loading your resume...</p>
        </div>
      </div>
    );
  }

  if (!resume) {
    return (
      <div className="min-h-screen bg-[#03070f] flex items-center justify-center px-4 text-center">
        <div>
          <p className="text-white font-bold text-lg mb-2">Resume not found</p>
          <p className="text-slate-500 text-sm mb-5">It may have failed to generate. Try again.</p>
          <Link
            to="/resume-generate"
            className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
          >
            Start Over
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#03070f] text-white relative overflow-x-hidden">
      <GlowBackground />
      <TopBar backTo="/resume-generate" backLabel="Start Over" />

      <div className="relative z-10 flex flex-col items-center px-4 py-10 sm:py-14">
        <PageHero
          badge="AI Resume Builder"
          title="Your"
          highlight="Resume"
          subtitle={resume.name ? `Generated for ${resume.name}` : undefined}
        />

        <GeneratedResult
          previewUrl={resume.generatedResume?.url}
          onDownload={() => downloadGeneratedResume(resume._id)}
        />
      </div>
    </div>
  );
};

export default GenerateResult;