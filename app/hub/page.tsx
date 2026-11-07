import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { ledenKrijgen, partnerCategorieen } from '@/lib/merk/hub';

export default function Hub() {
  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">de plek van de moroww-familie</span>
          <h1 className="titel-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)' }}>where the stay <i>stays.</i></h1>
          <p className="inleiding">
            Eigenaars vinden er de partners en tools die moroww zelf gebruikt. Hosts leren van elkaar. Gasten nemen de
            rust mee naar huis.
          </p>
          <div className="knoppen">
            <Link href="/hub/lid-worden" className="btn btn-primair">lid worden</Link>
            <Link href="/hub/partners" className="btn btn-lijn">bekijk de partners</Link>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="drie deuren" titel={<>één hub, <i>voor wie het huis maakt.</i></>} />
        <div className="raster">
          <Link href="/hub/partners" className="kaart kaart-zacht">
            <span className="kaart-label">voor eigenaars en beheerders</span>
            <h2 className="kaart-titel">hub <i>partners</i></h2>
            <p>Tools, merken en vakmensen die we zelf gebruiken. Met een voordeel voor wie het label draagt.</p>
            <span className="kaart-voet" style={{ fontSize: 16 }}>naar de partners →</span>
          </Link>
          <Link href="/hub/academy" className="kaart kaart-zacht" style={{ background: '#E4EBF3' }}>
            <span className="kaart-label">voor hosts</span>
            <h2 className="kaart-titel">hub <i>academy</i></h2>
            <p>Kleine sessies in een moroww-huis. Over cijfers, en over wat een gast voelt bij aankomst.</p>
            <span className="kaart-voet" style={{ fontSize: 16 }}>naar de academy →</span>
          </Link>
          <Link href="/hub/market" className="kaart kaart-zacht" style={{ background: '#DDE6F0' }}>
            <span className="kaart-label">voor gasten</span>
            <h2 className="kaart-titel">hub <i>market</i></h2>
            <p>De geur, het linnen en de essentials uit het verblijf. Om thuis te hebben.</p>
            <span className="kaart-voet" style={{ fontSize: 16 }}>naar de market →</span>
          </Link>
        </div>
      </Sectie>

      <section className="wrap" style={{ paddingBottom: 8 }}>
        <div style={{ position: 'relative', aspectRatio: '21 / 9', overflow: 'hidden' }}>
          <Image src="/images/standaard/V2-40.jpg" alt="" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop
              boven="voor leden"
              titel={<>zelf verhuren, <i>niet alleen.</i></>}
              tekst="Wie het moroww-label draagt, krijgt toegang tot de hub. Ook wie zelf verhuurt, of een beheerder heeft."
            />
          </div>
          <ul className="lijst breed">
            {ledenKrijgen.map(([titel, tekst], i) => (
              <li key={titel} style={{ flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 500 }}>0{i + 1} · {titel}</span>
                <span>{tekst}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sectie>

      <Sectie>
        <Kop boven="de partners" titel={<>weinig partners, <i>bewust gekozen.</i></>} tekst="Elke partner werkt eerst in onze eigen huizen." />
        <div className="raster-4">
          {partnerCategorieen.map((c) => (
            <Link key={c.sleutel} href={`/hub/partners#${c.sleutel}`} className="kaart">
              <span className="kaart-label">{c.label}</span>
              <h3 className="kaart-titel" style={{ fontSize: 24 }}>{c.titel}</h3>
            </Link>
          ))}
        </div>
      </Sectie>

      <Sectie toon="donker">
        <div className="band">
          <p className="band-tekst">een merk, een tool of een vakman die past bij moroww?</p>
          <Link href="/hub/partner-worden" className="btn btn-primair">partner worden</Link>
        </div>
      </Sectie>

      <Sectie>
        <div className="band">
          <p className="band-tekst">toegang tot de hub hoort bij het label.</p>
          <Link href="/het-label" className="btn btn-lijn" style={{ gap: 10 }}>naar <Logo height={15} /></Link>
        </div>
      </Sectie>
    </>
  );
}
