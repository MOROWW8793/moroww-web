import { Link } from '@/i18n/navigation'
import { TOTAL_STAYS_REVIEWED } from '@/lib/reviews'

// Drie blokken onder de deuren op de home (nov 2026): wat het label voor een
// gast betekent, wat gasten zeggen, en waarom moroww bestaat. Bovenaan de
// home verandert niets; dit geeft bezoekers en zoekmachines meer om te lezen.

type Props = { locale: string }

const reviews = [
  {
    tekst:
      'Een uiterst proper appartement, smaakvol en modern ingericht met alle oog op comfort. Prachtig uitzicht, niks op aan te merken. Zou zeker opnieuw huren.',
    naam: 'Stephen',
    huis: 'The Sixteenth, Oostende',
  },
  {
    tekst:
      'Kaarsen stonden ons op te wachten, het rook er heerlijk, het was verwarmd bij aankomst. De rust van deze plek is ongeëvenaard. We voelden ons helemaal thuis.',
    naam: 'Sabrina',
    huis: 'Chalet Anna-Helena, Ursel',
  },
  {
    tekst:
      'Verblijven in de hottub terwijl je naar de sterren kijkt met het kampvuur: perfect. Een uitzonderlijke plek.',
    naam: 'Lucie',
    huis: 'The Cozy Relax Home, Beernem',
  },
]

export function HomeVerhaal({ locale }: Props) {
  const nl = locale !== 'en'

  const beloftes = nl
    ? [
        ['wij zijn er geweest', 'Elk huis wordt fysiek bezocht voor het in de collectie komt. Niet op basis van foto’s, maar ter plaatse.'],
        ['vier poorten', 'Minstens 100 m² en twee slaapkamers, karakter in natuurlijke materialen, een stille ligging. Geen uitzonderingen.'],
        ['elk jaar opnieuw', 'Een huis krijgt het label niet voor altijd. Elk jaar keuren we opnieuw, en lezen we wat gasten schrijven.'],
      ]
    : [
        ['we have been there', 'Every home is visited in person before it joins the collection. Not from photos, on site.'],
        ['four gates', 'At least 100 m² and two bedrooms, character in natural materials, a quiet location. No exceptions.'],
        ['every year again', 'A home does not keep the label forever. We inspect again every year, and read what guests write.'],
      ]

  return (
    <>
      {/* WAT HET LABEL BETEKENT VOOR EEN GAST */}
      <section className="w-full px-6 md:px-12 py-mw-8 border-t border-moroww-rule">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-mw-6">
          <div>
            <p className="text-audit uppercase text-moroww-label">{nl ? 'het label' : 'the label'}</p>
            <h2 className="mt-mw-3 text-h2 text-moroww-dark">
              {nl ? 'je weet vooraf wat je krijgt.' : 'you know what you get, before you go.'}
            </h2>
            <p className="mt-mw-4 text-body text-moroww-ink-2">
              {nl
                ? 'Elk huis in de collectie draagt het moroww-label. Dat betekent dat iemand van ons er was, het huis doorliep zoals jij het zou doen, en het pas toeliet toen alles klopte: het slot, de warmte, het licht, de geur en het gewone.'
                : 'Every home in the collection carries the moroww label. Someone from our team was there, walked through it as you would, and only let it in when everything was right: the lock, the warmth, the light, the scent and the ordinary.'}
            </p>
            <Link
              href="/de-standaard"
              className="mt-mw-5 inline-block text-body text-moroww-dark underline underline-offset-4 decoration-moroww-label"
            >
              {nl ? 'lees hoe we keuren →' : 'how we inspect →'}
            </Link>
          </div>
          <ol className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-mw-5">
            {beloftes.map(([titel, tekst], i) => (
              <li key={titel} className="border-t-2 border-moroww-dark pt-mw-4">
                <p className="text-audit uppercase text-moroww-label">0{i + 1}</p>
                <h3 className="mt-mw-2 text-h3 text-moroww-dark">{titel}</h3>
                <p className="mt-mw-2 text-body text-moroww-ink-2">{tekst}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WAT GASTEN ZEGGEN */}
      <section className="w-full px-6 md:px-12 py-mw-8 bg-moroww-paper">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-mw-4">
            <div>
              <p className="text-audit uppercase text-moroww-label">{nl ? 'wat gasten zeggen' : 'what guests say'}</p>
              <h2 className="mt-mw-3 text-h2 text-moroww-dark">
                {nl ? 'geen beloften. alleen ervaringen.' : 'no promises. only experiences.'}
              </h2>
            </div>
            <p className="text-body text-moroww-ink-2">
              <span className="text-moroww-orange">★★★★★</span>{' '}
              <span className="font-semibold text-moroww-dark">10/10</span>{' '}
              {nl ? `over ${TOTAL_STAYS_REVIEWED} verblijven` : `across ${TOTAL_STAYS_REVIEWED} stays`}
            </p>
          </div>
          <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-5">
            {reviews.map((r, i) => (
              <figure
                key={r.naam}
                className={`flex flex-col justify-between gap-mw-5 p-mw-6 ${i === 1 ? 'bg-moroww-dark text-white' : 'bg-white text-moroww-dark border border-moroww-rule'}`}
                style={{ borderRadius: 2 }}
              >
                <blockquote className="text-body-lg leading-relaxed">“{r.tekst}”</blockquote>
                <figcaption className={`pt-mw-4 border-t ${i === 1 ? 'border-white/15' : 'border-moroww-rule'}`}>
                  <p className="text-body font-semibold">{r.naam}</p>
                  <p className={`text-audit uppercase mt-1 ${i === 1 ? 'text-white/60' : 'text-moroww-ink-2'}`}>{r.huis}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* WAAROM MOROWW */}
      <section className="w-full px-6 md:px-12 py-mw-8 mb-mw-8 lg:mb-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-mw-8">
          <div>
            <p className="text-audit uppercase text-moroww-label">{nl ? 'waarom moroww' : 'why moroww'}</p>
            <h2 className="mt-mw-3 text-h2 md:text-[clamp(2.25rem,4vw,3.5rem)] md:leading-[1.05] text-moroww-dark max-w-[16ch]">
              {nl ? 'de juiste mensen samen. zodat het eenvoudig wordt.' : 'the right people together. so it becomes simple.'}
            </h2>
          </div>
          <div className="flex flex-col gap-mw-4 text-body-lg text-moroww-dark">
            {nl ? (
              <>
                <p>
                  Een goed verblijf hangt af van veel mensen. Wie poetst, wie het linnen brengt, wie de regels kent,
                  wie de prijzen zet, wie de gast verwelkomt. Voor een eigenaar is dat een puzzel. Voor een gast is het
                  vaak een gok.
                </p>
                <p>
                  Wij hebben moroww opgericht om die mensen samen te brengen rond één standaard. Eigenaars krijgen één
                  aanspreekpunt in plaats van tien. Gasten weten vooraf wat ze krijgen.
                </p>
                <p className="text-body text-moroww-ink-2">
                  Daarom zijn er drie takken: het label voor het huis, moroww how voor de vragen die eigenaars
                  tegenkomen, en moroww hub voor de partners die het mogelijk maken.
                </p>
                <p className="text-body text-moroww-ink-2">Noam en Brent, oprichters</p>
              </>
            ) : (
              <>
                <p>
                  A good stay depends on many people. Who cleans, who brings the linen, who knows the rules, who sets
                  the prices, who welcomes the guest. For an owner, that is a puzzle. For a guest, it is often a gamble.
                </p>
                <p>
                  We founded moroww to bring those people together around one standard. Owners get one point of
                  contact instead of ten. Guests know what they get before they arrive.
                </p>
                <p className="text-body text-moroww-ink-2">Noam and Brent, founders</p>
              </>
            )}
            <div className="mt-mw-2 flex flex-wrap gap-x-mw-5 gap-y-mw-2 text-body">
              <Link href="/over-moroww" className="underline underline-offset-4 decoration-moroww-label">
                {nl ? 'over moroww →' : 'about moroww →'}
              </Link>
              {nl && (
                <Link href="/voor-eigenaars" className="underline underline-offset-4 decoration-moroww-label">
                  voor eigenaars →
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
