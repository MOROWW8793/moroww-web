import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Register } from '@/components/Register'
import { InlineFoto } from '@/components/InlineFoto'
import { Statrij } from '@/components/sections/Statrij'
import { TekstBlok } from '@/components/sections/TekstBlok'
import { siteMetadata } from '@/lib/seo/siteMetadata'
import { screeningsPubliek } from '@/lib/screenings'
import { countWord } from '@/lib/getallen'

// ISR: elk uur revalidate zodat de cijfers uit screenings_publiek meebewegen
// zonder dat we bij elke keuring een deploy hoeven te draaien.
export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'destandaard' })
  const isNl = locale === 'nl'
  const s = await screeningsPubliek()
  // Aantallen op /de-standaard lezen uit de view screenings_publiek:
  // aantal_dossier voor "dossiers bekeken" en aantal_opgenomen voor
  // "haalden de standaard". liveWoningen() beschrijft alleen wat online
  // staat, niet wat officieel opgenomen is.
  const opgenomenWord = s ? countWord(s.aantal_opgenomen, isNl ? 'nl' : 'en', false) : ''
  const beschrijving = s
    ? isNl
      ? `Van de ${s.aantal_dossier} dossiers die moroww bekeek, haalden er ${opgenomenWord} de standaard. Wat we keuren, en waarom de rest afvalt.`
      : `Of the ${s.aantal_dossier} files moroww reviewed, ${opgenomenWord} met the standard. What we certify, and why the rest falls out.`
    : t('meta_description')
  return siteMetadata({
    titel: t('meta_title'),
    beschrijving,
    pad: isNl ? '/de-standaard' : '/en/the-standard',
    locale: isNl ? 'nl' : 'en',
    hreflang: { nl: '/de-standaard', en: '/en/the-standard' },
  })
}

