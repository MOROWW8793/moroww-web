import type { Metadata } from 'next';
import Link from 'next/link';
import { ZHeld, ZSectie, ZRaster, ZTijdlijn } from '@/components/merk/Zwitsers';
import { ledenKrijgen } from '@/lib/merk/hub';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { alternates: { canonical: '/hub/lid-worden' }, title: 'lid worden', description: 'Toegang tot moroww hub hoort bij het moroww-label: vraag het moroww, merken in je huis met korting, de academy en de ledenbrief.' };

const stappen = [
  { titel: 'vraag een bezoek aan', tekst: 'Via de pagina van het label. We nemen contact op om een moment te plannen.' },
  { titel: 'we komen langs', tekst: 'Haalt je huis de standaard, dan krijgt het het label.' },
  { titel: 'meld je aan', tekst: 'Met je e-mailadres en een wachtwoord. Wij keuren goed, en je krijgt een mail.' },
];

export default function LidWorden() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · lid worden"
        titel={<>de hub hoort<br />bij het label.</>}
        fotos={[
          { src: '/images/hub/huis-moro-badkamer.jpg', alt: 'Handdoek en MORO-producten in een badkamer' },
          { src: '/images/standaard/V2-12.jpg', alt: 'Handdoeken worden klaargelegd op het bed' },
          { src: '/images/standaard/V2-63.jpg', alt: 'Slaapkamer met kunst aan de muur' },
        ]}
        lead="Elk huis met het moroww-label krijgt toegang. Of je nu zelf verhuurt, een beheerder hebt, of moroww het voor je doet."
        acties={
          <>
            <Link href="/het-label#aanvraag" className="z-knop">vraag een bezoek aan</Link>
            <Link href="/hub/inloggen" className="z-link">al lid? log in</Link>
          </>
        }
      />

      <ZSectie nr="02 · wat leden krijgen" titel="vier dingen, vanaf ons bezoek.">
        <ZRaster prefix="2" items={ledenKrijgen.map(([titel, tekst]) => ({ titel, tekst }))} />
      </ZSectie>

      <ZSectie nr="03 · zo word je lid" titel="drie stappen.">
        <ZTijdlijn items={stappen} prefix="3" />
      </ZSectie>

      <section className="z-sectie" data-mw-reveal>
        <div className="z-tegels">
          <div className="z-tegel-accent">
            <span className="z-h3">al het label?</span>
            <span className="z-tekst">
              Log in met je e-mailadres en je wachtwoord. Vragen? Mail ons op <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.
            </span>
            <span className="z-knoppen">
              <Link href="/hub/inloggen" className="z-knop z-knop-donker">inloggen</Link>
              <Link href="/hub/aanmelden" className="z-link" style={{ fontSize: 16 }}>meld je aan</Link>
            </span>
          </div>
          <div>
            <span className="z-h3">nog geen label?</span>
            <span className="z-tekst">Vraag een bezoek aan voor je huis.</span>
            <Link href="/het-label#aanvraag" className="z-link" style={{ fontSize: 16 }}>naar het label →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
