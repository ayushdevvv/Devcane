import { FileText } from "lucide-react";

const SummaryCard = ({ summary }) => (
  <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8">
    <div className="flex items-center gap-2.5 mb-4">
      <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
        <FileText size={15} className="text-blue-400" />
      </div>
      <h2 className="text-base font-bold text-white">Professional Summary</h2>
    </div>
    <p className="text-slate-300 leading-7 text-sm sm:text-base">{summary}</p>
  </div>
);

export default SummaryCard;