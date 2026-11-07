import Link from 'next/link';

export function LedenNav({ actief, partner, beheerder }: { actief: string; partner?: boolean; beheerder?: boolean }) {
  const items: [string, string, string][] = [
    ['vragen', '/hub/leden', 'vraag het moroww'],
    ['partners', '/hub/leden/partners', 'partners'],
    ['merken', '/hub/leden/merken', 'merken'],
    ['academy', '/hub/leden/academy', 'academy en ledenbrief'],
  ];
  if (beheerder) items.push(['beheer', '/hub/beheer', 'regie']);
  return (
    <nav className="hub-subnav" aria-label="ledenzone">
      <div className="wrap hub-subnav-binnen">
        <div className="hub-subnav-links">
          {items.map(([sleutel, href, label]) => (
            <Link key={sleutel} href={href} aria-current={actief === sleutel ? 'page' : undefined}>{label}</Link>
          ))}
        </div>
        <form action="/hub/uitloggen" method="post">
          <button type="submit" className="hub-linkknop">uitloggen</button>
        </form>
      </div>
    </nav>
  );
}
