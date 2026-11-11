import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { ledenKrijgen, partnerCategorieen, hoeWeKiezen, academyThemas } from '@/lib/merk/hub';
import { soorten } from '@/lib/hub/vragen';

const deuren: { label: string; titel: React.ReactNode; tekst: string; href: string; voet: string; tint?: string }[] = [
  {
    label: 'voor eigenaars',
    titel: <>jij vraagt, <i>wij regelen.</i></>,
    tekst: 'Je huis draagt het label. In de hub vraag je wat je huis nodig heeft, en moroww zoekt de partner in de buurt.',
    href: '/hub/aanmelden',
    voet: 'meld je aan',
  },
  {
    label: 'voor beheerders',
    titel: <>al je huizen, <i>één lijn.</i></>,
    tekst: 'Eén plek om te vragen wat je huizen nodig hebben, het label voor je beste huizen, de academy voor je team.',
    href: '/hub/property-managers',
    voet: 'voor property managers',
    tint: '#F5ECE3',
  },
  {
    label: 'voor vakmensen en merken',
    titel: <>werk in <i>onze huizen.</i></>,
    tekst: 'Een vakman krijgt opdrachten in zijn regio, via moroww. Een merk komt in de huizen van de leden.',
    href: '/hub/partner-worden',
    voet: 'partner worden',
    tint: '#FAE4D6',
  },
  {
    label: 'voor gasten',
    titel: <>neem het <i>mee.</i></>,
    tekst: 'De geur, het linnen en de essentials uit het verblijf. Om thuis te hebben. Binnenkort.',
    href: '/hub/market',
    voet: 'naar de market',
    tint: '#FBF7F2',
  },
];

const stappen: [string, string][] = [
  ['je vraagt', 'In de hub, of gewoon via WhatsApp of telefoon. Wat moet er gebeuren, in welk huis, en tegen wanneer.'],
  ['wij plannen in', 'Moroww kiest de partner die het snelst bij het huis kan. Je ziet wie er komt, en wanneer.'],
  ['het is geregeld', 'We volgen op tot het klaar is. Je ziet het resultaat met een foto, en zegt hoe het ging.'],
];

const livePartners = partnerCategorieen.flatMap((c) => c.partners.filter((p) => p.status === 'live').map((p) => ({ ...p, cat: c.label })));

export default function Hub() {
  return (
    <>
      <section className="held" data-mw-reveal>
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">moroww hub · voor eigenaars, beheerders en hotels met het label</span>
          <h1 className="titel-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)' }}>vraag het <i>moroww.</i></h1>
          <p className="inleiding">
            Een extra schoonmaak, de ramen, een herstelling, de koelkast vullen voor de gasten. Jij vraagt het in de hub,
            wij zoeken een partner in de buurt en volgen op tot het klaar is. Je ziet het met een foto.
          </p>
          <div className="knoppen">
            <Link href="/hub/aanmelden" className="btn btn-primair">meld je aan</Link>
            <Link href="/hub/inloggen" className="btn btn-lijn">al lid? log in</Link>
          </div>
        </div>
      </section>

      <Sectie>
        <Kop boven="zo werkt het" titel={<>drie stappen, <i>één aanspreekpunt.</i></>} />
        <ol className="stappen">
          {stappen.map(([titel, tekst]) => (
            <li key={titel}><strong>{titel}</strong><span>{tekst}</span></li>
          ))}
        </ol>
      </Sectie>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="wat je kan vragen" titel={<>alles wat je huis <i>nodig heeft.</i></>} tekst="Staat het er niet bij? Vraag het toch. Moroww zoekt wie het kan." />
          </div>
          <ul className="lijst breed">
            {soorten.filter((x) => x.voorbeeld).map((x) => (
              <li key={x.sleutel} style={{ flexDirection: 'column', gap: 4 }}>
                <span style={{ fontWeight: 500 }}>{x.label}</span>
                <span>{x.voorbeeld.replace(/: $/, '.')}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sectie>

      <Sectie>
        <Kop boven="vier deuren" titel={<>één hub, <i>voor wie het huis maakt.</i></>} />
        <div className="raster-4">
          {deuren.map((d) => (
            <Link key={d.href} href={d.href} className="kaart kaart-zacht" style={d.tint ? { background: d.tint } : undefined}>
              <span className="kaart-label">{d.label}</span>
              <h2 className="kaart-titel" style={{ fontSize: 26 }}>{d.titel}</h2>
              <p>{d.tekst}</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>{d.voet}</span>
            </Link>
          ))}
        </div>
      </Sectie>

      <section className="wrap" style={{ paddingBottom: 8 }} data-mw-reveal>
        <div style={{ position: 'relative', aspectRatio: '21 / 9', overflow: 'hidden' }}>
          <Image src="/images/standaard/V2-40.jpg" alt="Een gast leest in bed in een moroww-huis" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <Sectie>
        <Kop
          boven="wat er in de hub zit"
          titel={<>vier dingen, <i>voor leden.</i></>}
          tekst="Wie het moroww-label draagt, krijgt toegang tot de hub. Ook wie zelf verhuurt, of een beheerder heeft."
        />
        <div className="raster-4">
          {ledenKrijgen.map(([titel, tekst], i) => (
            <div key={titel} className={i === 0 ? 'kaart kaart-donker' : 'kaart kaart-zacht'}>
              <span className="kaart-label">0{i + 1}</span>
              <h3 className="kaart-titel" style={{ fontSize: 24 }}>{titel}</h3>
              <p>{tekst}</p>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="de partners" titel={<>weinig partners, <i>bewust gekozen.</i></>} tekst="Deze partners werken vandaag al in de huizen van moroww. Als je iets vraagt, is het vaak een van hen die komt." />
          </div>
          <ul className="lijst breed">
            {livePartners.map((p) => (
              <li key={p.naam}>
                <span style={{ fontWeight: 500 }}>{p.naam}</span>
                <span>{p.cat}</span>
              </li>
            ))}
          </ul>
        </div>
      </Sectie>

      <Sectie>
        <Kop boven="hoe we kiezen" titel={<>vier vragen <i>voor elke partner.</i></>} />
        <ol className="stappen">
          {hoeWeKiezen.map(([titel, tekst]) => (
            <li key={titel}><strong>{titel}</strong><span>{tekst}</span></li>
          ))}
        </ol>
      </Sectie>

      <Sectie>
        <Kop boven="de academy" titel={<>waar het <i>over gaat.</i></>} tekst="Sessies voor eigenaars, hosts en de teams van property managers." />
        <div className="raster-4">
          {academyThemas.map(([titel, tekst]) => (
            <div key={titel} className="kaart">
              <h3 className="kaart-titel" style={{ fontSize: 22 }}>{titel}</h3>
              <p>{tekst}</p>
            </div>
          ))}
        </div>
      </Sectie>

      <Sectie toon="donker">
        <div className="band">
          <p className="band-tekst">een vakman of een merk die past bij moroww?</p>
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
