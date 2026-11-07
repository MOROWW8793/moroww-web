import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { site } from '@/lib/merk/site';

// moroww advisory werkt op maat. Geen vaste pakketten: de vragen hieronder zijn
// voorbeelden van waar eigenaars mee komen, geen menukaart. Geen prijzen op de site.
const vragen: { titel: string; tekst: string; href?: string; voet?: string }[] = [
  {
    titel: 'mag hier kortverhuur?',
    tekst: 'Vergunning, registratie, brandveiligheid, de regels van je gemeente. We zoeken uit wat geldt voor jouw adres en wat eerst moet.',
  },
  {
    titel: 'het huis is er. hoe start ik?',
    tekst: 'Inrichting, verzekering, de eerste listings, schoonmaak en linnen. We zetten op een rij wat nog ontbreekt en in welke volgorde.',
  },
  {
    titel: 'ik wil rechtstreeks boekingen.',
    tekst: 'Een eigen boekingswebsite voor je huis, in jouw naam, zonder platformcommissie.',
    href: '/advisory/website',
    voet: 'over je eigen boekingssite',
  },
  {
    titel: 'de cijfers kloppen niet.',
    tekst: 'Wat een nacht je echt kost, hoe je prijzen zet en wat je huis kan opbrengen.',
  },
  {
    titel: 'ik beheer huizen voor anderen.',
    tekst: 'Property managers vinden de partners, het label en de academy in moroww hub. Met een concrete vraag kun je hier terecht.',
    href: '/hub/property-managers',
    voet: 'naar moroww hub',
  },
  {
    titel: 'iets anders.',
    tekst: 'Staat je vraag er niet bij? Vertel ze ons. Kunnen we niet helpen, dan zeggen we dat meteen, en wie wel kan.',
  },
];

const belofte: [string, string][] = [
  ['één plan, zwart op wit', 'Geen advies dat in een gesprek blijft hangen. Je krijgt het op papier: wat, wie, wanneer, wat het kost.'],
  ['jij kiest wie het doet', 'Je voert het plan zelf uit, met een partner, of wij regelen het. Je beslist per stap.'],
  ['eerlijk als het niet kan', 'Mag je huis niet verhuurd worden, of is iets het geld niet waard? Dan zeggen we dat.'],
  ['de juiste mensen', 'Waar we zelf niet de beste zijn, brengen we je bij wie het wel is: dezelfde partners die in onze huizen werken.'],
];

const vragenFaq: [string, string][] = [
  ['Moet ik daarna met moroww verhuren?', 'Nee. Een plan van moroww advisory staat los van het label. Wil je later het label voor je huis, dan kan dat, maar het hoeft niet.'],
  ['Wat kost een plan?', 'Dat hangt af van je vraag. Na het eerste gesprek weet je vooraf wat het plan kost, en in het plan staat per stap wat de uitvoering kost.'],
  ['Hoe snel heb ik een plan?', 'Dat spreken we af in het eerste gesprek, afhankelijk van wat er uitgezocht moet worden.'],
  ['Komen jullie langs?', 'Als dat nodig is voor je vraag, ja. Voor sommige vragen volstaan de documenten en een gesprek.'],
];

function PlanVoorbeeld() {
  return (
    <div className="plan" aria-label="Voorbeeld van een plan van moroww advisory">
      <div className="plan-kop">
        <span className="klein">het plan · voorbeeld</span>
        <span className="plan-vraag">mag ik mijn huis aan zee als vakantiewoning verhuren?</span>
      </div>
      <ol className="plan-stappen">
        <li>
          <span>regels voor jouw adres nagaan</span>
          <mark>deze week</mark>
        </li>
        <li><span>registratie bij de bevoegde overheid</span></li>
        <li><span>brandveiligheidsattest laten opmaken</span></li>
        <li><span>verzekering voor verhuur aanpassen</span></li>
      </ol>
      <div className="plan-voet">
        <span><strong>wie</strong>jij, een partner of wij</span>
        <span><strong>wanneer</strong>per stap een datum</span>
        <span><strong>wat het kost</strong>vooraf, per stap</span>
      </div>
    </div>
  );
}

export default function Advisory() {
  return (
    <>
      <section className="held">
        <div className="wrap held-twee">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <span className="boven">advies op maat voor eigenaars</span>
            <h1 className="titel-1" style={{ fontSize: 'clamp(2.6rem, 5vw, 4rem)' }}>every question, a plan.</h1>
            <p className="inleiding">
              Een vergunning, een opstart, een eigen boekingssite, de cijfers. Vertel ons wat er speelt. Je krijgt een plan:
              wat er moet gebeuren, wie het doet, wanneer en wat het kost. Uitvoeren doe je zelf, of wij doen het.
            </p>
            <div className="knoppen">
              <Link href="/advisory/contact" className="btn btn-primair">vertel ons je vraag</Link>
              <a href="#werkwijze" className="btn btn-lijn">hoe het werkt</a>
            </div>
          </div>
          <PlanVoorbeeld />
        </div>
      </section>

      <Sectie>
        <Kop boven="waar eigenaars mee komen" titel="een paar voorbeelden." tekst="Geen pakketten. Elk plan begint bij jouw vraag." />
        <div className="raster">
          {vragen.map((v) =>
            v.href ? (
              <Link key={v.titel} href={v.href} className="kaart">
                <h3 className="kaart-titel">{v.titel}</h3>
                <p>{v.tekst}</p>
                <span className="kaart-voet" style={{ fontSize: 16 }}>{v.voet}</span>
              </Link>
            ) : (
              <div key={v.titel} className="kaart">
                <h3 className="kaart-titel">{v.titel}</h3>
                <p>{v.tekst}</p>
              </div>
            ),
          )}
        </div>
      </Sectie>

      <section className="wrap" style={{ paddingBottom: 8 }}>
        <div style={{ position: 'relative', aspectRatio: '21 / 8', overflow: 'hidden' }}>
          <Image src="/images/advisory-terras-zee.jpg" alt="Dakterras met zicht op zee bij een moroww-huis" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <Sectie>
        <Kop boven="wat je krijgt" titel="een plan waar je iets mee kan." />
        <div className="raster-4">
          {belofte.map(([titel, tekst]) => (
            <div key={titel} className="belofte">
              <h3 className="kaart-titel" style={{ fontSize: 22 }}>{titel}</h3>
              <p>{tekst}</p>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie toon="zacht" id="werkwijze">
        <Kop boven="werkwijze" titel="van vraag tot plan." />
        <ol className="stappen">
          <li><strong>vertel je vraag</strong><span>Via het formulier of in een kort gesprek. Wat speelt er, en wat wil je bereiken?</span></li>
          <li><strong>we kijken samen</strong><span>Waar nodig komen we langs en bekijken we de documenten die er al zijn.</span></li>
          <li><strong>je krijgt een plan</strong><span>Wat er moet gebeuren, wie het doet, wanneer, en wat het kost. Vooraf, zwart op wit.</span></li>
          <li><strong>jij of wij</strong><span>Je voert het plan zelf uit, of wij regelen het voor je.</span></li>
        </ol>
      </Sectie>

      <Sectie>
        <div className="rij" style={{ alignItems: 'center' }}>
          <div className="smal">
            <div style={{ position: 'relative', aspectRatio: '4 / 3', overflow: 'hidden' }}>
              <Image src="/images/noam-portret.jpg" alt={`${site.contact.naam} aan tafel in een moroww-huis`} fill sizes="(min-width: 1024px) 40vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <div className="breed" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <Kop
              boven="met wie je praat"
              titel="geen callcenter. een gesprek."
              tekst={`Je vraag komt bij ${site.contact.naam}, medeoprichter van moroww. Hij kijkt mee, zoekt uit wat nodig is en brengt je bij de juiste mensen.`}
            />
            <p className="klein" style={{ margin: 0 }}>{site.contact.telefoon} · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a></p>
          </div>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="vaak gevraagd" titel="kort beantwoord." />
          </div>
          <div className="breed faq">
            {vragenFaq.map(([v, a]) => (
              <details key={v}>
                <summary>{v}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Sectie>

      <Sectie>
        <div className="band">
          <p className="band-tekst">loop je ergens op vast? vertel het ons.</p>
          <Link href="/advisory/contact" className="btn btn-primair">vertel ons je vraag</Link>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="band">
          <p className="band-tekst">klaar om te verhuren? het label van moroww neemt het over.</p>
          <Link href="/het-label" className="btn btn-lijn" style={{ gap: 10 }}>naar <Logo height={15} /></Link>
        </div>
      </Sectie>
    </>
  );
}
