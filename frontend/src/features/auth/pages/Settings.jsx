import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../services/auth.context";
import { toast } from "react-toastify";
import {
  FiUser, FiLock, FiBell, FiTrash2, FiSave,
  FiArrowLeft, FiChevronRight, FiLogOut, FiInfo
} from "react-icons/fi";
import logo from "../../../assets/logo.png";

const tabs = [
  { id: "profile",       label: "Profile",       icon: FiUser },
  { id: "security",      label: "Security",       icon: FiLock },
  { id: "notifications", label: "Notifications",  icon: FiBell },
  { id: "danger",        label: "Danger Zone",    icon: FiTrash2 },
];

const Settings = () => {
  const { user, setUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = useState("profile");
  const [mobileTab, setMobileTab] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email] = useState(user?.email || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const handleSaveProfile = async () => {
    if (!name.trim()) return toast.error("Name cannot be empty.");
    try {
      setSaving(true);
      // Call your update profile API here
      // await updateProfile({ name });
      setUser((prev) => ({ ...prev, name }));
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword)
      return toast.error("Please fill all password fields.");
    if (newPassword !== confirmPassword)
      return toast.error("New passwords do not match.");
    if (newPassword.length < 8)
      return toast.error("Password must be at least 8 characters.");
    try {
      setSaving(true);
      // Call your change password API here
      // await changePassword({ currentPassword, newPassword });
      toast.success("Password updated successfully!");
      setCurrentPassword(""); setNewPassword(""); setConfirmPassword("");
    } catch {
      toast.error("Failed to update password.");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoggingOut(true);
      await logout();
      toast.success("Logged out successfully!");
      navigate("/");
    } catch {
      toast.error("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  const handleTabSelect = (id) => { setActive(id); setMobileTab(true); };

  const inputClass = "w-full px-4 py-3 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white text-sm placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all";
  const labelClass = "text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 block";

  const renderContent = () => {
    switch (active) {
      case "profile": return (
        <div className="space-y-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Update your personal information</p>
          </div>

         
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5 flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-xl font-black text-white shadow-xl flex-shrink-0">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white truncate">{user?.name}</p>
              <p className="text-slate-500 text-sm truncate">{user?.email}</p>
            </div>
          </div>

         
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5 space-y-4">
            <div>
              <label className={labelClass}>Full Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Email</label>
              <input value={email} disabled className={`${inputClass} opacity-50 cursor-not-allowed`} />
              <p className="text-[11px] text-slate-600 mt-1">Email cannot be changed</p>
            </div>
            <button
              onClick={handleSaveProfile}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition hover:shadow-lg hover:shadow-blue-900/30"
            >
              <FiSave size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>

          {/* App info */}
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <FiInfo size={14} className="text-blue-400" />
              <h2 className="text-sm font-bold text-white">App Info</h2>
            </div>
            <div className="space-y-1.5 text-xs text-slate-500">
              <p>Version: <span className="text-slate-300">1.0.0</span></p>
              <p>Status: <span className="text-[#22c55e]">Stable</span></p>
              <p>AI Model: <span className="text-slate-300">llama-3.3-70b-versatile</span></p>
              <p>Powered by: <span className="text-slate-300">Groq AI</span></p>
            </div>
          </div>
        </div>
      );

      case "security": return (
        <div className="space-y-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Security</h1>
            <p className="text-slate-500 text-sm mt-1">Update your password</p>
          </div>
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5 space-y-4">
            {[
              { label: "Current Password",  value: currentPassword, set: setCurrentPassword },
              { label: "New Password",      value: newPassword,     set: setNewPassword },
              { label: "Confirm Password",  value: confirmPassword, set: setConfirmPassword },
            ].map(({ label, value, set }) => (
              <div key={label}>
                <label className={labelClass}>{label}</label>
                <input type="password" placeholder="••••••••" value={value} onChange={(e) => set(e.target.value)} className={inputClass} />
              </div>
            ))}
            <button
              onClick={handleChangePassword}
              disabled={saving}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-bold transition hover:shadow-lg hover:shadow-blue-900/30"
            >
              <FiLock size={14} />
              {saving ? "Updating..." : "Update Password"}
            </button>
          </div>
        </div>
      );

      case "notifications": return (
        <div className="space-y-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">Notifications</h1>
            <p className="text-slate-500 text-sm mt-1">Control what updates you receive</p>
          </div>
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5 space-y-1">
            {["Product updates", "New feature announcements", "Security alerts"].map((item) => (
              <div key={item} className="flex items-center justify-between py-3.5 border-b border-[#1a2d4a] last:border-0">
                <span className="text-sm text-slate-300">{item}</span>
                <button
                  onClick={() => toast.info("🚧 Feature coming soon!")}
                  className="h-6 w-11 rounded-full bg-[#1a2d4a] relative flex items-center px-0.5 transition hover:bg-[#1e3050]"
                >
                  <div className="h-5 w-5 rounded-full bg-slate-500 shadow transition-transform" />
                </button>
              </div>
            ))}
          </div>
          <div className="bg-blue-500/5 border border-blue-500/15 rounded-2xl p-4 flex items-start gap-3">
            <FiInfo size={15} className="text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-slate-400 leading-5">Notification settings are coming in a future update. Stay tuned!</p>
          </div>
        </div>
      );

      case "danger": return (
        <div className="space-y-5">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-red-400">Danger Zone</h1>
            <p className="text-slate-500 text-sm mt-1">Irreversible actions — proceed with caution</p>
          </div>

      
          <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-2xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Logout</p>
                <p className="text-xs text-slate-500 mt-0.5">Sign out of your Devcane account</p>
              </div>
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="flex items-center gap-2 bg-[#1a2d4a] hover:bg-[#1e3050] border border-[#1a2d4a] text-slate-300 hover:text-white px-4 py-2.5 rounded-xl text-sm font-bold transition flex-shrink-0 disabled:opacity-50"
              >
                <FiLogOut size={14} />
                {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </div>

          <div className="bg-[#0a1428] border border-red-500/20 rounded-2xl p-5 space-y-4">
            {[
              { label: "Delete all chat history", sub: "Permanently removes all your conversations" },
              { label: "Delete account", sub: "Permanently deletes your account and all data" },
            ].map(({ label, sub }) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2 border-b border-red-500/10 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-white">{label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{sub}</p>
                </div>
                <button
                  onClick={() => toast.info("🚧 Feature coming soon!")}
                  className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-400 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition flex-shrink-0"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      );

      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#03070f] text-white">

 
      <div className="fixed inset-0 pointer-events-none -z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>


      <div className="relative z-10 border-b border-[#1a2d4a] bg-[#060d1a] px-4 sm:px-6 py-4 flex items-center gap-3">
        <button
          onClick={() => mobileTab ? setMobileTab(false) : navigate("/dashboard")}
          className="p-2 rounded-xl text-slate-500 hover:text-white hover:bg-[#0a1428] transition flex-shrink-0"
        >
          <FiArrowLeft size={17} />
        </button>
        <Link to="/" className="flex items-center gap-2 flex-shrink-0">
          <img src={logo} alt="Devcane" className="h-6 w-6 sm:h-7 sm:w-7 object-contain rounded-md" />
          <span className="text-sm font-bold text-white hidden sm:block">Dev<span className="text-blue-400">cane</span></span>
        </Link>
        <span className="text-slate-700 hidden sm:block">/</span>
        <span className="text-sm text-slate-400 hidden sm:block">Settings</span>
        <div className="flex items-center gap-1 sm:hidden">
          <span className="text-slate-500 text-xs">Settings</span>
          {mobileTab && <><span className="text-slate-700 mx-1">/</span><span className="text-xs text-white capitalize">{active}</span></>}
        </div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

       
        <div className={`sm:hidden ${mobileTab ? "hidden" : "block"}`}>
          <h1 className="text-xl font-black text-white mb-5">Settings</h1>
          <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-2xl overflow-hidden divide-y divide-[#1a2d4a]">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => handleTabSelect(id)}
                className={`w-full flex items-center justify-between px-5 py-4 transition
                  ${id === "danger" ? "text-red-400 hover:bg-red-500/5" : "text-slate-300 hover:bg-[#0a1428]"}`}
              >
                <div className="flex items-center gap-3"><Icon size={15} /><span className="text-sm font-medium">{label}</span></div>
                <FiChevronRight size={14} className="text-slate-600" />
              </button>
            ))}
            <button onClick={handleLogout} disabled={loggingOut}
              className="w-full flex items-center justify-between px-5 py-4 text-red-400 hover:bg-red-500/5 transition disabled:opacity-50">
              <div className="flex items-center gap-3"><FiLogOut size={15} /><span className="text-sm font-medium">{loggingOut ? "Logging out..." : "Logout"}</span></div>
              <FiChevronRight size={14} className="
              text-slate-600" />
            </button>
          </div>
        </div>

        <div className={`sm:hidden ${mobileTab ? "block" : "hidden"}`}>
          {renderContent()}
        </div>

   
        <div className="hidden sm:flex gap-6 lg:gap-8">
          <aside className="w-48 flex-shrink-0 space-y-1">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setActive(id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all
                  ${active === id
                    ? id === "danger"
                      ? "bg-red-500/10 border border-red-500/25 text-red-400"
                      : "bg-blue-600/15 border border-blue-500/25 text-blue-400"
                    : "text-slate-500 hover:text-white hover:bg-[#0a1428] border border-transparent"
                  }`}
              >
                <Icon size={14} /> {label}
              </button>
            ))}
            <div className="pt-2 border-t border-[#1a2d4a] mt-2">
              <button
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-[13px] font-medium text-red-400 hover:bg-red-500/10 border border-transparent transition disabled:opacity-50"
              >
                <FiLogOut size={14} /> {loggingOut ? "Logging out..." : "Logout"}
              </button>
            </div>
          </aside>

          <div className="flex-1 min-w-0">{renderContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default Settings;