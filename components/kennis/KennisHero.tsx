'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'

export type KennisBeeld = { src: string; alt: string }

// Afgeronde fotoplaat bovenaan de kennisbank. Met één beeld staat ze stil;
// met meer wisselt ze rustig, behalve bij hover, focus of minder-beweging.
export function KennisHero({ beelden, children, onder }: { beelden: KennisBeeld[]; children: ReactNode; onder?: ReactNode }) {
  const [actief, setActief] = useState(0)
  const [gepauzeerd, setGepauzeerd] = useState(false)
  const [erboven, setErboven] = useState(false)
  const [rustig, setRustig] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setRustig(mq.matches)
    const f = (e: MediaQueryListEvent) => setRustig(e.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [])

  useEffect(() => {
    if (gepauzeerd || erboven || rustig || beelden.length < 2) return
    const t = setTimeout(() => setActief((a) => (a + 1) % beelden.length), 6500)
    return () => clearTimeout(t)
  }, [actief, gepauzeerd, erboven, rustig, beelden.length])

  return (
    <section className="w-full px-4 md:px-6 pt-24 md:pt-28">
      <div
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[24px] md:rounded-[32px] bg-moroww-dark min-h-[440px] md:min-h-[560px] flex items-end"
        onMouseEnter={() => setErboven(true)}
        onMouseLeave={() => setErboven(false)}
        onFocus={() => setErboven(true)}
        onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setErboven(false) }}
      >
        {beelden.map((b, n) => (
          <div
            key={b.src}
            aria-hidden={n !== actief}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${n === actief ? 'opacity-100' : 'opacity-0'}`}
          >
            <Image
              src={b.src}
              alt={b.alt}
              fill
              priority={n === 0}
              sizes="(min-width: 1280px) 1280px, 100vw"
              className={`object-cover transition-transform duration-[8000ms] ease-out motion-reduce:transition-none ${n === actief && !rustig && beelden.length > 1 ? 'scale-[1.06]' : 'scale-100'}`}
            />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/10" aria-hidden />

        {beelden.length > 1 && (
          <div className="absolute right-4 top-4 md:right-8 md:top-6 flex items-center gap-1 text-white">
            {beelden.map((b, n) => (
              <button
                key={b.src}
                type="button"
                onClick={() => { setActief(n); setGepauzeerd(true) }}
                aria-label={`foto ${n + 1}`}
                aria-current={n === actief}
                className="p-2 -m-0.5"
              >
                <span className={`block h-[3px] w-6 origin-left bg-white transition-[transform,opacity] duration-300 ${n === actief ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-45'}`} />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setGepauzeerd((g) => !g)}
              aria-pressed={gepauzeerd}
              aria-label={gepauzeerd ? 'speel de foto’s af' : 'pauzeer de foto’s'}
              className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md border border-white/30"
            >
              {gepauzeerd ? (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 2.5v11l9-5.5z" /></svg>
              ) : (
                <svg viewBox="0 0 16 16" width="12" height="12" fill="currentColor" aria-hidden="true"><path d="M4 2.5h3v11H4zM9 2.5h3v11H9z" /></svg>
              )}
            </button>
          </div>
        )}

        <div className="relative w-full px-6 pb-6 pt-24 md:px-12 md:pb-10 text-white">
          {children}
          {onder}
        </div>
      </div>
    </section>
  )
}
