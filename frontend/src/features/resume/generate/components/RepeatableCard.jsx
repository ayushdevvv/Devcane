import { FiTrash2, FiPlus } from "react-icons/fi";

export const RepeatableItem = ({ children, onRemove, canRemove = true }) => (
  <div className="relative rounded-2xl border border-[#1a2d4a] bg-[#0a1428] p-4 sm:p-5 space-y-4">
    {canRemove && (
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-3 right-3 h-8 w-8 rounded-lg bg-[#03070f] border border-[#1a2d4a] hover:border-red-500/30 flex items-center justify-center text-slate-500 hover:text-red-400 transition"
      >
        <FiTrash2 size={13} />
      </button>
    )}
    {children}
  </div>
);

export const AddButton = ({ onClick, label }) => (
  <button
    type="button"
    onClick={onClick}
    className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-[#1a2d4a] hover:border-blue-500/30 text-slate-400 hover:text-blue-400 px-4 py-3 text-sm font-bold transition"
  >
    <FiPlus size={14} /> {label}
  </button>
);