import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { EigenaarContent } from "./EigenaarContent";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { EigenaarFaqJsonLd } from "@/components/EigenaarFaqJsonLd";

export const metadata: Metadata = {
  title: 'Vakantiewoning verhuren in België met kwaliteitslabel',
  description:
    'Verhuur je vakantiewoning aan de Belgische kust of in het Meetjesland via moroww. Geen beheerder. Jij beheert je eigen woning — wij installeren de technologie, bewaken de standaard en regelen de directe boekingen. Certified. Controlled. Yours.',
  keywords: [
    'vakantiewoning verhuren België',
    'vakantiewoning verhuren kust België',
    'mijn vakantiewoning verhuren',
    'tweede woning verhuren België',
    'vakantiewoning verhuren Knokke',
    'vakantiewoning verhuren Oostende',
    'vakantiewoning verhuren Meetjesland',
    'vakantiewoning verhuren zonder gedoe',
    'vakantiewoning verhuren Airbnb alternatief',
    'vakantiewoning laten beheren België',
    'vakantiewoning beheer kust',
    'vakantiewoning verhuren met systeem',
    'vakantiewoning verhuren zonder beheerder',
    'vakantiewoning verhuren eigen autonomie',
    'rendement vakantiewoning België',
    'vakantiewoning ROI België',
    'passief inkomen vakantiewoning',
    'vakantiewoning investering België',
    'tweede woning verhuren rendement',
    'vakantiewoning certificering België',
    'kwaliteitslabel vakantiewoning',
    'gecertificeerde vakantiewoning verhuren',
    'vakantiewoning smart lock installatie',
    'alternatief Xepa vakantiewoning',
    'beter dan Airbnb verhuren',
    'vakantiewoning verhuren zonder platform',
    'directe boeking vakantiewoning België',
    'moroww eigenaar worden',
  ],
  alternates: {
    canonical: 'https://www.moroww.com/eigenaar-worden',
    languages: {
      'nl-BE': 'https://www.moroww.com/eigenaar-worden',
      'nl': 'https://www.moroww.com/eigenaar-worden',
      'x-default': 'https://www.moroww.com/eigenaar-worden',
    },
  },
  openGraph: {
    title: 'Verhuur je vakantiewoning via moroww — zonder in te leveren op autonomie',
    description:
      'moroww installeert de tech-stack, bewaakt de standaard via audits en regelt directe boekingen. Jij beheert je eigen woning. Geen beheerder. Een gecertificeerd label.',
    url: 'https://www.moroww.com/eigenaar-worden',
    images: [
      {
        url: '/images/og-eigenaar.jpg',
        width: 1200,
        height: 630,
        alt: 'Vakantiewoning verhuren via moroww — gecertificeerd kwaliteitslabel',
      },
    ],
  },
  other: {
    'geo.region': 'BE-VWV',
    'geo.placename': 'Knokke-Heist, Oostende, Meetjesland',
    'geo.position': '51.1500;3.2833',
    ICBM: '51.1500, 3.2833',
  },
};

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
