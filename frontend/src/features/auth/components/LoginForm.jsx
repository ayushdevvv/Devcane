import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const { handleLogin, handleGoogleLogin, loading } = useAuth();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await handleLogin({
        email: email.trim(),
        password,
      });

      if (data.success) {
        toast.success(data.message || "Login successful");
        navigate("/dashboard", { replace: true });
      } else {
        toast.error(data.message || "Login failed");
      }
    } catch (err) {
      toast.error(err?.message || "Login failed");
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-12 bg-[#060d1a]">
      <div className="mb-8">
        <h1 className="text-2xl font-black text-white">Welcome back</h1>

        <p className="text-slate-500 text-sm mt-1">
          Sign in to continue to Devcane
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block uppercase tracking-wider">
            Email
          </label>

          <input
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30 transition-all text-sm"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 mb-1.5 block uppercase tracking-wider">
            Password
          </label>

          <div className="relative">
            <input
              type={show ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30 transition-all text-sm"
            />

            <button
              type="button"
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition"
            >
              {show ? (
                <AiOutlineEye size={18} />
              ) : (
                <AiOutlineEyeInvisible size={18} />
              )}
            </button>
          </div>
        </div>

        <div className="flex justify-end">
          <Link
            to="/forgot-password"
            className="text-xs text-slate-500 hover:text-[#22c55e] transition-colors"
          >
            Forgot password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all hover:shadow-lg hover:shadow-[#22c55e]/20 flex items-center justify-center"
        >
          {loading ? <ClipLoader size={18} color="#fff" /> : "Sign In"}
        </button>
      </form>

      <div className="relative my-7">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-[#1a2d4a]" />
        </div>

        <div className="relative flex justify-center">
          <span className="bg-[#060d1a] px-3 text-[10px] uppercase tracking-widest text-slate-600 font-bold">
            or continue with
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white hover:bg-slate-100 disabled:opacity-50 transition-all duration-300 font-bold text-slate-900 text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        <FcGoogle size={20} />
        Continue with Google
      </button>

      <p className="text-sm text-slate-500 text-center mt-8">
        No account?{" "}
        <Link
          to="/register"
          className="text-[#22c55e] font-semibold hover:text-[#16a34a] transition-colors"
        >
          Create one free
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;