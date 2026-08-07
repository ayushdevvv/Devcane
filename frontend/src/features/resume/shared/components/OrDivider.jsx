const OrDivider = ({ label = "Or" }) => (
  <div className="flex items-center gap-3 my-6">
    <div className="flex-1 h-px bg-[#1a2d4a]" />
    <span className="text-slate-600 text-[11px] font-bold uppercase tracking-widest">{label}</span>
    <div className="flex-1 h-px bg-[#1a2d4a]" />
  </div>
);

export default OrDivider;