import { Link } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { FiArrowRight } from "react-icons/fi";

const CTASection = ({ user }) => (
  <section className="px-4 sm:px-6 pb-16 sm:pb-28">
    <div className="max-w-3xl mx-auto text-center">
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0a1f14] via-[#060d1a] to-[#060d1a] border border-[#22c55e]/20 rounded-2xl sm:rounded-3xl p-10 sm:p-14 md:p-16">
        <div className="absolute inset-0 bg-[#22c55e]/3 blur-3xl pointer-events-none" />
        <div className="relative z-10">
         
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-4">Ready to build something great?</h2>
          <p className="text-slate-400 text-sm sm:text-[15px] mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed">
            Join developers using Devcane to write better code, faster. Free to start — no credit card needed.
          </p>
          <Link
            to={user ? "/dashboard" : "/register"}
            className="inline-flex items-center gap-3 bg-[#22c55e] hover:bg-[#16a34a] text-white px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-sm sm:text-[15px] font-bold transition-all hover:shadow-xl hover:shadow-[#22c55e]/20 hover:scale-[1.02]"
          >
            {user ? "Open Dashboard" : "Get Started Free"}
        
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default CTASection;