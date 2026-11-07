import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'

export const metadata: Metadata = {
  title: 'moroww — label voor karaktervolle vakantiewoningen in België',
  description:
    'Een label dat bewijst dat het huis klopt. Keuring ter plaatse, ja of nee, elk jaar opnieuw.',
  alternates: { canonical: 'https://www.moroww.com' },
}

type Tekst = { nl: string; en: string }

const CRITERIA: { naam: Tekst; regel: Tekst }[] = [
  {
    naam: { nl: 'keuring ter plaatse', en: 'inspection on site' },
    regel: {
      nl: 'iemand loopt door het huis voor de eerste gast er slaapt.',
      en: 'someone walks through the home before the first guest sleeps there.',
    },
  },
  {
    naam: { nl: 'ja of nee', en: 'yes or no' },
    regel: {
      nl: 'een huis draagt het label of niet. niet elk huis komt erbij.',
      en: 'a home carries the label or it does not. not every home joins.',
    },
  },
  {
    naam: { nl: 'elk jaar opnieuw', en: 'every year again' },
    regel: {
      nl: 'een label dat je niet kan verliezen, is geen label.',
      en: 'a label you cannot lose is not a label.',
    },
  },
]

const ZUILEN: { naam: Tekst; regel: Tekst; primair?: boolean }[] = [
  {
    naam: { nl: 'het label', en: 'the label' },
    regel: { nl: 'op je listings, je site en in het huis', en: 'on your listings, your site and inside the home' },
    primair: true,
  },
  {
    naam: { nl: 'de collectie', en: 'the collection' },
    regel: { nl: 'een plaats op moroww.com, waar reizigers kwaliteit zoeken', en: 'a place on moroww.com, where travellers look for quality' },
  },
  {
    naam: { nl: 'de partners', en: 'the partners' },
    regel: { nl: 'vakmensen voor het werk, en jonge merken die de standaard halen', en: 'tradespeople for the work, and young brands that meet the standard' },
  },
  {
    naam: { nl: 'de community', en: 'the community' },
    regel: { nl: 'eigenaars die dezelfde lat leggen en delen wat werkt', en: 'owners who hold the same bar and share what works' },
  },
  {
    naam: { nl: 'de hub', en: 'the hub' },
    regel: { nl: 'één adres voor elke vraag rond het huis', en: 'one address for every question around the home' },
  },
]

const CASE: { tijd: string; regel: Tekst; dim?: boolean }[] = [
  {
    tijd: '15:00',
    regel: {
      nl: 'een eigenaar vraagt of de ramen tegen 19 uur gepoetst kunnen zijn. er komen gasten.',
      en: 'an owner asks if the windows can be cleaned by 7 pm. guests are on the way.',
    },
  },
  {
    tijd: 'daarna',
    regel: {
      nl: 'moroww vindt in de community een partner in de buurt die vandaag nog kan.',
      en: 'moroww finds a nearby partner in the community who can still make it today.',
    },
    dim: true,
  },
  {
    tijd: '19:00',
    regel: {
      nl: 'de ramen zijn gepoetst. de eigenaar moest niemand bellen.',
      en: 'the windows are clean. the owner did not have to call anyone.',
    },
  },
]

const MANIEREN: { positie: Tekst; naam: Tekst; regel: Tekst; primair?: boolean }[] = [
  {
    positie: { nl: 'je verhuurt zelf', en: 'you rent it out yourself' },
    naam: { nl: 'het label', en: 'the label' },
    regel: {
      nl: 'we keuren het huis en staan in voor de belofte aan je gasten. je blijft verhuren met je eigen mensen.',
      en: 'we inspect the home and stand behind the promise to your guests. you keep renting with your own people.',
    },
    primair: true,
  },
  {
    positie: { nl: 'je houdt de touwtjes', en: 'you keep the reins' },
    naam: { nl: 'hulp op maat', en: 'help on demand' },
    regel: {
      nl: 'losse opdrachten waar het nu wringt: prijzen, foto’s, papieren. een vast bedrag, geen commissie.',
      en: 'specific jobs where it pinches: pricing, photos, paperwork. a flat fee, no commission.',
    },
  },
  {
    positie: { nl: 'je geeft het uit handen', en: 'you hand it over' },
    naam: { nl: 'wij doen het voor jou', en: 'we do it for you' },
    regel: {
      nl: 'wij verhuren het huis. een lokale partner zorgt voor aankomst, schoonmaak en linnen.',
      en: 'we rent the home. a local partner handles arrival, cleaning and linen.',
    },
  },
]

