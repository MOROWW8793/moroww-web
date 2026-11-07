import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { woningen, lw } from '@/lib/woningen'

export const metadata: Metadata = {
  title: 'moroww — gekeurde vakantiewoningen in België',
  description:
    'Een handvol vakantiewoningen in België, elk in persoon gekeurd voor opname.',
  alternates: { canonical: 'https://www.moroww.com' },
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const isNl = locale === 'nl'
  const prefix = isNl ? '' : '/en'
  const geselecteerd = woningen.slice(0, 3)

  return (
    <>
      {/* HERO — belofte links, foto rechts. Op lg past kop + zin + acties
          samen met het beeld op 1280x800 zonder scroll (F12). */}
      <section className="hm-wrap hm-section">
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
            alignItems: 'center',
          }}
          className="hm-hero-grid"
        >
          <div>
            <h1 className="hm-display hm-h-xl" style={{ maxWidth: '14ch' }}>
              {isNl ? 'elk huis, één keer bezocht.' : 'every home, visited once.'}
            </h1>
            <p className="hm-lead" style={{ marginTop: '1.5rem' }}>
              {isNl
                ? 'een handvol vakantiewoningen in België, in persoon gekeurd voor opname.'
                : 'a handful of holiday homes in Belgium, inspected in person before they join.'}
            </p>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={`${prefix}/collectie`} className="hm-cta">
                {isNl ? 'zie de woningen' : 'see the homes'}
              </Link>
              <Link href={`${prefix}/eigenaar-worden`} className="hm-cta-ghost">
                {isNl ? 'verhuur jouw huis' : 'host with us'}
              </Link>
            </div>
          </div>

          <div
            className="hm-frame"
            style={{ aspectRatio: '4 / 5', position: 'relative' }}
          >
            <Image
              src="/images/hero.jpg"
              alt={isNl ? 'interieur van een gekeurde woning' : 'interior of an inspected home'}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* WAT MOROWW DOET — de belofte in gewone taal. Geen bullets, geen
          iconen. Drie korte alinea's. Beide doelgroepen horen in de derde zin
          waar het heen gaat. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2rem, 4vw, 4rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
          className="hm-split-grid"
        >
          <h2 className="hm-display hm-h-lg" style={{ maxWidth: '16ch' }}>
            {isNl ? 'wat moroww doet.' : 'what moroww does.'}
          </h2>
          <div className="hm-prose">
            {isNl ? (
              <>
                <p>
                  We hebben twee collecties. <em>the shore</em>, aan de Belgische kust.{' '}
                  <em>the fields</em>, in het Vlaamse binnenland en de Ardennen.
                </p>
                <p>
                  Elk huis op moroww hebben we eerst zelf bezocht. We lopen rond, we
                  kijken, we maken aantekeningen. Komt het door de keuring, dan komt
                  het op de site. Komt het er niet door, dan ook niet.
                </p>
                <p>
                  Voor gasten betekent dat één standaard, in plaats van zestig
                  profielen op een platform. Voor eigenaars betekent dat één
                  gesprekspartner die hun huis kent.
                </p>
              </>
            ) : (
              <>
                <p>
                  Two collections. <em>the shore</em>, along the Belgian coast.{' '}
                  <em>the fields</em>, inland in Flanders and the Ardennes.
                </p>
                <p>
                  Every home on moroww we visit in person first. We walk through, we
                  look, we take notes. If it passes, it joins the site. If it does
                  not, it does not.
                </p>
                <p>
                  For guests that means one standard, not sixty profiles on a
                  platform. For owners it means one person who knows their home.
                </p>
              </>
            )}
          </div>
        </div>
      </section>

      {/* TWEE LANDSCHAPPEN — shore en fields naast elkaar. Elk een foto, een
          naam en één zin. De kaarten zijn niet omrand (geen card-in-card). */}
      <section className="hm-wrap hm-section">
        <h2 className="hm-display hm-h-lg" style={{ marginBottom: '2.5rem', maxWidth: '18ch' }}>
          {isNl ? 'twee landschappen.' : 'two landscapes.'}
        </h2>
        <div
          style={{
            display: 'grid',
            gap: '1.5rem',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
          className="hm-two-grid"
        >
          <Link href={`${prefix}/collectie?collectie=the-shore`} className="hm-tile">
            <div className="hm-frame" style={{ aspectRatio: '5 / 6', position: 'relative' }}>
              <Image
                src="/images/collectie-1.jpg"
                alt={isNl ? 'de Belgische kust' : 'the Belgian coast'}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="hm-display hm-h-md" style={{ marginTop: '1rem' }}>the shore</p>
            <p className="hm-dim" style={{ marginTop: '0.25rem', fontSize: '0.9375rem' }}>
              {isNl ? 'aan de Belgische kust.' : 'along the Belgian coast.'}
            </p>
          </Link>

          <Link href={`${prefix}/collectie?collectie=the-fields`} className="hm-tile">
            <div className="hm-frame" style={{ aspectRatio: '5 / 6', position: 'relative' }}>
              <Image
                src="/images/collectie-3.jpg"
                alt={isNl ? 'het Vlaamse binnenland' : 'the Flemish countryside'}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <p className="hm-display hm-h-md" style={{ marginTop: '1rem' }}>the fields</p>
            <p className="hm-dim" style={{ marginTop: '0.25rem', fontSize: '0.9375rem' }}>
              {isNl ? 'in het Vlaamse binnenland en de Ardennen.' : 'inland in Flanders and the Ardennes.'}
            </p>
          </Link>
        </div>
      </section>

      {/* TWEE SPOREN — gast en eigenaar op één sectie, naast elkaar, zodat de
          belofte voor beide doelgroepen op hetzelfde moment leesbaar is. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule)' }}>
        <div
          style={{
            display: 'grid',
            gap: 'clamp(2.5rem, 5vw, 4rem)',
            gridTemplateColumns: 'minmax(0, 1fr)',
          }}
          className="hm-split-grid"
        >
          <div className="hm-prose">
            <h2 className="hm-display hm-h-lg">{isNl ? 'voor wie hier komt.' : 'for guests.'}</h2>
            <p style={{ marginTop: '1.25rem' }}>
              {isNl
                ? 'Een reeks huizen die we zelf hebben doorlopen. Prijs, slaapkamers en huisregels staan op de pandpagina; je boekt rechtstreeks en je laat jezelf binnen met je eigen code.'
                : 'A set of homes we have walked through ourselves. Rate, bedrooms and house rules on each page; you book directly and let yourself in with your own code.'}
            </p>
            <div style={{ marginTop: '1.75rem' }}>
              <Link href={`${prefix}/collectie`} className="hm-cta">
                {isNl ? 'zie de woningen' : 'see the homes'}
              </Link>
            </div>
          </div>

          <div className="hm-prose">
            <h2 className="hm-display hm-h-lg">{isNl ? 'voor wie zijn huis toevertrouwt.' : 'for owners.'}</h2>
            <p style={{ marginTop: '1.25rem' }}>
              {isNl
                ? 'We komen eerst langs. Wat je huis kan en wat het niet kan, zetten we samen op papier. Verhuur en beheer lopen daarna via ons — één huis, één gesprekspartner.'
                : 'We come by first. What your home can and cannot do, we put on paper together. Rental and management then run through us — one home, one point of contact.'}
            </p>
            <div style={{ marginTop: '1.75rem' }}>
              <Link href={`${prefix}/eigenaar-worden`} className="hm-cta">
                {isNl ? 'verhuur jouw huis' : 'host with us'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* VANDAAG TE BOEKEN — een korte selectie. Prijs en locatie per kaart;
          detail en beschikbaarheid op de pandpagina zelf. Geen filter, geen
          sorteerbalk — dat hoort op /collectie. */}
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
                    {lw(w.slogan, isNl ? 'nl' : 'en')}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Responsief raster via media-queries — inline style kan geen @media,
          dus de grids staan hieronder als global-ish regel. */}
      <style>{`
        @media (min-width: 900px) {
          .hm-hero-grid  { grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr); }
          .hm-split-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-two-grid   { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-three-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
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
