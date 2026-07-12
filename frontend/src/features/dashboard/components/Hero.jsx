import { Link } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FiArrowRight, FiCode, FiFileText, FiBook } from "react-icons/fi";

const Hero = ({ user }) => (
  <section className="relative px-4 sm:px-6 pt-14 sm:pt-20 pb-16 sm:pb-24 overflow-hidden">

    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[500px] sm:w-[700px] h-[300px] sm:h-[400px] rounded-full bg-[#22c55e]/8 blur-[120px]" />
      <div className="absolute right-0 bottom-0 w-[300px] sm:w-[400px] h-[250px] sm:h-[300px] rounded-full bg-[#f59e0b]/8 blur-[100px]" />
    </div>

    <div className="relative z-10 max-w-7xl mx-auto">

      <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-[#22c55e]/25 bg-[#22c55e]/8 text-[#22c55e] text-[10px] sm:text-xs font-bold tracking-widest uppercase mb-6 sm:mb-8">
        <BsStars size={11} /> AI Workspace For Developers
      </div>


      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white max-w-5xl">
        One Workspace
        <br />
        <span className="bg-gradient-to-r from-[#22c55e] via-white to-[#f59e0b] bg-clip-text text-transparent">
          For Every Developer.
        </span>
      </h1>


      <p className="mt-6 sm:mt-8 text-slate-400 text-base sm:text-lg leading-7 sm:leading-8 max-w-2xl">
        Build, debug, review and learn from one intelligent platform. Devcane combines an AI Assistant, Resume Analyzer into one premium workspace.
      </p>


    <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
  <Link
    to={user ? "/dashboard" : "/register"}
    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-xl shadow-[#22c55e]/20 hover:shadow-[#22c55e]/30 hover:scale-[1.02] transition-all duration-300"
  >
    Build with AI
  </Link>

  <Link
    to={user ? "/resume-analysis" : "/register"}
    className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-white shadow-lg shadow-blue-900/30 hover:scale-[1.02] transition-all duration-300"
  >
    Upload Resume
  </Link>
</div>

      <div className="mt-14 sm:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
        {[
          { number: "1", label: "AI Assistant" },
          { number: "1", label: "Resume Analyzer" },
          { number: "24/7", label: "Available" },
          { number: "∞", label: "Possibilities" },
        ].map(({ number, label }) => (
          <div key={label} className="rounded-2xl sm:rounded-3xl border border-[#1a2d4a] bg-[#060d1a]/70 backdrop-blur-xl p-4 sm:p-6 hover:border-[#22c55e]/20 transition-all">
            <h2 className="text-2xl sm:text-3xl font-black text-white">{number}</h2>
            <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default Hero;