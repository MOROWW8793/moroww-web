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
      ? 'Iedere gast verdient te weten waarvoor hij betaalt. Wie achter het moroww-label staat, waarom we keuren en waar het begon.'
      : 'Every guest deserves to know what they are paying for. Who is behind the moroww label, why we inspect and where it started.',
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
