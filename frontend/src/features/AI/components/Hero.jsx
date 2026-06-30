import { useEffect, useState } from "react";
import { Sparkles, Bug, SearchCheck, BookOpen } from "lucide-react";
import { BsStars } from "react-icons/bs";
import { useAIContext } from "../services/ai.context";

const cards = [
  { title: "Generate Code",   subtitle: "Production-ready in any language",  prompt: "Generate a full-stack MERN authentication system with JWT.",  icon: Sparkles,    color: "border-[#f59e0b]/20 hover:border-[#f59e0b]/50 bg-[#f59e0b]/5",  iconColor: "text-[#f59e0b]",  iconBg: "bg-[#f59e0b]/10 border-[#f59e0b]/20" },
  { title: "Debug Errors",    subtitle: "Fix runtime & logical issues fast",   prompt: "Debug this error and explain the root cause.",                 icon: Bug,         color: "border-red-500/20 hover:border-red-400/50 bg-red-500/5",           iconColor: "text-red-400",    iconBg: "bg-red-500/10 border-red-500/20" },
  { title: "Code Review",     subtitle: "Improve quality & performance",       prompt: "Review my code and suggest improvements for production.",      icon: SearchCheck,  color: "border-[#22c55e]/20 hover:border-[#22c55e]/50 bg-[#22c55e]/5",   iconColor: "text-[#22c55e]",  iconBg: "bg-[#22c55e]/10 border-[#22c55e]/20" },
  { title: "Explain Code",    subtitle: "Understand complex code faster",      prompt: "Explain this code step by step like I'm a junior dev.",        icon: BookOpen,    color: "border-blue-500/20 hover:border-blue-400/50 bg-blue-500/5",       iconColor: "text-blue-400",   iconBg: "bg-blue-500/10 border-blue-500/20" },
];

const Hero = () => {
  const { sendMessage } = useAIContext();
  const [visible, setVisible] = useState(false);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 100);
    const t2 = setTimeout(() => setCardsVisible(true), 400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="flex-1 flex items-center justify-center px-4 sm:px-6 py-10 min-h-0">
      <div className="w-full max-w-4xl">

     
        <div className={`flex flex-col items-center text-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
         
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
           Lets Build Together With <span className="text-[#f59e0b]">AI</span>
          </h1>
          <p className="mt-3 text-slate-500 text-[14px] sm:text-[15px] max-w-md">
            Your AI software engineer — generate, debug, review, and explain code.
          </p>
        </div>

       
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 transition-all duration-700 ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          {cards.map(({ title, subtitle, prompt, icon: Icon, color, iconColor, iconBg }) => (
            <button
              key={title}
              onClick={() => sendMessage(prompt)}
              className={`group relative overflow-hidden text-left p-5 sm:p-6 rounded-2xl border bg-[#060d1a] ${color} transition-all duration-300 hover:scale-[1.02] hover:shadow-xl`}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,#ffffff08,transparent_70%)] transition" />
              <div className="relative z-10 flex items-start gap-4">
                <div className={`h-11 w-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${iconBg}`}>
                  <Icon size={19} className={iconColor} />
                </div>
                <div>
                  <h3 className="text-[14px] font-bold text-white">{title}</h3>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{subtitle}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="text-center text-xs text-slate-700 mt-8">Generate · Debug · Review · Explain</p>
      </div>
    </div>
  );
};

export default Hero;