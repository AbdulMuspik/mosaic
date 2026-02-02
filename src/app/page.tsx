import { CountdownSection } from "@/features/landing/components/countdown-section";
import { FooterSection } from "@/features/landing/components/footer-section";
import { GallerySection } from "@/features/landing/components/gallery-section";
import { HeroSection } from "@/features/landing/components/hero-section";

export default function Home() {
  return (
    <main className="overflow-x-hidden pt-14 md:pt-16">
      <HeroSection />
      <CountdownSection />
      <GallerySection />
      <FooterSection />
    </main>
  );
}
