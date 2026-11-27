'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MerkTeken } from '@/components/merk/Logo';

type Item = { href: string; label: string; exact?: boolean; teller?: number };

export function PlatNav({ naam, huis, rol, beheerder, open, telefoon }: { naam: string; huis: string | null; rol: 'lid' | 'partner'; beheerder: boolean; open: number; telefoon: string }) {
  const pad = usePathname();
  const actief = (i: Item) => (i.exact ? pad === i.href : pad === i.href || pad.startsWith(i.href + '/'));
  // Een partner ziet alleen zijn portaal: opdrachten, fiche en producten.
  const partner: Item[] = [{ href: '/hub/partner', label: 'opdrachten en fiche' }];
  const start = rol === 'partner' ? '/hub/partner' : '/hub/leden';
  const leden: Item[] = [
    { href: '/hub/leden', label: 'vraag het moroww', exact: true },
    { href: '/hub/leden/huizen', label: 'mijn huizen' },
    { href: '/hub/leden/mijn-partners', label: 'mijn partners' },
    { href: '/hub/leden/partners', label: 'netwerk' },
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
        <Link href={start} className="plat-logo" aria-label="moroww hub, naar je overzicht"><MerkTeken merk="hub" op="licht" size={24} /></Link>
        <div className="plat-wie">
          <span className="plat-avatar" aria-hidden>{voornaam.slice(0, 1).toUpperCase()}</span>
          <div>
            <strong>{naam}</strong>
            {huis ? <span>{huis}</span> : null}
          </div>
        </div>
      </div>
      <nav aria-label="platform" className="plat-nav">
        {lijst(rol === 'partner' ? partner : leden)}
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
