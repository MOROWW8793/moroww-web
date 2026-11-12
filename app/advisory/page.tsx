import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { site } from '@/lib/merk/site';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZRegister, ZTijdlijn, ZFaq } from '@/components/merk/Zwitsers';


export const metadata: Metadata = { alternates: { canonical: '/advisory' } };

const vragen = [
  { titel: 'mag hier kortverhuur?', tekst: 'Vergunning, registratie, brandveiligheid, de regels van je gemeente. We zoeken uit wat geldt voor jouw adres en wat eerst moet.' },
  { titel: 'het huis is er. hoe start ik?', tekst: 'Inrichting, verzekering, de eerste listings, schoonmaak en linnen. We zetten op een rij wat nog ontbreekt en in welke volgorde.' },
  { titel: 'ik wil rechtstreeks boekingen.', tekst: 'Een eigen boekingswebsite voor je huis, in jouw naam, zonder platformcommissie.', href: '/advisory/website' },
  { titel: 'de cijfers kloppen niet.', tekst: 'Wat een nacht je echt kost, hoe je prijzen zet en wat je huis kan opbrengen. We kijken je prijzen na en zeggen wat beter kan.' },
  { titel: 'mijn listing valt niet op.', tekst: 'Foto\'s die tonen hoe het huis echt voelt, en teksten die gasten in een paar zinnen vertellen waarom ze hier willen zijn.' },
  { titel: 'ik beheer huizen voor anderen.', tekst: 'Voor beheerders is er moroww hub: vakmensen, het label en de academy voor al je huizen. Met een concrete vraag kun je ook hier terecht.', href: '/hub/property-managers' },
  { titel: 'iets anders.', tekst: 'Staat je vraag er niet bij? Vertel ze ons. Kunnen we niet helpen, dan zeggen we dat meteen, en wie wel kan.', href: '/advisory/contact' },
];

const werkwijze = [
  { titel: 'je vraag', wanneer: 'nu', tekst: 'Vertel wat er speelt. In een paar zinnen, of met de documenten die er al zijn.' },
  { titel: 'het gesprek', wanneer: 'binnen twee werkdagen', tekst: 'Een kort gesprek. Waar nodig komen we langs en bekijken we wat er al is.' },
  { titel: 'het plan', wanneer: 'op papier', tekst: 'Wat er moet gebeuren, wie het doet, wanneer, en wat het kost. Vooraf.' },
  { titel: 'uitvoering', wanneer: 'jij of wij', tekst: 'Je voert het plan zelf uit, met een partner, of wij regelen het.' },
];

const belofte = [
  { titel: 'één plan, zwart op wit', tekst: 'Geen advies dat in een gesprek blijft hangen. Je krijgt het op papier: wat, wie, wanneer, wat het kost.' },
  { titel: 'jij kiest wie het doet', tekst: 'Je voert het plan zelf uit, met een partner, of wij regelen het. Je beslist per stap.' },
  { titel: 'eerlijk als het niet kan', tekst: 'Mag je huis niet verhuurd worden, of is iets het geld niet waard? Dan zeggen we dat.' },
  { titel: 'de juiste mensen', tekst: 'Waar we zelf niet de beste zijn, brengen we je bij wie het wel is: dezelfde partners die in de huizen van de collectie werken.' },
];

const faq: [string, string][] = [
  ['Moet ik daarna met moroww verhuren?', 'Nee. Een plan van moroww advisory staat los van het label. Wil je later het label voor je huis, dan kan dat, maar het hoeft niet.'],
  ['Wat kost een plan?', 'Dat hangt af van je vraag. Na het eerste gesprek weet je vooraf wat het plan kost, en in het plan staat per stap wat de uitvoering kost.'],
  ['Hoe snel heb ik een plan?', 'Dat spreken we af in het eerste gesprek, afhankelijk van wat er uitgezocht moet worden.'],
  ['Komen jullie langs?', 'Als dat nodig is voor je vraag, ja. Voor sommige vragen volstaan de documenten en een gesprek.'],
];

const voorbeeldplan = [
  ['regels voor jouw adres nagaan', 'deze week'],
  ['registratie bij de bevoegde overheid', ''],
  ['brandveiligheidsattest laten opmaken', ''],
  ['verzekering voor verhuur aanpassen', ''],
];

