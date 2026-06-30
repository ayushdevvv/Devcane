import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../services/auth.context";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import {
  HiOutlineUser,
  HiOutlineBell,
  HiOutlineCog,
  HiOutlineLockClosed,
  HiOutlinePencil,
  HiOutlineX,
} from "react-icons/hi";

const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs uppercase text-slate-500">{label}</label>
    <input
      {...props}
      className="mt-2 w-full rounded-xl border border-[#1a2d4a] bg-[#060d1a] px-4 py-3 outline-none focus:border-[#22c55e]"
    />
  </div>
);

const Modal = ({ title, subtitle, onClose, onSubmit, loading, submitLabel, children }) => (
  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm sm:p-4">
    <div className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl border border-[#1a2d4a] bg-[#0a1428] max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between border-b border-[#1a2d4a] p-5 sm:p-6">
        <div>
          <h2 className="text-lg sm:text-xl font-bold">{title}</h2>
          <p className="text-sm text-slate-500">{subtitle}</p>
        </div>
        <button onClick={onClose} className="text-slate-500 hover:text-white shrink-0 ml-3">
          <HiOutlineX size={22} />
        </button>
      </div>

      <div className="space-y-5 p-5 sm:p-6">
        {children}

        <div className="flex flex-col-reverse sm:flex-row justify-end gap-3">
          <button onClick={onClose} className="rounded-xl border border-[#1a2d4a] px-5 py-3 w-full sm:w-auto">
            Cancel
          </button>
          <button
            onClick={onSubmit}
            disabled={loading}
            className="rounded-xl bg-[#22c55e] px-6 py-3 font-semibold hover:bg-[#16a34a] disabled:opacity-60 w-full sm:w-auto"
          >
            {loading ? <ClipLoader size={16} color="#fff" /> : submitLabel}
          </button>
        </div>
      </div>
    </div>
  </div>
);

const Settings = () => {
  const { user } = useContext(AuthContext);
  const { loading, handleLogout, handleUpdateProfile } = useAuth();
  const navigate = useNavigate();

  const [showProfile, setShowProfile] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState({ name: "", email: "" });
  const [pwd, setPwd] = useState({ current: "", next: "", confirm: "" });

  useEffect(() => {
    if (user) setProfile({ name: user.name || "", email: user.email || "" });
  }, [user]);

  const saveProfile = async () => {
    if (!profile.name.trim() || !profile.email.trim()) {
      return toast.error("All fields are required.");
    }
    try {
      await handleUpdateProfile(profile);
      toast.success("Profile updated successfully.");
      setShowProfile(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to update profile.");
    }
  };

  const updatePassword = async () => {
    const { current, next, confirm } = pwd;
    if (!current || !next || !confirm) return toast.error("Fill all fields.");
    if (next !== confirm) return toast.error("Passwords do not match.");
    if (next.length < 8) return toast.error("Password must be at least 8 characters.");

    try {
      await handleUpdateProfile({ currentPassword: current, newPassword: next });
      toast.success("Password updated successfully.");
      setPwd({ current: "", next: "", confirm: "" });
      setShowPassword(false);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Unable to update password.");
    }
  };

  const logoutUser = async () => {
    const id = toast.loading("Logging out...");
    try {
      await handleLogout();
      toast.dismiss(id);
      toast.success("Logged out successfully.");
      navigate("/");
    } catch {
      toast.dismiss(id);
      toast.error("Logout failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#060d1a] text-white px-4 py-6 sm:py-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-black">Settings</h1>
          <p className="text-slate-400 mt-1 text-sm sm:text-base">Manage your Devcane account.</p>
        </div>

        {/* User Card */}
        <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 sm:h-14 sm:w-14 shrink-0 rounded-full bg-gradient-to-br from-[#22c55e] to-[#16a34a] flex items-center justify-center text-lg sm:text-xl font-bold">
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="min-w-0">
              <h2 className="font-bold text-base sm:text-lg truncate">{user?.name}</h2>
              <p className="text-slate-400 text-xs sm:text-sm truncate">{user?.email}</p>
              <p className="text-xs text-slate-500 mt-1 capitalize">{user?.provider} account</p>
            </div>
          </div>

          <button
            onClick={() => setShowProfile(true)}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] px-5 py-3 font-semibold transition w-full sm:w-auto"
          >
            <HiOutlinePencil />
            Edit
          </button>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8">
          <button
            onClick={() => setShowProfile(true)}
            className="rounded-3xl border border-[#1a2d4a] bg-[#0a1428] p-5 sm:p-6 text-left hover:border-[#22c55e]/40 transition"
          >
            <HiOutlineUser className="text-3xl text-[#22c55e] mb-4" />
            <h3 className="font-bold text-lg">Profile</h3>
            <p className="text-slate-400 mt-2 text-sm">Update your name and email.</p>
          </button>

          <button
            disabled={user?.provider !== "local"}
            onClick={() => setShowPassword(true)}
            className="rounded-3xl border border-[#1a2d4a] bg-[#0a1428] p-5 sm:p-6 text-left hover:border-[#22c55e]/40 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <HiOutlineLockClosed className="text-3xl text-[#22c55e] mb-4" />
            <h3 className="font-bold text-lg">Password</h3>
            <p className="text-slate-400 mt-2 text-sm">
              {user?.provider === "local"
                ? "Change your account password."
                : "Google accounts don't have local passwords."}
            </p>
          </button>

          <div className="rounded-3xl border border-[#1a2d4a] bg-[#0a1428] p-5 sm:p-6">
            <HiOutlineBell className="text-3xl text-[#22c55e] mb-4" />
            <h3 className="font-bold text-lg">Notifications</h3>
            <p className="text-slate-400 mt-2 text-sm">Manage email & push alerts.</p>
            <span className="inline-block mt-4 text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
              Coming soon
            </span>
          </div>

          <div className="rounded-3xl border border-[#1a2d4a] bg-[#0a1428] p-5 sm:p-6">
            <HiOutlineCog className="text-3xl text-[#22c55e] mb-4" />
            <h3 className="font-bold text-lg">Theme</h3>
            <p className="text-slate-400 mt-2 text-sm">Dark & Light theme.</p>
            <span className="inline-block mt-4 text-xs bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full">
              Coming soon
            </span>
          </div>
        </div>

        {showProfile && (
          <Modal
            title="Edit Profile"
            subtitle="Update your account information."
            onClose={() => setShowProfile(false)}
            onSubmit={saveProfile}
            loading={loading}
            submitLabel="Save Changes"
          >
            <Input
              label="Name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
            <Input
              label="Email"
              value={profile.email}
              onChange={(e) => setProfile({ ...profile, email: e.target.value })}
            />
          </Modal>
        )}

        {showPassword && (
          <Modal
            title="Change Password"
            subtitle="Secure your Devcane account."
            onClose={() => setShowPassword(false)}
            onSubmit={updatePassword}
            loading={loading}
            submitLabel="Update Password"
          >
            <Input
              label="Current Password"
              type="password"
              value={pwd.current}
              onChange={(e) => setPwd({ ...pwd, current: e.target.value })}
            />
            <Input
              label="New Password"
              type="password"
              value={pwd.next}
              onChange={(e) => setPwd({ ...pwd, next: e.target.value })}
            />
            <Input
              label="Confirm Password"
              type="password"
              value={pwd.confirm}
              onChange={(e) => setPwd({ ...pwd, confirm: e.target.value })}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Settings;