import type { Metadata } from "next";
import { OverMorowwContent } from "./OverMorowwContent";

export const metadata: Metadata = {
  title: "Over moroww - Een kwaliteitslabel voor vakantiewoningen",
  description:
    "moroww is geen verhuurplatform. Het is een kwaliteitslabel opgericht door Brent en Noam. Wij curate een selectie woningen die voldoen aan een oncompromitterende standaard.",
  alternates: { canonical: "https://www.moroww.com/over-moroww" },
  openGraph: {
    title: "Over moroww",
    description: "Een kwaliteitslabel voor vakantiewoningen. Niet meer. Niet minder.",
    url: "https://www.moroww.com/over-moroww",
  },
};

export default function OverMorowwPage() {
  return <OverMorowwContent />;
}
