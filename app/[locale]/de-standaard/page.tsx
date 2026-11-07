import type { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { Register } from '@/components/Register'
import { Statrij } from '@/components/sections/Statrij'
import { siteMetadata } from '@/lib/seo/siteMetadata'
import { screeningsPubliek } from '@/lib/screenings'
import { countWord } from '@/lib/getallen'

// De standaard, herschreven nov 2026. De vier harde poorten (oppervlakte,
// slaapkamers, karakter, stilte) maken plaats voor vier hygiëneregels:
// wat een gast het eerst opmerkt, keuren we het strengst. Bron van de
// controlepunten: Schoonmaakstandaard en Linnenprotocol in de holy bible.
// Beeldtaal volgt de homepage: display-kop, volle beelden, veel lucht.

// ISR: elk uur revalidate zodat de cijfers uit screenings_publiek meebewegen.
export const revalidate = 3600

type Regel = { titel: string; kern: string; punten: string[]; beeld: string; alt: string }

const NL = {
  eyebrow: 'de standaard',
  h1: 'geen spoor van wie er voor jou was.',
  lead: 'Elk huis in de collectie wordt persoonlijk bezocht en bekeken op wat een gast het eerst opmerkt: hoe proper het is, hoe het bed voelt, of alles klaarstaat. Elk jaar opnieuw. Wat de standaard niet haalt, draagt het label niet.',
  heroAlt: 'Gast leest in een vers opgemaakt bed',
  stats: ['bekeken', 'bezocht', 'opgenomen'],
  waaromEyebrow: 'waarom we hier beginnen',
  waaromH2: 'een kleinere keuken vergeeft een gast. een haar in de douche niet.',
  waaromP: [
    'Wie aankomt in een vakantiewoning, beslist in de eerste minuten of het klopt. Niet op de vierkante meters, maar op drie dingen: de geur, het bed en de badkamer.',
    'Wat dan misloopt, is zelden echt vuil. Het is een restant van iemand anders. Een haar, een kruimel in de lade, een handdoek die niet fris ruikt. Daar is onze standaard op gebouwd.',
  ],
  regelsEyebrow: 'de vier regels',
  regelsH2: 'wat een gast het eerst opmerkt, bekijken we het strengst.',
  regels: [
    {
      titel: 'geen spoor van de vorige gast',
      kern: 'Geen haar, geen kruimel, geen geur, geen vingerafdruk, geen vergeten voorwerp.',
      punten: [
        'de zetel tot in de naden gezogen, ook onder en achter de meubels',
        'koelkast leeg, uitgewassen en geurloos',
        'lades en kasten leeg en kruimelvrij',
        'deurklinken en schakelaars gereinigd',
      ],
      beeld: '/images/over-interieur-2.jpg',
      alt: 'Opgeruimde leefruimte met een rode stoel en zicht op de tuin',
    },
    {
      titel: 'een badkamer zonder één haar',
      kern: 'De zone waar het staat of valt. Nul haren, geen kalk, niets dat ruikt.',
      punten: [
        'douchehoek, afvoer, rand van het bad en achter de wc nagekeken',
        'geen kalk op glas, kranen en douchekop',
        'een afvoer die vrij is en geurloos',
        'een reserverol in zicht, essentials aangevuld',
      ],
      beeld: '/images/og-eigenaar.jpg',
      alt: 'Hand onder een regendouche',
    },
    {
      titel: 'vers linnen, elke keer',
      kern: 'Het enige deel van het huis dat een gast tegen zijn huid voelt.',
      punten: [
        'professioneel gewassen, nooit thuis',
        'volledig gewisseld bij elke gast, ook als het ongebruikt lijkt',
        'het bed strak opgemaakt bij aankomst, een gast maakt nooit zelf zijn bed op',
        'handdoeken per gast, en een extra set in zicht',
      ],
      beeld: '/images/standaard/V2-19.jpg',
      alt: 'Een bed wordt opgemaakt met wit linnen',
    },
    {
      titel: 'klaar vóór aankomst',
      kern: 'Het huis is af voor de gast binnenkomt. Niet gelijktijdig, niet net erna.',
      punten: [
        'een eigen code op het slot, geldig vanaf de aankomst',
        'de verwarming op temperatuur, het licht klaar',
        'één signatuurgeur voor the shore, één voor the fields',
        'geen sleutel die ergens rondslingert',
      ],
      beeld: '/images/standaard/V2-210.jpg',
      alt: 'Glas water en tijdschriften klaargezet op tafel',
    },
  ] as Regel[],
  keuringEyebrow: 'ons bezoek',
  keuringH2: 'iemand van ons stond in die kamers.',
  keuring: [
    { titel: 'ter plaatse', tekst: 'We lopen door elke kamer. Geen fotoakkoord, geen videorondleiding.' },
    { titel: 'bij elke wissel', tekst: 'Onze partners komen er telkens weer over de vloer en werken volgens dezelfde regels.' },
    { titel: 'elk jaar opnieuw', tekst: 'Een label is geen stempel. Elk jaar komen we opnieuw langs.' },
  ],
  bandEyebrow: 'het label',
  bandH2: 'een label dat je niet kan verliezen, is geen label.',
  bandP: 'Haalt een huis de standaard niet meer, dan krijgt de eigenaar dertig dagen. Daarna verlaat het de collectie, ook als het goed verhuurt.',
  quoteEyebrow: 'wat een gast zei',
  quote: '"Het is een enorm smaakvol appartement, tot in de puntjes afgewerkt. Ruim, licht en heel luxe. Het ligt heel dicht aan zee maar toch enorm veel rust en geen enkel geluidsoverlast."',
  gastLink: 'bekijk de collectie →',
  eigenaarLink: 'eigenaar? haalt jouw huis de standaard →',
}

const EN: typeof NL = {
  eyebrow: 'the standard',
  h1: 'no trace of whoever was there before you.',
  lead: 'Every home in the collection is visited in person and looked at on what a guest notices first: how clean it is, how the bed feels, whether everything is ready. Every year again. What does not meet the standard does not carry the label.',
  heroAlt: 'A guest reading in a freshly made bed',
  stats: ['reviewed', 'visited', 'accepted'],
  waaromEyebrow: 'why we start here',
  waaromH2: 'a guest forgives a smaller kitchen. not a hair in the shower.',
  waaromP: [
    'Whoever arrives at a holiday home decides in the first minutes whether it is right. Not on the square metres, but on three things: the smell, the bed and the bathroom.',
    'What goes wrong then is rarely real dirt. It is a trace of someone else. A hair, a crumb in the drawer, a towel that does not smell fresh. That is what our standard is built on.',
  ],
  regelsEyebrow: 'the four rules',
  regelsH2: 'what a guest notices first, we look at most closely.',
  regels: [
    {
      titel: 'no trace of the last guest',
      kern: 'No hair, no crumb, no smell, no fingerprint, no forgotten item.',
      punten: [
        'the sofa vacuumed into the seams, also under and behind the furniture',
        'fridge empty, washed out and odourless',
        'drawers and cupboards empty and free of crumbs',
        'door handles and switches cleaned',
      ],
      beeld: '/images/over-interieur-2.jpg',
      alt: 'Tidy living room with a red chair and a view of the garden',
    },
    {
      titel: 'a bathroom without one hair',
      kern: 'The room where it stands or falls. Zero hairs, no limescale, nothing that smells.',
      punten: [
        'shower corner, drain, bath edge and behind the toilet checked',
        'no limescale on glass, taps and shower head',
        'a drain that runs freely and smells of nothing',
        'a spare roll in sight, essentials topped up',
      ],
      beeld: '/images/og-eigenaar.jpg',
      alt: 'A hand under a rain shower',
    },
    {
      titel: 'fresh linen, every time',
      kern: 'The only part of the home a guest feels against their skin.',
      punten: [
        'professionally laundered, never at home',
        'fully changed for every guest, even if it looks unused',
        'the bed made tight on arrival, a guest never makes their own bed',
        'towels per guest, and an extra set in sight',
      ],
      beeld: '/images/standaard/V2-19.jpg',
      alt: 'A bed being made with white linen',
    },
    {
      titel: 'ready before arrival',
      kern: 'The home is finished before the guest walks in. Not at the same time, not just after.',
      punten: [
        'your own code on the lock, valid from your arrival',
        'the heating up to temperature, the light set',
        'one signature scent for the shore, one for the fields',
        'no key lying around anywhere',
      ],
      beeld: '/images/standaard/V2-210.jpg',
      alt: 'A glass of water and magazines set out on the table',
    },
  ],
  keuringEyebrow: 'our visit',
  keuringH2: 'someone from our team stood in those rooms.',
  keuring: [
    { titel: 'in person', tekst: 'We walk through every room. No photo approval, no video tour.' },
    { titel: 'at every turnover', tekst: 'Our partners return to every home again and again and work to the same rules.' },
    { titel: 'every year again', tekst: 'A label is not a stamp. Every year we come back.' },
  ],
  bandEyebrow: 'the label',
  bandH2: 'a label you cannot lose is not a label.',
  bandP: 'If a home no longer meets the standard, the owner has thirty days. After that it leaves the collection, even if it books well.',
  quoteEyebrow: 'what a guest said',
  quote: '"A very tasteful apartment, finished down to the last detail. Spacious, light and very luxurious. It sits very close to the sea and still there is complete calm — no noise at all."',
  gastLink: 'see the collection →',
  eigenaarLink: 'owner? does your home meet the standard →',
}

const LINK = 'text-[0.9375rem] text-moroww-dark underline underline-offset-[6px] decoration-moroww-dark/30 hover:decoration-moroww-dark transition-colors'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'destandaard' })
  const isNl = locale === 'nl'
  const s = await screeningsPubliek()
  const opgenomenWord = s ? countWord(s.aantal_opgenomen, isNl ? 'nl' : 'en', false) : ''
  const beschrijving = s
    ? isNl
      ? `Van de ${s.aantal_dossier} dossiers die moroww bekeek, haalden er ${opgenomenWord} de standaard. Geen spoor van de vorige gast, een badkamer zonder één haar, vers linnen, klaar vóór aankomst.`
      : `Of the ${s.aantal_dossier} files moroww reviewed, ${opgenomenWord} met the standard. No trace of the last guest, a bathroom without one hair, fresh linen, ready before arrival.`
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
  const c = locale === 'nl' ? NL : EN
  const cijfers = await screeningsPubliek()

  return (
    <Register kant="eigenaar">
      {/* ── HERO ── */}
      <section className="w-full px-6 md:px-12 pt-mw-8 lg:pt-mw-10 overflow-visible">
        <div className="mx-auto max-w-7xl">
          <p className="mw-in text-[0.9375rem] text-moroww-ink-2">{c.eyebrow}</p>
          <h1 className="mw-in mt-mw-4 text-display font-light text-moroww-dark max-w-[15ch]">{c.h1}</h1>
          <p className="mw-in-2 mt-mw-6 text-body-lg text-moroww-dark max-w-[56ch]">{c.lead}</p>
        </div>
      </section>

      {/* ── HEROBEELD ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8">
        <div className="mx-auto max-w-7xl relative aspect-[4/5] sm:aspect-[16/9] lg:max-h-[78vh] w-full overflow-hidden">
          <Image src="/images/standaard/V2-40.jpg" alt={c.heroAlt} fill priority className="object-cover" sizes="(max-width: 1280px) 100vw, 1280px" />
        </div>
      </section>

      {/* ── CIJFERS ── */}
      {cijfers && (
        <div className="mt-mw-8">
          <Statrij
            items={[
              { cijfer: String(cijfers.aantal_dossier), label: c.stats[0] },
              { cijfer: String(cijfers.aantal_bezoek), label: c.stats[1] },
              { cijfer: String(cijfers.aantal_opgenomen), label: c.stats[2] },
            ]}
          />
        </div>
      )}

      {/* ── WAAROM ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-5">
            <p className="text-[0.9375rem] text-moroww-ink-2">{c.waaromEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark">{c.waaromH2}</h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 space-y-mw-3 text-body-lg text-moroww-dark max-w-[52ch]">
            {c.waaromP.map((p) => <p key={p}>{p}</p>)}
          </div>
        </div>
      </section>

      {/* ── DE VIER REGELS ── beeld en tekst om beurt */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[0.9375rem] text-moroww-ink-2">{c.regelsEyebrow}</p>
          <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[22ch]">{c.regelsH2}</h2>
          <ol className="mt-mw-8 space-y-mw-8 lg:space-y-mw-10">
            {c.regels.map((r, i) => {
              const rechts = i % 2 === 1
              return (
                <li key={r.titel} className="grid grid-cols-1 lg:grid-cols-12 gap-mw-6 items-center">
                  <div className={`lg:col-span-6 relative aspect-[4/5] overflow-hidden ${rechts ? 'lg:order-2 lg:col-start-7' : ''}`}>
                    <Image src={r.beeld} alt={r.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
                  </div>
                  <div className={`lg:col-span-5 ${rechts ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-8'}`}>
                    <p className="text-display font-light text-moroww-rule leading-none">0{i + 1}</p>
                    <h3 className="mt-mw-4 text-h2 font-light text-moroww-dark">{r.titel}</h3>
                    <p className="mt-mw-3 text-body-lg text-moroww-dark">{r.kern}</p>
                    <ul className="mt-mw-5 border-t border-moroww-rule">
                      {r.punten.map((p) => (
                        <li key={p} className="border-b border-moroww-rule py-mw-3 text-body text-moroww-ink-2">{p}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </section>

      {/* ── HOE WE KEUREN ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-[0.9375rem] text-moroww-ink-2">{c.keuringEyebrow}</p>
          <h2 className="mt-mw-4 text-h2 font-light text-moroww-dark max-w-[22ch]">{c.keuringH2}</h2>
          <div className="mt-mw-6 grid grid-cols-1 md:grid-cols-3 gap-mw-6">
            {c.keuring.map((k) => (
              <div key={k.titel} className="border-t border-moroww-dark/20 pt-mw-4">
                <h3 className="text-h3 font-normal text-moroww-dark">{k.titel}</h3>
                <p className="mt-mw-3 text-body text-moroww-ink-2">{k.tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HET LABEL ── donkere band */}
      <section className="w-full bg-moroww-dark text-white px-6 md:px-12 py-mw-8 lg:py-mw-10 mt-mw-8 lg:mt-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6 items-end">
          <div className="lg:col-span-8">
            <p className="text-[0.9375rem] text-white/60">{c.bandEyebrow}</p>
            <h2 className="mt-mw-4 text-h2 font-light lg:text-[3.5rem] lg:leading-[1.02] text-white max-w-[20ch]">{c.bandH2}</h2>
          </div>
          <p className="lg:col-span-4 text-body-lg text-white/90">{c.bandP}</p>
        </div>
      </section>

      {/* ── GAST AAN HET WOORD + DOORVERWIJZING ── */}
      <section className="w-full px-6 md:px-12 mt-mw-8 lg:mt-mw-12 mb-mw-8 lg:mb-mw-12">
        <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-mw-6">
          <div className="lg:col-span-7">
            <p className="text-[0.9375rem] text-moroww-ink-2">{c.quoteEyebrow}</p>
            <blockquote className="mt-mw-4 text-h3 font-normal lg:text-[1.75rem] lg:leading-[1.35] font-normal text-moroww-dark italic">{c.quote}</blockquote>
            <p className="mt-mw-4 text-[0.9375rem] text-moroww-ink-2">Ragna · Nosso Logies · 2026-08</p>
          </div>
          <ul className="lg:col-span-4 lg:col-start-9 self-end space-y-mw-4">
            <li><Link href="/collectie" className={LINK}>{c.gastLink}</Link></li>
            <li><Link href="/eigenaar-worden" className={LINK}>{c.eigenaarLink}</Link></li>
          </ul>
        </div>
      </section>
    </Register>
  )
}
