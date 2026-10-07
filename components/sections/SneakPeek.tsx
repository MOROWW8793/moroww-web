import Image from 'next/image'
import { AuditLijn } from '@/components/AuditLijn'

/**
 * WP O — sneak peek van panden die nog niet publiek te boeken zijn.
 * Vervangt het oude "binnenkort"-tekstblok op /collectie en /the-shore,
 * en verschijnt op home tussen het woningraster en de aankomstsequentie.
 *
 * Bewust géén link naar een pandpagina en géén prijs of oppervlakte —
 * de teasers wachten op fotoshoot + copy en zitten daarom niet in de
 * `woningen`-array (liveWoningen, sitemap en generateStaticParams tonen ze
 * dus niet). Data staat lokaal in `TEASERS` hieronder.
 *
 * Component is puur presentatie (geen hooks, geen 'use client'), zodat
 * hij zowel in server- (home, /the-shore) als client-componenten
 * (CollectieStatisch) inzetbaar is.
 */

type TeaserFoto = { src: string; alt: { nl: string; en: string } }
type Teaser = {
  naam: string
  plaats: { nl: string; en: string }
  fotos: [TeaserFoto, TeaserFoto, TeaserFoto]
}

const TEASERS: Teaser[] = [
  {
    naam: 'House 1783-11',
    plaats: { nl: 'Knokke', en: 'Knokke' },
    fotos: [
      {
        src: '/images/woningen/knokke-1783-11/house-1783-11-01-eettafel.jpg',
        alt: {
          nl: 'Ovale eettafel met vier donkere houten stoelen; ontbijt met croissants, sinaasappelsap en druiven, ingebouwde bank tegen de wand.',
          en: 'Oval dining table with four dark wooden chairs; breakfast with croissants, orange juice and grapes, built-in bench against the wall.',
        },
      },
      {
        src: '/images/woningen/knokke-1783-11/house-1783-11-02-boeket.jpg',
        alt: {
          nl: 'Lage witte salontafel met een amberkleurige vaas en herfstboeket; achter een tv-meubel met reisgidsen, iemand loopt voorbij.',
          en: 'Low white coffee table with an amber vase and autumn bouquet; behind it a TV cabinet with travel books, a person walks past.',
        },
      },
      {
        src: '/images/woningen/knokke-1783-11/house-1783-11-03-doorkijk.jpg',
        alt: {
          nl: 'Doorkijk vanuit een gang naar een curved crème zetel met gebreide plaid, floor-to-ceiling vitrages en houten vloer.',
          en: 'View through a hallway onto a curved cream sofa with a knitted throw, floor-to-ceiling sheer curtains and a wooden floor.',
        },
      },
    ],
  },
]

export function SneakPeek({ locale }: { locale: string }) {
  const isNl = locale !== 'en'
  const pick = (v: { nl: string; en: string }) => (isNl ? v.nl : v.en)

  return (
    <section className="w-full px-6 md:px-16 lg:px-24 py-20">
      <div className="max-w-6xl mx-auto">
        <AuditLijn density="quiet" items={[isNl ? 'binnenkort' : 'coming soon']} />
        <h2 className="mt-mw-4 text-h2 text-moroww-dark max-w-[52ch]">
          {isNl ? 'een nieuwe woning aan de kust.' : 'a new home on the coast.'}
        </h2>
        <div className="mt-mw-8 flex flex-col gap-mw-8">
          {TEASERS.map((teaser) => (
            <div key={teaser.naam}>
              <p className="text-audit uppercase text-moroww-ink-2">
                {teaser.naam} · {pick(teaser.plaats)}
              </p>
              <div className="mt-mw-3 grid grid-cols-1 md:grid-cols-3 gap-2">
                {/* Groot beeld: op desktop 2 kolommen breed, op mobiel volle
                    breedte. */}
                <div className="relative aspect-[3/2] overflow-hidden md:col-span-2">
                  <Image
                    src={teaser.fotos[0].src}
                    alt={pick(teaser.fotos[0].alt)}
                    fill
                    sizes="(max-width: 768px) 100vw, 66vw"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                {/* Twee kleinere beelden: mobiel 2 kolommen naast elkaar,
                    desktop verticaal gestapeld in één kolom. */}
                <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
                  {[1, 2].map((i) => (
                    <div key={i} className="relative aspect-[3/2] overflow-hidden">
                      <Image
                        src={teaser.fotos[i].src}
                        alt={pick(teaser.fotos[i].alt)}
                        fill
                        sizes="(max-width: 768px) 50vw, 33vw"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
