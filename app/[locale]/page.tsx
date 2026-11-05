import type { Metadata } from "next";
import Link from "next/link";
import { existsSync } from "node:fs";
import path from "node:path";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { FaqJsonLd } from "@/components/FaqJsonLd";
import { Deur } from "@/components/Deur";
import { Aankomst } from "@/components/sections/Aankomst";
import { SneakPeek } from "@/components/sections/SneakPeek";
import { CollectieOverzicht } from "@/components/collectie/CollectieOverzicht";
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
      ? 'moroww — boek gekeurde vakantiewoningen'
      : 'moroww — book inspected holiday homes',
    beschrijving: isNl
      ? 'Boek karaktervolle vakantiewoningen die ter plaatse gekeurd zijn. Rechtstreeks bij moroww, zonder servicekosten.'
      : 'Book holiday homes with character, each inspected in person. Directly with moroww, without service fees.',
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

      {/* HERO — boekingssite eerst (nov 2026): wat je hier doet, en twee
          knoppen. Zoeken op data zit op /boeken. */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10 overflow-visible">
        <div className="mx-auto max-w-7xl w-full overflow-visible">
          <p className="mw-in text-[0.9375rem] text-moroww-ink-2">
            {isNl ? 'gekeurde vakantiewoningen' : 'inspected holiday homes'}
          </p>
          <h1 className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[15ch]">
            {isNl ? 'boek een verblijf dat klopt.' : 'book a stay that is right.'}
          </h1>
          <div className="mw-in-2 mt-mw-6 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_auto] gap-mw-5 items-end">
            <p className="text-body-lg text-moroww-dark max-w-[52ch]">
              {isNl
                ? 'Karaktervolle huizen, elk ter plaatse gekeurd op wat je het eerst opmerkt. Je boekt rechtstreeks bij ons, zonder servicekosten.'
                : 'Homes with character, each inspected in person on what you notice first. You book directly with us, without service fees.'}
            </p>
            <div className="flex flex-wrap gap-mw-3">
              <Link
                href={isNl ? '/boeken' : '/en/book'}
                className="inline-flex items-center min-h-[52px] px-mw-5 py-4 bg-moroww-dark text-moroww-paper border border-moroww-dark text-[0.9375rem] hover:bg-transparent hover:text-moroww-dark transition-colors duration-500"
              >
                {isNl ? 'zoek op data' : 'search by date'}
              </Link>
              <Link
                href={isNl ? '/collectie' : '/en/collection'}
                className="inline-flex items-center min-h-[52px] px-mw-2 text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors"
              >
                {isNl ? 'bekijk de collectie' : 'see the collection'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DE HUIZEN — zelfde overzichtskaart als op /collectie: kenmerken,
          prijs en een boekknop per huis. */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <CollectieOverzicht woningen={liveWoningen()} locale={locale as Locale} tabel={false} variant="verhaal" />
        </div>
      </section>

      {/* SNEAK PEEK — twee panden die nog niet publiek boekbaar zijn,
          in beeld tussen het woningraster en de aankomstsequentie
          (WP O). Onder de vouw, lazy-loaded, niet klikbaar. */}
      <SneakPeek locale={locale} />

      {/* AANKOMSTSEQUENTIE — vier regels van The Eighth, één voor één in
          zicht (client, IntersectionObserver, one-shot,
          prefers-reduced-motion toont alles direct). Zit onder het
          woningraster zodat er niets boven de vouw animeert. */}
      <Aankomst />

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
            beeldAlt={isNl ? 'het platteland' : 'the countryside'}
          />
        </div>
      </section>

      {/* WAAR HET BEGON — het Edinburgh-verhaal uit 'De moroww-belofte'
          (nov 2026) vervangt de losse positioneringszin. De one-liner sluit
          af; het volledige verhaal staat op /over-moroww. */}
      <section className="w-full px-6 md:px-12 mt-mw-12 mb-mw-12">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-[52ch]">
            <h2 className="text-h2 text-moroww-dark">
              {isNl ? 'waar het begon' : 'where it started'}
            </h2>
            <div className="mt-mw-4 space-y-mw-3 text-body-lg text-moroww-dark">
              {isNl ? (
                <>
                  <p>
                    Edinburgh. Een mooie woning, goede foto&apos;s, sterke
                    reviews. De eerste nacht tilden we de matras op. Eronder
                    zat schimmel.
                  </p>
                  <p>Niemand had gelogen. Er had gewoon niemand gekeken.</p>
                  <p>moroww kijkt, zodat jij het niet hoeft te doen.</p>
                </>
              ) : (
                <>
                  <p>
                    Edinburgh. A beautiful flat, good photos, strong reviews.
                    The first night we lifted the mattress. Underneath was
                    mould.
                  </p>
                  <p>Nobody had lied. Nobody had looked.</p>
                  <p>moroww looks, so you don&apos;t have to.</p>
                </>
              )}
            </div>
            <ul className="mt-mw-5 flex flex-wrap gap-x-mw-5 gap-y-mw-3 text-audit uppercase">
              <li>
                <Link
                  href={isNl ? '/over-moroww' : '/en/about'}
                  className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                >
                  {isNl ? 'lees ons verhaal →' : 'read our story →'}
                </Link>
              </li>
              <li>
                <Link
                  href={isNl ? '/de-standaard' : '/en/the-standard'}
                  className="text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
                >
                  {isNl ? 'hoe we kijken →' : 'how we look →'}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
