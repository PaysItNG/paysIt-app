"use client";

import FeaturesView from "@/components/core/landing_page/FeaturesView";
import Footer from "@/components/core/landing_page/Footer";
import HeroSection from "@/components/core/landing_page/HeroSection";
import Navbar from "@/components/core/landing_page/Navbar";
import Section3View from "@/components/core/landing_page/Section3View";
import WhyChooseUs from "@/components/core/landing_page/WhyChooseUs";

export default function Home() {
  return (
    <main>
      <Navbar />

      <HeroSection />
      <FeaturesView />
      <Section3View />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
