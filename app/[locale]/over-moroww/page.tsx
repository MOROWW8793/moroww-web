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
    titel: isNl
      ? 'Over moroww — het kwaliteitslabel voor vakantiewoningen'
      : 'About moroww — the quality label for holiday homes',
    beschrijving: isNl
      ? 'moroww is het kwaliteitslabel voor vakantiewoningen in België: elke moroww-woning is geauditeerd, uitgerust en opgevolgd. Lees ons verhaal.'
      : 'moroww is the quality label for holiday homes in Belgium: every moroww home is audited, equipped and looked after. Read our story.',
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
