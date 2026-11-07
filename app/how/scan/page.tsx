import type { Metadata } from 'next';
import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { vijfVragen } from '@/lib/merk/how';

export const metadata: Metadata = { title: 'how scan', description: 'Een analyse van je pand: wat mag, wat ontbreekt, wat eerst.' };

export default function Scan() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop niveau={1} boven="how scan" titel="mag hier kortverhuur?" tekst="Een analyse van het pand: wat mag, wat ontbreekt, wat eerst. Met plaatsbezoek, actieplan en vier weken nazorg." />
          <div className="knoppen"><Link href="/how/contact" className="btn btn-primair">plan een scan</Link></div>
        </div>
      </section>
      <Sectie>
        <div className="rij">
          <div className="smal"><Kop boven="in de scan" titel="vijf punten, één rapport." /></div>
          <ul className="lijst breed">
            {vijfVragen.map((v, i) => (<li key={v}><span>{v}</span><span>0{i + 1}</span></li>))}
          </ul>
        </div>
      </Sectie>
      <Sectie toon="zacht">
        <Kop boven="wat je krijgt" titel="een rapport per adres." />
        <div className="raster">
          <div className="kaart"><h3 className="kaart-titel" style={{ fontSize: 19 }}>het antwoord</h3><p>Kortverhuur toegelaten: ja, nee of onder voorwaarden. Met de reden.</p></div>
          <div className="kaart"><h3 className="kaart-titel" style={{ fontSize: 19 }}>het actieplan</h3><p>Wat moet er gebeuren, in welke volgorde, en wie doet het.</p></div>
          <div className="kaart"><h3 className="kaart-titel" style={{ fontSize: 19 }}>vier weken nazorg</h3><p>Vragen bij de uitvoering? Je mailt of belt ons.</p></div>
        </div>
      </Sectie>
      <Sectie>
        <div className="band">
          <p className="band-tekst">liever dat wij het regelen? kies een how traject.</p>
          <Link href="/how/traject" className="btn btn-lijn">over het traject</Link>
        </div>
      </Sectie>
    </>
  );
}
