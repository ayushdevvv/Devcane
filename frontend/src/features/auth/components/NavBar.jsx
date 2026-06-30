import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { AuthContext } from "../services/auth.context";
import { toast } from "react-toastify";

const Navbar = ({ onMenuClick }) => {
  const { user, logout } = useContext(AuthContext);
  const [mobileMenu, setMobileMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch {
      toast.error("Something went wrong while logging out.");
    } finally {
      setMobileMenu(false);
      navigate("/");
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[#1a2d4a] bg-[#060d1a] backdrop-blur-2xl">
        <div className="max-w-7xl mx-auto h-16 px-4 sm:px-6 flex items-center justify-between gap-3">

          <div className="flex items-center gap-2.5 flex-shrink-0">
            <button
              onClick={onMenuClick}
              className="h-9 w-9 rounded-xl bg-[#0a1428] border border-[#1a2d4a] hover:border-blue-500/40 flex items-center justify-center text-slate-300 hover:text-white transition"
            >
              <HiMenuAlt3 size={17} />
            </button>

            <Link to="/" className="flex items-center gap-2.5">
              <h1 className="text-base sm:text-lg font-black tracking-tight text-white">
                Dev<span className="text-blue-400">cane</span>
              </h1>
            </Link>
          </div>

          {user ? (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/chat" className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 hover:scale-[1.02] transition-all">
                Open Workspace
              </Link>
              <Link to="/settings">
                <div className="flex items-center gap-2 rounded-xl border border-[#1a2d4a] bg-[#0a1428] hover:border-blue-500/30 px-3 py-2 transition">
                  <div className="h-7 w-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span className="text-sm font-semibold text-white hidden md:block">{user?.name?.split(" ")[0]}</span>
                </div>
              </Link>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-3">
              <Link to="/login" className="rounded-xl border border-[#1a2d4a] bg-[#0a1428] hover:bg-[#0f1e38] px-5 py-2.5 text-sm text-slate-300 hover:text-white transition">
                Sign In
              </Link>
              <Link to="/register" className="rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-900/30 hover:scale-[1.02] transition-all">
                Get Started
              </Link>
            </div>
          )}

          <div className="sm:hidden flex items-center gap-2">
            {user ? (
              <button
                onClick={() => setMobileMenu(p => !p)}
                className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-blue-900/30"
              >
                {mobileMenu ? <HiX size={15} /> : user?.name?.charAt(0)?.toUpperCase()}
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login" className="rounded-xl border border-[#1a2d4a] bg-[#0a1428] px-3 py-2 text-xs text-slate-300">Sign In</Link>
                <Link to="/register" className="rounded-xl bg-blue-600 px-3 py-2 text-xs font-bold text-white">Join</Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {mobileMenu && user && (
        <div className="sm:hidden fixed top-16 left-0 right-0 z-50 bg-[#060d1a] border-b-2 border-blue-500/20 shadow-2xl shadow-black/80">

          <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1a2d4a] bg-[#080f1f]">
            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center font-black text-white flex-shrink-0">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="px-3 py-2 bg-[#060d1a]">
            <Link to="/chat" onClick={() => setMobileMenu(false)}
              className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600/20 to-blue-500/10 border border-blue-500/20 mb-2 text-sm">
              Open Workspace
            </Link>
            {[
              { label: "Dashboard", to: "/dashboard" },
              { label: "Settings",  to: "/settings" },
              { label: "About",     to: "/about" },
            ].map(({ label, to }) => (
              <Link key={label} to={to} onClick={() => setMobileMenu(false)}
                className="flex items-center px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-[#0a1428] transition text-sm font-medium">
                {label}
              </Link>
            ))}
          </div>

          <div className="px-3 pb-3 bg-[#060d1a]">
            <div className="h-px bg-[#1a2d4a] mx-1 mb-2" />
            <button onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition text-sm font-medium text-left">
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;