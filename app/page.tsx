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
    "moroww curates een selectie premium vakantiewoningen aan de Belgische kust en in het Meetjesland. Vier woningen. Twee collecties. Één standaard.",
  alternates: { canonical: "https://www.moroww.com" },
  openGraph: {
    title: "moroww — Gecureerde vakantiewoningen in België",
    description: "Vier gecureerde vakantiewoningen. Twee collecties. Één standaard.",
    url: "https://www.moroww.com",
    images: [
      {
        url: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-132.jpg",
        width: 1200,
        height: 630,
        alt: "moroww vakantiewoningen",
      },
    ],
  },
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
