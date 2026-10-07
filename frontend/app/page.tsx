import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { CapabilityStrip } from "@/components/sections/CapabilityStrip";
import { CoreServices } from "@/components/sections/CoreServices";
import { AISection } from "@/components/sections/AISection";
import { SoftwareSection } from "@/components/sections/SoftwareSection";
import { AutomationSection } from "@/components/sections/AutomationSection";
import { DigitalGrowth } from "@/components/sections/DigitalGrowth";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { TechnologyStack } from "@/components/sections/TechnologyStack";
import { Industries } from "@/components/sections/Industries";
import { Products } from "@/components/sections/Products";
import { Insights } from "@/components/sections/Insights";
import { About } from "@/components/sections/About";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = {
  title: "SUDHIXAI — Enterprise AI & Custom Software Engineering",
  description:
    "SUDHIXAI builds next-generation AI solutions, autonomous workflows, and custom software for scaling businesses. Engineered for performance and scale.",
  keywords: [
    "AI company Patna",
    "software company Patna",
    "best software company in Bihar",
    "AI solutions Patna Bihar",
    "custom software development Patna",
    "top IT company Patna",
    "software solutions India",
    "artificial intelligence company Bihar",
  ],
  alternates: { canonical: "https://sudhixai.com" },
};


export default function HomePage() {
  return (
    <>
      <Hero />
      <CapabilityStrip />
      <CoreServices />
      <AISection />
      <SoftwareSection />
      <AutomationSection />
      <DigitalGrowth />
      <ProcessTimeline />
      <TechnologyStack />
      <Industries />
      <Products />
      <Insights />
      <About />
      <FinalCTA />
    </>
  );
}
