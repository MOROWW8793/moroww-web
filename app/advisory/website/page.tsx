import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  title: 'je eigen boekingssite',
  description: 'Een eigen boekingswebsite voor je vakantiewoning. Gasten boeken rechtstreeks bij jou, zonder platformcommissie.',
};

export default function Website() {
  return (
    <>
      <section className="held">
        <div className="wrap held-twee">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
            <Kop
              niveau={1}
              boven="je eigen boekingssite"
              titel="je eigen boekingswebsite. in jouw naam."
              tekst="Voor eigenaars die zelf verhuren. Wij bouwen een website voor je huis waar gasten rechtstreeks boeken, zonder platformcommissie. Draag je het moroww-label, dan staat je huis ook in de collectie op moroww.com, met een link naar jouw site."
            />
            <div className="knoppen">
              <a href="#aanvraag" className="btn btn-primair">vraag een website aan</a>
              <a href="#hoe" className="btn btn-lijn">hoe het werkt</a>
            </div>
          </div>
          <div className="browser" aria-label="Voorbeeld van een eigen boekingswebsite">
            <div className="browser-balk"><span /><span /><span /><em>[jouwhuis].be</em></div>
            <div style={{ position: 'relative', aspectRatio: '16 / 10' }}>
              <Image src="/images/collectie-3.jpg" alt="Living van een vakantiewoning" fill sizes="(min-width: 900px) 45vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <div className="browser-boek">
              <span className="browser-naam">[naam van je huis]</span>
              <div className="browser-velden"><span>aankomst</span><span>vertrek</span><span>gasten</span><strong>boek</strong></div>
            </div>
          </div>
        </div>
      </section>

      <Sectie>
        <div className="rij">
          <div className="smal">
            <Kop boven="inbegrepen" titel="klaar om te boeken." />
          </div>
          <ul className="lijst breed">
            <li><span>een site met je huis, foto&apos;s en de omgeving</span><span>01</span></li>
            <li><span>beschikbaarheid en prijzen, gekoppeld aan je kalender</span><span>02</span></li>
            <li><span>rechtstreeks boeken en betalen</span><span>03</span></li>
            <li><span>je eigen domeinnaam</span><span>04</span></li>
            <li><span>vindbaar in Google, in het Nederlands en het Engels</span><span>05</span></li>
          </ul>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="raster-2">
          <div className="kaart">
            <h3 className="kaart-titel" style={{ fontSize: 19 }}>met het label</h3>
            <p>Je huis verschijnt in de collectie op moroww.com, met een rechtstreekse link naar je eigen boekingswebsite.</p>
            <Link href="/het-label">over het label</Link>
          </div>
          <div className="kaart">
            <h3 className="kaart-titel" style={{ fontSize: 19 }}>de tools erachter</h3>
            <p>Kalender, prijzen en gastberichten via de tools van onze partners in moroww hub.</p>
            <Link href="/hub/partners">naar hub partners</Link>
          </div>
        </div>
      </Sectie>

      <Sectie id="hoe">
        <Kop boven="waarom rechtstreeks" titel="je gasten, je voorwaarden." />
        <div className="raster-4">
          <div className="belofte"><h3 className="kaart-titel" style={{ fontSize: 22 }}>geen commissie per boeking</h3><p>Wie via je eigen site boekt, betaalt geen platform. Wat de gast betaalt, komt bij jou.</p></div>
          <div className="belofte"><h3 className="kaart-titel" style={{ fontSize: 22 }}>je kent je gast</h3><p>Naam en e-mail zijn van jou. Wie terugkomt, boekt de volgende keer meteen rechtstreeks.</p></div>
          <div className="belofte"><h3 className="kaart-titel" style={{ fontSize: 22 }}>jouw regels</h3><p>Annulering, waarborg, huisregels: jij beslist, niet het platform.</p></div>
          <div className="belofte"><h3 className="kaart-titel" style={{ fontSize: 22 }}>naast de platformen</h3><p>Airbnb en Booking.com blijven gewoon draaien. Eén kalender houdt alles gelijk.</p></div>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="zo werkt het" titel="van gesprek tot eerste boeking." />
        <ol className="stappen">
          <li><strong>een gesprek</strong><span>Over je huis, je gasten en hoe je vandaag verhuurt.</span></li>
          <li><strong>foto&apos;s en tekst</strong><span>Heb je nog geen goede foto&apos;s? Dan brengen we je bij een fotograaf die met de moroww-standaard werkt.</span></li>
          <li><strong>we bouwen</strong><span>Je site, gekoppeld aan je kalender en je prijzen. Jij keurt goed voor ze online gaat.</span></li>
          <li><strong>online</strong><span>Op je eigen domeinnaam, vindbaar in Google. Je eerste gasten boeken rechtstreeks.</span></li>
        </ol>
      </Sectie>

      <Sectie id="aanvraag">
        <div className="rij">
          <div className="smal">
            <Kop boven="aanvraag" titel="vertel ons over je huis." tekst={`${site.contact.naam} · ${site.contact.telefoon}`} />
          </div>
          <div className="breed">
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
          </div>
        </div>
      </Sectie>
    </>
  );
}
