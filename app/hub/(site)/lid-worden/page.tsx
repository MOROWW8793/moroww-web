import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ledenKrijgen } from '@/lib/merk/hub';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'lid worden', description: 'Toegang tot moroww hub hoort bij het moroww-label: partners met voordelen, de academy en de ledenbrief.' };

export default function LidWorden() {
  return (
    <>
      <section className="held" data-mw-reveal>
        <div className="wrap">
          <Kop
            niveau={1}
            boven="lid worden"
            titel={<>de hub hoort <i>bij het label.</i></>}
            tekst="Elk huis met het moroww-label krijgt toegang. Of je nu zelf verhuurt, een beheerder hebt, of moroww het voor je doet."
          />
        </div>
      </section>

      <Sectie>
        <Kop boven="wat leden krijgen" titel={<>vier dingen, <i>vanaf ons bezoek.</i></>} />
        <div className="raster">
          {ledenKrijgen.map(([titel, tekst]) => (
            <div key={titel} className="kaart kaart-zacht">
              <h3 className="kaart-titel" style={{ fontSize: 24 }}>{titel}</h3>
              <p>{tekst}</p>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <Kop boven="zo word je lid" titel={<>drie stappen.</>} />
        <ol className="stappen">
          <li><strong>vraag een bezoek aan</strong><span>Via de pagina van het label. We nemen contact op om een moment te plannen.</span></li>
          <li><strong>we komen langs</strong><span>Haalt je huis de standaard, dan krijgt het het label.</span></li>
          <li><strong>meld je aan</strong><span>Met je e-mailadres en een wachtwoord. Wij keuren goed, en je krijgt een mail.</span></li>
        </ol>
      </Sectie>

      <Sectie>
        <div className="raster-2">
          <div className="kaart">
            <h2 className="kaart-titel">al het <i>label?</i></h2>
            <p>Log in met je e-mailadres en je wachtwoord. Vragen? Mail ons op <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
            <div className="knoppen"><Link href="/hub/inloggen" className="btn btn-primair">inloggen</Link><Link href="/hub/aanmelden" className="btn btn-lijn">meld je aan</Link></div>
          </div>
          <div className="kaart kaart-donker">
            <h2 className="kaart-titel">nog geen <i>label?</i></h2>
            <p>Vraag een bezoek aan voor je huis.</p>
            <Link href="/het-label#aanvraag" className="btn btn-primair" style={{ alignSelf: 'flex-start' }}>naar het label</Link>
          </div>
        </div>
      </Sectie>
    </>
  );
}
