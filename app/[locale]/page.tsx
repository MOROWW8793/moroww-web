import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Deur } from "@/components/Deur";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { WoningKaarten } from "@/components/sections/WoningKaarten";
import { siteMetadata } from "@/lib/seo/siteMetadata";
import { liveWoningen, type Locale } from "@/lib/woningen";
import { liveLabelWoningen } from "@/lib/labelWoningen";

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
            {isNl ? 'karaktervolle huizen. een standaard die niet wijkt.' : 'homes with character. a standard that does not bend.'}
          </h1>
        </div>
      </section>

      {/* DE COLLECTIE — raster van live panden direct onder de H1, zelfde
          PandKaart als op /collectie. Zo landt een bezoeker op de home
          meteen op woningen in plaats van op de twee collectie-tegels. */}
      <section className="w-full px-6 md:px-12 mt-mw-6">
        <div className="mx-auto max-w-7xl">
          <WoningKaarten woningen={liveWoningen()} labelWoningen={liveLabelWoningen()} locale={locale as Locale} />
        </div>
      </section>

      {/* SNEAK PEEK — twee panden die nog niet publiek boekbaar zijn,
          in beeld tussen het woningraster en de aankomstsequentie
          (WP O). Onder de vouw, lazy-loaded, niet klikbaar. */}
      <SneakPeek locale={locale} />

      {/* DE TWEE DEUREN — verplaatst onder het woningenraster. Blijven de
          twee ingangen naar de streek-collecties (bouwspec sectie 3),
          nu als vervolg op wie al gescrold heeft. */}
      <section className="w-full px-6 md:px-12 mt-mw-8 mb-mw-8 lg:mb-mw-12">
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
            beeldAlt={isNl ? 'het platteland' : 'the countryside'}
          />
        </div>
      </section>

    </>
  );
}
