import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { useAuth } from "../hooks/useAuth";


const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const { handleResetPassword, loading } = useAuth();

  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const data = await handleResetPassword(token, password);

      if (data.success) {
        toast.success("Password updated successfully");
        navigate("/login");
      }
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#03070f] flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[320px] bg-[#22c55e]/5 blur-[120px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-[#1a2d4a] bg-[#060d1a] shadow-2xl shadow-black/60 p-8">

        <Link
          to="/"
          className="flex items-center gap-2 justify-center mb-8"
        >
         
          <span className="text-lg font-bold text-white">
            Dev<span className="text-blue-400">cane</span>
          </span>
        </Link>

        <h1 className="text-3xl font-black text-white text-center">
          Reset Password
        </h1>

        <p className="text-center text-slate-500 text-sm mt-2 mb-8">
          Choose a strong password for your account.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              New Password
            </label>

            <div className="relative">
              <input
                type={show ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30"
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
              >
                {show ? (
                  <AiOutlineEye size={18} />
                ) : (
                  <AiOutlineEyeInvisible size={18} />
                )}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-500 font-semibold mb-2">
              Confirm Password
            </label>

            <input
              type={show ? "text" : "password"}
              required
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirm password"
              className="w-full px-4 py-3 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 text-white font-bold transition-all"
          >
            {loading ? (
              <ClipLoader
                size={18}
                color="#fff"
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <p className="text-center text-slate-500 text-sm mt-8">
          Remember your password?{" "}
          <Link
            to="/login"
            className="text-[#22c55e] hover:text-[#16a34a] font-semibold"
          >
            Sign In 
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;