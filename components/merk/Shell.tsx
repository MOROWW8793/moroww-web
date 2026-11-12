import Link from 'next/link';
import type { ReactNode } from 'react';
import { site } from '@/lib/merk/site';
import { Logo, MerkTeken } from './Logo';

type NavItem = { href: string; label: string };

export function Header({ home, merk, nav, cta, donker = false }: { home: string; merk: ReactNode; nav: NavItem[]; cta: NavItem; donker?: boolean }) {
  return (
    <header className={`kop ${donker ? 'kop-donker' : ''}`}>
      <div className="wrap kop-binnen">
        <Link href={home} className="kop-logo">{merk}</Link>
        <nav aria-label="hoofdmenu" className="kop-nav">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="kop-link">{n.label}</Link>
          ))}
          <Link href={cta.href} className="btn btn-kop">{cta.label}</Link>
          {/* Op een telefoon passen de links niet naast de knop: ze zitten
              dan achter dit menu. Zonder JS, gewoon een details-element. */}
          <details className="kop-menu">
            <summary aria-label="menu">
              <span aria-hidden="true" />
            </summary>
            <div className="kop-menu-lijst">
              {nav.map((n) => (
                <Link key={n.href} href={n.href}>{n.label}</Link>
              ))}
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}

export function Footer({ donker = false, merk }: { donker?: boolean; merk: ReactNode }) {
  return (
    <footer className={`voet ${donker ? 'voet-donker' : ''}`}>
      <div className="wrap voet-binnen">
        <div className="voet-merk">{merk}</div>
        <nav aria-label="merkfamilie" className="voet-familie">
          <Link href="/"><Logo height={14} ink={donker ? '#ffffff' : '#0b0700'} /></Link>
          <Link href="/advisory"><MerkTeken merk="advisory" op={donker ? 'donker' : 'licht'} size={16} /></Link>
          <Link href="/hub"><MerkTeken merk="hub" op={donker ? 'donker' : 'licht'} size={16} /></Link>
        </nav>
        <p className="voet-gegevens">
          {site.bedrijf} · {site.ondernemingsnummer} · {site.plaats} · <a href={`tel:${site.contact.telefoon.replace(/\s/g, '')}`}>{site.contact.telefoon}</a> · <Link href="/het-label">het label</Link> · <Link href="/privacy">privacy</Link>
        </p>
      </div>
    </footer>
  );
}

export function Sectie({ children, toon = 'basis', id, reveal = true }: { children: ReactNode; toon?: 'basis' | 'zacht' | 'donker' | 'wit'; id?: string; reveal?: boolean }) {
  // reveal default true: elke sectie krijgt een subtle fade-in bij
  // intersection. Opt-out met reveal={false} als de sectie bewust stil
  // moet blijven.
  const revealProps = reveal ? { 'data-mw-reveal': '' } : {};
  return (
    <section id={id} className={`sectie sectie-${toon}`} {...revealProps}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function Kop({ boven, titel, tekst, niveau = 2 }: { boven?: string; titel: ReactNode; tekst?: ReactNode; niveau?: 1 | 2 }) {
  const H = niveau === 1 ? 'h1' : 'h2';
  return (
    <div className="kopblok">
      {boven && <span className="boven">{boven}</span>}
      <H className={niveau === 1 ? 'titel-1' : 'titel-2'}>{titel}</H>
      {tekst && <p className="inleiding">{tekst}</p>}
    </div>
  );
}
