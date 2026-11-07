import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { site } from '@/lib/merk/site';

export default function Hub() {
  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <h1 className="titel-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)' }}>where the stay <i>stays.</i></h1>
          <p className="inleiding">De plek van de moroww-familie. Eigenaars vinden er partners en tools, hosts leren van elkaar, gasten nemen de rust mee naar huis.</p>
        </div>
      </section>

      <Sectie>
        <div className="raster">
          <Link href="/hub/partners" className="kaart kaart-zacht">
            <h2 className="kaart-titel">hub <i>partners</i></h2>
            <p>Voor eigenaars en beheerders met het label. Merken, vakmensen en tools, met voordelen voor leden.</p>
            <span className="klein" style={{ marginTop: 'auto' }}>inbegrepen bij het label</span>
          </Link>
          <Link href="/hub/academy" className="kaart kaart-zacht" style={{ background: '#E4EBF3' }}>
            <h2 className="kaart-titel">hub <i>academy</i></h2>
            <p>Voor hosts. Sessies over cijfers en over de psychologie van de gast, van hosts voor hosts.</p>
            <span className="klein" style={{ marginTop: 'auto' }}>lidmaatschap {site.prijzen.academyLid} per maand</span>
          </Link>
          <Link href="/hub/market" className="kaart kaart-zacht" style={{ background: '#DDE6F0' }}>
            <h2 className="kaart-titel">hub <i>market</i></h2>
            <p>Voor gasten. Het linnen, de geur en de essentials uit het verblijf, om thuis te hebben.</p>
            <span className="klein" style={{ marginTop: 'auto' }}>open voor iedereen</span>
          </Link>
        </div>
      </Sectie>

      <Sectie toon="donker">
        <div className="band">
          <p className="band-tekst">toegang tot de hub hoort bij het moroww-label.</p>
          <div className="knoppen" style={{ marginTop: 0 }}>
            <Link href="/hub/lid-worden" className="btn btn-primair">lid worden</Link>
            <Link href="/hub/partner-worden" className="btn btn-lijn">partner worden</Link>
          </div>
        </div>
      </Sectie>
    </>
  );
}
