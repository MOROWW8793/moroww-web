import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { partnerCategorieen, hoeWeKiezen } from '@/lib/merk/hub';

export const metadata: Metadata = {
  title: 'partners',
  description: 'Tools, merken en vakmensen voor eigenaars en beheerders met het moroww-label. Met een voordeel voor leden.',
};

export default function Partners() {
  return (
    <>
      <section className="held">
        <div className="wrap">
          <Kop
            niveau={1}
            boven="hub partners · voor eigenaars en beheerders met het label"
            titel={<>wat wij gebruiken, <i>voor jouw huis.</i></>}
            tekst="De tools, merken en vakmensen achter elk moroww-huis. Wie het label draagt, krijgt er een voordeel bij, ook als je zelf verhuurt."
          />
        </div>
      </section>

      {partnerCategorieen.map((c, i) => (
        <Sectie key={c.sleutel} id={c.sleutel} toon={i % 2 === 0 ? 'zacht' : 'basis'}>
          <div className="raster-2" style={{ alignItems: 'center' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 28, order: i % 2 === 0 ? 0 : 1 }}>
              <Kop boven={c.label} titel={c.titel} tekst={c.tekst} />
              <ul className="lijst">
                {c.partners.map((p, j) => (
                  <li key={`${c.sleutel}-${j}`}>
                    <span>
                      {p.status === 'live' && p.url ? (
                        <a href={p.url} target="_blank" rel="noopener noreferrer">{p.naam}</a>
                      ) : p.status === 'live' ? (
                        p.naam
                      ) : (
                        <>{p.wat}</>
                      )}
                      {p.status === 'live' && <span className="klein" style={{ display: 'block' }}>{p.wat}{p.voordeel ? ` · ${p.voordeel}` : ''}</span>}
                    </span>
                    <span>{p.status === 'live' ? (p.voordeel ? 'voordeel voor leden' : 'partner') : 'binnenkort'}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="foto" style={{ position: 'relative', overflow: 'hidden', aspectRatio: '4 / 3' }}>
              <Image src={c.foto} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </Sectie>
      ))}

      <Sectie toon="donker">
        <Kop boven="hoe we kiezen" titel={<>vier vragen, <i>voor elke partner.</i></>} />
        <ol className="stappen">
          {hoeWeKiezen.map(([titel, tekst]) => (
            <li key={titel}><strong>{titel}</strong><span>{tekst}</span></li>
          ))}
        </ol>
      </Sectie>

      <Sectie>
        <div className="rij">
          <div className="smal">
            <Kop boven="toegang" titel={<>de partners horen <i>bij het label.</i></>} tekst="Je krijgt je toegang na ons bezoek aan je huis." />
            <div className="knoppen">
              <Link href="/hub/lid-worden" className="btn btn-primair">lid worden</Link>
            </div>
          </div>
          <div className="breed">
            <Kop boven="zelf partner?" titel={<>past je merk <i>bij moroww?</i></>} tekst="Vertel ons wat je doet en welk voordeel je leden geeft." />
            <div className="knoppen">
              <Link href="/hub/partner-worden" className="btn btn-lijn">partner worden</Link>
            </div>
          </div>
        </div>
      </Sectie>
    </>
  );
}
