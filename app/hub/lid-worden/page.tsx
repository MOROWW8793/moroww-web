import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { ledenKrijgen } from '@/lib/merk/hub';
import { site } from '@/lib/merk/site';

export const metadata: Metadata = { title: 'lid worden', description: 'Toegang tot moroww hub hoort bij het moroww-label: partners met voordelen, de academy en de ledenbrief.' };

export default function LidWorden() {
  return (
    <>
      <section className="held">
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
        <Kop boven="wat leden krijgen" titel={<>vier dingen, <i>vanaf de keuring.</i></>} />
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
          <li><strong>vraag een keuring aan</strong><span>Via de pagina van het label. We nemen contact op voor een bezoek.</span></li>
          <li><strong>we keuren je huis</strong><span>Haalt je huis de standaard, dan krijgt het het label.</span></li>
          <li><strong>welkom in de hub</strong><span>Je toegang komt per mail, samen met de voordelen van de partners.</span></li>
        </ol>
      </Sectie>

      <Sectie>
        <div className="raster-2">
          <div className="kaart">
            <h2 className="kaart-titel">al het <i>label?</i></h2>
            <p>Je toegang kwam per mail na de keuring. Kwijt? Mail ons op <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>.</p>
          </div>
          <div className="kaart kaart-donker">
            <h2 className="kaart-titel">nog geen <i>label?</i></h2>
            <p>Vraag een keuring aan voor je huis.</p>
            <Link href="/het-label#aanvraag" className="btn btn-primair" style={{ alignSelf: 'flex-start' }}>naar het label</Link>
          </div>
        </div>
      </Sectie>
    </>
  );
}
