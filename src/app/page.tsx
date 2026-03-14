import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { HowItWorks } from "@/components/HowItWorks";
import { ProfilePreview } from "@/components/ProfilePreview";
import { ResumeScore } from "@/components/ResumeScore";
import { TemplateGallery } from "@/components/TemplateGallery";
import { Features } from "@/components/Features";
import { WhoIsThisFor } from "@/components/WhoIsThisFor";
import { Testimonials } from "@/components/Testimonials";
import { ForColleges } from "@/components/ForColleges";
import { Stats } from "@/components/Stats";
import { Pricing } from "@/components/Pricing";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <HowItWorks />
      <ProfilePreview />
      <ResumeScore />
      <TemplateGallery />
      <Features />
      <WhoIsThisFor />
      <Testimonials />
      <ForColleges />
      <Stats />
      <Pricing />
      <FinalCTA />
      <Footer />
    </main>
  );
}

