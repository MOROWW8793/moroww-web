'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MerkTeken } from '@/components/merk/Logo';

type Item = { href: string; label: string; exact?: boolean; teller?: number };

export function PlatNav({ naam, huis, beheerder, open, telefoon }: { naam: string; huis: string | null; beheerder: boolean; open: number; telefoon: string }) {
  const pad = usePathname();
  const actief = (i: Item) => (i.exact ? pad === i.href : pad === i.href || pad.startsWith(i.href + '/'));
  const leden: Item[] = [
    { href: '/hub/leden', label: 'vraag het moroww', exact: true },
    { href: '/hub/leden/partners', label: 'partners' },
    { href: '/hub/leden/merken', label: 'merken' },
    { href: '/hub/leden/academy', label: 'academy en ledenbrief' },
  ];
  const regie: Item[] = [
    { href: '/hub/beheer/vragen', label: 'vragen opvolgen', teller: open },
    { href: '/hub/beheer', label: 'leden, partners, academy', exact: true },
  ];
  const lijst = (items: Item[]) => (
    <ul>
      {items.map((i) => (
        <li key={i.href}>
          <Link href={i.href} aria-current={actief(i) ? 'page' : undefined}>
            <span>{i.label}</span>
            {i.teller ? <b className="plat-teller">{i.teller}</b> : null}
          </Link>
        </li>
      ))}
    </ul>
  );
  const voornaam = naam.split(' ')[0];

  return (
    <aside className="plat-zij">
      <div className="plat-zij-top">
        <Link href="/hub/leden" className="plat-logo" aria-label="moroww hub, naar je overzicht"><MerkTeken merk="hub" op="donker" size={24} /></Link>
        <div className="plat-wie">
          <span className="plat-avatar" aria-hidden>{voornaam.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{naam}</strong>
            {huis ? <span>{huis}</span> : null}
          </div>
        </div>
      </div>
      <nav aria-label="platform" className="plat-nav">
        {lijst(leden)}
        {beheerder ? (
          <>
            <p className="plat-groep">regie</p>
            {lijst(regie)}
          </>
        ) : null}
      </nav>
      <div className="plat-zij-voet">
        <a href={`tel:${telefoon.replace(/\s/g, '')}`} className="plat-bel">
          <span>liever bellen?</span>
          <strong>{telefoon}</strong>
        </a>
        <div className="plat-zij-links">
          <Link href="/hub/leden/wachtwoord">wachtwoord</Link>
          <form action="/hub/uitloggen" method="post"><button type="submit">uitloggen</button></form>
        </div>
      </div>
    </aside>
  );
}
