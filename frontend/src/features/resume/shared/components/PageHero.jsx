import { BsStars } from "react-icons/bs";

const PageHero = ({ badge = "AI-Powered", title, highlight, subtitle }) => (
  <div className="text-center mb-8 sm:mb-10">
    <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/8 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-blue-400 mb-5">
      <BsStars size={12} /> {badge}
    </div>

    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight">
      {title} {highlight && <span className="text-blue-400">{highlight}</span>}
    </h1>

    {subtitle && (
      <p className="text-slate-500 mt-3 text-sm sm:text-base max-w-md mx-auto">{subtitle}</p>
    )}
  </div>
);

export default PageHero;