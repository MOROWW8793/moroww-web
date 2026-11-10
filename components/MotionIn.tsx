'use client'

import { useEffect } from 'react'

/**
 * Scroll-reveal observer voor data-mw-reveal elementen. Zet .is-in bij
 * intersection (één keer per element). Reduced-motion toont de content
 * direct in eindstaat (CSS regelt dat met !important).
 *
 * De html.mw-js klasse wordt in layout.tsx meteen bij body-render gezet
 * zodat er geen flits is van zichtbare content voor de eerste scroll.
 */
export function MotionIn() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const els = Array.from(document.querySelectorAll<HTMLElement>('[data-mw-reveal]'))

    if (reduce) {
      els.forEach((el) => el.classList.add('is-in'))
      return
    }

    // threshold 0 + een genereuze positieve bottom-rootMargin: het element
    // telt al als 'intersecting' zodra zijn bovenrand de viewport-bodem
    // nadert (120px ervoor). Zonder dit moet eerst 15 % van een blok (±300px
    // voor het collectie-raster) in beeld zijn voor er iets reveal triggert,
    // en dat voelt alsof de pagina leeg is tot je voorbij de content scrolt.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('is-in')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0, rootMargin: '0px 0px 120px 0px' },
    )

    els.forEach((el) => io.observe(el))

    return () => io.disconnect()
  }, [])

  return null
}
