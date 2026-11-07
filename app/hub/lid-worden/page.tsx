import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';

export const metadata: Metadata = { title: 'lid worden', description: 'Toegang tot moroww hub hoort bij het moroww-label.' };

export default function LidWorden() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="lid worden" titel={<>de hub hoort <i>bij het label.</i></>} tekst="Elk huis met het moroww-label krijgt toegang: partners en tools met voordelen, de academy en de maandelijkse nieuwsbrief voor leden." />
        </div>
      </section>
      <Sectie>
        <div className="raster-2">
          <div className="kaart">
            <h2 className="kaart-titel">al het <i>label?</i></h2>
            <p>Je ontvangt je toegang per mail na de keuring. Kwijt? Mail ons.</p>
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
