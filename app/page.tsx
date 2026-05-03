import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";
import { HostTeaser } from "@/components/sections/HostTeaser";
import { BrandQuote } from "@/components/sections/BrandQuote";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedProperties />
      <HostTeaser />
      <BrandQuote />
    </>
  );
}
