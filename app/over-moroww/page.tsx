import type { Metadata } from "next";
import { OverMorowwContent } from "./OverMorowwContent";

export const metadata: Metadata = {
  title: "Over moroww — Het verhaal",
  description:
    "moroww is een kwaliteitslabel voor vakantiewoningen. Opgericht door Brent en Noam. Wij zeggen vaker nee dan ja — en dat is precies de waarde.",
  alternates: { canonical: "https://www.moroww.com/over-moroww" },
};

export default function OverMorowwPage() {
  return <OverMorowwContent />;
}
