import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { FiUser, FiCopy, FiCheck } from "react-icons/fi";
import { BsStars } from "react-icons/bs";
import Codeblock from "./Codeblock.jsx";

const MessageBubble = ({ role, content }) => {
  const [copied, setCopied] = useState(false);
  const isUser = role === "user";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (isUser) {
    return (
      <div className="flex justify-end px-2">
        <div className="flex items-end gap-2 max-w-[85%] sm:max-w-[75%]">
          <div className="bg-gradient-to-br from-[#22c55e] to-[#16a34a] text-white px-5 py-3.5 rounded-2xl rounded-br-sm text-[14px] sm:text-[15px] leading-relaxed shadow-lg shadow-[#22c55e]/15">
            {content}
          </div>
          <div className="h-8 w-8 rounded-full bg-[#0a1428] border border-[#1a2d4a] flex items-center justify-center flex-shrink-0">
            <FiUser size={13} className="text-slate-400" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start px-2">
      <div className="flex items-start gap-2 sm:gap-3 w-full max-w-[95%] sm:max-w-[88%]">

        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-[#f59e0b] to-[#d97706] flex items-center justify-center flex-shrink-0 mt-1 shadow-lg shadow-[#f59e0b]/20">
          <BsStars size={13} className="text-white" />
        </div>

   
        <div className="flex-1 bg-[#060d1a] border border-[#1a2d4a] rounded-2xl rounded-tl-sm overflow-hidden shadow-xl">

         
          <div className="flex items-center justify-between px-5 py-3 border-b border-[#1a2d4a]">
            <span className="text-[10px] font-black text-[#f59e0b] uppercase tracking-widest">Devcane AI</span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-white transition">
              {copied ? <FiCheck size={12} className="text-[#22c55e]" /> : <FiCopy size={12} />}
            </button>
          </div>

          <div className="px-5 py-4">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <h1 className="text-xl font-black text-white mt-5 mb-2 first:mt-0">{children}</h1>,
                h2: ({ children }) => <h2 className="text-lg font-bold text-white mt-5 mb-2 first:mt-0">{children}</h2>,
                h3: ({ children }) => <h3 className="text-base font-bold text-[#f59e0b] mt-4 mb-1.5 first:mt-0">{children}</h3>,
                p:  ({ children }) => <p className="text-slate-300 text-[14px] sm:text-[15px] leading-7 my-2 first:mt-0">{children}</p>,
                strong: ({ children }) => <strong className="text-white font-bold">{children}</strong>,
                em: ({ children }) => <em className="text-slate-300 italic">{children}</em>,
                ul: ({ children }) => <ul className="my-3 space-y-1.5 list-none pl-0">{children}</ul>,
                ol: ({ children }) => <ol className="my-3 space-y-1.5 list-decimal pl-5 text-slate-300 text-[14px] sm:text-[15px] leading-7">{children}</ol>,
                li: ({ children }) => (
                  <li className="flex items-start gap-2 text-slate-300 text-[14px] sm:text-[15px] leading-7">
                    <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                    <span>{children}</span>
                  </li>
                ),
                a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-[#22c55e] hover:text-[#16a34a] hover:underline transition-colors">{children}</a>,
                blockquote: ({ children }) => <blockquote className="border-l-2 border-[#f59e0b] pl-4 my-3 text-slate-400 bg-[#f59e0b]/5 py-2 rounded-r-lg">{children}</blockquote>,
                hr: () => <hr className="border-[#1a2d4a] my-4" />,
                code({ inline, className, children, ...props }) {
                  if (inline) return <code className="text-[#22c55e] bg-[#0a1428] border border-[#1a2d4a] px-1.5 py-0.5 rounded text-[12px] mono" {...props}>{children}</code>;
                  return <Codeblock className={className}>{children}</Codeblock>;
                },
                table: ({ children }) => (
                  <div className="overflow-x-auto my-4">
                    <table className="w-full text-sm border-collapse">{children}</table>
                  </div>
                ),
                thead: ({ children }) => <thead className="border-b border-[#1a2d4a]">{children}</thead>,
                tbody: ({ children }) => <tbody>{children}</tbody>,
                tr: ({ children }) => <tr className="border-b border-[#0a1428]">{children}</tr>,
                th: ({ children }) => <th className="text-left text-slate-300 font-bold px-3 py-2">{children}</th>,
                td: ({ children }) => <td className="text-slate-400 px-3 py-2">{children}</td>,
              }}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;