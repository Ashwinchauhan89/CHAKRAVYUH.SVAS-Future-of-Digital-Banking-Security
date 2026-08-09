import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import DashboardSection from "@/components/DashboardSection";
import ImplementationGuide from "@/components/ImplementationGuide";
import ScoringStrategy from "@/components/ScoringStrategy";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <DashboardSection />
      <ArchitectureFlow />
      <ImplementationGuide />
      <ScoringStrategy />
      <Footer />
    </div>
  );
};

export default Index;
