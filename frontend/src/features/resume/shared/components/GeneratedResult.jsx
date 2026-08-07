import { FiCheckCircle, FiDownload } from "react-icons/fi";

const GeneratedResult = ({ previewUrl, onDownload, downloading = false }) => (
  <div className="w-full max-w-md mx-auto rounded-3xl border border-[#1a2d4a] bg-[#060d1a] p-6 sm:p-8 text-center">
    <div className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/20 bg-[#22c55e]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-[#22c55e] mb-5">
      <FiCheckCircle size={13} /> Resume Generated Successfully
    </div>

    <div className="rounded-2xl border border-[#1a2d4a] bg-[#03070f] h-72 sm:h-80 flex items-center justify-center overflow-hidden mb-6">
      {previewUrl ? (
        <iframe title="Resume preview" src={previewUrl} className="w-full h-full" />
      ) : (
        <p className="text-slate-600 text-sm">Preview</p>
      )}
    </div>

    <button
      onClick={onDownload}
      disabled={downloading}
      className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-60 text-white px-6 py-3 rounded-xl text-sm font-bold transition hover:shadow-lg hover:shadow-[#22c55e]/20"
    >
      <FiDownload size={15} /> {downloading ? "Preparing..." : "Download Resume"}
    </button>
  </div>
);

export default GeneratedResult;