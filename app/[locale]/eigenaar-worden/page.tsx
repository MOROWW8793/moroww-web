import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EigenaarContent } from "./EigenaarContent";
import { EigenaarContentEN } from "./EigenaarContentEN";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { EigenaarFaqJsonLd } from "@/components/EigenaarFaqJsonLd";
import { siteMetadata } from "@/lib/seo/siteMetadata";

// ISR: EigenaarContent leest live uit screenings_publiek. Elk uur revalidaten
// zodat de Statrij meebeweegt met nieuwe keuringen zonder deploy.
export const revalidate = 3600

// Sinds WP K.5 is deze pagina bilinguaal. NL blijft op /eigenaar-worden;
// EN wordt via next-intl pathnames gemount op /en/become-an-owner.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: isNl
      ? 'Vakantiewoning verhuren in België met kwaliteitslabel'
      : 'Rent out your holiday home in Belgium with a certified label',
    beschrijving: isNl
      ? 'Vakantiewoning verhuren aan de Belgische kust of in het Meetjesland via moroww. Wij installeren de tech, bewaken de standaard, boeken direct.'
      : 'Rent out your holiday home on the Belgian coast or in the Meetjesland via moroww. We install the tech, uphold the standard and book directly.',
    pad: isNl ? '/eigenaar-worden' : '/en/become-an-owner',
    locale: isNl ? 'nl' : 'en',
    ogBeeld: '/images/og-eigenaar.jpg',
    hreflang: { nl: '/eigenaar-worden', en: '/en/become-an-owner' },
  })
}

export default async function EigenaarWordenPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isNl = locale === 'nl'
  return (
    <>
      {isNl ? <EigenaarContent /> : <EigenaarContentEN />}
      <FaqJsonLd />
      <EigenaarFaqJsonLd />
    </>
  );
}
