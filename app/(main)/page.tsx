import type { Metadata } from "next";
import { Hero }            from "@/components/sections/Hero";
import { WoningenGrid }    from "@/components/sections/WoningenGrid";
import { StandaardDetail } from "@/components/sections/StandaardDetail";
import { HostTeaser }      from "@/components/sections/HostTeaser";
import { FaqJsonLd }       from "@/components/FaqJsonLd";

export const metadata: Metadata = {
  title: 'moroww — premium vakantiewoningen in België',
  description:
    'Curatieve vakantiewoningen aan de Belgische kust en in de Vlaamse Ardennen. Fysiek geïnspecteerd, sensorisch ingericht, direct te boeken.',
  alternates: { canonical: 'https://www.moroww.com' },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WoningenGrid />
      <StandaardDetail />
      <HostTeaser />
      <FaqJsonLd />
    </>
  );
}
