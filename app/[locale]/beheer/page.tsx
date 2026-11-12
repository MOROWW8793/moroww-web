import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/merk/ContactForm'
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZTijdlijn, ZFaq, ZVink } from '@/components/merk/Zwitsers'
import { site } from '@/lib/merk/site'
import { liveWoningen, sortForCollectie } from '@/lib/woningen'
import '@/components/merk/merk.css'
import '@/components/merk/zwitsers.css'

export const metadata: Metadata = {
  title: 'volledig beheer',
  description:
    'moroww neemt het volledige beheer van je vakantiewoning over: listings, prijzen, gasten, schoonmaak en onderhoud. Jouw huis met het label, wij doen de rest.',
  alternates: { canonical: 'https://www.moroww.com/beheer' },
}

// Tarieven staan bewust niet op deze pagina: die bespreken we in het eerste
// gesprek (zie het tarieven-embargo in de projectinstructies).

const overnemen = [
  { titel: 'je listings', tekst: 'Op de platformen en op moroww.com, met foto\'s en teksten volgens de moroww-standaard.' },
  { titel: 'je prijzen', tekst: 'Per nacht bijgestuurd op seizoen, vraag en wat vergelijkbare huizen effectief halen.' },
  { titel: 'je gasten', tekst: 'Elke vraag, voor, tijdens en na het verblijf. In hun taal, ook \'s avonds en in het weekend.' },
  { titel: 'schoonmaak en linnen', tekst: 'Onze partners, aan de standaard gehouden. Vers linnen bij elke wissel.' },
  { titel: 'onderhoud en techniek', tekst: 'Smart lock, sensoren, herstellingen. Wat stuk is, laten we herstellen voor een gast het merkt.' },
  { titel: 'je cijfers', tekst: 'Boekingen, bezetting en opbrengst, per maand, in je eigen portaal.' },
]

const stappen = [
  { titel: 'het gesprek', wanneer: 'eerst', tekst: 'Over je huis, wat je ermee wil, en wat je zelf wil blijven doen.' },
  { titel: 'het bezoek', wanneer: 'ter plaatse', tekst: 'We komen langs. Haalt je huis de standaard, dan krijgt het het label.' },
  { titel: 'de opstart', wanneer: 'enkele weken', tekst: 'Foto\'s, listings, techniek, partners voor schoonmaak en linnen.' },
  { titel: 'het beheer', wanneer: 'doorlopend', tekst: 'Wij verhuren, jij volgt mee in je portaal.' },
]

const vanJou = [
  'je huis blijft van jou, je beslist mee over prijzen en regels',
  'je blokkeert zelf de nachten die je wil gebruiken',
  'je ziet elke boeking en elke review',
]

const faq: [string, string][] = [
  ['Moet mijn huis het label hebben?', 'Ja. We beheren enkel huizen die de standaard halen. Het bezoek is de eerste stap.'],
  ['Wat kost het?', 'Dat hangt af van je huis en van wat we overnemen. Je weet het na het eerste gesprek, vooraf.'],
  ['Kan ik een deel zelf blijven doen?', 'Ja. Wil je bijvoorbeeld zelf de gasten ontvangen, dan spreken we dat af.'],
  ['Kan ik later stoppen?', 'Ja. De voorwaarden daarvoor staan in de overeenkomst, die je vooraf leest.'],
]

export default async function BeheerPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const fotos = sortForCollectie(liveWoningen())
    .slice(0, 4)
    .map((w) => ({ src: w.heroFoto, alt: `${w.naam}, ${w.locatie}` }))

  return (
    <div className="merk merk-moroww">
      <div className="z">
        <div className="wrap">
          <ZHeld
            nr="01 · volledig beheer"
            titel={<>wij verhuren het<br />voor je.</>}
            fotos={fotos}
            lead="Je huis draagt het label, wij doen de rest: de listings, de prijzen, de gasten, de schoonmaak en het onderhoud. Jij volgt alles mee in je eigen portaal."
            acties={
              <>
                <a href="#aanvraag" className="z-knop">plan een gesprek</a>
                <a href="#wat" className="z-link">wat we overnemen</a>
              </>
            }
            object={
              <figure className="z-object" style={{ margin: 0 }}>
                <div className="z-object-kop"><span>wat jij nog doet</span><span className="z-nr">jouw huis</span></div>
                {vanJou.map((t) => (
                  <div key={t} className="z-object-rij">
                    <ZVink />
                    <span>{t}</span>
                  </div>
                ))}
                <figcaption className="z-object-voet">De rest regelen wij, met de partners die in elk huis van de collectie werken.</figcaption>
              </figure>
            }
          />

          <ZSectie id="wat" nr="02 · wat we overnemen" titel="alles tussen boeking en vertrek.">
            <ZRaster items={overnemen} prefix="2" />
          </ZSectie>

          <ZSectie nr="03 · van gesprek tot beheer" titel="zo starten we.">
            <ZTijdlijn items={stappen} prefix="3" />
          </ZSectie>

          <ZSectieTwee nr="04 · vaak gevraagd" titel="kort beantwoord.">
            <ZFaq items={faq} />
          </ZSectieTwee>

          <ZSectieTwee
            id="aanvraag"
            nr="05 · aanvraag"
            titel="vertel ons over je huis."
            tekst="Wat het kost, hangt af van je huis en van wat we overnemen. Dat bespreken we in een eerste gesprek."
            extra={
              <p className="z-tekst" style={{ fontWeight: 400, lineHeight: 1.7 }}>
                {site.contact.naam}
                <br />
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <br />
                <a href={`tel:${site.contact.telefoon.replace(/\s/g, '')}`}>{site.contact.telefoon}</a>
                <br />
                <Link href="/het-label" className="z-link" style={{ fontSize: 15 }}>liever zelf verhuren, met het label?</Link>
              </p>
            }
          >
            <ContactForm
              merk="moroww"
              soort="beheer"
              knop="plan een gesprek"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'telefoon', label: 'telefoon', type: 'tel' },
                { naam: 'adres', label: 'waar staat je huis', verplicht: true },
                { naam: 'wie_verhuurt', label: 'wie verhuurt vandaag', type: 'select', opties: ['ik zelf', 'een beheerder', 'nog niemand'] },
                { naam: 'bericht', label: 'iets dat we moeten weten', type: 'textarea' },
              ]}
            />
          </ZSectieTwee>
        </div>
      </div>
    </div>
  )
}