const STAPPEN: { nr: string; naam: Tekst; regel: Tekst; primair?: boolean }[] = [
  {
    nr: '1',
    naam: { nl: 'een kwartier samen', en: 'a quarter of an hour together' },
    regel: { nl: 'we leren het huis en jou kennen', en: 'we get to know the home and you' },
  },
  {
    nr: '2',
    naam: { nl: 'je kiest', en: 'you choose' },
    regel: { nl: 'een van de drie manieren', en: 'one of the three ways' },
  },
  {
    nr: '3',
    naam: { nl: 'de keuring', en: 'the inspection' },
    regel: { nl: 'ter plaatse, met een rapport van wat klopt en wat nog moet', en: 'on site, with a report of what fits and what still needs doing' },
  },
  {
    nr: '4',
    naam: { nl: 'je hoort erbij', en: 'you belong' },
    regel: { nl: 'het label, de community, de partners', en: 'the label, the community, the partners' },
    primair: true,
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
  const k = (isNl ? 'nl' : 'en') as 'nl' | 'en'
  const prefix = isNl ? '' : '/en'

  return (
    <>
      {/* HERO — pg 1. Lines-reveal op de belofte, rise op de rest. */}
      <section className="hm-wrap hm-section" style={{ paddingBlock: 'clamp(2rem, 5vw, 4.5rem)' }}>
        <div
          style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3.5rem)', gridTemplateColumns: 'minmax(0, 1fr)', alignItems: 'center' }}
          className="hm-hero-grid"
        >
          <div>
            <p className="hm-eyebrow" data-anim="rise">
              {isNl
                ? 'voor eigenaars van karaktervolle vakantiewoningen'
                : 'for owners of holiday homes with character'}
            </p>
            <h1
              className="hm-display hm-h-xl"
              style={{ marginTop: '1.5rem', maxWidth: '16ch' }}
              data-anim="lines"
            >
              <span><span>{isNl ? 'Je doet het al goed.' : 'You are already doing it well.'}</span></span>
              <span><span>{isNl ? 'Nu mag het ook gezien worden.' : 'Now it should also be seen.'}</span></span>
            </h1>
            <div
              style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}
              data-anim="rise"
            >
              <Link href={`${prefix}/eigenaar-worden`} className="hm-cta">
                {isNl ? 'verhuur jouw huis' : 'host with us'}
              </Link>
              <Link href={`${prefix}/collectie`} className="hm-cta-ghost">
                {isNl ? 'zie de woningen' : 'see the homes'}
              </Link>
            </div>
            <p className="hm-dim" style={{ marginTop: '2.5rem', fontSize: '0.8125rem' }} data-anim="rise">
              {isNl ? 'met de steun van Start it @KBC' : 'supported by Start it @KBC'}
            </p>
          </div>

          <div className="hm-frame" style={{ aspectRatio: '3 / 4', position: 'relative' }} data-anim="rise">
            <Image
              src="/images/host-teaser.jpg"
              alt={isNl ? 'een gast in een moroww-huis' : 'a guest in a moroww home'}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
              priority
            />
          </div>
        </div>
      </section>

      {/* HET PROBLEEM — pg 2. Cijfers tellen op; de schaal wordt voelbaar. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule-soft)' }}>
        <p className="hm-eyebrow" data-anim="rise">{isNl ? 'het probleem' : 'the problem'}</p>
        <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '22ch' }} data-anim="rise">
          {isNl
            ? 'Op een foto lijkt elk huis goed. De gast kan het verschil niet zien.'
            : 'In a photo every home looks good. The guest cannot tell the difference.'}
        </h2>

        <div
          style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)', gridTemplateColumns: 'minmax(0, 1fr)', marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}
          className="hm-two-grid"
          data-anim="stagger"
        >
          <div>
            <hr className="hm-rule" />
            <p className="hm-figure" style={{ marginTop: '1.5rem' }} data-count-to="83" data-count-suffix=" %">83 %</p>
            <p className="hm-support" style={{ marginTop: '1rem', maxWidth: '36ch' }}>
              {isNl
                ? 'van de 23.349 aangemelde vakantiewoningen in Vlaanderen kreeg nooit een controle ter plaatse'
                : 'of the 23,349 registered holiday homes in Flanders never received an on-site inspection'}
            </p>
          </div>
          <div>
            <hr className="hm-rule" />
            <p className="hm-figure" style={{ marginTop: '1.5rem' }} data-count-to="88.5" data-count-suffix=" %" data-count-decimals="1">88,5 %</p>
            <p className="hm-support" style={{ marginTop: '1rem', maxWidth: '36ch' }}>
              {isNl ? 'aan de kust' : 'along the coast'}
            </p>
          </div>
        </div>

        <p className="hm-dim" style={{ marginTop: '3rem', fontSize: '0.8125rem' }} data-anim="rise">
          {isNl ? 'bron: businessplan moroww v7' : 'source: moroww business plan v7'}
        </p>
      </section>

      {/* WAT MOROWW IS — pg 3. Drie criteria staggered, beeld los met rise. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule-soft)' }}>
        <div
          style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3.5rem)', gridTemplateColumns: 'minmax(0, 1fr)', alignItems: 'start' }}
          className="hm-hero-grid"
        >
          <div>
            <p className="hm-eyebrow" data-anim="rise">{isNl ? 'wat moroww is' : 'what moroww is'}</p>
            <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '16ch' }} data-anim="rise">
              {isNl ? 'Een label dat bewijst dat het huis klopt.' : 'A label that proves the home holds up.'}
            </h2>

            <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--hm-rule)' }} data-anim="stagger">
              {CRITERIA.map((c, i) => (
                <div
                  key={c.naam.nl}
                  style={{
                    padding: '1.5rem 0',
                    borderBottom: i === CRITERIA.length - 1 ? 'none' : '1px solid var(--hm-rule-soft)',
                  }}
                >
                  <p className="hm-cell-head">{c.naam[k]}</p>
                  <p className="hm-support" style={{ marginTop: '0.375rem' }}>{c.regel[k]}</p>
                </div>
              ))}
            </div>

            <p className="hm-dim" style={{ marginTop: '2rem', fontSize: '0.8125rem' }} data-anim="rise">
              {isNl ? 'geen beheerder, geen boekingsplatform' : 'no property manager, no booking platform'}
            </p>
          </div>

          <div className="hm-frame" style={{ aspectRatio: '3 / 4', position: 'relative' }} data-anim="rise">
            <Image
              src="/images/over-interieur-2.jpg"
              alt={isNl ? 'detail van een gekeurd huis' : 'detail of an inspected home'}
              fill
              sizes="(max-width: 900px) 100vw, 45vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* WAT ERBIJ HOREN JE GEEFT — pg 4. Zuilen komen staggered. */}
      <section className="hm-tinted hm-bg-beige hm-section">
        <div className="hm-wrap">
          <p className="hm-eyebrow" data-anim="rise">{isNl ? 'wat erbij horen je geeft' : 'what belonging gives you'}</p>
          <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '22ch' }} data-anim="rise">
            {isNl ? 'Wie erbij hoort, staat er niet alleen voor.' : 'Those who belong, do not stand alone.'}
          </h2>

          <div
            style={{
              marginTop: 'clamp(3rem, 6vw, 5rem)',
              display: 'grid',
              gap: '1.5rem 1.5rem',
              gridTemplateColumns: 'minmax(0, 1fr)',
            }}
            className="hm-five-grid"
            data-anim="stagger"
          >
            {ZUILEN.map((z) => (
              <div key={z.naam.nl}>
                <div
                  style={{
                    height: '2px',
                    background: z.primair ? 'var(--hm-accent)' : 'var(--hm-ink)',
                    marginBottom: '1.25rem',
                  }}
                  aria-hidden
                />
                <p className="hm-cell-head">{z.naam[k]}</p>
                <p className="hm-support" style={{ marginTop: '0.5rem' }}>{z.regel[k]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HET BEWIJS — pg 6. 154 en 8 tellen op, €0 blijft staan. */}
      <section className="hm-wrap hm-section">
        <p className="hm-eyebrow" data-anim="rise">{isNl ? 'het bewijs' : 'the proof'}</p>
        <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '22ch' }} data-anim="rise">
          {isNl ? 'Wat eigenaars bij moroww meemaken.' : 'What owners experience at moroww.'}
        </h2>

        <div
          style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3rem)', gridTemplateColumns: 'minmax(0, 1fr)', marginTop: 'clamp(3rem, 6vw, 4.5rem)' }}
          className="hm-three-grid"
          data-anim="stagger"
        >
          <div>
            <hr className="hm-rule" />
            <p className="hm-figure" style={{ marginTop: '1.5rem' }} data-count-to="154">154</p>
            <p className="hm-support" style={{ marginTop: '1rem', maxWidth: '32ch' }}>
              {isNl ? 'verblijven sinds november 2025' : 'stays since November 2025'}
            </p>
          </div>
          <div>
            <hr className="hm-rule" />
            <p className="hm-figure" style={{ marginTop: '1.5rem' }}>€ 0</p>
            <p className="hm-support" style={{ marginTop: '1rem', maxWidth: '32ch' }}>
              {isNl
                ? 'kost voor de eigenaar wanneer er iets misging: elk schadegeval werd opgelost'
                : 'cost to the owner when something went wrong: every claim was resolved'}
            </p>
          </div>
          <div>
            <hr className="hm-rule" />
            <p className="hm-figure" style={{ marginTop: '1.5rem' }} data-count-to="8">8</p>
            <p className="hm-support" style={{ marginTop: '1rem', maxWidth: '32ch' }}>
              {isNl ? 'huizen in de collectie, in the shore en the fields' : 'homes in the collection, across the shore and the fields'}
            </p>
          </div>
        </div>

        <p className="hm-dim" style={{ marginTop: '3rem', fontSize: '0.8125rem' }} data-anim="rise">
          {isNl
            ? 'bron: Guesty, bevestigde verblijven met check-out tot 6 november 2026'
            : 'source: Guesty, confirmed stays with check-out through 6 November 2026'}
        </p>
      </section>

      {/* VRAAG HET MOROWW — pg 7. Timeline-reveal: tijd voelbaar tussen rijen. */}
      <section className="hm-tinted hm-bg-peach hm-section">
        <div className="hm-wrap">
          <div
            style={{ display: 'grid', gap: 'clamp(2rem, 4vw, 3.5rem)', gridTemplateColumns: 'minmax(0, 1fr)', alignItems: 'start' }}
            className="hm-hero-grid"
          >
            <div>
              <p className="hm-eyebrow" data-anim="rise">{isNl ? 'vraag het moroww' : 'ask moroww'}</p>
              <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '18ch' }} data-anim="rise">
                {isNl ? 'Om drie uur gevraagd. Om zeven uur geregeld.' : 'Asked at three. Handled by seven.'}
              </h2>

              <div
                style={{ marginTop: '2.5rem', borderTop: '1px solid var(--hm-ink)' }}
                data-anim="timeline"
              >
                {CASE.map((c, i) => (
                  <div
                    key={c.tijd}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '5rem minmax(0, 1fr)',
                      gap: '1rem 1.5rem',
                      padding: '1.25rem 0',
                      borderBottom: i === CASE.length - 1 ? 'none' : '1px solid rgba(26, 26, 26, 0.15)',
                      alignItems: 'baseline',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--hm-display)',
                        fontSize: '1.125rem',
                        color: c.dim ? 'var(--hm-dim)' : 'var(--hm-ink)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {c.tijd}
                    </span>
                    <span style={{ fontSize: '1rem', lineHeight: 1.55 }}>{c.regel[k]}</span>
                  </div>
                ))}
              </div>

              <p className="hm-dim" style={{ marginTop: '2rem', fontSize: '0.8125rem' }} data-anim="rise">
                {isNl ? 'moroww regelt, een partner uit de community voert uit' : 'moroww arranges, a partner from the community executes'}
              </p>
            </div>

            <div
              className="hm-frame"
              style={{ aspectRatio: '3 / 4', position: 'relative', background: 'rgba(26, 26, 26, 0.08)' }}
              data-anim="rise"
            >
              <Image
                src="/images/fp-interieur-1.jpg"
                alt={isNl ? 'moment uit een gekeurd huis' : 'moment from an inspected home'}
                fill
                sizes="(max-width: 900px) 100vw, 45vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* DRIE MANIEREN — pg 8. Kolommen staggered. */}
      <section className="hm-wrap hm-section">
        <p className="hm-eyebrow" data-anim="rise">{isNl ? 'drie manieren om erbij te horen' : 'three ways to belong'}</p>
        <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '18ch' }} data-anim="rise">
          {isNl ? 'Jij kiest hoe ver we gaan.' : 'You choose how far we go.'}
        </h2>

        <div
          style={{ marginTop: 'clamp(3rem, 6vw, 5rem)', display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 1fr)' }}
          className="hm-three-grid"
          data-anim="stagger"
        >
          {MANIEREN.map((m) => (
            <div key={m.naam.nl}>
              <div
                style={{
                  height: '2px',
                  background: m.primair ? 'var(--hm-accent)' : 'var(--hm-ink)',
                  marginBottom: '1.25rem',
                }}
                aria-hidden
              />
              <p className="hm-eyebrow">{m.positie[k]}</p>
              <p className="hm-cell-head" style={{ marginTop: '0.5rem', fontSize: '1.625rem' }}>{m.naam[k]}</p>
              <p className="hm-support" style={{ marginTop: '0.75rem' }}>{m.regel[k]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOE WE STARTEN — pg 10. Vier stappen staggered. */}
      <section className="hm-wrap hm-section" style={{ borderTop: '1px solid var(--hm-rule-soft)' }}>
        <p className="hm-eyebrow" data-anim="rise">{isNl ? 'hoe we starten' : 'how we start'}</p>
        <h2 className="hm-display hm-h-lg" style={{ marginTop: '1.25rem', maxWidth: '18ch' }} data-anim="rise">
          {isNl ? 'Vier stappen, zonder gedoe.' : 'Four steps, no fuss.'}
        </h2>

        <div
          style={{ marginTop: 'clamp(3rem, 6vw, 5rem)', display: 'grid', gap: '2rem', gridTemplateColumns: 'minmax(0, 1fr)' }}
          className="hm-four-grid"
          data-anim="stagger"
        >
          {STAPPEN.map((s) => (
            <div key={s.nr}>
              <div
                style={{
                  height: '2px',
                  background: s.primair ? 'var(--hm-accent)' : 'var(--hm-ink)',
                  marginBottom: '1.25rem',
                }}
                aria-hidden
              />
              <p className="hm-display" style={{ fontSize: '1.75rem', lineHeight: 1 }}>{s.nr}</p>
              <p className="hm-cell-head" style={{ marginTop: '0.75rem' }}>{s.naam[k]}</p>
              <p className="hm-support" style={{ marginTop: '0.5rem' }}>{s.regel[k]}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA — pg 11. Lines-reveal op de slotvraag. */}
      <section className="hm-tinted hm-bg-beige hm-section">
        <div className="hm-wrap">
          <p className="hm-eyebrow" data-anim="rise">{isNl ? 'de stichtende huizen' : 'the founding homes'}</p>
          <h2
            className="hm-display hm-h-xl"
            style={{ marginTop: '1.25rem', maxWidth: '18ch' }}
            data-anim="lines"
          >
            <span><span>{isNl ? 'Wordt jouw huis een van' : 'Will your home be one'}</span></span>
            <span><span>{isNl ? 'de eerste twintig?' : 'of the first twenty?'}</span></span>
          </h2>
          <p className="hm-lead" style={{ marginTop: '1.5rem' }} data-anim="rise">
            {isNl
              ? 'Twintig huizen worden stichtend huis van moroww. Acht zijn er al. Wie tekent vóór 31 januari 2027, neemt een van de twaalf laatste plaatsen.'
              : 'Twenty homes become founding homes of moroww. Eight are in. Signing before 31 January 2027 takes one of the twelve remaining places.'}
          </p>

          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }} data-anim="rise">
            <a href="mailto:noam.landries@moroww.com?subject=stichtend%20huis" className="hm-cta">
              {isNl ? 'plan een kwartier' : 'book a quarter of an hour'}
            </a>
            <Link href={`${prefix}/collectie`} className="hm-cta-ghost" style={{ borderColor: 'var(--hm-ink)' }}>
              {isNl ? 'zie de woningen' : 'see the homes'}
            </Link>
          </div>

          <hr className="hm-rule" style={{ marginTop: 'clamp(3rem, 6vw, 4.5rem)' }} />

          <div
            style={{ marginTop: '2rem', display: 'flex', justifyContent: 'space-between', gap: '2rem', flexWrap: 'wrap' }}
            data-anim="rise"
          >
            <div>
              <p className="hm-cell-head">Noam Landries</p>
              <p className="hm-dim" style={{ marginTop: '0.25rem', fontSize: '0.9375rem' }}>
                {isNl ? 'founder' : 'founder'}
              </p>
              <p style={{ marginTop: '0.5rem', fontSize: '0.9375rem' }}>
                <a href="mailto:noam.landries@moroww.com" className="hm-link">noam.landries@moroww.com</a>
                <span className="hm-dim"> · </span>
                <a href="tel:+32456912024" className="hm-link">+32 456 91 20 24</a>
              </p>
            </div>
            <p className="hm-dim" style={{ fontSize: '0.8125rem', alignSelf: 'flex-end' }}>
              {isNl ? 'met de steun van Start it @KBC' : 'supported by Start it @KBC'}
            </p>
          </div>
        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .hm-hero-grid  { grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr); }
          .hm-two-grid   { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-three-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .hm-four-grid  { grid-template-columns: repeat(4, minmax(0, 1fr)); }
          .hm-five-grid  { grid-template-columns: repeat(5, minmax(0, 1fr)); }
        }
        @media (min-width: 640px) and (max-width: 899px) {
          .hm-two-grid   { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-three-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-four-grid  { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
          .hm-five-grid  { grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); }
        }
      `}</style>
    </>
  )
}
