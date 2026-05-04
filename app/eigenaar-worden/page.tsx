import type { Metadata } from "next";
import { EigenaarContent } from "./EigenaarContent";

export const metadata: Metadata = {
  title: "Eigenaar worden — Verhuur je woning via moroww",
  description:
    "Sluit je aan bij moroww als eigenaar. Wij beheren de volledige gastervaring. Jij geniet van passief inkomen zonder operationele last. Persoonlijk geïnspecteerd.",
  alternates: { canonical: "https://www.moroww.com/eigenaar-worden" },
  openGraph: {
    title: "Eigenaar worden | moroww",
    description: "Jouw pand. Onze standaard. Nul operationele last.",
    url: "https://www.moroww.com/eigenaar-worden",
  },
};

export default function EigenaarWordenPage() {
  return <EigenaarContent />;
}
