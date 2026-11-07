import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { site } from '@/lib/merk/site';
import { vijfVragen } from '@/lib/merk/how';

export default function How() {
  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">consulting voor kortverhuur in Vlaanderen</span>
          <h1 className="titel-1" style={{ maxWidth: 840 }}>weet wat mag. voor je verhuurt.</h1>
          <p className="inleiding">moroww how zoekt per adres uit of kortverhuur toegelaten is, wat er ontbreekt en wat eerst moet. Daarna regelen we het, als je dat wil.</p>
          <div className="knoppen">
            <Link href="/how/contact" className="btn btn-primair">plan een how scan · {site.prijzen.scan}</Link>
            <Link href="/how/makelaars" className="btn btn-lijn">ik ben makelaar</Link>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="vier manieren" titel="van vraag tot verhuurklaar." />
        <div className="raster">
          <Link href="/how/scan" className="kaart">
            <span className="kaart-label">instap</span>
            <h3 className="kaart-titel">how scan</h3>
            <p>Een analyse van het pand: wat mag, wat ontbreekt, wat eerst. Met plaatsbezoek, actieplan en vier weken nazorg.</p>
            <span className="kaart-voet">{site.prijzen.scan} <span className="klein">excl. btw</span></span>
          </Link>
          <Link href="/how/traject" className="kaart kaart-donker">
            <span className="kaart-label">volledige regie</span>
            <h3 className="kaart-titel">how traject</h3>
            <p>Wij regelen alles tot het pand verhuurklaar is: attesten, registratie, verzekering en inrichting. Los van een later beheercontract.</p>
            <span className="kaart-voet">{site.prijzen.traject} <span className="klein">excl. btw</span></span>
          </Link>
          <Link href="/how/makelaars" className="kaart">
            <span className="kaart-label">voor kantoren</span>
            <h3 className="kaart-titel">how partner</h3>
            <p>Voor makelaarskantoren met meerdere panden. Vaste afspraken, vaste aanpak per dossier, één aanspreekpunt.</p>
            <span className="kaart-voet">{site.prijzen.partner} <span className="klein">per maand</span></span>
          </Link>
          <Link href="/how/website" className="kaart">
            <span className="kaart-label">zelf verhuren</span>
            <h3 className="kaart-titel">how website</h3>
            <p>Een eigen boekingswebsite voor je huis, in jouw naam. Gasten boeken rechtstreeks bij jou, zonder platformcommissie.</p>
            <span className="kaart-voet">{site.prijzen.website} <span className="klein">excl. btw</span></span>
          </Link>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="wat we nakijken" titel="vijf vragen. per adres. zwart op wit." tekst="Elk punt krijgt een status en, waar nodig, een actie met wie ze uitvoert." />
          </div>
          <ul className="lijst breed">
            {vijfVragen.map((v, i) => (
              <li key={v}><span>{v}</span><span>0{i + 1}</span></li>
            ))}
          </ul>
        </div>
      </Sectie>

      <Sectie>
        <Kop boven="werkwijze" titel="vier stappen. geen verrassingen." />
        <ol className="stappen">
          <li><strong>adres doorgeven</strong><span>Via het formulier. We bevestigen binnen [TERMIJN].</span></li>
          <li><strong>plaatsbezoek</strong><span>We bekijken het pand en de documenten die er al zijn.</span></li>
          <li><strong>rapport en actieplan</strong><span>Per punt een status, per actie wie ze uitvoert en wanneer.</span></li>
          <li><strong>jij of wij</strong><span>Je voert het plan zelf uit, of how regelt het in een traject.</span></li>
        </ol>
      </Sectie>

      <Sectie toon="donker">
        <div className="band">
          <div className="band-tekst" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="boven">voor makelaars</span>
            <span>je koper vraagt of het mag. jij hebt het antwoord.</span>
          </div>
          <Link href="/how/makelaars" className="btn btn-primair">over how partner</Link>
        </div>
      </Sectie>

      <Sectie>
        <div className="band">
          <p className="band-tekst">klaar om te verhuren? het label van moroww neemt het over.</p>
          <Link href="/het-label" className="btn btn-lijn" style={{ gap: 10 }}>naar <Logo height={15} /></Link>
        </div>
      </Sectie>
    </>
  );
}
