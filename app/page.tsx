import { Hero }             from "@/components/sections/Hero";
import { TrustBar }         from "@/components/sections/TrustBar";
import { CollectiePreview } from "@/components/sections/CollectiePreview";
import { RegioGrid }        from "@/components/sections/RegioGrid";
import { HostTeaser }       from "@/components/sections/HostTeaser";
import { Founders }         from "@/components/sections/Founders";
import { FAQ }              from "@/components/sections/FAQ";
import { FooterHero }       from "@/components/sections/FooterHero";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <CollectiePreview />
      <RegioGrid />
      <HostTeaser />
      <Founders />
      <FAQ />
      <FooterHero />
    </>
  );
}
