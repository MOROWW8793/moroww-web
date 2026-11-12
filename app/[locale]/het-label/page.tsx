import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { ContactForm } from '@/components/merk/ContactForm'
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZTijdlijn, ZCijfers, ZVink } from '@/components/merk/Zwitsers'
import { site } from '@/lib/merk/site'
import { ServiceJsonLd } from '@/components/JsonLd'
import '@/components/merk/merk.css'
import '@/components/merk/zwitsers.css'

export const metadata: Metadata = {
  title: 'Kwaliteitslabel voor je vakantiewoning',
  description:
    'Het moroww-label voor vakantiewoningen, B&B\'s en hotels. We komen persoonlijk langs; wie de standaard haalt, krijgt het label, een plaats op moroww.com en toegang tot moroww hub.',
  alternates: { canonical: 'https://www.moroww.com/het-label' },
}

const krijgt = [
  { titel: 'persoonlijk bezoek en rapport', tekst: 'We komen langs, lopen door het huis zoals een gast en zeggen wat in orde is en wat beter kan.' },
  { titel: 'slimme toestellen', tekst: 'Advies over een slot met code, geur, licht en sensoren, zodat de aankomst vanzelf loopt. De toestellen worden van jou.' },
  { titel: 'het label', tekst: 'Aan de deur, op je listings en in de gids voor je gasten.' },
  { titel: 'in de collectie', tekst: 'Je huis staat op moroww.com, met een rechtstreekse link naar je eigen boekingswebsite.' },
  { titel: 'moroww hub', tekst: 'Vakmensen en merken die we zelf gebruiken, korting bij de merken in je huis, en de academy voor hosts.', href: '/hub', voet: 'naar moroww hub' },
  { titel: 'elk jaar opnieuw', tekst: 'We komen elk jaar terug en lezen wat gasten schrijven. Zo blijft het label waard wat het belooft.' },
]

// De vier regels van /de-standaard, als fragment van een bezoekrapport.
const rapport: [string, string[]][] = [
  ['geen spoor van de vorige gast', ['zetel tot in de naden gezogen, ook onder de meubels', 'koelkast leeg, uitgewassen en geurloos', 'deurklinken en schakelaars gereinigd']],
  ['een badkamer zonder één haar', ['douchehoek, afvoer en achter de wc nagekeken', 'geen kalk op glas, kranen en douchekop']],
  ['vers linnen, elke keer', ['professioneel gewassen, nooit thuis', 'volledig gewisseld bij elke gast', 'handdoeken per gast, en een extra set in zicht']],
  ['klaar vóór aankomst', ['een eigen code op het slot', 'de verwarming op temperatuur, het licht klaar']],
]

const stappen = [
  { titel: 'aanvraag', tekst: 'Je vertelt over je huis, via het formulier of in een gesprek.' },
  { titel: 'bezoek', tekst: 'We lopen door elke kamer. Geen fotoakkoord, geen videorondleiding.' },
  { titel: 'rapport', tekst: 'Wat in orde is, en wat nog moet gebeuren voor het label.' },
  { titel: 'label', tekst: 'Haalt je huis de standaard, dan komt het in de collectie.' },
  { titel: 'elk jaar', tekst: 'We komen terug en lezen wat gasten schrijven.' },
]

