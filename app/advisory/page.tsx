import Link from 'next/link';
import Image from 'next/image';
import { Sectie } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { site } from '@/lib/merk/site';

// moroww advisory · inlet editorial-stijl (nov 2026).
// Volgt de typografisch-rustige richting van usehallmark.com/made/ribbon,
// binnen het bestaande merk-advisory token-systeem (fraunces + dm-sans +
// moroww-oranje als accent).
//
// Content en wiring blijven ongewijzigd: elke link, elke href, elke tekst,
// alle 7 voorbeeldvragen, de 4 beloftes, de 4 werkwijze-stappen, de 4 FAQ
// en het plan-voorbeeld.

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
    tekst: 'Wat een nacht je echt kost, hoe je prijzen zet en wat je huis kan opbrengen. We kijken je prijzen na en zeggen wat beter kan.',
  },
  {
    titel: 'mijn listing valt niet op.',
    tekst: 'Foto\'s die tonen hoe het huis echt voelt, en teksten die gasten in een paar zinnen vertellen waarom ze hier willen zijn.',
  },
  {
    titel: 'ik beheer huizen voor anderen.',
    tekst: 'Voor beheerders is er moroww hub: vakmensen, het label en de academy voor al je huizen. Met een concrete vraag kun je ook hier terecht.',
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

const werkwijze: [string, string][] = [
  ['vertel je vraag', 'Via het formulier of in een kort gesprek. Wat speelt er, en wat wil je bereiken?'],
  ['we kijken samen', 'Waar nodig komen we langs en bekijken we de documenten die er al zijn.'],
  ['je krijgt een plan', 'Wat er moet gebeuren, wie het doet, wanneer, en wat het kost. Vooraf, zwart op wit.'],
  ['jij of wij', 'Je voert het plan zelf uit, of wij regelen het voor je.'],
];

const planStappen: [string, string?][] = [
  ['regels voor jouw adres nagaan', 'deze week'],
  ['registratie bij de bevoegde overheid'],
  ['brandveiligheidsattest laten opmaken'],
  ['verzekering voor verhuur aanpassen'],
];

const vragenFaq: [string, string][] = [
  ['Moet ik daarna met moroww verhuren?', 'Nee. Een plan van moroww advisory staat los van het label. Wil je later het label voor je huis, dan kan dat, maar het hoeft niet.'],
  ['Wat kost een plan?', 'Dat hangt af van je vraag. Na het eerste gesprek weet je vooraf wat het plan kost, en in het plan staat per stap wat de uitvoering kost.'],
  ['Hoe snel heb ik een plan?', 'Dat spreken we af in het eerste gesprek, afhankelijk van wat er uitgezocht moet worden.'],
  ['Komen jullie langs?', 'Als dat nodig is voor je vraag, ja. Voor sommige vragen volstaan de documenten en een gesprek.'],
];

export default function Advisory() {
  return (
    <>
      {/* HERO · typografisch, geen beeld. Eén zin boven de CTA zoals Hallmark
          F13 vraagt; de verdere inleiding komt in sectie 2. */}
      <section className="adv-held" data-mw-reveal>
        <div className="wrap">
          <div className="adv-held-binnen">
            <span className="adv-eyebrow">hulp op maat voor wie start of vastloopt</span>
            <h1 className="adv-mast">elke vraag, een plan.</h1>
            <p className="adv-sub">
              Vertel ons wat er speelt. Je krijgt een plan op papier: wat er moet gebeuren, wie het doet, wanneer, en wat het kost.
            </p>
            <div className="adv-held-acties">
              <Link href="/advisory/contact" className="btn btn-primair">vertel ons je vraag</Link>
              <a href="#werkwijze" className="btn btn-lijn">hoe het werkt</a>
            </div>
          </div>
        </div>
      </section>

      {/* VOORBEELDEN · de zeven vragen als genummerde editorial lijst.
          Twee met een href krijgen een hover-accent op de vraag. */}
      <Sectie>
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">waar eigenaars mee komen</span>
          <h2 className="adv-sectie-titel">een paar voorbeelden.</h2>
          <ol className="adv-genummerd">
            {vragen.map((v, i) => {
              const nr = String(i + 1).padStart(2, '0');
              if (v.href) {
                return (
                  <li key={v.titel}>
                    <Link href={v.href} className="adv-genummerd-link">
                      <span className="adv-nr">{nr}</span>
                      <div>
                        <h3 className="adv-vraag">{v.titel}</h3>
                        <p className="adv-genummerd-tekst">{v.tekst}</p>
                        {v.voet && <span className="adv-genummerd-voet">{v.voet}</span>}
                      </div>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={v.titel}>
                  <span className="adv-nr">{nr}</span>
                  <div>
                    <h3 className="adv-vraag">{v.titel}</h3>
                    <p className="adv-genummerd-tekst">{v.tekst}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Sectie>

      {/* PLAN-VOORBEELD · concrete illustratie van hoe een plan eruitziet.
          Zelfde genummerde opmaak als de voorbeelden, geen 'card'-achtige
          box meer; de dunne regels dragen de structuur. */}
      <Sectie toon="zacht">
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">een plan · voorbeeld</span>
          <h2 className="adv-sectie-titel">mag ik mijn huis aan zee als vakantiewoning verhuren?</h2>
          <ol className="adv-genummerd" aria-label="Stappen in het voorbeeld-plan">
            {planStappen.map(([stap, badge], i) => (
              <li key={stap}>
                <span className="adv-nr">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="adv-vraag" style={{ fontSize: 'clamp(1.25rem, 2vw, 1.625rem)' }}>{stap}</h3>
                  {badge && <p className="adv-genummerd-tekst" style={{ color: 'var(--accent)' }}>{badge}</p>}
                </div>
              </li>
            ))}
          </ol>
          <p className="adv-prose" style={{ marginTop: 40 }}>
            <em>wie</em> jij, een partner of wij. <em>wanneer</em> per stap een datum. <em>wat het kost</em> vooraf, per stap.
          </p>
        </div>
      </Sectie>

      {/* DOCUMENTARY foto · full-bleed rustmoment tussen de twee lijsten. */}
      <section data-mw-reveal>
        <div className="adv-beeld-vol">
          <Image
            src="/images/advisory-terras-zee.jpg"
            alt="Dakterras met zicht op zee bij een moroww-huis"
            fill
            sizes="100vw"
          />
        </div>
      </section>

      {/* VIER BELOFTES · editorial-rij, geen kaarten, nummers subtiel. */}
      <Sectie>
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">wat je krijgt</span>
          <h2 className="adv-sectie-titel">een plan waar je iets mee kan.</h2>
          <div className="adv-rij-4">
            {belofte.map(([titel, tekst], i) => (
              <div key={titel} className="adv-belofte">
                <span className="adv-belofte-nr">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="adv-belofte-titel">{titel}</h3>
                <p>{tekst}</p>
              </div>
            ))}
          </div>
        </div>
      </Sectie>

      {/* WERKWIJZE · comparison-regels, één rij per stap. Anchor-id blijft
          /advisory#werkwijze zodat de header-nav werkt. */}
      <Sectie toon="zacht" id="werkwijze">
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">werkwijze</span>
          <h2 className="adv-sectie-titel">van vraag tot plan.</h2>
          <ol className="adv-werkwijze">
            {werkwijze.map(([titel, tekst], i) => (
              <li key={titel}>
                <span className="adv-nr">{String(i + 1).padStart(2, '0')}</span>
                <span className="adv-wijze-titel">{titel}</span>
                <span className="adv-wijze-tekst">{tekst}</span>
              </li>
            ))}
          </ol>
        </div>
      </Sectie>

      {/* GESPREK · portret smal, prose breed. Contact onderaan. */}
      <Sectie>
        <div className="adv-gesprek" data-mw-reveal>
          <div className="adv-gesprek-beeld">
            <Image
              src="/images/noam-portret.jpg"
              alt={`${site.contact.naam} aan tafel in een moroww-huis`}
              fill
              sizes="(min-width: 900px) 320px, 100vw"
            />
          </div>
          <div>
            <span className="adv-kopblok-boven">met wie je praat</span>
            <h2 className="adv-sectie-titel">geen callcenter. een gesprek.</h2>
            <p className="adv-prose">
              Je vraag komt bij {site.contact.naam}, medeoprichter van moroww. Hij kijkt mee, zoekt uit wat nodig is en brengt je bij de juiste mensen.
            </p>
            <p className="adv-gesprek-contact">
              {site.contact.telefoon} · <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
            </p>
          </div>
        </div>
      </Sectie>

      {/* FAQ · native <details>, plus-teken draait 45° bij open. */}
      <Sectie toon="zacht">
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">vaak gevraagd</span>
          <h2 className="adv-sectie-titel">kort beantwoord.</h2>
          <div className="adv-faq">
            {vragenFaq.map(([v, a]) => (
              <details key={v}>
                <summary>{v}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </Sectie>

      {/* SLOT · typografisch, één regel, één CTA. Tweede slot-rij
          verbindt naar /het-label. */}
      <section className="adv-slot">
        <div className="wrap" data-mw-reveal>
          <p className="adv-slot-regel">loop je ergens op vast? vertel het ons.</p>
          <div className="adv-held-acties">
            <Link href="/advisory/contact" className="btn btn-primair">vertel ons je vraag</Link>
            <Link href="/het-label" className="btn btn-lijn" style={{ gap: 10 }}>
              naar <Logo height={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
