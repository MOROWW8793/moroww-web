import Link from 'next/link';
import Image from 'next/image';
import { ZHeld, ZSectie, ZSectieTwee, ZRaster, ZRegister, ZTijdlijn } from '@/components/merk/Zwitsers';
import { ledenKrijgen, publiekeMerken, hoeWeKiezen, academyThemas } from '@/lib/merk/hub';
import { soorten } from '@/lib/hub/vragen';
import { VoorWie } from './VoorWie';

const stappen = [
  { titel: 'je vraagt', tekst: 'In de hub, of gewoon via WhatsApp of telefoon. Wat moet er gebeuren, in welk huis, en tegen wanneer.' },
  { titel: 'wij plannen in', tekst: 'moroww kiest de partner die het snelst bij het huis kan. Je ziet wie er komt, en wanneer.' },
  { titel: 'het is geregeld', tekst: 'We volgen op tot het klaar is. Je ziet het resultaat met een foto, en zegt hoe het ging.' },
];

const opgevolgd = [
  ['je vraagt het in de hub', 'stap 1'],
  ['een partner in de buurt wordt ingepland', 'stap 2'],
  ['werk gedaan, de foto komt bij jou', 'stap 3'],
  ['jij zegt hoe het ging', 'stap 4'],
];

export default function Hub() {
  return (
    <div className="wrap">
      <ZHeld
        nr="01 · voor eigenaars, beheerders en hotels met het label"
        titel={<>vraag het<br />moroww.</>}
        fotos={[
          { src: '/images/hub/huis-moro-badkamer.jpg', alt: 'Handdoek en MORO-producten in een badkamer van een moroww-huis' },
          { src: '/images/standaard/V2-12.jpg', alt: 'Handdoeken worden klaargelegd op het bed', positie: 'center 70%' },
          { src: '/images/standaard/V2-40.jpg', alt: 'Een gast leest in bed in een moroww-huis' },
        ]}
        lead="Een extra schoonmaak, de ramen, een herstelling, de koelkast vullen voor de gasten. Jij vraagt het in de hub, wij zoeken een partner in de buurt en volgen op tot het klaar is. Je ziet het met een foto."
        acties={
          <>
            <Link href="/hub/aanmelden" className="z-knop">meld je aan</Link>
            <Link href="/hub/inloggen" className="z-link">al lid? log in</Link>
          </>
        }
        object={
          <figure className="z-object" style={{ margin: 0 }}>
            <div className="z-object-kop"><span>een vraag, opgevolgd</span><span className="z-nr">voorbeeld</span></div>
            <div style={{ padding: '20px 22px', borderBottom: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{ fontSize: 21, fontWeight: 500 }}>ramen</span>
              <span className="z-tekst" style={{ fontSize: 15 }}>Kunnen de ramen gepoetst zijn? Er komen gasten.</span>
            </div>
            {opgevolgd.map(([tekst, stap], i) => (
              <div key={tekst} className="z-object-rij">
                <span aria-hidden="true" style={{ flex: '0 0 auto', width: 12, height: 12, borderRadius: '50%', border: '1px solid var(--line)', background: i < 3 ? 'var(--z-accent)' : 'var(--wit)', alignSelf: 'center' }} />
                <span>{tekst}</span>
                <span className="z-nr">{stap}</span>
              </div>
            ))}
            <div className="z-foto" style={{ aspectRatio: '16 / 6' }}>
              <Image src="/images/standaard/V2-12.jpg" alt="Foto van het afgewerkte werk, als bewijs" fill sizes="(min-width: 1024px) 35vw, 100vw" style={{ objectFit: 'cover', objectPosition: 'center 60%' }} />
            </div>
          </figure>
        }
      />

      <ZSectie id="zo" nr="02 · zo werkt het" titel="drie stappen, één aanspreekpunt.">
        <ZTijdlijn items={stappen} prefix="2" />
      </ZSectie>

      <ZSectieTwee nr="03 · wat je kan vragen" titel="alles wat je huis nodig heeft." tekst="Staat het er niet bij? Vraag het toch. moroww zoekt wie het kan.">
        <ZRegister
          prefix="3"
          items={soorten.map((s) => ({ titel: s.label, tekst: s.voorbeeld ? s.voorbeeld.replace(/: $/, '.') : 'Staat het er niet bij? Vraag het toch.' }))}
        />
      </ZSectieTwee>

      <ZSectie id="voorwie" nr="04 · vijf ingangen" titel="voor wie de hub is.">
        <VoorWie />
      </ZSectie>

      <ZSectie nr="05 · wat er in de hub zit" titel="vier dingen, voor leden.">
        <ZRaster prefix="5" items={ledenKrijgen.map(([titel, tekst]) => ({ titel, tekst }))} />
      </ZSectie>

      <section id="merken" className="z-sectie" data-mw-reveal>
        <div className="z-twee">
          <div className="z-smal">
            <span className="z-nr">06 · merken in de huizen</span>
            <h2 className="z-h2">je merk, waar het gebruikt wordt.</h2>
            <p className="z-tekst" style={{ fontSize: 18 }}>
              Gasten gebruiken je product in de badkamer, de keuken of aan de voordeur van een huis uit de collectie. Tijdens hun verblijf, niet in een winkelrek.
            </p>
            <p className="z-tekst" style={{ fontSize: 18, fontWeight: 500 }}>Zet je als eigenaar hun producten in je huis, dan krijg je korting bij die merken.</p>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              <span className="z-nr" style={{ display: 'block', padding: '14px 0 6px' }}>hoe we kiezen</span>
              {hoeWeKiezen.map(([t]) => (
                <span key={t} style={{ display: 'block', padding: '10px 0', borderBottom: '1px solid var(--line)', fontSize: 16 }}>{t}</span>
              ))}
            </div>
          </div>
          <div className="z-breed" style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            <div className="z-tegels">
              {publiekeMerken.map((m) => (
                <a key={m.naam} href={m.url} target="_blank" rel="noopener noreferrer" style={{ minHeight: 200 }}>
                  <span className="z-nr">{m.categorie}</span>
                  <span style={{ fontSize: 34, fontWeight: 500, letterSpacing: '-0.02em' }}>{m.naam}</span>
                  <span className="z-tekst" style={{ fontSize: 16 }}>{m.wat}</span>
                  <span style={{ marginTop: 'auto', paddingTop: 14, borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 15 }}>
                    <span>voor eigenaars in de hub</span>
                    <span style={{ fontWeight: 500 }}>korting</span>
                  </span>
                </a>
              ))}
              <Link href="/hub/partner-worden" className="z-tegel-accent" style={{ flexBasis: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 20, fontWeight: 500 }}>jouw merk in de collectie?</span>
                <span className="z-link" style={{ fontSize: 16 }}>vertel ons over je product →</span>
              </Link>
            </div>
            <div style={{ borderTop: '1px solid var(--line)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'baseline', padding: '14px 0' }}>
                <span style={{ fontSize: 20, fontWeight: 500 }}>en de vakmensen</span>
                <span className="z-nr">via moroww</span>
              </div>
              {[
                ['schoonmaak en dieptereiniging', 'Voor wat tussen twee verblijven moet gebeuren.'],
                ['interieurfotografie', 'Foto\'s volgens de moroww-standaard, voor je listings en je eigen site.'],
              ].map(([naam, tekst]) => (
                <div key={naam} style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px', padding: '14px 0', borderBottom: '1px solid var(--line)' }}>
                  <span style={{ flex: '1 1 220px', fontSize: 18 }}>{naam}</span>
                  <span className="z-tekst" style={{ flex: '2 1 300px', fontSize: 16 }}>{tekst}</span>
                </div>
              ))}
              <p className="z-klein" style={{ paddingTop: 12 }}>Wie ze zijn, zie je als lid in de hub. Elke opdracht loopt via ons, met opvolging en foto.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="academy" className="z-sectie" data-mw-reveal>
        <div className="z-twee" style={{ alignItems: 'stretch' }}>
          <div className="z-foto" style={{ flex: '1 1 360px', minHeight: 420 }}>
            <Image src="/images/standaard/V2-40.jpg" alt="Een gast leest in bed in een moroww-huis" fill sizes="(min-width: 1024px) 35vw, 100vw" style={{ objectFit: 'cover' }} />
          </div>
          <div className="z-smal" style={{ flex: '999 1 520px' }}>
            <span className="z-nr">07 · academy en ledenbrief</span>
            <h2 className="z-h2">kleine sessies, in een moroww-huis.</h2>
            <p className="z-tekst" style={{ fontSize: 18 }}>Voor eigenaars, hosts en de teams van property managers. En één keer per maand een ledenbrief met wat er verandert.</p>
            <ZRegister prefix="7" items={academyThemas.map(([titel, tekst]) => ({ titel, tekst }))} />
            <Link href="/hub/academy" className="z-link">naar de academy →</Link>
          </div>
        </div>
      </section>

      <section id="lid" className="z-sectie" data-mw-reveal>
        <div className="z-sectie-kop">
          <h2 className="z-h2">toegang tot de hub hoort bij het label.</h2>
          <span className="z-nr">08 · lid worden</span>
        </div>
        <div className="z-tegels">
          <div className="z-tegel-accent">
            <span className="z-h3">al het label?</span>
            <span className="z-tekst">Log in met je e-mailadres en wachtwoord.</span>
            <Link href="/hub/inloggen" className="z-knop z-knop-donker" style={{ alignSelf: 'flex-start' }}>log in</Link>
          </div>
          <div>
            <span className="z-h3">nog geen label?</span>
            <span className="z-tekst">Vraag een bezoek aan voor je huis.</span>
            <Link href="/het-label#aanvraag" className="z-link" style={{ fontSize: 16 }}>naar het label →</Link>
          </div>
          <div>
            <span className="z-h3">een vakman of een merk?</span>
            <span className="z-tekst">Vertel ons wat je doet en in welke regio.</span>
            <Link href="/hub/partner-worden" className="z-link" style={{ fontSize: 16 }}>partner worden →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
