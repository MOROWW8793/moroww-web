import type { Metadata } from 'next';
import Image from 'next/image';
import { ContactForm } from '@/components/merk/ContactForm';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZRegister } from '@/components/merk/Zwitsers';
import { academySessies, academyThemas } from '@/lib/merk/hub';

export const metadata: Metadata = { alternates: { canonical: '/hub/academy' }, title: 'academy', description: 'hub academy: kleine sessies van hosts voor hosts, in een moroww-huis.' };

const werkwijze = [
  { titel: 'een handvol hosts per sessie, zodat iedereen vragen kan stellen' },
  { titel: 'in een huis uit de collectie: je ziet wat we bedoelen' },
  { titel: 'van hosts voor hosts, met cijfers uit echte verblijven' },
  { titel: 'je gaat naar huis met iets wat je de week erna toepast' },
];

export default function Academy() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · hub academy · voor hosts"
        titel={<>hosts leren<br />van hosts.</>}
        fotos={[
          { src: '/images/over-interieur-2.jpg', alt: 'Leefruimte van een moroww-huis' },
          { src: '/images/standaard/V2-210.jpg', alt: 'Een glas met citrus op een stenen blad' },
          { src: '/images/standaard/V2-56.jpg', alt: 'Een interieurboek op tafel in een moroww-huis' },
        ]}
        lead="Kleine sessies, in een moroww-huis. Over cijfers, en over hoe licht, geur en rust tot betere reviews leiden."
        acties={<a href="#inschrijven" className="z-knop">schrijf je in</a>}
      />

      <section className="z-sectie" data-mw-reveal>
        <div className="z-twee" style={{ alignItems: 'stretch' }}>
          <div className="z-foto" style={{ flex: '1 1 360px', minHeight: 360 }}>
            <Image src="/images/over-interieur-2.jpg" alt="" fill sizes="(min-width: 1024px) 35vw, 100vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="z-smal" style={{ flex: '999 1 520px' }}>
            <span className="z-nr">02 · zo werkt het</span>
            <h2 className="z-h2">klein, op locatie, praktisch.</h2>
            <ZRegister items={werkwijze} prefix="2" />
          </div>
        </div>
      </section>

      <ZSectie nr="03 · thema's" titel="waar het over gaat.">
        <ZRaster prefix="3" items={academyThemas.map(([titel, tekst]) => ({ titel, tekst }))} />
      </ZSectie>

      <ZSectieTwee
        id="inschrijven"
        nr="04 · inschrijven"
        titel="de volgende sessie."
        extra={
          <>
            {academySessies.map((s) => (
              <div key={s.titel} className="z-object" style={{ flex: '0 0 auto' }}>
                <div className="z-object-kop">
                  <span>{s.datum ?? 'datum volgt'}</span>
                  <span className="z-nr">{s.plaats ?? 'in een moroww-huis'}</span>
                </div>
                <div style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <span className="z-h3">{s.titel}</span>
                  <span className="z-tekst">{s.tekst}</span>
                </div>
              </div>
            ))}
            <p className="z-klein">Voor leden met het label. Externe hosts zijn welkom: vraag naar de voorwaarden.</p>
          </>
        }
      >
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
      </ZSectieTwee>
    </div>
  );
}
