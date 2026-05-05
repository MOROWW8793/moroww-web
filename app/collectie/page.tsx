import type { Metadata } from "next";
import { CollectieStatisch } from "./CollectieStatisch";

export const metadata: Metadata = {
  title: "De Collectie - Premium vakantiewoningen",
  description:
    "Ontdek de moroww collectie: Nosso Logies in Knokke, Chalet Ann-Helena in Ursel, Oostende en Beernem. Gecureerde vakantiewoningen aan de kust en in het Meetjesland.",
  alternates: { canonical: "https://www.moroww.com/collectie" },
  openGraph: {
    title: "De Collectie | moroww",
    description: "Vier gecureerde vakantiewoningen in België. Kust en Meetjesland.",
    url: "https://www.moroww.com/collectie",
    images: [
      {
        url: "/images/woningen/knokke/2026-AmelieBauwens-Moroww-V2-132.jpg",
        width: 1200,
        height: 630,
        alt: "moroww collectie",
      },
    ],
  },
};

export default function CollectiePage() {
  return (
    <div className="min-h-screen bg-moroww-blush">
      <div className="px-6 md:px-16 lg:px-24 pt-32 pb-12 max-w-4xl mx-auto text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-moroww-orange mb-6">
          Gecureerde selectie
        </p>
        <h1
          className="font-bold lowercase text-moroww-black leading-[1.05] tracking-[-0.02em] mb-4"
          style={{ fontSize: "clamp(2.5rem,5vw,4.5rem)" }}
        >
          de collectie
        </h1>
        <p className="text-moroww-black/55 text-lg mb-8">
          Vier woningen. Twee collecties. Één standaard.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <span
            className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full"
            style={{ background: "#EEBC9D", color: "#1A1A1A" }}
          >
            the shore - Kust
          </span>
          <span
            className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full"
            style={{ background: "#CBD085", color: "#1A1A1A" }}
          >
            the fields - Meetjesland
          </span>
        </div>
      </div>
      <CollectieStatisch />
    </div>
  );
}
