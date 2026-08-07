import { FiCheckCircle } from "react-icons/fi";
import { useResumeGenerate } from "../../services/generate.context";

const Row = ({ label, value }) => (
  <div className="flex items-start justify-between gap-4 py-2 border-b border-[#1a2d4a] last:border-0">
    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
    <span className="text-sm text-white text-right">{value || "—"}</span>
  </div>
);

const plural = (n, word) => `${n} ${word}${n === 1 ? "" : "s"}`;

const ReviewStep = () => {
  const { formData } = useResumeGenerate();

  return (
    <div className="rounded-2xl border border-[#1a2d4a] bg-[#0a1428] p-5">
      <Row label="Name" value={formData.name} />
      <Row label="Email" value={formData.email} />
      <Row label="Education" value={plural(formData.education.length, "entry")} />
      <Row label="Experience" value={plural(formData.experience.length, "entry")} />
      <Row label="Projects" value={plural(formData.projects.length, "entry")} />
      <Row label="Certifications" value={String(formData.certifications.length)} />
      <Row label="Achievements" value={String(formData.achievements.length)} />

      <div className="flex items-center gap-2 mt-4 text-[#22c55e] text-xs font-semibold">
        <FiCheckCircle size={14} /> hit Generate to build your resume.
      </div>
    </div>
  );
};

export default ReviewStep;