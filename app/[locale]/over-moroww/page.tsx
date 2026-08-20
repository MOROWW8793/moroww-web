import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { OverMorowwContent } from "./OverMorowwContent";
import { siteMetadata } from "@/lib/seo/siteMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: 'Over moroww — het kwaliteitslabel voor vakantiewoningen',
    beschrijving:
      'moroww is geen platform en geen co-host. Een gecertificeerd kwaliteitslabel voor premium vakantiewoningen in België. Lees ons verhaal.',
    pad: isNl ? '/over-moroww' : '/en/about',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/over-moroww', en: '/en/about' },
  })
}

export default async function OverMorowwPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  return <OverMorowwContent locale={locale} />;
}
