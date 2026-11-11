import Link from 'next/link';
import type { ReactNode } from 'react';
import { HeldDiashow, type HeldFoto } from './HeldDiashow';

// Bouwstenen van het Zwitserse raster (zwitsers.css). Enkel opmaak en
// structuur; de inhoud komt van de pagina's en lib/merk.

export const nr = (i: number) => String(i + 1).padStart(2, '0');

type Item = { titel: ReactNode; tekst?: ReactNode; href?: string; voet?: string };

export function ZHeld({ nr: n, titel, lead, acties, object, fotos }: { nr: string; titel: ReactNode; lead: ReactNode; acties?: ReactNode; object?: ReactNode; fotos?: HeldFoto[] }) {
  const tekst = (
    <>
      <span className="z-nr">{n}</span>
      <h1 className="z-h1">{titel}</h1>
      <p className="z-lead">{lead}</p>
      {acties && <div className="z-knoppen">{acties}</div>}
    </>
  );
  if (fotos?.length) {
    return (
      <section className="z-held z-held-foto" data-mw-reveal>
        <HeldDiashow fotos={fotos} object={object}>{tekst}</HeldDiashow>
      </section>
    );
  }
  return (
    <section className="z-held" data-mw-reveal>
      <div className="z-held-tekst">{tekst}</div>
      {object}
    </section>
  );
}

export function ZSectie({ id, nr: n, titel, children }: { id?: string; nr: string; titel: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="z-sectie" data-mw-reveal>
      <div className="z-sectie-kop">
        <h2 className="z-h2">{titel}</h2>
        <span className="z-nr">{n}</span>
      </div>
      {children}
    </section>
  );
}

// Een sectie met de kop links en de inhoud breed rechts.
export function ZSectieTwee({ id, nr: n, titel, tekst, extra, children }: { id?: string; nr: string; titel: ReactNode; tekst?: ReactNode; extra?: ReactNode; children: ReactNode }) {
  return (
    <section id={id} className="z-sectie" data-mw-reveal>
      <div className="z-twee">
        <div className="z-smal">
          <span className="z-nr">{n}</span>
          <h2 className="z-h2">{titel}</h2>
          {tekst && <p className="z-tekst" style={{ fontSize: 18 }}>{tekst}</p>}
          {extra}
        </div>
        <div className="z-breed">{children}</div>
      </div>
    </section>
  );
}

export function ZRaster({ items, prefix }: { items: Item[]; prefix?: string }) {
  return (
    <ul className="z-raster">
      {items.map((it, i) => {
        const binnen = (
          <>
            <span className="z-nr">{prefix ? `${prefix}.${i + 1}` : nr(i)}</span>
            <h3 className="z-h3">{it.titel}</h3>
            {it.tekst && <p className="z-tekst">{it.tekst}</p>}
            {it.voet && <span className="z-link" style={{ fontSize: 16 }}>{it.voet} →</span>}
          </>
        );
        return <li key={i}>{it.href ? <Link href={it.href} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>{binnen}</Link> : binnen}</li>;
      })}
    </ul>
  );
}

export function ZRegister({ items, prefix }: { items: Item[]; prefix?: string }) {
  return (
    <ol className="z-register">
      {items.map((it, i) => {
        const inhoud = (
          <>
            <span className="z-nr z-reg-nr">{prefix ? `${prefix}.${i + 1}` : nr(i)}</span>
            <span className="z-reg-titel">{it.titel}</span>
            {it.tekst && <span className="z-reg-tekst">{it.tekst}</span>}
            {it.href && <span className="z-reg-pijl" aria-hidden="true">→</span>}
          </>
        );
        return <li key={i}>{it.href ? <Link href={it.href}>{inhoud}</Link> : <div>{inhoud}</div>}</li>;
      })}
    </ol>
  );
}

export function ZTijdlijn({ items, prefix }: { items: (Item & { wanneer?: string })[]; prefix?: string }) {
  return (
    <ol className="z-tijdlijn">
      {items.map((it, i) => (
        <li key={i}>
          <span className="z-punt" aria-hidden="true" />
          <span className="z-tijdlijn-kop">
            <span className="z-nr">{prefix ? `${prefix}.${i + 1}` : nr(i)}</span>
            {it.wanneer && <span className="z-nr" style={{ color: 'var(--ink)' }}>{it.wanneer}</span>}
          </span>
          <span className="z-h3">{it.titel}</span>
          {it.tekst && <span className="z-tekst" style={{ fontSize: 16 }}>{it.tekst}</span>}
        </li>
      ))}
    </ol>
  );
}

export function ZCijfers({ items }: { items: { getal: string; label: string; noot?: string }[] }) {
  return (
    <div className="z-cijfers" aria-label="in cijfers" data-mw-reveal>
      {items.map((c) => (
        <div key={c.label}>
          <span className="z-getal">{c.getal}</span>
          <span style={{ fontSize: 16 }}>{c.label}</span>
          {c.noot && <span className="z-nr">{c.noot}</span>}
        </div>
      ))}
    </div>
  );
}

export function ZFaq({ items }: { items: [string, string][] }) {
  return (
    <div className="z-faq">
      {items.map(([v, a]) => (
        <details key={v}>
          <summary>{v}</summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  );
}

export function ZVink() {
  return (
    <svg className="z-vink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" />
      <path d="M7 12l3.5 3.5L17 9" />
    </svg>
  );
}
