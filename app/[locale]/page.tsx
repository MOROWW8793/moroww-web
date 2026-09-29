import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Deur } from "@/components/Deur";
import { WoningKaarten } from "@/components/sections/WoningKaarten";
import { siteMetadata } from "@/lib/seo/siteMetadata";
import { liveWoningen, type Locale } from "@/lib/woningen";

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
    titel: isNl
      ? 'moroww — gekeurde vakantiewoningen in België'
      : 'moroww — inspected holiday homes in Belgium',
    beschrijving: isNl
      ? 'Twee collecties, één standaard. Elke woning fysiek geïnspecteerd voor ze in de collectie komt.'
      : 'Two collections, one standard. Every home inspected in person before it joins the collection.',
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
  await getTranslations({ locale, namespace: 'home' })
  const isNl = locale === 'nl'
  // Prefix voor de Deur-hrefs: NL zonder prefix, EN met /en. Deur gebruikt
  // een gewone next/link (geen next-intl Link) en verwacht een absoluut pad.
  const prefix = isNl ? '' : '/en'

  return (
    <>
      {/* FAQ-JSON-LD is Nederlandstalig; niet renderen op /en om de EN-pagina
          niet met NL structured data te vervuilen. */}
      {isNl && <FaqJsonLd />}

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
            {isNl ? 'twee collecties. één standaard.' : 'two collections. one standard.'}
          </h1>
        </div>
      </section>

      {/* DE COLLECTIE — raster van live panden direct onder de H1, zelfde
          PandKaart als op /collectie. Zo landt een bezoeker op de home
          meteen op woningen in plaats van op de twee collectie-tegels. */}
      <section className="w-full px-6 md:px-12 mt-mw-6">
        <div className="mx-auto max-w-7xl">
          <WoningKaarten woningen={liveWoningen()} locale={locale as Locale} />
        </div>
      </section>

      {/* DE TWEE DEUREN — verplaatst onder het woningenraster. Blijven de
          twee ingangen naar de streek-collecties (bouwspec sectie 3),
          nu als vervolg op wie al gescrold heeft. */}
      <section className="w-full px-6 md:px-12 mt-mw-8">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-2">
          <Deur
            naam="the shore"
            tagline={isNl ? 'waar het licht verandert' : 'where the light shifts'}
            href={`${prefix}/the-shore`}
            beeld={beeldOfNull('/images/home/shore-door.jpg')}
            beeldAlt={isNl ? 'de Belgische kust' : 'the Belgian coast'}
          />
          <Deur
            naam="the fields"
            tagline={isNl ? 'waar het stil blijft' : 'where the quiet stays'}
            href={`${prefix}/the-fields`}
            beeld={beeldOfNull('/images/home/fields-door.jpg')}
            beeldAlt={isNl ? 'het binnenland in winter' : 'the countryside in winter'}
          />
        </div>
      </section>

      {/* HET LABEL — bouwspec sectie 4. space-12 boven en onder.
          Kop = 'het label', body = positioneringszin, link = 'lees hoe we
          keuren'. Oude H2 ('moroww is een label, geen verhuurkantoor')
          en de tweede body-zin ('De meeste halen de standaard niet.') zijn
          weg — positioneringszin is nu de dragende regel. */}
      <section className="w-full px-6 md:px-12 mt-mw-12 mb-mw-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[52ch]">
            <h2 className="text-h2 text-moroww-dark">
              {isNl ? 'het label' : 'the label'}
            </h2>
            <p className="mt-mw-4 text-body-lg text-moroww-dark">
              {isNl
                ? 'moroww is het kwaliteitslabel voor vakantiewoningen in België: elke moroww-woning is geauditeerd, uitgerust en opgevolgd.'
                : 'moroww is the quality label for holiday homes in Belgium: every moroww home is audited, equipped and looked after.'}
            </p>
            <p className="mt-mw-5">
              <Link
                href={isNl ? '/de-standaard' : '/en/the-standard'}
                className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
              >
                {isNl ? 'lees hoe we keuren →' : 'how we inspect →'}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
