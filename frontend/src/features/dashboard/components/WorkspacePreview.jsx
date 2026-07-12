import { BsStars } from "react-icons/bs";
import { FiCode, FiMessageSquare, FiPlus, FiCopy, FiCheckCircle, FiXCircle, FiUpload, FiFileText } from "react-icons/fi";
import { Award } from "lucide-react";

const WorkspacePreview = () => (
  <section className="relative px-4 sm:px-6 pb-20 sm:pb-28">
    <div className="max-w-4xl mx-auto space-y-5">

      <div className="text-center mb-8 sm:mb-10">
        <p className="text-[10px] sm:text-xs text-blue-400 font-bold uppercase tracking-widest mb-3">Preview</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">See it in action</h2>
        <p className="mt-2 text-slate-500 text-sm">Two powerful tools. One platform.</p>
      </div>


      <div className="rounded-2xl border border-[#1a2d4a] bg-[#060d1a] overflow-hidden shadow-xl shadow-black/40">
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[#1a2d4a] bg-[#03070f]">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-red-400/50"/><div className="h-2 w-2 rounded-full bg-[#f59e0b]/50"/><div className="h-2 w-2 rounded-full bg-[#22c55e]/50"/>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">AI Coding Assistant</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-[#22c55e] font-bold border border-[#22c55e]/20 bg-[#22c55e]/8 px-2 py-0.5 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse"/> LIVE
          </div>
        </div>

        <div className="flex" style={{ height: "240px" }}>
    
          <aside className="hidden sm:flex flex-col w-32 border-r border-[#1a2d4a] bg-[#03070f] p-2 flex-shrink-0">
            <button className="w-full rounded-lg bg-[#22c55e] text-white py-1.5 font-bold text-[10px] mb-2.5">+ New Chat</button>
            <p className="text-[8px] uppercase tracking-widest text-slate-700 mb-1.5 font-bold px-1">Recent</p>
            {["JWT Auth", "React Hooks", "Node API"].map(c => (
              <button key={c} className="w-full text-left px-2 py-1.5 rounded-lg text-[10px] text-slate-500 hover:text-slate-300 transition truncate">{c}</button>
            ))}
          </aside>

       
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 p-3 space-y-3 overflow-hidden">
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white text-[10px] px-3 py-2 rounded-xl rounded-br-sm max-w-[80%]">
                  Review my auth middleware and optimize it.
                </div>
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-6 rounded-lg bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center flex-shrink-0">
                  <BsStars size={10} className="text-white"/>
                </div>
                <div className="flex-1 bg-[#0a1428] border border-[#1a2d4a] rounded-xl rounded-tl-sm p-2.5">
                  <p className="text-[8px] text-[#f59e0b] font-black uppercase tracking-widest mb-1.5">Devcane AI</p>
                  <p className="text-slate-400 text-[10px] leading-4 mb-2">Cache the decoded token to avoid repeated DB lookups on every request.</p>
                  <div className="rounded-lg bg-[#03070f] border border-[#1a2d4a] overflow-hidden">
                    <div className="flex items-center justify-between px-2 py-1 border-b border-[#1a2d4a]">
                      <div className="flex items-center gap-1"><FiCode size={9} className="text-[#22c55e]"/><span className="text-[8px] text-[#22c55e] font-bold">javascript</span></div>
                      <FiCopy size={8} className="text-slate-600"/>
                    </div>
                    <pre className="p-2 text-[9px] text-[#22c55e] leading-4">{`const decoded = jwt.verify(token, SECRET);\nreq.user = decoded; next();`}</pre>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-[#1a2d4a] p-2 bg-[#03070f]">
              <div className="bg-[#060d1a] border border-[#1a2d4a] rounded-xl p-2 flex items-center gap-2">
                <div className="flex items-center gap-1 text-[8px] text-[#22c55e] font-bold border border-[#22c55e]/20 bg-[#22c55e]/8 px-2 py-0.5 rounded-full">
                  <FiMessageSquare size={8}/> Debug
                </div>
                <span className="text-[10px] text-slate-600">Ask Devcane anything...</span>
              </div>
            </div>
          </div>
        </div>
      </div>

  
      <div className="rounded-2xl border border-[#1a2d4a] bg-[#060d1a] overflow-hidden shadow-xl shadow-black/40">
        <div className="flex items-center justify-between px-4 sm:px-5 py-2.5 border-b border-[#1a2d4a] bg-[#03070f]">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-1">
              <div className="h-2 w-2 rounded-full bg-red-400/50"/><div className="h-2 w-2 rounded-full bg-[#f59e0b]/50"/><div className="h-2 w-2 rounded-full bg-blue-400/50"/>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">Resume Analyzer</span>
          </div>
          <div className="flex items-center gap-1 text-[9px] text-blue-400 font-bold border border-blue-500/20 bg-blue-500/8 px-2 py-0.5 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse"/> LIVE
          </div>
        </div>

        <div className="p-4 sm:p-5" style={{ height: "240px", overflowY: "auto" }}>
          <div className="flex flex-col sm:flex-row gap-3 h-full">

        
            <div className="sm:w-48 flex-shrink-0 bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-3.5 flex flex-col justify-between">
              <div>
                <p className="text-[9px] text-slate-500 uppercase tracking-wider mb-1">ATS Score</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-[#22c55e] leading-none">82</span>
                  <span className="text-slate-500 text-sm mb-0.5">/100</span>
                </div>
                <div className="mt-2 h-1.5 w-full bg-[#1a2d4a] rounded-full overflow-hidden">
                  <div className="bg-[#22c55e] h-full rounded-full" style={{ width: "82%" }}/>
                </div>
                <div className="flex justify-between text-[8px] text-slate-700 mt-0.5">
                  <span>0</span><span>50</span><span>100</span>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <span className="text-[9px] font-bold text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-2 py-0.5 rounded-full">Strong</span>
                <Award size={16} className="text-[#22c55e] opacity-60"/>
              </div>
            </div>

      
            <div className="flex-1 flex flex-col gap-2.5 min-w-0">

              
              <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-2.5">
                <p className="text-[8px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keywords</p>
                <div className="flex flex-wrap gap-1">
                  {["React", "Node.js", "MongoDB", "JWT"].map(k => (
                    <span key={k} className="flex items-center gap-0.5 text-[8px] text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/20 px-1.5 py-0.5 rounded-full">
                      <FiCheckCircle size={7}/>{k}
                    </span>
                  ))}
                  {["Docker", "GraphQL"].map(k => (
                    <span key={k} className="flex items-center gap-0.5 text-[8px] text-red-400 bg-red-500/10 border border-red-500/20 px-1.5 py-0.5 rounded-full">
                      <FiXCircle size={7}/>{k}
                    </span>
                  ))}
                </div>
              </div>

            
              <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-2.5">
                <p className="text-[8px] font-bold text-[#22c55e] uppercase tracking-wider mb-1.5">Strengths</p>
                {["Strong full-stack experience", "Clean project structure"].map((s, i) => (
                  <div key={i} className="flex gap-1.5 items-start mb-1">
                    <FiCheckCircle size={8} className="text-[#22c55e] flex-shrink-0 mt-0.5"/>
                    <p className="text-[9px] text-slate-400 leading-3">{s}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#0a1428] border border-[#1a2d4a] rounded-xl p-2.5">
                <p className="text-[8px] font-bold text-[#f59e0b] uppercase tracking-wider mb-1.5">Recommendations</p>
                {["Add impact metrics", "Include certifications"].map((r, i) => (
                  <div key={i} className="flex gap-1.5 mb-1">
                    <span className="text-[#f59e0b] font-black text-[7px] flex-shrink-0 mt-0.5">0{i+1}</span>
                    <p className="text-[9px] text-slate-400 leading-3">{r}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

     
        <div className="border-t border-[#1a2d4a] px-4 py-2.5 bg-[#03070f] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[9px] text-slate-500">
            <FiFileText size={10}/> AYUSH_Resume.pdf
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 text-[9px] text-[#22c55e] font-bold border border-[#22c55e]/20 bg-[#22c55e]/8 px-2.5 py-1 rounded-lg">
              <FiUpload size={9}/> Upload Again
            </button>
            <button className="flex items-center gap-1 text-[9px] text-blue-400 font-bold border border-blue-500/20 bg-blue-500/8 px-2.5 py-1 rounded-lg">
              Download Report
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
);

export default WorkspacePreview;