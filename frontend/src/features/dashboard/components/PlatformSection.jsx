import { Link } from "react-router-dom";
import {
  FiCode,
  FiFileText,
  FiFilePlus,
  FiArrowRight,
} from "react-icons/fi";

const products = [
  {
    icon: FiCode,
    title: "AI Assistant",
    badge: "LIVE",
    color: "blue",
    desc: "Generate, debug, review and explain production-ready code instantly.",
    link: "/chat",
  },
  {
    icon: FiFileText,
    title: "Resume Analyzer",
    badge: "LIVE",
    color: "gold",
    desc: "ATS scoring, keyword analysis, recruiter feedback and downloadable AI reports.",
    link: "/resume-analysis",
  },
  {
    icon: FiFilePlus,
    title: "Resume Builder",
    badge: "COMING SOON",
    color: "green",
    desc: "Build a professional resume from scratch with AI-powered suggestions.",
    link: "#",
  },
];

const s = {
  blue: {
    badge: "bg-blue-500/10 border-blue-500/20 text-blue-400",
    border: "border-blue-500/20",
    hover: "hover:border-blue-400/50",
    icon: "text-blue-400 bg-blue-500/10",
    arrow: "text-blue-400",
  },
  gold: {
    badge: "bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#f59e0b]",
    border: "border-[#f59e0b]/20",
    hover: "hover:border-[#f59e0b]/50",
    icon: "text-[#f59e0b] bg-[#f59e0b]/10",
    arrow: "text-[#f59e0b]",
  },
  green: {
    badge: "bg-[#22c55e]/10 border-[#22c55e]/20 text-[#22c55e]",
    border: "border-[#22c55e]/20",
    hover: "hover:border-[#22c55e]/40",
    icon: "text-[#22c55e] bg-[#22c55e]/10",
    arrow: "text-[#22c55e]",
  },
};

const PlatformSection = () => (
  <section className="px-4 sm:px-6 py-16 sm:py-28">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">
          Platform
        </p>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">
          Everything a developer needs.
        </h2>

        <p className="mt-3 text-slate-500 text-sm sm:text-[15px] max-w-xl mx-auto">
          One workspace today. Many AI-powered tools tomorrow.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-8">
        {products.map(({ icon: Icon, title, badge, color, desc, link }) => {
          const st = s[color];
          const isLive = badge === "LIVE";

          return (
            <Link
              key={title}
              to={link}
              className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl border ${st.border} ${st.hover} bg-[#060d1a] p-6 sm:p-8 ${
                isLive
                  ? "hover:-translate-y-1 sm:hover:-translate-y-2"
                  : "opacity-90"
              } transition-all duration-300`}
            >
              <div className="absolute right-6 top-6 h-20 w-20 rounded-full bg-white/[0.02] blur-3xl" />

              <span
                className={`inline-flex px-2.5 py-1 rounded-full border text-[10px] sm:text-xs font-bold ${st.badge}`}
              >
                {badge}
              </span>

              <div
                className={`mt-6 sm:mt-8 h-13 w-13 sm:h-16 sm:w-16 rounded-xl sm:rounded-2xl flex items-center justify-center ${st.icon}`}
              >
                <Icon size={24} className="sm:text-[28px]" />
              </div>

              <h3 className="mt-5 sm:mt-8 text-xl sm:text-2xl font-bold text-white">
                {title}
              </h3>

              <p className="mt-3 sm:mt-4 text-slate-400 leading-6 sm:leading-7 text-sm sm:text-base">
                {desc}
              </p>

              <div
                className={`mt-6 sm:mt-10 flex items-center gap-2 font-semibold text-sm ${st.arrow}`}
              >
                {isLive ? "Open" : "Coming Soon"}

                {isLive && (
                  <FiArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  </section>
);

export default PlatformSection;