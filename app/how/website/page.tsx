import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = {
  title: 'how website',
  description: 'Een eigen boekingswebsite voor je vakantiewoning. Gasten boeken rechtstreeks bij jou, zonder platformcommissie.',
};

export default function Website() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop
            niveau={1}
            boven={`how website · ${site.prijzen.website} excl. btw`}
            titel="je eigen boekingswebsite. in jouw naam."
            tekst="Voor eigenaars die zelf verhuren. Wij bouwen een website voor je huis waar gasten rechtstreeks boeken, zonder platformcommissie. Draag je het moroww-label, dan staat je huis ook in de collectie op moroww.com, met een link naar jouw site."
          />
          <div className="knoppen">
            <a href="#aanvraag" className="btn btn-primair">vraag een website aan</a>
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
