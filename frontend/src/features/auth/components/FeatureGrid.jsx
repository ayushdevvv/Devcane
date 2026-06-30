import { FiZap, FiCode, FiShield, FiGitBranch, FiCpu, FiBookOpen } from "react-icons/fi";

const features = [
  { icon: FiZap,      title: "Lightning Fast",      desc: "Powered by Groq's ultra-fast inference for near-instant AI responses.",      color: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/15" },
  { icon: FiCode,     title: "Production Code",     desc: "Generate scalable React, Node, Python and full-stack projects.",              color: "text-blue-400 bg-blue-500/10 border-blue-500/15" },
  { icon: FiShield,   title: "Debug Smarter",       desc: "Root cause analysis with corrected code — no random guessing.",              color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/15" },
  { icon: FiGitBranch,title: "Code Reviews",        desc: "Performance, readability and security suggestions for every PR.",            color: "text-[#22c55e] bg-[#22c55e]/10 border-[#22c55e]/15" },
  { icon: FiCpu,      title: "AI Powered",          desc: "Multiple AI modes — generate, debug, review, explain — all in one place.",   color: "text-blue-400 bg-blue-500/10 border-blue-500/15" },
  { icon: FiBookOpen, title: "Developer Learning",  desc: "Roadmaps, interview prep and AI-curated study material.",                    color: "text-[#f59e0b] bg-[#f59e0b]/10 border-[#f59e0b]/15" },
];

const FeatureGrid = () => (
  <section className="px-4 sm:px-6 pb-16 sm:pb-28">
    <div className="max-w-7xl mx-auto">
      <div className="text-center mb-10 sm:mb-16">
        <p className="text-[10px] sm:text-xs text-[#f59e0b] font-bold uppercase tracking-widest mb-3">Features</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">Built for modern developers.</h2>
      </div>
      <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 sm:gap-7">
        {features.map(({ icon: Icon, title, desc, color }) => (
          <div key={title} className="group rounded-2xl sm:rounded-3xl border border-[#1a2d4a] bg-[#060d1a] p-6 sm:p-8 hover:border-[#22c55e]/20 hover:-translate-y-1 transition duration-300">
            <div className={`h-12 w-12 sm:h-14 sm:w-14 rounded-xl sm:rounded-2xl border flex items-center justify-center ${color}`}>
              <Icon size={20} />
            </div>
            <h3 className="mt-5 sm:mt-8 text-lg sm:text-xl font-bold text-white">{title}</h3>
            <p className="mt-2 sm:mt-4 leading-6 sm:leading-7 text-slate-400 text-sm sm:text-base">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureGrid;