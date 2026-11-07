import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { woningen, lw } from '@/lib/woningen'

export const metadata: Metadata = {
  title: 'moroww — het ecosysteem voor kortetermijnverhuur in België',
  description:
    'Van keuring tot afrekening. Eén systeem voor eigenaars, één standaard voor gasten.',
  alternates: { canonical: 'https://www.moroww.com' },
}

type Onderdeel = {
  nr: string
  naam: { nl: string; en: string }
  regel: { nl: string; en: string }
}

const STACK: Onderdeel[] = [
  {
    nr: '01',
    naam: { nl: 'keuring', en: 'inspection' },
    regel: {
      nl: 'elk huis fysiek bezocht. komt het door de keuring, dan komt het op moroww. komt het er niet door, dan ook niet.',
      en: 'every home visited in person. passes the inspection, joins moroww. fails, does not.',
    },
  },
  {
    nr: '02',
    naam: { nl: 'inrichting', en: 'setup' },
    regel: {
      nl: 'waar nodig passen we aan: licht, bedden, keuken, de dingen die je pas merkt als je er slaapt.',
      en: 'where needed we adjust: light, beds, kitchen — the things you only notice after a night.',
    },
  },
  {
    nr: '03',
    naam: { nl: 'publicatie', en: 'listing' },
    regel: {
      nl: 'één pandpagina met dezelfde opbouw als de rest, geen zestig profielen op platforms.',
      en: 'one page per home, same structure as the others, not sixty profiles across platforms.',
    },
  },
  {
    nr: '04',
    naam: { nl: 'kanalen', en: 'channels' },
    regel: {
      nl: 'jouw huis staat op de boekingskanalen, maar prijs, kalender en beschikbaarheid lopen bij ons samen.',
      en: 'your home appears on booking channels; pricing, calendar and availability sit with us.',
    },
  },
  {
    nr: '05',
    naam: { nl: 'gastbelofte', en: 'guest promise' },
    regel: {
      nl: 'reactie binnen vier uur, herstel binnen twee. we lossen op; alleen de nachten die eronder lijden gaan terug.',
      en: 'reply within four hours, fix within two. we repair first; only the affected nights are refunded.',
    },
  },
  {
    nr: '06',
    naam: { nl: 'afrekening', en: 'payout' },
    regel: {
      nl: 'eigenaarsdashboard dat laat zien wat binnenkomt, waar het vandaan komt en wat eruit gaat.',
      en: 'owner dashboard showing what comes in, where it came from and what leaves it.',
    },
  },
]

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isNl = locale === 'nl'
  const lcode = (isNl ? 'nl' : 'en') as 'nl' | 'en'
  const prefix = isNl ? '' : '/en'
  const geselecteerd = woningen.slice(0, 3)

  return (
    <>
      {/* HERO — typografisch, geen beeld. Index-First: de belofte is de stack
          die eronder uitgeklapt wordt. Primaire actie voor eigenaars, de
          secundaire voor gasten. */}
      <section className="hm-wrap hm-section">
        <p className="hm-dim" style={{ fontSize: '0.9375rem', marginBottom: '1.25rem' }}>
          {isNl ? 'moroww — kortetermijnverhuur in België' : 'moroww — short-term rentals in Belgium'}
        </p>
        <h1 className="hm-display hm-h-xl" style={{ maxWidth: '18ch' }}>
          {isNl
            ? 'het ecosysteem voor kortetermijnverhuur.'
            : 'the ecosystem for short-term rentals.'}
        </h1>
        <p className="hm-lead" style={{ marginTop: '1.5rem' }}>
          {isNl
            ? 'van keuring tot afrekening. één systeem voor eigenaars, één standaard voor gasten.'
            : 'from inspection to payout. one system for owners, one standard for guests.'}
        </p>
        <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={`${prefix}/eigenaar-worden`} className="hm-cta">
            {isNl ? 'verhuur jouw huis' : 'host with us'}
          </Link>
          <Link href={`${prefix}/collectie`} className="hm-cta-ghost">
            {isNl ? 'zie de woningen' : 'see the homes'}
          </Link>
        </div>
      </section>

      {/* DE STACK — zes onderdelen in editorial-index. Nummer, naam, regel,
          scheidingslijn ertussen. Dit is de signatuur van de pagina: moroww
          als samenhangend systeem in plaats van een verzameling huizen. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
          className="hm-split-grid"
        >
          <div>
            <h2 className="hm-display hm-h-lg" style={{ maxWidth: '14ch' }}>
              {isNl ? 'wat het systeem doet.' : 'what the system does.'}
            </h2>
            <p className="hm-dim hm-prose" style={{ marginTop: '1rem', fontSize: '0.9375rem' }}>
              {isNl
                ? 'zes stappen van ontvangst tot afrekening. voor een eigenaar is dit het hele verhaal; voor een gast de reden dat het verblijf werkt.'
                : 'six steps from intake to payout. for an owner this is the whole arc; for a guest it is why the stay works.'}
            </p>
          </div>

          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              borderTop: '1px solid var(--hm-rule)',
            }}
          >
            {STACK.map((o) => (
              <li
                key={o.nr}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2.5rem minmax(0, 10rem) minmax(0, 1fr)',
                  gap: '1rem 1.5rem',
                  alignItems: 'baseline',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid var(--hm-rule)',
                }}
              >
                <span className="hm-dim" style={{ fontVariantNumeric: 'tabular-nums', fontSize: '0.875rem' }}>
                  {o.nr}
                </span>
                <span className="hm-display" style={{ fontSize: '1.375rem' }}>
                  {o.naam[lcode]}
                </span>
                <span style={{ fontSize: '0.9375rem', lineHeight: 1.55 }}>{o.regel[lcode]}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VOOR EIGENAARS — het hoofdspoor nu. Foto links, prose rechts op lg.
          De belofte in gewone taal: één overdracht in plaats van drie
          leveranciers. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'center',
          }}
          className="hm-hero-grid"
        >
          <div className="hm-frame" style={{ aspectRatio: '4 / 5', position: 'relative' }}>
            <Image
              src="/images/host-teaser.jpg"
              alt={isNl ? 'een huis dat op moroww staat' : 'a home on moroww'}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
          <div>
            <h2 className="hm-display hm-h-lg">{isNl ? 'voor eigenaars.' : 'for owners.'}</h2>
            <div className="hm-prose" style={{ marginTop: '1.25rem' }}>
              <p>
                {isNl
                  ? 'Je draagt je huis over aan één team, niet aan drie leveranciers. We komen eerst langs, nemen de briefing op papier, en pakken daarna keuring, inrichting, publicatie, kanalen, gastervaring en afrekening in één hand.'
                  : 'You hand your home over to one team, not three vendors. We visit first, put the brief on paper, and then run inspection, setup, listing, channels, guest experience and payout as one.'}
              </p>
              <p>
                {isNl
                  ? 'Je ziet in je dashboard elke boeking, elk kanaal en elke betaling. Wat jij niet ziet: de telefoon om tien uur ’s avonds, de loodgieter om zeven uur ’s ochtends.'
                  : 'In your dashboard you see every booking, every channel and every payment. What you do not see: the phone at ten in the evening, the plumber at seven in the morning.'}
              </p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href={`${prefix}/eigenaar-worden`} className="hm-cta">
                {isNl ? 'verhuur jouw huis' : 'host with us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VOOR GASTEN — het gevolg van het systeem. Prose links, foto rechts.
          Gastbelofte en directe boeking kort benoemd; details op de pandpagina. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'center',
          }}
          className="hm-hero-grid-rev"
        >
          <div>
            <h2 className="hm-display hm-h-lg">{isNl ? 'voor gasten.' : 'for guests.'}</h2>
            <div className="hm-prose" style={{ marginTop: '1.25rem' }}>
              <p>
                {isNl
                  ? 'Eén standaard, in plaats van zestig profielen op een platform. Prijs, slaapkamers en huisregels staan op de pandpagina. Je boekt rechtstreeks en laat jezelf binnen met je eigen code.'
                  : 'One standard, not sixty profiles on a platform. Rate, bedrooms and house rules on each page. You book directly and let yourself in with your own code.'}
              </p>
              <p>
                {isNl
                  ? 'Gaat er iets mis, dan geldt de gastbelofte: reactie binnen vier uur, herstel binnen twee, alleen de nachten die eronder lijden gaan terug.'
                  : 'If something goes wrong, the guest promise applies: reply within four hours, fix within two, only the affected nights refunded.'}
              </p>
            </div>
            <div style={{ marginTop: '2rem' }}>
              <Link href={`${prefix}/collectie`} className="hm-cta">
                {isNl ? 'zie de woningen' : 'see the homes'}
              </Link>
            </div>
          </div>
          <div className="hm-frame" style={{ aspectRatio: '4 / 5', position: 'relative' }}>
            <Image
              src="/images/fp-interieur-1.jpg"
              alt={isNl ? 'interieur van een gekeurde woning' : 'interior of an inspected home'}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* VANDAAG TE BOEKEN — bewijs. Drie panden uit de collectie; de hele
          lijst leeft op /collectie. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
          }}
        >
          <h2 className="hm-display hm-h-lg" style={{ maxWidth: '18ch' }}>
            {isNl ? 'vandaag te boeken.' : 'available now.'}
          </h2>
          <Link href={`${prefix}/collectie`} className="hm-link" style={{ fontSize: '0.9375rem' }}>
            {isNl ? 'de hele collectie' : 'the full collection'}
          </Link>
        </div>

        <ul
          style={{
            listStyle: 'none',
            padding: 0,
            margin: 0,
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
          className="hm-three-grid"
        >
          {geselecteerd.map((w) => (
            <li key={w.id} style={{ minWidth: 0 }}>
              <Link
                href={`${prefix}/collectie/${w.id}`}
                style={{ textDecoration: 'none', color: 'var(--hm-ink)', display: 'block' }}
                className="hm-tile"
              >
                <div className="hm-frame" style={{ aspectRatio: '4 / 5', position: 'relative' }}>
                  <Image
                    src={w.heroFoto}
                    alt={w.naam}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 30vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <p className="hm-display hm-h-md" style={{ marginTop: '1rem' }}>{w.naam}</p>
                <p className="hm-dim" style={{ marginTop: '0.25rem', fontSize: '0.9375rem' }}>
                  {w.locatie}
                  {typeof w.prijs === 'number' ? ` — ${isNl ? 'vanaf' : 'from'} €${w.prijs}${isNl ? ' per nacht' : ' per night'}` : ''}
                </p>
                {w.slogan ? (
                  <p style={{ marginTop: '0.75rem', fontSize: '0.9375rem', maxWidth: '38ch' }}>
                    {lw(w.slogan, lcode)}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Responsief raster via media-queries — inline style kent geen @media,
          dus de grids staan hieronder als global-ish regel. */}
      <style>{`
        @media (min-width: 900px) {
          .hm-hero-grid      { grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr); }
          .hm-hero-grid-rev  { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
          .hm-split-grid     { grid-template-columns: minmax(0, 1fr) minmax(0, 1.6fr); }
          .hm-three-grid     { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        }
        .hm-tile { display: block; color: var(--hm-ink); text-decoration: none; }
        .hm-tile:focus-visible { outline: 2px solid var(--hm-accent); outline-offset: 4px; }
        .hm-tile:hover .hm-frame img { transform: scale(1.02); }
        .hm-tile .hm-frame img { transition: transform 700ms var(--hm-ease); }
        @media (prefers-reduced-motion: reduce) {
          .hm-tile:hover .hm-frame img { transform: none; }
        }
      `}</style>
    </>
  )
}
