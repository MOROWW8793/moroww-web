import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
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
      ? 'moroww brengt eigenaars, gasten en de juiste vakmensen samen rond één standaard. Waarom we moroww oprichtten, de drie takken en wie erachter staat.'
      : 'moroww brings owners, guests and the right people together around one standard. Why we founded moroww, the three branches and who is behind it.',
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
  const brentFoto = existsSync(path.join(process.cwd(), 'public', 'images', 'brent.jpg'))
  return <OverMorowwContent locale={locale} brentFoto={brentFoto} />;
}
