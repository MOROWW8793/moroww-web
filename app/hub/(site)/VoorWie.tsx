'use client';

import Link from 'next/link';
import { useState } from 'react';

const ingangen = [
  {
    naam: 'eigenaars',
    kop: 'jij vraagt, wij regelen.',
    tekst: 'Je huis draagt het label. Wat het tussen twee verblijven nodig heeft, vraag je in de hub, via WhatsApp of telefoon.',
    href: '/hub/aanmelden',
    cta: 'meld je aan',
    punten: ['extra diensten op vraag, met een foto als bewijs', 'merken in je huis, door ons geplaatst', 'korting bij de merken die je in je huis zet'],
  },
  {
    naam: 'beheerders',
    kop: 'al je huizen, één lijn.',
    tekst: 'Eén plek voor de vragen van al je huizen, het label voor je beste huizen, en de academy voor je team.',
    href: '/hub/property-managers',
    cta: 'voor beheerders',
    punten: ['één aanspreekpunt voor je hele portefeuille', 'het label voor je beste huizen', 'academy-sessies voor je team'],
  },
  {
    naam: 'merken',
    kop: 'je merk, waar het gebruikt wordt.',
    tekst: 'Product placement in de huizen van de collectie. Gasten ervaren je product tijdens hun verblijf, in een huis dat persoonlijk bezocht is. Eigenaars die je product plaatsen, krijgen korting bij jou. Zo komt je merk in meer huizen.',
    href: '/hub/partner-worden',
    cta: 'je merk in de huizen',
    punten: ['je product in de badkamer, keuken of living', 'gebruikt door gasten tijdens hun verblijf', 'korting voor eigenaars brengt je in meer huizen'],
  },
  {
    naam: 'vakmensen',
    kop: 'werk in onze huizen.',
    tekst: 'Opdrachten in je regio, ingepland en opgevolgd door moroww. We houden de groep bewust klein.',
    href: '/hub/partner-worden',
    cta: 'partner worden',
    punten: ['opdrachten in je regio', 'werken volgens de standaard', 'één vast aanspreekpunt'],
  },
  {
    naam: 'gasten',
    kop: 'neem het mee.',
    tekst: 'De geur, het linnen en de essentials uit het verblijf. Om thuis te hebben. De market opent binnenkort.',
    href: '/hub/market',
    cta: 'naar de market',
    punten: ['de geur van the shore en the fields', 'het linnen en de essentials uit de huizen', 'als eerste weten wanneer het opent'],
  },
];

export function VoorWie() {
  const [actief, setActief] = useState(0);
  const a = ingangen[actief];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
      <div role="tablist" aria-label="voor wie" style={{ display: 'flex', flexWrap: 'wrap', borderBottom: '1px solid var(--ink)' }}>
        {ingangen.map((x, i) => (
          <button
            key={x.naam}
            type="button"
            role="tab"
            id={`voorwie-${i}`}
            aria-selected={i === actief}
            aria-controls="voorwie-paneel"
            onClick={() => setActief(i)}
            style={{
              flex: '1 1 160px', minHeight: 56, padding: '16px 0', border: 0, borderBottom: `3px solid ${i === actief ? 'var(--ink)' : 'transparent'}`,
              marginBottom: -2, background: 'transparent', textAlign: 'left', font: 'inherit', fontSize: 20, fontWeight: i === actief ? 500 : 300, color: 'var(--ink)', cursor: 'pointer',
            }}
          >
            {x.naam}
          </button>
        ))}
      </div>
      <div id="voorwie-paneel" role="tabpanel" aria-labelledby={`voorwie-${actief}`} className="z-twee">
        <div className="z-smal" style={{ flex: '1 1 420px', gap: 18 }}>
          <span style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 500, letterSpacing: '-0.02em', lineHeight: 1.05 }}>{a.kop}</span>
          <p className="z-tekst" style={{ fontSize: 18 }}>{a.tekst}</p>
          <Link href={a.href} className="z-link" style={{ alignSelf: 'flex-start' }}>{a.cta} →</Link>
        </div>
        <ul style={{ flex: '1 1 420px', minWidth: 0, listStyle: 'none', margin: 0, padding: 0, borderTop: '1px solid var(--ink)' }}>
          {a.punten.map((p) => (
            <li key={p} style={{ display: 'flex', gap: 14, alignItems: 'baseline', padding: '16px 0', borderBottom: '1px solid var(--line)', fontSize: 17 }}>
              <span className="z-nr" aria-hidden="true">—</span>
              {p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
