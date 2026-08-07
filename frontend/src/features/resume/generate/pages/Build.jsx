import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import GlowBackground from "../../shared/components/GlowBackground";
import TopBar from "../../shared/components/TopBar";
import PageHero from "../../shared/components/PageHero";
import StepShell from "../components/StepShell";

import BasicInfoStep from "../components/steps/BasicInfoStep";
import EducationStep from "../components/steps/EducationStep";
import ExperienceStep from "../components/steps/ExperienceStep";
import ProjectsStep from "../components/steps/ProjectsStep";
import SkillsStep from "../components/steps/SkillsStep";
import ExtrasStep from "../components/steps/ExtrasStep";
import ReviewStep from "../components/steps/ReviewStep";

import { useResumeGenerate } from "../services/generate.context";

const STEPS = [
  { title: "Basic Info", subtitle: "Let's start with who you are.", Component: BasicInfoStep },
  { title: "Education", subtitle: "Your degrees and CGPA.", Component: EducationStep },
  { title: "Experience", subtitle: "Where you've worked.", Component: ExperienceStep },
  { title: "Projects", subtitle: "What you've built.", Component: ProjectsStep },
  { title: "Skills", subtitle: "What you're good at.", Component: SkillsStep },
  { title: "Certifications & Achievements", subtitle: "Optional, but they help.", Component: ExtrasStep },
  { title: "Review", subtitle: "One last look before we generate.", Component: ReviewStep },
];

const GenerateBuild = () => {
  const navigate = useNavigate();
  const { step, nextStep, prevStep, loading, submitScratch, formData } = useResumeGenerate();

  const isLastStep = step === STEPS.length - 1;
  const { title, subtitle, Component } = STEPS[step];

  const canContinue = () => {
    if (step === 0) return formData.name.trim() && formData.email.trim();
    return true;
  };

  const handleNext = async () => {
    if (!isLastStep) {
      nextStep();
      return;
    }

    try {
      const built = await submitScratch();
      toast.success("Resume generated successfully!");
      navigate(`/resume-generate/${built._id}`);
    } catch {
      toast.error("Failed to generate resume.");
    }
  };
  

    if (loading) {
      return (
        <div className="min-h-screen bg-[#020817] flex items-center justify-center">
          <div className="flex flex-col items-center gap-5">
            <Loader2 className="w-12 h-12 animate-spin text-blue-500" />
            <p className="text-white font-semibold text-lg">
              Working
            </p>
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
          badge="Build From Scratch"
          title="Build Your"
          highlight="Resume"
      
        />

        <StepShell
          step={step}
          totalSteps={STEPS.length}
          title={title}
          subtitle={subtitle}
          onBack={prevStep}
          onNext={handleNext}
          nextDisabled={!canContinue()}
          nextLabel={isLastStep ? "Generate" : "Continue"}
          loading={loading}
        >
          <Component />
        </StepShell>
      </div>
    </div>
  );
};

export default GenerateBuild;