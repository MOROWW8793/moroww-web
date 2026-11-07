import type { Metadata } from "next";
import { existsSync } from "node:fs";
import path from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Deur } from "@/components/Deur";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { WoningKaarten } from "@/components/sections/WoningKaarten";
import { HomeVerhaal } from "@/components/sections/HomeVerhaal";
import { HomeHero, type HeroSlide } from "@/components/sections/HomeHero";
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

// De mooiste beelden uit de collectie, in deze volgorde in de slideshow.
// Liggende foto's van minstens 1600 px breed.
const HERO_SLIDES: HeroSlide[] = [
  { src: '/images/woningen/knokke-new/2026-AmelieBauwens-Moroww-V2-132.jpg', alt: 'leefruimte en keuken van Nosso Logies in Knokke', naam: 'Nosso Logies', plaats: 'Knokke' },
  { src: '/images/woningen/nieuwpoort/the-eight-01.jpg', alt: 'leefruimte met zicht op zee in The Eighth, Nieuwpoort', naam: 'The Eighth', plaats: 'Nieuwpoort-Bad' },
  { src: '/images/woningen/ursel-new/Bogaertstraat 17 Ursel-64.jpg', alt: 'Chalet Anna-Helena in het bos van Ursel', naam: 'Chalet Anna-Helena', plaats: 'Ursel' },
  { src: '/images/woningen/penthouse-v8b/penthouse-v8b-28.jpg', alt: 'terras van Penthouse V8B met zicht op zee', naam: 'Penthouse V8B', plaats: 'Oostende' },
  { src: '/images/woningen/beernem-new/WhatsApp Image 2025-11-02 at 14.42.01.jpeg', alt: 'tuin met serre van The Cozy Relax Home in Beernem', naam: 'The Cozy Relax Home', plaats: 'Beernem' },
  { src: '/images/woningen/oostende-new/6e71ca30-bb8f-11f0-96ff-dd8382026135 kopie.jpg', alt: 'leefruimte van The Sixteenth in Oostende', naam: 'The Sixteenth', plaats: 'Oostende' },
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const isNl = locale === 'nl'
  return siteMetadata({
    titel: isNl
      ? 'moroww — geselecteerde vakantiewoningen in België'
      : 'moroww — selected holiday homes in Belgium',
    beschrijving: isNl
      ? 'Twee collecties, één standaard. Elke woning persoonlijk bezocht voor ze in de collectie komt.'
      : 'Two collections, one standard. Every home visited in person before it joins the collection.',
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

      {/* HERO — slideshow van de huizen met kop en zoekbalk (nov 2026).
          De zoekbalk stuurt door naar /boeken met data en gasten. */}
      <HomeHero
        slides={HERO_SLIDES}
        locale={locale}
        maxGasten={Math.max(2, ...liveWoningen().map((w) => w.maxGasten ?? 0))}
      />

      {/* DE COLLECTIE — raster van live panden direct onder de H1, zelfde
          PandKaart als op /collectie. Zo landt een bezoeker op de home
          meteen op woningen in plaats van op de twee collectie-tegels. */}
      <section className="w-full px-6 md:px-12 mt-mw-6">
        <div className="mx-auto max-w-7xl">
          <WoningKaarten woningen={liveWoningen()} labelWoningen={liveLabelWoningen()} locale={locale as Locale} plekVoorEigenaar />
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

      {/* HET LABEL, WAT GASTEN ZEGGEN, WAAROM MOROWW — onder de deuren (nov 2026). */}
      <HomeVerhaal locale={locale} />

    </>
  );
}
