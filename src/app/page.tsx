"use client";

import FeaturesView from "@/components/core/landing_page/FeaturesView";
import Footer from "@/components/core/landing_page/Footer";
import HeroSection from "@/components/core/landing_page/HeroSection";
import KeyFeaturesView from "@/components/core/landing_page/KeyFeatures";
import Navbar from "@/components/core/landing_page/Navbar";
import Section2View from "@/components/core/landing_page/Section2View";
import Section3View from "@/components/core/landing_page/Section3View";
import WhyChooseUs from "@/components/core/landing_page/WhyChooseUs";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <section className="md:h-[45vh] lg:h-[83vh] relative">
        <video
          loop
          muted
          autoPlay
          playsInline
          poster="https://www.shutterstock.com/image-photo/system-administrator-work-creating-machine-260nw-2574780997.jpg"
          className="absolute inset-0 z-0 object-cover h-full w-full"
        >
          <source src={"/assets/video/bgV.mp4"} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/70 z-0"></div>
        <div className="w-full max-w-screen lg:max-w-screen-xl mx-auto">
          <HeroSection />
        </div>
      </section>
      <FeaturesView />
      <Section2View />
      <KeyFeaturesView />
      <Section3View />
      <WhyChooseUs />
      <Footer />
    </main>
  );
}
