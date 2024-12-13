import { Header } from "@/components/layout/Header";
import { LandingHero } from "./LandingHero";
import { FeaturedRecipes } from "@/components/home/FeaturedRecipes";
import { LandingFeatures } from "./LandingFeatures";
import { InfluencerSpotlight } from "@/components/home/InfluencerSpotlight";
import { TestimonialsCarousel } from "@/components/home/TestimonialsCarousel";
import { LandingFooter } from "./LandingFooter";

export function LandingPage() {
  return (
    <div className="relative">
      <Header />
      <main>
        <LandingHero />
        <FeaturedRecipes />
        <LandingFeatures />
        <InfluencerSpotlight />
        <TestimonialsCarousel />
      </main>
      <LandingFooter />
    </div>
  );
}