export default async function HetLabelPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)

  return (
    <div className="merk merk-moroww">
      <ServiceJsonLd
        naam="het moroww-label"
        beschrijving="Kwaliteitslabel voor vakantiewoningen in België. moroww bezoekt het huis persoonlijk; haalt het de standaard, dan krijgt het het label, een plaats in de collectie op moroww.com en toegang tot moroww hub. Elk jaar opnieuw bezocht."
        url="https://www.moroww.com/het-label"
        soort="kwaliteitslabel voor vakantiewoningen"
      />
      <div className="z">
        <div className="wrap">
          <ZHeld
            nr="01 · voor eigenaars en beheerders"
            titel={<>jouw huis<br />met het label.</>}
            fotos={[
              { src: '/images/standaard/V2-19.jpg', alt: 'Een bed wordt opgemaakt met wit linnen' },
              { src: '/images/over-interieur-2.jpg', alt: 'Opgeruimde leefruimte met een rode stoel en zicht op de tuin' },
              { src: '/images/collectie-1.jpg', alt: 'Badkamer met stenen wastafel in een moroww-huis' },
            ]}
            lead="We komen langs. Haalt je huis de standaard, dan krijgt het het label, een plaats op moroww.com en toegang tot moroww hub. Jij blijft zelf verhuren, of je beheerder doet het."
            acties={
              <>
                <a href="#aanvraag" className="z-knop">vraag een bezoek aan</a>
                <Link href="/de-standaard" className="z-link">lees eerst de standaard</Link>
              </>
            }
            object={
              <figure className="z-object" style={{ margin: 0, alignItems: 'center', padding: 32, gap: 20 }}>
                <Image src="/images/Moroww_Certified_01_RGB.png" alt="moroww certified, het label aan de deur" width={200} height={200} />
                <figcaption style={{ width: '100%', borderTop: '1px solid var(--line)' }}>
                  {[['aan de deur', 'plaat'], ['op je listings', 'badge'], ['in de gastengids', 'pagina']].map(([w, s]) => (
                    <span key={w} className="z-object-rij" style={{ padding: '12px 0', justifyContent: 'space-between' }}>
                      <span>{w}</span>
                      <span className="z-nr">{s}</span>
                    </span>
                  ))}
                </figcaption>
              </figure>
            }
          />
        </div>

        <div className="wrap">
          <ZCijfers
            items={[
              { getal: '931', label: 'dossiers bekeken', noot: 'op papier' },
              { getal: '19', label: 'huizen bezocht', noot: 'ter plaatse' },
              { getal: '8', label: 'opgenomen', noot: 'in de collectie' },
              { getal: '1×', label: 'per jaar opnieuw', noot: 'elk huis' },
            ]}
          />

          <ZSectie id="wat" nr="02 · zes onderdelen" titel="wat je krijgt.">
            <ZRaster items={krijgt} prefix="2" />
          </ZSectie>

          <section id="standaard" className="z-sectie" data-mw-reveal>
            <div className="z-twee">
              <div className="z-smal" style={{ flexBasis: 400 }}>
                <span className="z-nr">03 · de standaard</span>
                <h2 className="z-h2">wat een gast het eerst opmerkt, bekijken we het strengst.</h2>
                <p className="z-tekst" style={{ fontSize: 19 }}>Een kleinere keuken vergeeft een gast. Een haar in de douche niet. Daarom draait het bezoek om vier regels.</p>
                <div style={{ display: 'flex', gap: 16 }}>
                  <div className="z-foto" style={{ flex: '1 1 0', aspectRatio: '3 / 4' }}>
                    <Image src="/images/standaard/V2-12.jpg" alt="Handdoeken worden gevouwen op een opgemaakt bed" fill sizes="(min-width: 1024px) 20vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="z-foto" style={{ flex: '1 1 0', aspectRatio: '3 / 4' }}>
                    <Image src="/images/standaard/V2-36.jpg" alt="Een badkamer wordt nagekeken" fill sizes="(min-width: 1024px) 20vw, 50vw" style={{ objectFit: 'cover' }} />
                  </div>
                </div>
                <Link href="/de-standaard" className="z-link">de standaard volledig →</Link>
              </div>
              <div className="z-object" style={{ flex: '999 1 480px' }}>
                <div className="z-object-kop">
                  <span>bezoekrapport</span>
                  <span className="z-nr">uit de standaard</span>
                </div>
                {rapport.map(([titel, punten], i) => (
                  <div key={titel} style={{ padding: '20px 22px', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'baseline' }}>
                      <span className="z-nr">3.{i + 1}</span>
                      <span style={{ fontSize: 20, fontWeight: 500 }}>{titel}</span>
                    </div>
                    {punten.map((p) => (
                      <div key={p} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', paddingLeft: 28, fontSize: 15, fontWeight: 300 }}>
                        <ZVink />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <div className="z-object-rij" style={{ justifyContent: 'space-between' }}>
                  <span>resultaat</span>
                  <span style={{ fontWeight: 500, textAlign: 'right' }}>haalt de standaard</span>
                </div>
              </div>
            </div>
          </section>

          <ZSectie nr="04 · van aanvraag tot label" titel="zo verloopt het.">
            <ZTijdlijn items={stappen} prefix="4" />
            <p style={{ margin: '40px 0 0', paddingTop: 28, borderTop: '1px solid var(--line)', display: 'flex', flexWrap: 'wrap', gap: '8px 16px', alignItems: 'baseline' }}>
              <span style={{ fontSize: 40, fontWeight: 500, letterSpacing: '-0.03em' }}>30 dagen.</span>
              <span className="z-tekst" style={{ fontSize: 18, maxWidth: 720 }}>
                Haalt een huis de standaard niet meer, dan krijgt de eigenaar dertig dagen. Daarna verlaat het de collectie, ook als het goed verhuurt.
              </span>
            </p>
          </ZSectie>

          <section className="z-sectie" data-mw-reveal>
            <div className="z-twee">
              <div className="z-smal">
                <span className="z-nr">05 · wie komt langs</span>
                <h2 className="z-h2">geen callcenter. twee oprichters.</h2>
                <p className="z-tekst" style={{ fontSize: 18 }}>Wie een huis kandidaat stelt, spreekt eerst met Noam. Brent bewaakt hoe we huizen bezoeken en opvolgen.</p>
              </div>
              {[
                ['/images/noam-portret.jpg', 'Noam', 'visie, strategie en eigenaars'],
                ['/images/brent.jpg', 'Brent', 'kwaliteit en werking'],
              ].map(([src, naam, rol]) => (
                <figure key={naam} style={{ flex: '1 1 300px', minWidth: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div className="z-foto" style={{ aspectRatio: '4 / 3' }}>
                    <Image src={src} alt={`${naam} aan tafel in een moroww-huis`} fill sizes="(min-width: 1024px) 30vw, 100vw" style={{ objectFit: 'cover' }} />
                  </div>
                  <figcaption className="z-foto-onder"><span style={{ fontWeight: 500 }}>{naam}</span><span style={{ fontWeight: 300 }}>{rol}</span></figcaption>
                </figure>
              ))}
            </div>
          </section>

          <ZSectieTwee
            id="aanvraag"
            nr="06 · aanvraag"
            titel="vertel ons over je huis."
            tekst="Wat het kost, hangt af van je huis. Dat bespreken we in een eerste gesprek."
            extra={
              <p className="z-tekst" style={{ fontWeight: 400, lineHeight: 1.7 }}>
                {site.contact.naam}
                <br />
                <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
                <br />
                <a href={`tel:${site.contact.telefoon.replace(/\s/g, '')}`}>{site.contact.telefoon}</a>
                <br />
                <Link href="/advisory/website" className="z-link" style={{ fontSize: 15 }}>nog geen eigen boekingssite?</Link>
                <br />
                <Link href="/beheer" className="z-link" style={{ fontSize: 15 }}>liever dat wij verhuren?</Link>
              </p>
            }
          >
            <ContactForm
              merk="moroww"
              soort="keuring"
              knop="vraag een bezoek aan"
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'telefoon', label: 'telefoon', type: 'tel' },
                { naam: 'adres', label: 'waar staat je huis', verplicht: true },
                { naam: 'wie_verhuurt', label: 'wie verhuurt vandaag', type: 'select', opties: ['ik zelf', 'een beheerder', 'nog niemand'] },
                { naam: 'boekingssite', label: 'link naar je eigen boekingswebsite, als je die hebt', type: 'text' },
                { naam: 'bericht', label: 'iets dat we moeten weten', type: 'textarea' },
              ]}
            />
          </ZSectieTwee>
        </div>
      </div>
    </div>
  )
}
