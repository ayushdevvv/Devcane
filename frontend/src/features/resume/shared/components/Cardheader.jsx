const TONES = {
  blue: { box: "bg-blue-500/10 border-blue-500/20", icon: "text-blue-400" },
  amber: { box: "bg-[#f59e0b]/10 border-[#f59e0b]/20", icon: "text-[#f59e0b]" },
  green: { box: "bg-[#22c55e]/10 border-[#22c55e]/20", icon: "text-[#22c55e]" },
  red: { box: "bg-red-500/10 border-red-500/20", icon: "text-red-400" },
};


const CardHeader = ({ icon: Icon, tone = "blue", title, className = "mb-4" }) => {
  const t = TONES[tone] || TONES.blue;

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`h-8 w-8 rounded-lg border flex items-center justify-center ${t.box}`}>
        <Icon size={15} className={t.icon} />
      </div>
      <h2 className="text-base font-bold text-white">{title}</h2>
    </div>
  );
};

export default CardHeader;