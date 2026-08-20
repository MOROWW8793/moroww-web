import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EigenaarContent } from "./EigenaarContent";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { EigenaarFaqJsonLd } from "@/components/EigenaarFaqJsonLd";
import { siteMetadata } from "@/lib/seo/siteMetadata";

// ISR: EigenaarContent leest live uit screenings_publiek. Elk uur revalidaten
// zodat de Statrij meebeweegt met nieuwe keuringen zonder deploy.
export const revalidate = 3600

// NL-only pagina — geen hreflang naar EN. keywords en geo-tags bewust
// weggehaald (Google negeert keywords sinds 2009 en geo-tags op elke
// pagina hardcoderen naar Knokke/Oostende gaf misleidende locatie op
// generieke content).
export const metadata: Metadata = siteMetadata({
  titel: 'Vakantiewoning verhuren in België met kwaliteitslabel',
  beschrijving:
    'Vakantiewoning verhuren aan de Belgische kust of in het Meetjesland via moroww. Wij installeren de tech, bewaken de standaard, boeken direct.',
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
