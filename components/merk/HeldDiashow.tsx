'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';

export type HeldFoto = { src: string; alt: string; positie?: string };

// Fotohero van de eigenaarskant: beeld over de volle breedte tot onder de
// kop, tekst linksonder, het voorbeeldobject als licht glas. Draait niet bij
// hover, focus of minder-beweging; de knop pauzeert voorgoed. Zolang de hero
// onder de kop ligt, zet hij data-held-onder op <html> zodat de kop wit wordt.
export function HeldDiashow({ fotos, children, object }: { fotos: HeldFoto[]; children: ReactNode; object?: ReactNode }) {
  const [actief, setActief] = useState(0);
  const [gepauzeerd, setGepauzeerd] = useState(false);
  const [erboven, setErboven] = useState(false);
  const [rustig, setRustig] = useState(false);
  const paneel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = paneel.current;
    if (!el) return;
    const html = document.documentElement;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) html.dataset.heldOnder = ''; else delete html.dataset.heldOnder; },
      { rootMargin: `0px 0px -${Math.max(0, window.innerHeight - 90)}px 0px` },
    );
    obs.observe(el);
    return () => { obs.disconnect(); delete html.dataset.heldOnder; };
  }, []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setRustig(mq.matches);
    const f = (e: MediaQueryListEvent) => setRustig(e.matches);
    mq.addEventListener('change', f);
    return () => mq.removeEventListener('change', f);
  }, []);

  useEffect(() => {
    if (gepauzeerd || erboven || rustig || fotos.length < 2) return;
    const t = setTimeout(() => setActief((a) => (a + 1) % fotos.length), 6500);
    return () => clearTimeout(t);
  }, [actief, gepauzeerd, erboven, rustig, fotos.length]);

  return (
    <div
      ref={paneel}
      className="z-held-paneel"
      onMouseEnter={() => setErboven(true)}
      onMouseLeave={() => setErboven(false)}
      onFocus={() => setErboven(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setErboven(false); }}
    >
      {fotos.map((f, n) => (
        <div key={f.src} className="z-held-beeld" data-aan={n === actief} aria-hidden={n !== actief}>
          <Image
            src={f.src}
            alt={f.alt}
            fill
            sizes="(min-width: 1280px) 1200px, 100vw"
            priority={n === 0}
            style={{ objectFit: 'cover', objectPosition: f.positie ?? 'center' }}
            data-zoom={n === actief && !rustig}
          />
        </div>
      ))}
      <div className="z-held-waas" aria-hidden="true" />
      <div className="z-held-tekst">
        {children}
        {fotos.length > 1 && (
          <div className="z-held-dias">
            {fotos.map((f, n) => (
              <button
                key={f.src}
                type="button"
                onClick={() => { setActief(n); setGepauzeerd(true); }}
                aria-label={`foto ${n + 1}`}
                aria-current={n === actief}
              >
                <span />
              </button>
            ))}
            <button
              type="button"
              className="z-held-pauze"
              onClick={() => setGepauzeerd((g) => !g)}
              aria-pressed={gepauzeerd}
              aria-label={gepauzeerd ? 'speel de foto’s af' : 'pauzeer de foto’s'}
            >
              {gepauzeerd ? (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
              )}
            </button>
          </div>
        )}
      </div>
      {object}
    </div>
  );
}
