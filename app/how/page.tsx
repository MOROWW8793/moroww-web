import Link from 'next/link';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';

// moroww how werkt op maat. Geen vaste pakketten: de vragen hieronder zijn
// voorbeelden van waar eigenaars mee komen, geen menukaart.
const vragen: { titel: string; tekst: string; href?: string }[] = [
  {
    titel: 'mag hier kortverhuur?',
    tekst: 'Vergunning, registratie, brandveiligheid, de regels van je gemeente. We zoeken uit wat geldt voor jouw adres en wat eerst moet.',
  },
  {
    titel: 'het huis is er. hoe start ik?',
    tekst: 'Inrichting, verzekering, de eerste listings, schoonmaak en linnen. We zetten op een rij wat nog ontbreekt en in welke volgorde.',
  },
  {
    titel: 'ik wil rechtstreeks boekingen.',
    tekst: 'Een eigen boekingswebsite voor je huis, in jouw naam, zonder platformcommissie.',
    href: '/how/website',
  },
  {
    titel: 'de cijfers kloppen niet.',
    tekst: 'Wat een nacht je echt kost, hoe je prijzen zet en wat je huis kan opbrengen.',
  },
  {
    titel: 'ik beheer huizen voor anderen.',
    tekst: 'Voor property managers: één aanpak voor je hele portefeuille.',
    href: '/how/property-managers',
  },
  {
    titel: 'iets anders.',
    tekst: 'Staat je vraag er niet bij? Vertel ze ons. Kunnen we niet helpen, dan zeggen we dat meteen, en wie wel kan.',
  },
];

export default function How() {
  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">consulting voor kortverhuur, op maat</span>
          <h1 className="titel-1" style={{ maxWidth: 840 }}>elke vraag is anders. de aanpak ook.</h1>
          <p className="inleiding">
            moroww how kijkt naar de situatie waar jij tegenaan loopt en stelt voor wat nodig is. Niet meer, niet minder.
            Daarna voer je het zelf uit, of regelen wij het.
          </p>
          <div className="knoppen">
            <Link href="/how/contact" className="btn btn-primair">vertel ons je vraag</Link>
            <Link href="/how/property-managers" className="btn btn-lijn">ik ben property manager</Link>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="waar eigenaars mee komen" titel="een paar voorbeelden." tekst="Geen pakketten. Elk voorstel begint bij jouw vraag." />
        <div className="raster">
          {vragen.map((v) =>
            v.href ? (
              <Link key={v.titel} href={v.href} className="kaart">
                <h3 className="kaart-titel">{v.titel}</h3>
                <p>{v.tekst}</p>
                <span className="kaart-voet" style={{ fontSize: 16 }}>meer →</span>
              </Link>
            ) : (
              <div key={v.titel} className="kaart">
                <h3 className="kaart-titel">{v.titel}</h3>
                <p>{v.tekst}</p>
              </div>
            ),
          )}
        </div>
      </Sectie>

      <Sectie toon="zacht" id="werkwijze">
        <Kop boven="werkwijze" titel="van vraag tot oplossing." />
        <ol className="stappen">
          <li><strong>vertel je vraag</strong><span>Via het formulier of in een kort gesprek. Wat speelt er, en wat wil je bereiken?</span></li>
          <li><strong>we kijken samen</strong><span>Waar nodig komen we langs en bekijken we de documenten die er al zijn.</span></li>
          <li><strong>voorstel op maat</strong><span>Wat er moet gebeuren, wie het doet, wanneer, en wat het kost. Vooraf, zwart op wit.</span></li>
          <li><strong>jij of wij</strong><span>Je voert het voorstel zelf uit, of how regelt het voor je.</span></li>
        </ol>
      </Sectie>

      <Sectie toon="donker">
        <div className="band">
          <div className="band-tekst" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span className="boven">voor property managers</span>
            <span>jij beheert de huizen. wij zorgen dat ze mogen, en gezien worden.</span>
          </div>
          <Link href="/how/property-managers" className="btn btn-primair">over how partner</Link>
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
