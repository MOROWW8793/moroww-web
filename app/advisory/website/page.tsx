import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ContactForm } from '@/components/merk/ContactForm';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZRegister, ZTijdlijn } from '@/components/merk/Zwitsers';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  alternates: { canonical: '/advisory/website' },
  title: 'je eigen boekingssite',
  description: 'Een eigen boekingswebsite voor je vakantiewoning. Gasten boeken rechtstreeks bij jou, zonder platformcommissie.',
};

const inbegrepen = [
  { titel: 'een site met je huis, foto\'s en de omgeving' },
  { titel: 'beschikbaarheid en prijzen, gekoppeld aan je kalender' },
  { titel: 'rechtstreeks boeken en betalen' },
  { titel: 'je eigen domeinnaam' },
  { titel: 'vindbaar in Google, in het Nederlands en het Engels' },
];

const waarom = [
  { titel: 'geen commissie per boeking', tekst: 'Wie via je eigen site boekt, betaalt geen platform. Wat de gast betaalt, komt bij jou.' },
  { titel: 'je kent je gast', tekst: 'Naam en e-mail zijn van jou. Wie terugkomt, boekt de volgende keer meteen rechtstreeks.' },
  { titel: 'jouw regels', tekst: 'Annulering, waarborg, huisregels: jij beslist, niet het platform.' },
  { titel: 'naast de platformen', tekst: 'Airbnb en Booking.com blijven gewoon draaien. Eén kalender houdt alles gelijk.' },
];

const stappen = [
  { titel: 'een gesprek', tekst: 'Over je huis, je gasten en hoe je vandaag verhuurt.' },
  { titel: 'foto\'s en tekst', tekst: 'Heb je nog geen goede foto\'s? Dan brengen we je bij een fotograaf die met de moroww-standaard werkt.' },
  { titel: 'we bouwen', tekst: 'Je site, gekoppeld aan je kalender en je prijzen. Jij keurt goed voor ze online gaat.' },
  { titel: 'online', tekst: 'Op je eigen domeinnaam, vindbaar in Google. Je eerste gasten boeken rechtstreeks.' },
];

export default function Website() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · je eigen boekingssite"
        titel={<>je eigen boekingswebsite.<br />in jouw naam.</>}
        fotos={[
          { src: '/images/collectie-3.jpg', alt: 'Living van een vakantiewoning' },
          { src: '/images/woningen/nieuwpoort/the-eight-01.jpg', alt: 'Woonkamer met zicht op de Noordzee' },
        ]}
        lead="Voor eigenaars die zelf verhuren. Wij bouwen een website voor je huis waar gasten rechtstreeks boeken, zonder platformcommissie. Draag je het moroww-label, dan staat je huis ook in de collectie op moroww.com, met een link naar jouw site."
        acties={
          <>
            <a href="#aanvraag" className="z-knop">vraag een website aan</a>
            <a href="#hoe" className="z-link">hoe het werkt</a>
          </>
        }
        object={
          <figure className="z-object" style={{ margin: 0 }} aria-label="Voorbeeld van een eigen boekingswebsite">
            <div className="z-object-kop"><span>jouwhuis.be</span><span className="z-nr">voorbeeld</span></div>
            <div className="z-foto" style={{ aspectRatio: '16 / 10' }}>
              <Image src="/images/collectie-3.jpg" alt="Living van een vakantiewoning" fill sizes="(min-width: 900px) 40vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="z-object-rij" style={{ borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
              <span style={{ fontWeight: 500 }}>jouw huis</span>
              <span className="z-nr">aankomst · vertrek · gasten</span>
              <span className="z-knop" style={{ minHeight: 36, padding: '0 14px', fontSize: 14 }} aria-hidden="true">boek</span>
            </div>
          </figure>
        }
      />

      <ZSectieTwee nr="02 · inbegrepen" titel="klaar om te boeken.">
        <ZRegister items={inbegrepen} prefix="2" />
      </ZSectieTwee>

      <ZSectie id="hoe" nr="03 · waarom rechtstreeks" titel="je gasten, je voorwaarden.">
        <ZRaster items={waarom} prefix="3" />
      </ZSectie>

      <ZSectie nr="04 · zo werkt het" titel="van gesprek tot eerste boeking.">
        <ZTijdlijn items={stappen} prefix="4" />
      </ZSectie>

      <section className="z-sectie" data-mw-reveal>
        <div className="z-tegels">
          <div>
            <span className="z-nr">met het label</span>
            <span className="z-h3">in de collectie op moroww.com</span>
            <p className="z-tekst">Je huis verschijnt in de collectie, met een rechtstreekse link naar je eigen boekingswebsite.</p>
            <Link href="/het-label" className="z-link" style={{ fontSize: 16 }}>over het label →</Link>
          </div>
          <div>
            <span className="z-nr">de tools erachter</span>
            <span className="z-h3">kalender, prijzen, gastberichten</span>
            <p className="z-tekst">Via de tools van onze partners in moroww hub.</p>
            <Link href="/hub/partners" className="z-link" style={{ fontSize: 16 }}>naar hub partners →</Link>
          </div>
        </div>
      </section>

      <ZSectieTwee
        id="aanvraag"
        nr="05 · aanvraag"
        titel="vertel ons over je huis."
        tekst={`${site.contact.naam} · ${site.contact.telefoon}`}
      >
        <ContactForm
          merk="how"
          soort="website"
          knop="vraag een website aan"
          velden={[
            { naam: 'naam', label: 'naam', verplicht: true },
            { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
            { naam: 'adres', label: 'waar staat je huis', verplicht: true },
            { naam: 'kanalen', label: 'waar verhuur je vandaag', type: 'select', opties: ['Airbnb of Booking.com', 'eigen site', 'nog niet'] },
            { naam: 'bericht', label: 'iets dat we moeten weten', type: 'textarea' },
          ]}
        />
      </ZSectieTwee>
    </div>
  );
}