export default function Advisory() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · hulp op maat voor wie start of vastloopt"
        titel={<>elke vraag,<br />een plan.</>}
        fotos={[
          { src: '/images/advisory-terras-zee.jpg', alt: 'Dakterras met zicht op zee bij een moroww-huis' },
          { src: '/images/over-hero.jpg', alt: 'Leefruimte van een moroww-huis, met iemand die de gordijnen opent' },
          { src: '/images/collectie-1.jpg', alt: 'Badkamer met stenen wastafel in een moroww-huis' },
        ]}
        lead="Vertel ons wat er speelt. Je krijgt een plan op papier: wat er moet gebeuren, wie het doet, wanneer, en wat het kost."
        acties={
          <>
            <Link href="/advisory/contact" className="z-knop">vertel ons je vraag</Link>
            <a href="#werkwijze" className="z-link">hoe het werkt</a>
          </>
        }
        object={
          <figure className="z-object" style={{ margin: 0 }}>
            <div className="z-object-kop"><span>het plan</span><span className="z-nr">voorbeeld</span></div>
            <p style={{ margin: 0, padding: '20px 22px 16px', fontSize: 21, lineHeight: 1.3, fontWeight: 500 }}>mag ik mijn huis aan zee als vakantiewoning verhuren?</p>
            {voorbeeldplan.map(([stap, wanneer], i) => (
              <div key={stap} className="z-object-rij" style={i === 0 ? { borderTop: '1px solid var(--line)' } : undefined}>
                <span className="z-nr" style={{ flex: '0 0 32px' }}>{String(i + 1).padStart(2, '0')}</span>
                <span>{stap}</span>
                {wanneer && <span style={{ fontWeight: 300 }}>{wanneer}</span>}
              </div>
            ))}
            <figcaption className="z-object-voet">Per stap: wie het doet (jij, een partner of wij), een datum, en wat het kost. Vooraf.</figcaption>
          </figure>
        }
      />

      <ZSectie id="werkwijze" nr="02 · werkwijze" titel="van vraag tot plan.">
        <ZTijdlijn items={werkwijze} prefix="2" />
      </ZSectie>

      <ZSectieTwee nr="03 · waar eigenaars mee komen" titel="een paar voorbeelden." tekst="Staat je vraag er niet bij? Vertel ze ons. Kunnen we niet helpen, dan zeggen we dat meteen, en wie wel kan.">
        <ZRegister items={vragen} prefix="3" />
      </ZSectieTwee>

      <section className="z-sectie" data-mw-reveal style={{ paddingTop: 0, paddingBottom: 0, borderBottom: 0 }}>
        <div className="z-foto" style={{ aspectRatio: '21 / 9', marginTop: 88 }}>
          <Image src="/images/advisory-terras-zee.jpg" alt="Dakterras met zicht op zee bij een moroww-huis" fill sizes="(min-width: 1280px) 1200px, 100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <ZSectie nr="04 · wat je krijgt" titel="een plan waar je iets mee kan.">
        <ZRaster items={belofte} prefix="4" />
      </ZSectie>

      <section className="z-sectie" data-mw-reveal>
        <div className="z-twee" style={{ alignItems: 'stretch' }}>
          <figure style={{ flex: '1 1 380px', minWidth: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="z-foto" style={{ aspectRatio: '4 / 3' }}>
              <Image src="/images/noam-portret.jpg" alt={`${site.contact.naam} aan tafel in een moroww-huis`} fill sizes="(min-width: 1024px) 40vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <figcaption className="z-foto-onder"><span style={{ fontWeight: 500 }}>{site.contact.naam}</span><span style={{ fontWeight: 300 }}>medeoprichter van moroww</span></figcaption>
          </figure>
          <div className="z-smal" style={{ flex: '1 1 420px', justifyContent: 'space-between', gap: 32 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <span className="z-nr">05 · met wie je praat</span>
              <h2 className="z-h2">geen callcenter. een gesprek.</h2>
              <p className="z-tekst" style={{ fontSize: 19 }}>Je vraag komt bij Noam. Hij kijkt mee, zoekt uit wat nodig is en brengt je bij de juiste mensen.</p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', borderTop: '1px solid var(--line)' }}>
              <a href={`tel:${site.contact.telefoon.replace(/\s/g, '')}`} style={{ flex: '1 1 200px', padding: '18px 0', fontSize: 18, textDecoration: 'none', borderBottom: '1px solid var(--line)' }}>{site.contact.telefoon}</a>
              <a href={`mailto:${site.contact.email}`} style={{ flex: '1 1 200px', padding: '18px 0', fontSize: 18, textDecoration: 'none', borderBottom: '1px solid var(--line)' }}>{site.contact.email}</a>
            </div>
          </div>
        </div>
      </section>

      <ZSectieTwee nr="06 · vaak gevraagd" titel="kort beantwoord.">
        <ZFaq items={faq} />
      </ZSectieTwee>

      <section className="z-sectie" data-mw-reveal>
        <div className="z-twee" style={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className="z-h2" style={{ flex: '999 1 480px' }}>loop je ergens op vast? vertel het ons.</h2>
          <div className="z-knoppen">
            <Link href="/advisory/contact" className="z-knop">vertel ons je vraag</Link>
            <Link href="/het-label" className="z-link">over het label</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
