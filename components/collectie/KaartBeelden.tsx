'use client'

import { useRef, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from '@/i18n/navigation'

const GLAS_LICHT = 'bg-white/70 backdrop-blur-xl backdrop-saturate-150 border border-white/70 text-moroww-dark'

// Beeld van een collectiekaart: een paar foto's om door te swipen, elk een
// link naar het huis. Alleen het eerste beeld zit in de tabvolgorde, zodat
// toetsenbordgebruikers niet vijf keer langs hetzelfde huis moeten.
export function KaartBeelden({
  id,
  naam,
  fotos,
  priority,
  links,
  rechts,
  labels,
}: {
  id: string
  naam: string
  fotos: { src: string; alt: string }[]
  priority: boolean
  links?: ReactNode
  rechts?: ReactNode
  labels: { vorige: string; volgende: string }
}) {
  const spoor = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState(0)

  const naar = (n: number) => {
    const el = spoor.current
    if (el) el.scrollTo({ left: n * el.clientWidth, behavior: 'smooth' })
  }
  const opScroll = () => {
    const el = spoor.current
    if (el) setPos(Math.round(el.scrollLeft / el.clientWidth))
  }

  const pijl = `${GLAS_LICHT} absolute top-1/2 -translate-y-1/2 hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full opacity-0 group-hover:opacity-100 focus-visible:opacity-100 transition-opacity disabled:!opacity-0`

  return (
    <div className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-moroww-rule">
      <div
        ref={spoor}
        onScroll={opScroll}
        className="flex h-full overflow-x-auto snap-x snap-mandatory [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {fotos.map((f, n) => (
          <Link
            key={f.src}
            href={{ pathname: '/collectie/[id]', params: { id } }}
            tabIndex={n === 0 ? 0 : -1}
            aria-label={naam}
            className="relative h-full w-full shrink-0 snap-start"
          >
            <Image
              src={f.src}
              alt={f.alt}
              fill
              priority={priority && n === 0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-[1.02] motion-reduce:transition-none"
            />
          </Link>
        ))}
      </div>

      {links && <div className="pointer-events-none absolute left-3 top-3">{links}</div>}
      {rechts && <div className="pointer-events-none absolute right-3 top-3">{rechts}</div>}

      {fotos.length > 1 && (
        <>
          <button type="button" onClick={() => naar(pos - 1)} disabled={pos === 0} aria-label={labels.vorige} className={`${pijl} left-3`}>
            <ChevronLeft size={18} />
          </button>
          <button type="button" onClick={() => naar(pos + 1)} disabled={pos === fotos.length - 1} aria-label={labels.volgende} className={`${pijl} right-3`}>
            <ChevronRight size={18} />
          </button>
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center" aria-hidden>
            <div className="flex items-center gap-1.5 rounded-full bg-black/25 backdrop-blur-md px-2.5 py-1.5">
              {fotos.map((f, n) => (
                <span key={f.src} className={`block h-1.5 rounded-full bg-white transition-all duration-300 ${n === pos ? 'w-4 opacity-100' : 'w-1.5 opacity-60'}`} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export function GlasChip({ children }: { children: ReactNode }) {
  return <span className={`${GLAS_LICHT} inline-flex items-center rounded-full px-3 py-1.5 text-audit`}>{children}</span>
}
