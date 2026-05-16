import type { Metadata } from "next";
import { Hero }            from "@/components/sections/Hero";
import { WoningenGrid }    from "@/components/sections/WoningenGrid";
import { StandaardDetail } from "@/components/sections/StandaardDetail";
import { HostTeaser }      from "@/components/sections/HostTeaser";

export const metadata: Metadata = {
  title: "Gecureerde vakantiewoningen in België",
  description:
    "moroww curates een selectie premium vakantiewoningen aan de Belgische kust en in het Meetjesland. Vier woningen. Twee collecties. Één standaard.",
  alternates: { canonical: "https://www.moroww.com" },
  openGraph: {
    title: "moroww - Gecureerde vakantiewoningen in België",
    description: "Vier gecureerde vakantiewoningen. Twee collecties. Één standaard.",
    url: "https://www.moroww.com",
    images: [
      {
        url: "/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-132.jpg",
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
      <WoningenGrid />
      <StandaardDetail />
      <HostTeaser />
    </>
  );
}
