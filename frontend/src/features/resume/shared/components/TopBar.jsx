import { Link } from "react-router-dom";
import { FiArrowLeft, FiSettings } from "react-icons/fi";


const TopBar = ({ backTo = "/dashboard", backLabel = "Dashboard", rightSlot }) => (
  <div className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-4 bg-[#03070f]/80 backdrop-blur-xl border-b border-[#1a2d4a]">
    <Link
      to={backTo}
      className="inline-flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#060d1a] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:border-blue-500/30 transition"
    >
      <FiArrowLeft size={15} /> {backLabel}
    </Link>

    {rightSlot ?? (
      <Link
        to="/settings"
        className="inline-flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#060d1a] px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-semibold text-slate-300 hover:text-white hover:border-blue-500/30 transition"
      >
        <FiSettings size={15} /> Settings
      </Link>
    )}
  </div>
);

export default TopBar;