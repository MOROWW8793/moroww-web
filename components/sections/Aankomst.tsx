'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'

/**
 * Aankomstsequentie op de home, één regel tegelijk. Vier tijdstempels
 * tonen wat er in The Eighth op de dag van aankomst gebeurt.
 *
 * Trigger: IntersectionObserver — start zodra de sectie voor 30% in view
 * komt. One-shot via useRef zodat scrollen weg en terug de reeks niet
 * herhaalt.
 *
 * Reduced-motion: alle vier regels staan meteen zichtbaar, geen
 * IO-observer, geen setInterval.
 */

const STEP_INTERVAL_MS = 800

export function Aankomst() {
  const t = useTranslations('home')
  const containerRef = useRef<HTMLDivElement | null>(null)
  const doneRef = useRef(false)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    // Reduced-motion: alles direct zichtbaar, verder niets doen.
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setVisibleCount(4)
      doneRef.current = true
      return
    }

    const node = containerRef.current
    if (!node) return

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !doneRef.current) {
          doneRef.current = true
          io.disconnect()
          let i = 1
          setVisibleCount(1)
          const id = window.setInterval(() => {
            i += 1
            setVisibleCount(i)
            if (i >= 4) window.clearInterval(id)
          }, STEP_INTERVAL_MS)
        }
      }
    }, { threshold: 0.3 })
    io.observe(node)
    return () => io.disconnect()
  }, [])

  const regels = [
    t('aankomst_1'),
    t('aankomst_2'),
    t('aankomst_3'),
    t('aankomst_4'),
  ]

  return (
    <section
      ref={containerRef}
      className="w-full px-6 md:px-12 mt-mw-8"
      aria-label={t('aankomst_kop')}
    >
      <div className="mx-auto max-w-7xl">
        <div className="max-w-[52ch]">
          <h2 className="text-h2 text-moroww-dark">{t('aankomst_kop')}</h2>
          <ul className="mt-mw-5 flex flex-col gap-mw-3">
            {regels.map((r, i) => {
              const shown = i < visibleCount
              return (
                <li
                  key={i}
                  className="text-body-lg text-moroww-dark transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none"
                  style={{
                    opacity: shown ? 1 : 0,
                    transform: shown ? 'translateY(0)' : 'translateY(6px)',
                  }}
                >
                  {r}
                </li>
              )
            })}
          </ul>
          <p className="mt-mw-5">
            <Link
              href={{ pathname: '/collectie/[id]', params: { id: 'zeedijk-nieuwpoort' } }}
              className="text-audit uppercase text-moroww-dark underline underline-offset-4 decoration-moroww-label hover:decoration-moroww-dark transition-colors"
            >
              {t('aankomst_link')}
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
