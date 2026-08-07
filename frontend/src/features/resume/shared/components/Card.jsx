const Card = ({ children, className = "" }) => (
  <div className={`bg-[#060d1a] border border-[#1a2d4a] rounded-2xl p-6 sm:p-8 ${className}`}>
    {children}
  </div>
);

export default Card;