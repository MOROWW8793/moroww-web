import Link from 'next/link';
import Image from 'next/image';
import { Sectie, Kop } from '@/components/merk/Shell';
import { Logo } from '@/components/merk/Logo';
import { ledenKrijgen, partnerCategorieen, hoeWeKiezen, academyThemas } from '@/lib/merk/hub';

const deuren: { label: string; titel: React.ReactNode; tekst: string; href: string; voet: string; tint?: string }[] = [
  {
    label: 'voor eigenaars',
    titel: <>zelf verhuren, <i>niet alleen.</i></>,
    tekst: 'Je huis draagt het label. In de hub vind je de partners, de academy en andere eigenaars.',
    href: '/hub/lid-worden',
    voet: 'lid worden',
  },
  {
    label: 'voor property managers',
    titel: <>al je huizen, <i>één lijn.</i></>,
    tekst: 'De partners voor al je huizen, het label voor je beste huizen, de academy voor je team.',
    href: '/hub/property-managers',
    voet: 'voor property managers',
    tint: '#E4EBF3',
  },
  {
    label: 'voor merken en vakmensen',
    titel: <>werk in <i>onze huizen.</i></>,
    tekst: 'Een product of een dienst die past bij moroww? Eerst bij ons, dan bij de leden.',
    href: '/hub/partner-worden',
    voet: 'partner worden',
    tint: '#DDE6F0',
  },
  {
    label: 'voor gasten',
    titel: <>neem het <i>mee.</i></>,
    tekst: 'De geur, het linnen en de essentials uit het verblijf. Om thuis te hebben.',
    href: '/hub/market',
    voet: 'naar de market',
    tint: '#D6DFEA',
  },
];

const livePartners = partnerCategorieen.flatMap((c) => c.partners.filter((p) => p.status === 'live').map((p) => ({ ...p, cat: c.label })));

export default function Hub() {
  return (
    <>
      <section className="held">
        <div className="wrap" style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <span className="boven">de plek van de moroww-familie</span>
          <h1 className="titel-1" style={{ fontSize: 'clamp(3rem, 7vw, 5.4rem)' }}>where the stay <i>stays.</i></h1>
          <p className="inleiding">
            moroww brengt de juiste mensen samen. In de hub vinden eigenaars en property managers de partners en tools die
            moroww zelf gebruikt. Hosts leren van elkaar. Gasten nemen de rust mee naar huis.
          </p>
          <div className="knoppen">
            <Link href="/hub/lid-worden" className="btn btn-primair">lid worden</Link>
            <Link href="/hub/partners" className="btn btn-lijn">bekijk de partners</Link>
          </div>
        </div>
      </section>

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

      <section className="wrap" style={{ paddingBottom: 8 }}>
        <div style={{ position: 'relative', aspectRatio: '21 / 9', overflow: 'hidden' }}>
          <Image src="/images/standaard/V2-40.jpg" alt="Een gast leest in bed in een moroww-huis" fill sizes="100vw" style={{ objectFit: 'cover' }} />
        </div>
      </section>

      <Sectie>
        <Kop
          boven="wat er in de hub zit"
          titel={<>partners, academy <i>en market.</i></>}
          tekst="Drie delen, elk met dezelfde regel: wat in de hub komt, werkt eerst in onze eigen huizen."
        />
        <div className="raster">
          <Link href="/hub/partners" className="kaart" style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
            <div className="foto" style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src="/images/hub/tools-laptop.jpg" alt="Laptop op een tafel in een moroww-huis" fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <h3 className="kaart-titel">hub <i>partners</i></h3>
              <p>Tools, merken en vakmensen, met een voordeel voor leden.</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>naar de partners</span>
            </div>
          </Link>
          <Link href="/hub/academy" className="kaart" style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
            <div className="foto" style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src="/images/standaard/V2-12.jpg" alt="Handdoeken worden gevouwen op een bed" fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <h3 className="kaart-titel">hub <i>academy</i></h3>
              <p>Kleine sessies van hosts voor hosts, in een moroww-huis.</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>naar de academy</span>
            </div>
          </Link>
          <Link href="/hub/market" className="kaart" style={{ padding: 0, gap: 0, overflow: 'hidden' }}>
            <div className="foto" style={{ position: 'relative', overflow: 'hidden' }}>
              <Image src="/images/hub/huis-moro-badkamer.jpg" alt="Handdoek en badkamerproducten in een moroww-huis" fill sizes="(min-width: 1024px) 33vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
            <div style={{ padding: 28, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <h3 className="kaart-titel">hub <i>market</i></h3>
              <p>De geur, het linnen en de essentials uit het verblijf. Binnenkort.</p>
              <span className="kaart-voet" style={{ fontSize: 16 }}>naar de market</span>
            </div>
          </Link>
        </div>
      </Sectie>

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop boven="de partners" titel={<>weinig partners, <i>bewust gekozen.</i></>} tekst="Deze partners werken vandaag al in de huizen van moroww." />
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

      <Sectie toon="zacht">
        <div className="rij">
          <div className="smal">
            <Kop
              boven="voor leden"
              titel={<>wat leden <i>krijgen.</i></>}
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
