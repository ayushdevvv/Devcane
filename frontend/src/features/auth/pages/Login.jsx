import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { ClipLoader } from "react-spinners";
import { useAuth } from "../hooks/useAuth";
import { BsStars } from "react-icons/bs";


const Login = () => {
  const {
    handleLogin,
    handleGoogleLogin,
    loading,
  } = useAuth();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await handleLogin({
        email,
        password,
      });

      navigate("/dashboard");
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-[#03070f] flex items-center justify-center px-4 py-12 relative overflow-hidden">

    
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#f59e0b]/4 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#1a2d4a] shadow-2xl shadow-black/60 bg-[#060d1a]">

    
        <div className="hidden md:flex w-[45%] flex-col justify-between p-10 bg-gradient-to-br from-[#0a1f14] via-[#060d1a] to-[#03070f] border-r border-[#1a2d4a]">

          <Link to="/" className="flex items-center gap-2.5">
       
            <span className="text-2xl font-bold text-white">
             Dev<span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">cane</span>
            </span>
          </Link>

          <div>
         

            <h2 className="text-2xl font-black text-white leading-tight mb-3">
              AI coding
              <br />
              partner awaits.
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Build faster with your AI coding companion. Debug, generate,
              review and ship production-ready code with confidence.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "Code generation in any language",
                "Root cause debugging",
                "Production-ready reviews",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  </div>

                  <span className="text-slate-400 text-sm">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-700 text-xs">
            © 2026 Devcane
          </p>
        </div>

        <div className="flex-1 flex flex-col justify-center px-8 py-10 sm:px-12 bg-[#060d1a]">

          <div className="mb-8">

            <h1 className="text-2xl font-black text-white">
              Welcome back
            </h1>

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
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30 transition-all text-sm"
                />

                <button
                  type="button"
                  onClick={() => setShow(!show)}
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
              {loading ? (
                <ClipLoader size={18} color="#fff" />
              ) : (
                "Sign In "
              )}
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
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white hover:bg-slate-100 transition-all duration-300 font-bold text-slate-900 text-sm shadow-md hover:shadow-lg active:scale-[0.98]"
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
      </div>
    </div>
  );
};

export default Login;