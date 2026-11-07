import type { Metadata } from 'next';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ContactForm } from '@/components/merk/ContactForm';
import { academySessies, academyThemas } from '@/lib/merk/hub';

export const metadata: Metadata = { title: 'academy', description: 'hub academy: kleine sessies van hosts voor hosts, in een moroww-huis.' };

export default function Academy() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop
            niveau={1}
            boven="hub academy · voor hosts"
            titel={<>hosts leren <i>van hosts.</i></>}
            tekst="Kleine sessies, in een moroww-huis. Over cijfers, en over hoe licht, geur en rust tot betere reviews leiden."
          />
        </div>
      </section>

      <Sectie>
        <div className="rij">
          <div className="smal">
            <Kop boven="zo werkt het" titel={<>klein, op locatie, <i>praktisch.</i></>} />
            <div className="foto" style={{ position: 'relative', overflow: 'hidden', marginTop: 28, aspectRatio: '4 / 3' }}>
              <Image src="/images/over-interieur-2.jpg" alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
          <ul className="lijst breed">
            <li><span>een handvol hosts per sessie, zodat iedereen vragen kan stellen</span><span>01</span></li>
            <li><span>in een huis uit de collectie: je ziet wat we bedoelen</span><span>02</span></li>
            <li><span>van hosts voor hosts, met cijfers uit echte verblijven</span><span>03</span></li>
            <li><span>je gaat naar huis met iets wat je de week erna toepast</span><span>04</span></li>
          </ul>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="thema's" titel={<>waar het <i>over gaat.</i></>} />
        <div className="raster-4">
          {academyThemas.map(([titel, tekst]) => (
            <div key={titel} className="kaart">
              <h3 className="kaart-titel" style={{ fontSize: 24 }}>{titel}</h3>
              <p>{tekst}</p>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie id="inschrijven">
        <div className="rij">
          <div className="breed" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {academySessies.map((s) => (
              <div key={s.titel} className="kaart kaart-donker">
                <span className="kaart-label">volgende sessie · {s.datum} · {s.plaats}</span>
                <h2 className="kaart-titel" style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)' }}>{s.titel}</h2>
                <p>{s.tekst}</p>
              </div>
            ))}
            <p className="klein">Voor leden met het label. Externe hosts zijn welkom: vraag naar de voorwaarden.</p>
          </div>
          <div className="smal">
            <ContactForm
              merk="hub"
              soort="academy"
              knop="schrijf je in"
              bedankt="bedankt. je hoort van ons voor de volgende sessie."
              velden={[
                { naam: 'naam', label: 'naam', verplicht: true },
                { naam: 'email', label: 'e-mail', type: 'email', verplicht: true },
                { naam: 'label', label: 'heb je het moroww-label', type: 'select', opties: ['ja', 'nee', 'binnenkort'] },
                { naam: 'thema', label: 'wat interesseert je het meest', type: 'select', opties: academyThemas.map(([t]) => t) },
              ]}
            />
          </div>
        </div>
      </Sectie>
    </>
  );
}
