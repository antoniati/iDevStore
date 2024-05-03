import { HeaderLandigPage } from "@/components/headers/HeaderLandigPage";
import { HeroSection } from "@/components/sections/HeroSection";
import TechSections from "@/components/sections/TechsSection";
import { MainFooter } from "@/components/footers/MainFooter";

export default function Home() {
  return (
    <main>
      <HeaderLandigPage />
      <HeroSection />
      <TechSections />
      <MainFooter />
    </main>
  );
};