export default async function DeStandaardPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('destandaard')
  const isNl = locale === 'nl'
  const cijfers = await screeningsPubliek()

  const gates = isNl
    ? [
        { title: 'ruimte',   body: 'minstens 100 m² en twee slaapkamers.' },
        { title: 'karakter', body: 'natuurlijke materialen, een authentiek element, zicht op groen of water.' },
        { title: 'stilte',   body: 'door afstand of door hoogte. Natuur, kust, of hoog genoeg dat de straat niet tot binnen komt.' },
        { title: 'bezocht',  body: 'iemand van ons stond in die kamers. Geen fotoakkoord, geen videorondleiding.' },
      ]
    : [
        { title: 'space',    body: 'at least 100 m² and two bedrooms.' },
        { title: 'character',body: 'natural materials, an authentic element, a view of green or water.' },
        { title: 'quiet',    body: 'through distance or through height. Nature, coast, or high enough that the street does not reach inside.' },
        { title: 'visited',  body: 'someone from our team stood in those rooms. No photo approval, no video tour.' },
      ]

  const klaarstaat = isNl
    ? [
        { title: 'het slot',        body: 'je eigen code, geldig vanaf je aankomst.' },
        { title: 'warmte en licht', body: 'de verwarming staat op temperatuur, het licht staat klaar.' },
        { title: 'de geur',         body: 'één signatuurgeur voor the shore, één voor the fields.' },
        { title: 'het linnen',      body: 'bedden opgemaakt, handdoeken klaar.' },
      ]
    : [
        { title: 'the lock',     body: 'your own code, valid from your arrival.' },
        { title: 'warmth and light', body: 'the heating is up to temperature, the light is set.' },
        { title: 'the scent',    body: 'one signature scent for the shore, one for the fields.' },
        { title: 'the linen',    body: 'beds made up, towels laid out.' },
      ]

  return (
    <Register kant="eigenaar">

      {/* ── HERO ── */}
      <section className="w-full pt-28 pb-mw-6 px-6 md:px-12">
        <div className="mx-auto max-w-6xl">
          <h1
            className="font-bold text-moroww-dark leading-[1.05] tracking-[-0.02em] max-w-[16ch]"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 5rem)' }}
          >
            {t('hero_h1')}
          </h1>
          <p className="mt-mw-5 text-body-lg text-moroww-dark max-w-[62ch]">
            {isNl
              ? 'De waarde van het label zit in de huizen die er niet in zitten.'
              : 'The value of the label sits in the homes that are not in it.'}
          </p>
        </div>
      </section>

      {/* ── STATRIJ — donkere cijferband, direct onder hero ── */}
      {cijfers && (
        <Statrij
          items={[
            { cijfer: String(cijfers.aantal_dossier),
              label: isNl ? 'bekeken' : 'reviewed' },
            { cijfer: String(cijfers.aantal_bezoek),
              label: isNl ? 'bezocht' : 'visited' },
            { cijfer: String(cijfers.aantal_opgenomen),
              label: isNl ? 'opgenomen' : 'accepted' },
          ]}
        />
      )}

      <div className="mx-auto max-w-6xl px-6 md:px-12">

        {/* ── DE VIER POORTEN ── */}
        <TekstBlok eyebrow={isNl ? 'de vier poorten' : 'the four gates'} heading={isNl ? 'alle vier, of het huis komt er niet in.' : 'all four, or the home does not come in.'}>
          <p>
            {isNl
              ? 'Wat niet klopt, zetten we op de pagina van het huis zelf.'
              : 'Whatever is not right, we put on the page of the home itself.'}
          </p>
          <div className="mt-mw-6 border-t border-moroww-rule">
            {gates.map((g) => (
              <div key={g.title} className="border-b border-moroww-rule py-mw-4">
                <h3 className="text-h3 text-moroww-dark">{g.title}</h3>
                <p className="mt-mw-2 text-body text-moroww-dark">{g.body}</p>
              </div>
            ))}
          </div>
        </TekstBlok>

        {/* ── WAT KLAARSTAAT ── */}
        <TekstBlok eyebrow={isNl ? 'wat klaarstaat als je aankomt' : 'what is ready when you arrive'}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-mw-6">
            {klaarstaat.map((k) => (
              <div key={k.title}>
                <p className="text-audit uppercase text-moroww-label">{k.title}</p>
                <p className="mt-mw-2 text-body text-moroww-dark">{k.body}</p>
              </div>
            ))}
          </div>
        </TekstBlok>

        {/* ── OPGEVOLGD ── */}
        <TekstBlok eyebrow={isNl ? 'opgevolgd' : 'looked after'}>
          <p>
            {isNl
              ? 'Onze partners komen er telkens weer over de vloer, en elk jaar keuren we opnieuw. Haalt een huis de standaard niet meer, dan krijgt de eigenaar dertig dagen. Daarna verlaat het de collectie, ook als het goed verhuurt.'
              : 'Our partners return to every home again and again, and every year we re-audit. If a home no longer meets the standard, the owner has thirty days. After that it leaves the collection, even if it books well.'}
          </p>
          <div className="mt-mw-6">
            <InlineFoto src="/images/standaard/V2-40.jpg" alt={t('alt_bed_tijdschrift')} />
          </div>
        </TekstBlok>

        {/* ── AFSLUITER: gastquote + eigenaarslink ── */}
        <TekstBlok eyebrow={isNl ? 'wat een gast zei' : 'what a guest said'}>
          <blockquote className="text-body-lg text-moroww-dark italic">
            {isNl
              ? '"Het is een enorm smaakvol appartement, tot in de puntjes afgewerkt. Ruim, licht en heel luxe. Het ligt heel dicht aan zee maar toch enorm veel rust en geen enkel geluidsoverlast."'
              : '"A very tasteful apartment, finished down to the last detail. Spacious, light and very luxurious. It sits very close to the sea and still there is complete calm — no noise at all."'}
          </blockquote>
          <p className="mt-mw-3 text-audit uppercase text-moroww-ink-2">
            Ragna · Nosso Logies · 2026-08
          </p>
          <p className="mt-mw-6">
            <Link
              href="/eigenaar-worden"
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              {isNl
                ? 'eigenaar? denk je dat jouw huis de standaard haalt →'
                : 'owner? do you think your home meets the standard →'}
            </Link>
          </p>
        </TekstBlok>
      </div>
    </Register>
  )
}
