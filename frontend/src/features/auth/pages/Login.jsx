import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

const Login = () => {
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
              Dev
              <span className="bg-gradient-to-r from-blue-400 to-blue-700 bg-clip-text text-transparent">
                cane
              </span>
            </span>
          </Link>

          <div>
            <h2 className="text-2xl font-black text-white leading-tight mb-3">
              Your AI
              <br />
              dev partner awaits.
            </h2>

            <p className="text-slate-500 text-sm leading-relaxed">
              Code, debug, and land the job — all in one place. Ship
              production-ready code and get your resume noticed, powered by
              AI.
            </p>

            <div className="mt-8 space-y-3">
              {[
                "AI coding assistant for any language",
                "Instant resume analysis & feedback",
                "Root cause debugging & code reviews",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2.5">
                  <div className="h-5 w-5 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 flex items-center justify-center flex-shrink-0">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
                  </div>

                  <span className="text-slate-400 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-slate-700 text-xs">© 2026 Devcane</p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
};

export default Login;