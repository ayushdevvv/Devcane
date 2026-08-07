import { useState, useRef } from "react";
import { FiUploadCloud, FiFile, FiX } from "react-icons/fi";


const UploadCard = ({
  title = "Upload Resume",
  subtitle = "PDF, PNG or JPG",
  accept = ".pdf,.png,.jpg,.jpeg",
  file,
  onFileChange,
  disabled = false,
}) => {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files) => {
    if (!files?.length) return;
    onFileChange(files[0]);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragOver(false);
        if (!disabled) handleFiles(e.dataTransfer.files);
      }}
      className={`relative rounded-2xl border-2 border-dashed px-6 py-10 text-center transition
        ${dragOver ? "border-blue-500/50 bg-blue-500/5" : "border-[#1a2d4a] bg-[#060d1a]"}
        ${disabled ? "opacity-50 pointer-events-none" : ""}`}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
        disabled={disabled}
      />

      {file ? (
        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center">
            <FiFile size={22} className="text-[#22c55e]" />
          </div>
          <div>
            <p className="text-white font-semibold text-sm truncate max-w-[220px]">{file.name}</p>
            <p className="text-slate-600 text-xs mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            onClick={() => onFileChange(null)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-red-400 transition"
          >
            <FiX size={13} /> Remove file
          </button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3">
          <div className="h-14 w-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <FiUploadCloud size={22} className="text-blue-400" />
          </div>
          <div>
            <p className="text-white font-bold text-sm">{title}</p>
            <p className="text-slate-600 text-xs mt-1">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="mt-1 bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition"
          >
            Choose File
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadCard;