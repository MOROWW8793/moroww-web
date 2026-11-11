import type { Metadata } from 'next'
import Link from 'next/link'
import type { ReactNode } from 'react'
import { setRequestLocale } from 'next-intl/server'
import { liveWoningen, sortForCollectie } from '@/lib/woningen'
import { Logo, MerkTeken, BLAADJES } from '@/components/merk/Logo'
import { ZHeld, ZSectie, ZSectieTwee, ZRegister } from '@/components/merk/Zwitsers'
import '@/components/merk/merk.css'
import '@/components/merk/zwitsers.css'

export const metadata: Metadata = {
  title: 'voor eigenaars',
  description:
    'Wat moroww voor eigenaars doet: het label voor je huis, moroww advisory voor de vraag waar je op vastloopt, en moroww hub met partners, merken en de academy.',
  alternates: { canonical: 'https://www.moroww.com/voor-eigenaars' },
}

type Tak = { merk: ReactNode; kleur: string; titel: string; tekst: string; punten: string[]; href: string; knop: string }

const takken: Tak[] = [
  {
    merk: <Logo height={22} />,
    kleur: BLAADJES.moroww,
    titel: 'jouw huis met het label.',
    tekst: 'We komen persoonlijk langs, kennen het label toe en zetten je huis in de collectie op moroww.com, met een rechtstreekse link naar je eigen boekingssite.',
    punten: ['persoonlijk bezoek en rapport', 'het label aan de deur en op je listings', 'elk jaar opnieuw bezocht'],
    href: '/het-label',
    knop: 'over het label',
  },
  {
    merk: <MerkTeken merk="advisory" op="licht" size={26} />,
    kleur: BLAADJES.advisory,
    titel: 'loop je ergens op vast?',
    tekst: 'Een vergunning, een opstart, een eigen boekingssite: elke vraag is anders. Je krijgt een plan op papier: wat, wie, wanneer en wat het kost.',
    punten: ['een gesprek binnen twee werkdagen', 'het plan vooraf, zwart op wit', 'jij of wij voert het uit'],
    href: '/advisory',
    knop: 'naar moroww advisory',
  },
  {
    merk: <MerkTeken merk="hub" op="licht" size={26} />,
    kleur: BLAADJES.hub,
    titel: 'jij vraagt, wij regelen.',
    tekst: 'Een extra schoonmaak, de ramen, een herstelling: moroww zoekt een partner in de buurt en volgt op tot het klaar is. Met merken in je huis en de academy.',
    punten: ['vraag het moroww, met een foto als bewijs', 'korting bij de merken in je huis', 'de academy en de ledenbrief'],
    href: '/hub',
    knop: 'naar moroww hub',
  },
]

const situaties = [
  { titel: 'gasten moeten zien dat mijn huis klopt.', tekst: 'Het label: een persoonlijk bezoek, een plaats in de collectie en elk jaar opnieuw.', href: '/het-label' },
  { titel: 'mag ik hier wel verhuren?', tekst: 'moroww advisory zoekt uit wat geldt voor jouw adres en wat eerst moet.', href: '/advisory' },
  { titel: 'ik wil rechtstreeks boekingen.', tekst: 'Een eigen boekingswebsite voor je huis, in jouw naam, zonder platformcommissie.', href: '/advisory/website' },
  { titel: 'tussen twee gasten moet er iets gebeuren.', tekst: 'In moroww hub vraag je het; wij plannen een partner in en volgen op.', href: '/hub' },
  { titel: 'ik beheer huizen voor anderen.', tekst: 'De hub voor beheerders: één aanspreekpunt, het label voor je beste huizen, de academy voor je team.', href: '/hub/property-managers' },
  { titel: 'ik wil eerst zelf lezen.', tekst: 'Regels en belasting, wat een nacht kost, verzekering, de manieren om te verhuren. In gewone taal.', href: '/kennis' },
]

export default async function VoorEigenaarsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="merk merk-moroww">
      <div className="z">
        <div className="wrap">
          <ZHeld
            nr="01 · voor eigenaars en beheerders"
            titel={<>drie manieren<br />waarop moroww je helpt.</>}
            fotos={sortForCollectie(liveWoningen()).slice(0, 5).map((w) => ({ src: w.heroFoto, alt: `${w.naam}, ${w.locatie}` }))}
            lead="Het label laat gasten zien dat je huis klopt. moroww advisory helpt als je start of ergens op vastloopt. moroww hub regelt wat je huis nodig heeft. Kies wat past, of combineer."
            acties={
              <>
                <a href="#takken" className="z-knop">bekijk de drie</a>
                <a href="https://calendar.app.google/BH8wYeA9AGf6KrUz7" target="_blank" rel="noopener noreferrer" className="z-link">plan een gesprek</a>
              </>
            }
          />

          <ZSectie id="takken" nr="02 · één naam, drie takken" titel="label, advisory, hub.">
            <div className="z-tegels">
              {takken.map((t, i) => (
                <Link key={t.href} href={t.href} style={{ borderTop: `4px solid ${t.kleur}`, gap: 16, minHeight: 420 }}>
                  <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, minHeight: 40 }}>
                    {t.merk}
                    <span className="z-nr">2.{i + 1}</span>
                  </span>
                  <span className="z-h3" style={{ fontSize: 28, marginTop: 8 }}>{t.titel}</span>
                  <span className="z-tekst">{t.tekst}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', borderTop: '1px solid var(--line)', marginTop: 'auto' }}>
                    {t.punten.map((p) => (
                      <span key={p} style={{ padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 15 }}>{p}</span>
                    ))}
                  </span>
                  <span className="z-link" style={{ fontSize: 16 }}>{t.knop} →</span>
                </Link>
              ))}
            </div>
          </ZSectie>

          <ZSectieTwee nr="03 · waar sta je?" titel="welke past bij jou." tekst="Zes vragen waar eigenaars mee komen, en waar je antwoord ligt.">
            <ZRegister items={situaties} prefix="3" />
          </ZSectieTwee>

          <section className="z-sectie" data-mw-reveal>
            <div className="z-tegels">
              <div className="z-tegel-accent">
                <span className="z-nr" style={{ color: 'var(--ink)' }}>een gesprek</span>
                <span className="z-h3">liever eerst praten?</span>
                <span className="z-tekst">Over je huis en wat je wil bereiken. Je spreekt met Noam.</span>
                <a href="https://calendar.app.google/BH8wYeA9AGf6KrUz7" target="_blank" rel="noopener noreferrer" className="z-knop z-knop-donker" style={{ alignSelf: 'flex-start' }}>plan een gesprek</a>
              </div>
              <div>
                <span className="z-nr">kennisbank</span>
                <span className="z-h3">eerst zelf lezen?</span>
                <span className="z-tekst">Regels en belasting, wat een nacht kost, verzekering, de manieren om te verhuren. Alles wat we weten, in gewone taal.</span>
                <Link href="/kennis" className="z-link" style={{ fontSize: 16 }}>naar de kennisbank →</Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
