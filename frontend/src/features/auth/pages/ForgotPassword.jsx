import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsStars } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

import API from "../services/auth.api";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post("/api/auth/forgot-password", {
        email,
      });

      toast.success(data.message);

      navigate("/forgot-password/sent", {
        state: { email },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#03070f] flex items-center justify-center px-4 py-12 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#22c55e]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[450px] h-[300px] bg-[#22c55e]/5 blur-[100px] rounded-full" />
        <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 w-full max-w-[900px] flex flex-col md:flex-row rounded-3xl overflow-hidden border border-[#1a2d4a] shadow-2xl shadow-black/60 bg-[#060d1a]">

        <div className="hidden md:flex w-[45%] flex-col justify-between p-10 bg-gradient-to-br from-[#0a1f14] via-[#060d1a] to-[#03070f] border-r border-[#1a2d4a]">

          <Link to="/" className="flex items-center gap-2">
     
            <span className="font-bold text-white text-[15px]">
              Dev<span className="text-blue-400">cane</span>
            </span>
          </Link>

          <div>

           

            <h2 className="text-3xl font-black text-white mb-3 leading-tight">
              Forgot your
              <br />
              password?
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Enter your email address and we'll send you a secure password
              reset link.
            </p>

            <div className="mt-8 space-y-3">

              {[
                "Secure reset link",
                "Expires in 10 minutes",
                "No password required",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3"
                >
                  <div className="h-5 w-5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  </div>

                  <span className="text-sm text-slate-400">
                    {item}
                  </span>
                </div>
              ))}

            </div>

          </div>

          <p className="text-xs text-slate-700">
            © 2026 Devcane
          </p>

        </div>

        <div className="flex-1 flex items-center justify-center px-8 py-10 sm:px-12">

          <div className="w-full max-w-md">

            <Link
              to="/"
              className="flex items-center gap-2 mb-8 md:hidden"
            >
         

              <span className="font-bold text-white">
                Dev<span className="text-[#22c55e]">cane</span>
              </span>
            </Link>

            <div className="h-16 w-16 rounded-2xl bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center mb-6">
              <MdOutlineEmail
                size={30}
                className="text-[#22c55e]"
              />
            </div>

            <h1 className="text-3xl font-black text-white">
              Reset Password
            </h1>

            <p className="text-slate-500 mt-2 mb-8 text-sm">
              Enter the email associated with your account.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <div>

                <label className="block mb-2 text-xs uppercase tracking-widest text-slate-500 font-semibold">
                  Email Address
                </label>

                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#0a1428] border border-[#1a2d4a] text-white placeholder:text-slate-600 focus:outline-none focus:border-[#22c55e]/50 focus:ring-1 focus:ring-[#22c55e]/30 transition"
                />

              </div>

              <button
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-[#22c55e] hover:bg-[#16a34a] text-white font-bold transition flex justify-center items-center disabled:opacity-50"
              >
                {loading ? (
                  <ClipLoader
                    size={18}
                    color="#fff"
                  />
                ) : (
                  "Send Reset Link"
                )}
              </button>

            </form>

            <p className="text-center text-sm text-slate-500 mt-8">

              Remember your password?{" "}

              <Link
                to="/login"
                className="text-[#22c55e] hover:text-[#16a34a] font-semibold"
              >
                Back to Login
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default ForgotPassword;