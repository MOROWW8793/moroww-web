import type { ReactNode } from 'react';
import { Stappenbalk } from '@/components/hub/Stappenbalk';

// Het scherm na het versturen van de aanvraag: wat er nu gebeurt, in drie stappen.
export function AanvraagBinnen({ titel, inleiding, voet }: { titel: ReactNode; inleiding: string; voet?: ReactNode }) {
  const stappen: [string, string][] = [
    ['we kijken je aanvraag na', 'Een mens bij moroww leest ze, geen automaat.'],
    ['je krijgt een mail met je toegang', 'Naar het adres waarmee je je account maakte.'],
    ['je zet je huizen en je vaste partners in de hub', 'Daarna kan je je eerste vraag stellen.'],
  ];
  return (
    <div className="aanmeld">
      <Stappenbalk nu={3} />
      <div className="aanmeld-kaart">
        <h1 className="aanmeld-titel">{titel}</h1>
        <p className="klein">{inleiding}</p>
        <ol className="aanmeld-lijst">
          {stappen.map(([t, x], i) => (
            <li key={t}><span aria-hidden>{i + 1}</span><div><strong>{t}</strong><p>{x}</p></div></li>
          ))}
        </ol>
        {voet}
      </div>
    </div>
  );
}
