const GlowBackground = () => (
  <div className="fixed inset-0 -z-10 pointer-events-none">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500/4 blur-[120px] rounded-full" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[#22c55e]/4 blur-[100px] rounded-full" />
    <div className="absolute inset-0 opacity-[0.015] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
  </div>
);

export default GlowBackground;