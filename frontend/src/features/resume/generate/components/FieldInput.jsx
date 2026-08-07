const FieldInput = ({ label, optional, textarea, rows = 3, ...props }) => {
  const Tag = textarea ? "textarea" : "input";

  return (
    <div>
      {label && (
        <label className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-500">
          {label}
          {optional && <span className="text-slate-700 font-normal normal-case"> (Optional)</span>}
        </label>
      )}
      <Tag
        rows={textarea ? rows : undefined}
        className="w-full rounded-xl bg-[#0a1428] border border-[#1a2d4a] px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none resize-none focus:border-blue-500/40 focus:ring-1 focus:ring-blue-500/20 transition disabled:opacity-40"
        {...props}
      />
    </div>
  );
};

export default FieldInput;