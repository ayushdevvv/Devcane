import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FiCopy, FiCheck } from "react-icons/fi";

const Codeblock = ({ className, children }) => {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const language = match ? match[1] : "text";
  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-4 rounded-xl overflow-hidden border border-[#1a2d4a] group">
   
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#0a1428] border-b border-[#1a2d4a]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-slate-600">{"<>"}</span>
          <span className="text-xs font-bold text-[#22c55e] uppercase tracking-widest mono">
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-white transition-colors"
        >
          {copied ? (
            <><FiCheck size={12} className="text-[#22c55e]" /><span className="text-[#22c55e]">Copied!</span></>
          ) : (
            <><FiCopy size={12} /><span>Copy</span></>
          )}
        </button>
      </div>

      <SyntaxHighlighter
        language={language}
        style={vscDarkPlus}
        customStyle={{
          margin: 0,
          padding: "1.25rem 1.5rem",
          background: "#03070f",
          fontSize: "0.82rem",
          lineHeight: "1.8",
        }}
        showLineNumbers={code.split("\n").length > 4}
        lineNumberStyle={{ color: "#1a2d4a", minWidth: "2.5em" }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default Codeblock;