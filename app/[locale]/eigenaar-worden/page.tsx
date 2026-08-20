import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EigenaarContent } from "./EigenaarContent";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { EigenaarFaqJsonLd } from "@/components/EigenaarFaqJsonLd";
import { siteMetadata } from "@/lib/seo/siteMetadata";

// NL-only pagina — geen hreflang naar EN. keywords en geo-tags bewust
// weggehaald (Google negeert keywords sinds 2009 en geo-tags op elke
// pagina hardcoderen naar Knokke/Oostende gaf misleidende locatie op
// generieke content).
export const metadata: Metadata = siteMetadata({
  titel: 'Vakantiewoning verhuren in België met kwaliteitslabel',
  beschrijving:
    'Verhuur je vakantiewoning aan de Belgische kust of in het Meetjesland via moroww. Geen beheerder. Jij beheert je eigen woning — wij installeren de technologie, bewaken de standaard en regelen de directe boekingen. Certified. Controlled. Yours.',
  pad: '/eigenaar-worden',
  locale: 'nl',
  ogBeeld: '/images/og-eigenaar.jpg',
});

export default async function EigenaarWordenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return (
    <>
      <EigenaarContent />
      <FaqJsonLd />
      <EigenaarFaqJsonLd />
    </>
  );
}
