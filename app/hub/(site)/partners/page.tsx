import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ZHeld, ZSectie, ZTijdlijn } from '@/components/merk/Zwitsers';
import { partnerCategorieen, hoeWeKiezen } from '@/lib/merk/hub';

export const metadata: Metadata = {
  title: 'partners',
  description: 'Merken, tools en vakmensen voor eigenaars en beheerders met het moroww-label. Met een voordeel voor leden.',
};

export default function Partners() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · hub partners · voor eigenaars en beheerders met het label"
        titel={<>wat wij gebruiken,<br />voor jouw huis.</>}
        lead="De merken, tools en vakmensen achter elk moroww-huis. Wie het label draagt, krijgt er een voordeel bij, ook als je zelf verhuurt. Zet je de producten van onze merken in je huis, dan krijg je korting bij die merken."
        acties={<Link href="/hub/lid-worden" className="z-knop">lid worden</Link>}
      />

      {partnerCategorieen.map((c, i) => (
        <section key={c.sleutel} id={c.sleutel} className="z-sectie" data-mw-reveal>
          <div className="z-twee" style={{ alignItems: 'stretch' }}>
            <div className="z-smal" style={{ flex: '1 1 420px' }}>
              <span className="z-nr">{String(i + 2).padStart(2, '0')} · {c.label}</span>
              <h2 className="z-h2">{c.titel}</h2>
              <p className="z-tekst" style={{ fontSize: 18 }}>{c.tekst}</p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--ink)' }}>
                {c.partners.map((p, j) => {
                  const toonNaam = p.status === 'live' && p.naamPubliek && p.naam;
                  return (
                    <li key={`${c.sleutel}-${j}`} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '6px 24px', padding: '16px 0', borderBottom: '1px solid var(--line)' }}>
                      <span style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0 }}>
                        {toonNaam ? (
                          p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 19, fontWeight: 500 }}>{p.naam}</a> : <span style={{ fontSize: 19, fontWeight: 500 }}>{p.naam}</span>
                        ) : null}
                        <span className={toonNaam ? 'z-klein' : undefined} style={toonNaam ? undefined : { fontSize: 18 }}>{p.wat}</span>
                      </span>
                      <span className="z-nr">
                        {p.status !== 'live' ? 'binnenkort' : c.sleutel === 'vakmensen' ? 'via moroww' : 'korting voor leden'}
                      </span>
                    </li>
                  );
                })}
              </ul>
              {c.sleutel === 'vakmensen' && <p className="z-klein">Wie ze zijn, zie je als lid in de hub.</p>}
            </div>
            <div className="z-foto" style={{ flex: '1 1 420px', minHeight: 360, order: i % 2 === 0 ? 0 : -1 }}>
              <Image src={c.foto} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" style={{ objectFit: 'cover' }} />
            </div>
          </div>
        </section>
      ))}

      <ZSectie nr={`${String(partnerCategorieen.length + 2).padStart(2, '0')} · hoe we kiezen`} titel="vier vragen, voor elke partner.">
        <ZTijdlijn items={hoeWeKiezen.map(([titel, tekst]) => ({ titel, tekst }))} />
      </ZSectie>

      <section className="z-sectie" data-mw-reveal>
        <div className="z-tegels">
          <div className="z-tegel-accent">
            <span className="z-h3">de partners horen bij het label.</span>
            <span className="z-tekst">Je krijgt je toegang na ons bezoek aan je huis.</span>
            <Link href="/hub/lid-worden" className="z-knop z-knop-donker" style={{ alignSelf: 'flex-start' }}>lid worden</Link>
          </div>
          <div>
            <span className="z-h3">past je merk bij moroww?</span>
            <span className="z-tekst">Vertel ons wat je doet en welk voordeel je leden geeft.</span>
            <Link href="/hub/partner-worden" className="z-link" style={{ fontSize: 16 }}>partner worden →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
