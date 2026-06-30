import { useContext, useState } from "react";
import { AuthContext } from "../services/auth.context";
import NavBar from "../components/NavBar.jsx";
import WorkspaceDrawer from "../components/WorkspaceDrawer";
import Hero from "../components/Hero";
import WorkspacePreview from "../components/WorkspacePreview";
import PlatformSection from "../components/PlatformSection";
import FeatureGrid from "../components/FeatureGrid";
import CTASection from "../components/CTASection";
import Footer from "../components/Footer";

const Home = () => {
  const { user } = useContext(AuthContext);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#03070f] text-white selection:bg-[#f59e0b] selection:text-black">

   
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 h-[700px] w-[700px] sm:h-[900px] sm:w-[900px] rounded-full bg-[#22c55e]/5 blur-[200px] sm:blur-[220px]" />
        <div className="absolute bottom-[-200px] right-[-100px] h-[500px] w-[500px] sm:h-[700px] sm:w-[700px] rounded-full bg-[#f59e0b]/5 blur-[180px] sm:blur-[200px]" />
        <div className="absolute left-[-100px] top-[35%] h-[500px] w-[500px] rounded-full bg-blue-500/4 blur-[160px] sm:blur-[180px]" />
        <div className="absolute inset-0 opacity-[0.018] bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:40px_40px] sm:bg-[size:42px_42px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,transparent_45%,#03070f)]" />
      </div>

      <WorkspaceDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <NavBar onMenuClick={() => setDrawerOpen(true)} />

      <main className="relative z-10">
        <Hero user={user} />
        <WorkspacePreview />
        <PlatformSection />
        <FeatureGrid />
        <CTASection user={user} />
      </main>

      <Footer />
    </div>
  );
};

export default Home;