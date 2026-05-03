import type { Metadata } from "next";
import { EigenaarContent } from "./EigenaarContent";

export const metadata: Metadata = {
  title: "Founding Partner — Verhuur je woning via moroww",
  description:
    "Sluit je aan als Founding Partner. moroww beheert je vakantiewoning met technologie en een standaard die we nooit loslaten. Slechts 10 plaatsen.",
  alternates: { canonical: "https://www.moroww.com/eigenaar-worden" },
};

export default function EigenaarWordenPage() {
  return <EigenaarContent />;
}
