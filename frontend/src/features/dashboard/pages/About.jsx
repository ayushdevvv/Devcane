import NavBar from "../components/NavBar";
import { BsStars } from "react-icons/bs";
import { FiCode, FiFileText, FiBook, FiZap, FiShield, FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-[#03070f] text-white overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#f59e0b]/5 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[300px] bg-[#22c55e]/4 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10">
        <NavBar />

        <section className="max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-[#f59e0b]/25 bg-[#f59e0b]/8 text-xs font-bold text-[#f59e0b] tracking-widest uppercase">
            About Devcane
          </div>
          <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight mb-6">
            Built by developers,<br />
            <span className="shimmer">for developers.</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Devcane started as a simple idea - what if every developer had all tools in one platform, available 24/7? We built that.
          </p>
        </section>


        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#060d1a] border border-[#22c55e]/20 rounded-2xl p-8">
              <div className="h-12 w-12 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mb-5">
                <FiZap size={20} className="text-[#22c55e]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                To democratize access to expert-level software engineering knowledge. Every developer — junior or senior, solo or in a team — deserves an AI partner that helps them ship better code, faster.
              </p>
            </div>
            <div className="bg-[#060d1a] border border-[#f59e0b]/20 rounded-2xl p-8">
              <div className="h-12 w-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/20 flex items-center justify-center mb-5">
                <FiShield size={20} className="text-[#f59e0b]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Our Values</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Speed, accuracy, and honesty. We never invent APIs. We never give half-answers. We treat every developer's time as sacred, and we build tools that respect that.
              </p>
            </div>
          </div>
        </section>


        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="text-center mb-12">
            <p className="text-xs text-[#22c55e] font-bold uppercase tracking-widest mb-3">Platform</p>
            <h2 className="text-3xl font-black text-white">What Devcane offers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[

              {
                icon: FiCode,
                title: "AI Coding Assistant",
                desc: "Your AI senior engineer. Generates, debugs, reviews and explains code with production-ready quality.",
                color: "text-[#22c55e]",
                bg: "bg-[#22c55e]/10",
                border: "border-[#22c55e]/20",
                status: "Live",
              },
              {
                icon: FiFileText,
                title: "Resume Analyzer",
                desc: "ATS scoring, keyword gap analysis, strengths, weaknesses and personalized improvement roadmaps powered by AI.",
                color: "text-blue-400",
                bg: "bg-blue-500/10",
                border: "border-blue-500/20",
                status: "Live",
              },
              {
                icon: FiBook,
                title: "Resume Builder",
                desc: "Build a professional resume from scratch with AI-powered suggestions.",
                color: "text-[#f59e0b]",
                bg: "bg-[#f59e0b]/10",
                border: "border-[#f59e0b]/20",
                status: "Soon",
              },

            ].map(({ icon: Icon, title, desc, color, bg, border, status }) => (
              <div key={title} className={`bg-[#060d1a] border ${border} rounded-2xl p-6`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`h-11 w-11 rounded-xl ${bg} border ${border} flex items-center justify-center`}>
                    <Icon size={18} className={color} />
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${color} ${bg} ${border}`}>{status}</span>
                </div>
                <h3 className="text-[14px] font-bold text-white mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-4xl mx-auto px-6 pb-24">
          <div className="bg-gradient-to-br from-[#0a1428] to-[#060d1a] border border-[#1a2d4a] rounded-3xl p-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "70B", label: "Model parameters", color: "text-[#22c55e]" },
              { value: "<1s", label: "Response time", color: "text-[#f59e0b]" },
              { value: "4096", label: "Max tokens", color: "text-blue-400" },
              { value: "∞", label: "Chat history", color: "text-purple-400" },
            ].map(({ value, label, color }) => (
              <div key={label}>
                <p className={`text-3xl font-black ${color} mb-1`}>{value}</p>
                <p className="text-slate-500 text-xs">{label}</p>
              </div>
            ))}
          </div>
        </section>


        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <h2 className="text-3xl font-black text-white mb-3">Ready to join?</h2>
          <p className="text-slate-400 text-[15px] mb-8">Start for free. No credit card required.</p>
          <Link to="/register" className="inline-block bg-[#22c55e] hover:bg-[#16a34a] text-white px-10 py-4 rounded-xl text-[15px] font-bold transition-all hover:shadow-xl hover:shadow-[#22c55e]/20">
            Get Started Free
          </Link>
        </section>

        <footer className="border-t border-[#1a2d4a] px-6 py-8 text-center text-slate-600 text-sm">
          <p>© 2026 <span className="text-[#f59e0b]">Devcane</span> · Built for developers</p>
        </footer>
      </div>
    </div>
  );
};

export default About;