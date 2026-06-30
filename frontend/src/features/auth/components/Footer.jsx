import { Link } from "react-router-dom";
import { FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";


const Footer = () => (
  <footer className="border-t border-[#1a2d4a] bg-[#060d1a]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">

       
        <div className="col-span-2 sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2.5 mb-4">
           
            <span className="text-lg font-black text-white"> Dev<span className="text-blue-400">cane</span></span>
          </Link>
          <p className="text-slate-500 text-sm leading-6 sm:leading-7 max-w-xs">
            One intelligent workspace for every developer.
          </p>
        </div>

        
        <div>
          <h3 className="text-white font-bold text-sm mb-4 sm:mb-5">Product</h3>
          <div className="space-y-2.5 sm:space-y-3 text-slate-500 text-sm">
            <Link to="/chat" className="block hover:text-[#22c55e] transition">AI Assistant</Link>
            <span className="block opacity-50 cursor-not-allowed">Resume Analyzer</span>
            <span className="block opacity-50 cursor-not-allowed">Study Hub</span>
          </div>
        </div>

     
        <div>
          <h3 className="text-white font-bold text-sm mb-4 sm:mb-5">Company</h3>
          <div className="space-y-2.5 sm:space-y-3 text-slate-500 text-sm">
            <Link to="/about"    className="block hover:text-white transition">About</Link>
            <Link to="/login"    className="block hover:text-white transition">Login</Link>
            <Link to="/register" className="block hover:text-white transition">Register</Link>
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold text-sm mb-4 sm:mb-5">Connect</h3>
          <div className="flex gap-2.5 sm:gap-3">
            {[FiGithub, FiLinkedin, FiTwitter].map((Icon, i) => (
              <button key={i} className="h-10 w-10 sm:h-11 sm:w-11 rounded-xl sm:rounded-2xl bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center text-slate-500 hover:text-white hover:border-[#22c55e]/25 transition">
                <Icon size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 sm:mt-14 pt-6 sm:pt-8 border-t border-[#1a2d4a] flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-slate-600 text-xs sm:text-sm">© 2026 <span className="text-400-blue">Devcane</span>. Built for Developers.</p>
        <div className="flex gap-4 sm:gap-6 text-xs sm:text-sm text-slate-600">
          {["Privacy", "Terms", "Contact"].map((item) => (
            <button key={item} className="hover:text-white transition">{item}</button>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;