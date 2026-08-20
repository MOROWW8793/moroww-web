import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Deur } from "@/components/Deur";
import { AuditLijn } from "@/components/AuditLijn";
import { siteMetadata } from "@/lib/seo/siteMetadata";

// Server-side check: als het bestand in /public niet bestaat, geef undefined
// terug zodat de Deur alleen de placeholder-tegel toont. Zo staat er nooit
// een broken <img> in de DOM met de alt-tekst bovenaan.
function beeldOfNull(publicPad: string): string | undefined {
  const abs = path.join(process.cwd(), "public", publicPad.replace(/^\//, ""));
  return existsSync(abs) ? publicPad : undefined;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: 'moroww — premium vakantiewoningen in België',
    beschrijving:
      'Twee collecties, één standaard. Elke woning fysiek geïnspecteerd voor ze in de collectie komt.',
    pad: isNl ? '/' : '/en',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/', en: '/en' },
  })
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  // t is niet strikt nodig — de homepage-tekst is hier hardgecodeerd zoals
  // gevraagd. i18n voor de deur-taglines volgt zodra de EN-copy vast staat.
  await getTranslations({ locale, namespace: 'home' })

  return (
    <>
      <FaqJsonLd />

      {/* HERO — bouwspec sectie 2. Blush achtergrond, één regel display,
          geen beeld, geen video, geen knop.
          pt-mw-8 (5rem) houdt de kop onder de fixed nav (64px); overflow
          visible zodat de ascenders van 'll' en 'é' niet klippen. */}
      <section
        className="w-full flex items-center px-6 md:px-12 pt-mw-8 overflow-visible"
        style={{ minHeight: '18vh' }}
      >
        <div className="mx-auto max-w-7xl w-full overflow-visible">
          <h1 className="text-display text-moroww-dark">
            twee collecties. één standaard.
          </h1>
        </div>
      </section>

      {/* DE TWEE DEUREN — bouwspec sectie 3. 50/50 met 8px gutter vanaf lg,
          gestapeld daaronder. Op mobiel space-6 tussen hero-regel en eerste
          deur; op desktop kunnen ze dichter want er staat display + witruimte
          tussenin. Beelden vooraf laden (priority in Deur zelf). */}
      <section className="w-full px-6 md:px-12 mt-mw-6 lg:mt-0">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Deur
            naam="the shore"
            tagline="waar het licht verandert"
            href="/the-shore"
            beeld={beeldOfNull('/images/home/shore-door.jpg')}
            beeldAlt="de Belgische kust"
          />
          <Deur
            naam="the fields"
            tagline="waar het stil blijft"
            href="/the-fields"
            beeld={beeldOfNull('/images/home/fields-door.jpg')}
            beeldAlt="het binnenland in winter"
          />
        </div>
      </section>

      {/* HET LABEL — bouwspec sectie 4. space-12 boven en onder. */}
      <section className="w-full px-6 md:px-12 mt-mw-12 mb-mw-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[52ch]">
            <AuditLijn density="quiet" items={['het label']} />
            <h2 className="mt-mw-4 text-h2 text-moroww-dark">
              moroww is een label, geen verhuurkantoor
            </h2>
            <p className="mt-mw-4 text-body-lg text-moroww-dark">
              Elke woning wordt fysiek geïnspecteerd voor ze in de collectie
              komt. De meeste halen de standaard niet.
            </p>
            <p className="mt-mw-5">
              <Link
                href="/de-standaard"
                className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                lees hoe we keuren →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
