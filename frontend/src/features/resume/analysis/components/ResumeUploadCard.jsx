import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import UploadCard from "../../shared/components/UploadCard";
import FieldInput from "../../generate/components/FieldInput";

const ResumeUploadCard = ({ onAnalyze, disabled }) => {
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!resume) {
      toast.error("Please upload a resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", resume);
      formData.append("jobDescription", jobDescription);
      formData.append("prompt", prompt);

      await onAnalyze(formData);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-[#1a2d4a] bg-[#060d1a] overflow-hidden shadow-2xl shadow-black/50">
      <div className="p-6 sm:p-8 space-y-5">
        <UploadCard
          title="Upload Resume"
          subtitle="PDF, PNG or JPG"
          file={resume}
          onFileChange={setResume}
          disabled={disabled}
        />

        <FieldInput
          label="Target Job Description"
          optional
          textarea
          rows={3}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste job description..."
          disabled={disabled}
        />

        <FieldInput
          label="AI Prompt"
          optional
          textarea
          rows={2}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Extra instructions..."
          disabled={disabled}
        />

        <button
          onClick={handleSubmit}
          disabled={loading || disabled}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            "Analyze Resume"
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumeUploadCard;