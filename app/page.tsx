import type { Metadata } from "next";
import { Hero }       from "@/components/sections/Hero";
import { TrustBar }   from "@/components/sections/TrustBar";
import { RegioGrid }  from "@/components/sections/RegioGrid";
import { HostTeaser } from "@/components/sections/HostTeaser";
import { Founders }   from "@/components/sections/Founders";
import { FAQ }        from "@/components/sections/FAQ";
import { FooterHero } from "@/components/sections/FooterHero";

export const metadata: Metadata = {
  title: "Gecureerde vakantiewoningen in België",
  description:
    "moroww selecteert vakantiewoningen die aan elk detail kloppen. Kust, Ardennen, Meetjesland. Elk pand fysiek geïnspecteerd.",
  alternates: { canonical: "https://www.moroww.com" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBar />
      <RegioGrid />
      <HostTeaser />
      <Founders />
      <FAQ />
      <FooterHero />
    </>
  );
}
