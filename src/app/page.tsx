import FeaturesView from "@/components/core/landing_page/FeaturesView";
import HeroSection from "@/components/core/landing_page/HeroSection";
import Navbar from "@/components/core/landing_page/Navbar";


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <FeaturesView />
    </>
  );
}
