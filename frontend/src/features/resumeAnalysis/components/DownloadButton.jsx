import { Download } from "lucide-react";
import { useResumeAnalysis } from "../services/ResumeAnalysis.context";

const DownloadButton = ({ id }) => {
  const { downloadReport } = useResumeAnalysis();
  return (
    <button onClick={() => downloadReport(id)}
      className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-bold text-sm transition-all hover:scale-[1.02] shadow-lg shadow-blue-900/30">
      <Download size={16} /> Download Report
    </button>
  );
};

export default DownloadButton;