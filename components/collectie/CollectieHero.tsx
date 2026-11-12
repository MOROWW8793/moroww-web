'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { Pause, Play } from 'lucide-react'
import { Link } from '@/i18n/navigation'

export type CollectieSlide = { id: string; src: string; naam: string; plaats: string }

// Hero van /collectie: elk huis een dia. Het bijschrift linkt naar het huis
// dat op dat moment in beeld is. Draait niet bij hover, focus of
// minder-beweging; de knop pauzeert voorgoed.
export function CollectieHero({
  slides,
  labels,
  children,
}: {
  slides: CollectieSlide[]
  labels: { pauzeer: string; speel: string; dia: string }
  children: ReactNode
}) {
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
    if (gepauzeerd || erboven || rustig || slides.length < 2) return
    const t = setTimeout(() => setActief((a) => (a + 1) % slides.length), 6500)
    return () => clearTimeout(t)
  }, [actief, gepauzeerd, erboven, rustig, slides.length])

  const huidig = slides[actief]

  return (
    <section
      className="relative min-h-[82svh] w-full overflow-hidden bg-moroww-dark"
      onMouseEnter={() => setErboven(true)}
      onMouseLeave={() => setErboven(false)}
      onFocus={() => setErboven(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setErboven(false) }}
    >
      {slides.map((s, n) => (
        <div
          key={s.id}
          aria-hidden={n !== actief}
          className={`absolute inset-0 transition-opacity duration-[1400ms] ease-out motion-reduce:transition-none ${n === actief ? 'opacity-100' : 'opacity-0'}`}
        >
          <Image
            src={s.src}
            alt=""
            fill
            sizes="100vw"
            priority={n === 0}
            className={`object-cover transition-transform duration-[8000ms] ease-out motion-reduce:transition-none ${n === actief && !rustig ? 'scale-[1.06]' : 'scale-100'}`}
          />
        </div>
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/70" aria-hidden />

      <div className="relative z-10 min-h-[82svh] flex flex-col justify-end px-6 md:px-12 pt-28 pb-mw-4 md:pb-mw-5">
        <div className="mx-auto max-w-7xl w-full">
          {children}
          <div className="mt-mw-6 md:mt-mw-8 flex items-center justify-end sm:justify-between gap-mw-4 text-white/85">
            <Link
              href={{ pathname: '/collectie/[id]', params: { id: huidig.id } }}
              className="hidden sm:inline text-audit hover:text-white underline-offset-4 hover:underline"
              aria-live="polite"
            >
              {huidig.naam}, {huidig.plaats} →
            </Link>
            {slides.length > 1 && (
              <div className="flex items-center gap-2">
                {slides.map((s, n) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => { setActief(n); setGepauzeerd(true) }}
                    aria-label={`${labels.dia} ${n + 1}: ${s.naam}`}
                    aria-current={n === actief}
                    className="p-2 -m-1"
                  >
                    <span className={`block h-[3px] w-5 sm:w-8 origin-left bg-white transition-[transform,opacity] duration-300 motion-reduce:transition-none ${n === actief ? 'scale-x-100 opacity-100' : 'scale-x-50 opacity-45'}`} />
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setGepauzeerd((g) => !g)}
                  aria-pressed={gepauzeerd}
                  aria-label={gepauzeerd ? labels.speel : labels.pauzeer}
                  className="ml-1 inline-flex h-11 w-11 -my-3 items-center justify-center rounded-full hover:bg-white/15 transition-colors"
                >
                  {gepauzeerd ? <Play size={14} fill="currentColor" /> : <Pause size={14} fill="currentColor" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
