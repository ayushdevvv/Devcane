import { useState } from "react";
import { toast } from "react-toastify";
import {
  UploadCloud,
  FileText,
  Sparkles,
  Loader2,
  X,
} from "lucide-react";

const ResumeUploadCard = ({ onAnalyze }) => {
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

       
        <label className="block cursor-pointer">
          <div
            className={`rounded-2xl border-2 border-dashed transition-all duration-300 p-8 sm:p-10 ${
              resume
                ? "border-blue-500/40 bg-blue-500/[0.04]"
                : "border-[#1a2d4a] hover:border-blue-500/30 hover:bg-[#0a1428]"
            }`}
          >
            {resume ? (
              <div className="flex items-center justify-between gap-4">

                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <FileText
                      size={20}
                      className="text-blue-400"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">
                      {resume.name}
                    </p>

                    <p className="text-xs text-[#22c55e] mt-1">
                      Ready to analyze
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setResume(null);
                  }}
                  className="h-9 w-9 rounded-lg bg-[#0a1428] border border-[#1a2d4a] hover:border-red-500/30 flex items-center justify-center text-slate-500 hover:text-red-400 transition"
                >
                  <X size={15} />
                </button>

              </div>
            ) : (
              <div className="text-center">

                <div className="mx-auto h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <UploadCloud
                    size={24}
                    className="text-blue-400"
                  />
                </div>

                <h3 className="mt-4 font-bold text-white">
                  Upload Resume
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  PDF, PNG or JPG
                </p>

                <div className="mt-5 inline-flex rounded-xl bg-blue-600 hover:bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition">
                  Choose File
                </div>

              </div>
            )}
          </div>

          <input
            hidden
            type="file"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={(e) => setResume(e.target.files[0])}
          />
        </label>

        
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            Target Job Description
            <span className="text-slate-700 font-normal normal-case">
              {" "}
              (Optional)
            </span>
          </label>

          <textarea
            rows={3}
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste job description..."
            className="w-full rounded-xl bg-[#0a1428] border border-[#1a2d4a] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none resize-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition"
          />
        </div>


        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
            AI Prompt
            <span className="text-slate-700 font-normal normal-case">
              {" "}
              (Optional)
            </span>
          </label>

          <textarea
            rows={2}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Extra instructions..."
            className="w-full rounded-xl bg-[#0a1428] border border-[#1a2d4a] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none resize-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition"
          />
        </div>

   
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition font-bold text-white flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30"
        >
          {loading ? (
            <>
              <Loader2 size={17} className="animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
            
              Analyze Resume
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumeUploadCard;