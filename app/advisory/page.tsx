import Link from 'next/link';
import Image from 'next/image';
import { Sectie } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { site } from '@/lib/merk/site';
import { PlanWisselaar } from '@/components/advisory/PlanWisselaar';
import { VraagWizard } from '@/components/advisory/VraagWizard';
import { Tilt3D } from '@/components/advisory/Tilt3D';

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

const vragenFaq: [string, string][] = [
  ['Moet ik daarna met moroww verhuren?', 'Nee. Een plan van moroww advisory staat los van het label. Wil je later het label voor je huis, dan kan dat, maar het hoeft niet.'],
  ['Wat kost een plan?', 'Dat hangt af van je vraag. Na het eerste gesprek weet je vooraf wat het plan kost, en in het plan staat per stap wat de uitvoering kost.'],
  ['Hoe snel heb ik een plan?', 'Dat spreken we af in het eerste gesprek, afhankelijk van wat er uitgezocht moet worden.'],
  ['Komen jullie langs?', 'Als dat nodig is voor je vraag, ja. Voor sommige vragen volstaan de documenten en een gesprek.'],
];

export default function Advisory() {
  return (
    <>
      {/* HERO · twee-koloms: tekst links, lifecycle rechts. De lifecycle
          'van vraag tot plan' maakt de belofte visueel; voorheen was de
          rechterkolom leeg witruimte. */}
      <section className="adv-held" data-mw-reveal>
        <div className="wrap">
          <div className="adv-held-grid">
            <div className="adv-held-binnen">
              <span className="adv-eyebrow">hulp op maat voor wie start of vastloopt</span>
              <h1 className="adv-mast" data-mw-lines>
                <span><span>elke vraag,</span></span>
                <span><span>een plan.</span></span>
              </h1>
              <p className="adv-sub">
                Vertel ons wat er speelt. Je krijgt een plan op papier: wat er moet gebeuren, wie het doet, wanneer, en wat het kost.
              </p>
              <div className="adv-held-acties">
                <Link href="/advisory/contact" className="btn btn-primair">vertel ons je vraag</Link>
                <a href="#werkwijze" className="btn btn-lijn">hoe het werkt</a>
              </div>
            </div>

            {/* Lifecycle · vier fases met tijd. De eerste is oranje-accent
                omdat daar de bezoeker nu staat (zijn vraag). */}
            <div className="adv-lifecycle" data-mw-stagger aria-label="Van vraag tot uitvoering">
              <div className="adv-lifecycle-rij">
                <h2 className="adv-lifecycle-titel">je vraag</h2>
                <span className="adv-lifecycle-tijd">nu</span>
                <p className="adv-lifecycle-tekst">
                  Vertel wat er speelt. In een paar zinnen, of met de documenten die er al zijn.
                </p>
              </div>
              <div className="adv-lifecycle-rij">
                <h2 className="adv-lifecycle-titel">het gesprek</h2>
                <span className="adv-lifecycle-tijd">binnen twee werkdagen</span>
                <p className="adv-lifecycle-tekst">
                  Een kort gesprek. Waar nodig komen we langs en bekijken we wat er al is.
                </p>
              </div>
              <div className="adv-lifecycle-rij">
                <h2 className="adv-lifecycle-titel">het plan</h2>
                <span className="adv-lifecycle-tijd">op papier</span>
                <p className="adv-lifecycle-tekst">
                  Wat er moet gebeuren, wie het doet, wanneer, en wat het kost. Vooraf.
                </p>
              </div>
              <div className="adv-lifecycle-rij">
                <h2 className="adv-lifecycle-titel">uitvoering</h2>
                <span className="adv-lifecycle-tijd">jij of wij</span>
                <p className="adv-lifecycle-tekst">
                  Je voert het plan zelf uit, met een partner, of wij regelen het.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VOORBEELDEN · de zeven vragen als genummerde editorial lijst.
          Twee met een href krijgen een hover-accent op de vraag. */}
      <Sectie>
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">waar eigenaars mee komen</span>
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>een paar voorbeelden.</span></span>
          </h2>
          <ol className="adv-genummerd" data-mw-stagger>
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

      {/* WIZARD · drie vragen, één gepersonaliseerde eerste stap. De
          keuzes gaan als query mee naar /advisory/contact zodat het
          formulier meteen weet waarmee de bezoeker start. */}
      <Sectie>
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">weet je het nog niet?</span>
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>drie vragen,</span></span>
            <span><span>een eerste stap.</span></span>
          </h2>
          <Tilt3D max={5}>
            <VraagWizard />
          </Tilt3D>
        </div>
      </Sectie>

      {/* PLAN-VOORBEELD · interactieve wisselaar met drie scenarios.
          Bezoeker kiest mag-ik-verhuren, opstart of eigen-boekingssite
          en ziet direct het plan voor zijn vraag. */}
      <Sectie toon="zacht">
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">een plan · voorbeeld</span>
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>kies een vraag,</span></span>
            <span><span>zie het plan.</span></span>
          </h2>
          <Tilt3D max={4}>
            <PlanWisselaar />
          </Tilt3D>
        </div>
      </Sectie>

      {/* DOCUMENTARY foto · full-bleed rustmoment tussen de twee lijsten.
          Binnen een overmaat-laag met data-mw-parallax: het beeld beweegt
          traag mee tegen de scroll; de outer container maskt. */}
      <section data-mw-reveal>
        <div className="adv-beeld-vol">
          <div
            className="adv-beeld-parallax"
            data-mw-parallax
            data-mw-parallax-strength="0.22"
          >
            <Image
              src="/images/advisory-terras-zee.jpg"
              alt="Dakterras met zicht op zee bij een moroww-huis"
              fill
              sizes="100vw"
            />
          </div>
        </div>
      </section>

      {/* VIER BELOFTES · editorial-rij, geen kaarten, nummers subtiel. */}
      <Sectie>
        <div data-mw-reveal>
          <span className="adv-kopblok-boven">wat je krijgt</span>
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>een plan waar je iets mee kan.</span></span>
          </h2>
          <div className="adv-rij-4" data-mw-stagger>
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
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>van vraag tot plan.</span></span>
          </h2>
          <ol className="adv-werkwijze" data-mw-stagger>
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
            <h2 className="adv-sectie-titel" data-mw-lines>
              <span><span>geen callcenter.</span></span>
              <span><span>een gesprek.</span></span>
            </h2>
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
          <h2 className="adv-sectie-titel" data-mw-lines>
            <span><span>kort beantwoord.</span></span>
          </h2>
          <div className="adv-faq" data-mw-stagger>
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
