'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Twee micro-motion lagen voor de homepage en de rest van de site:
 *
 *   data-mw-reveal              → krijgt .is-in bij intersection (één keer)
 *   data-mw-parallax            → translateY op basis van positie in viewport
 *   data-mw-parallax-strength   → optioneel, default 0.15 (ca. 15 % van
 *                                 element-hoogte max beweging)
 *
 * MotionIn zit in LocaleLayout; bij client-side navigatie blijft layout
 * gemount, dus useEffect moet opnieuw draaien bij elke route-wissel —
 * anders worden de nieuwe [data-mw-reveal]-elementen nooit geobserveerd
 * en blijven ze onzichtbaar op opacity 0. Daarom usePathname als dep.
 *
 * Geen externe dependency. reduced-motion zet beide lagen uit.
 */
export function MotionIn() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-mw-reveal]'))
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-mw-parallax]'))

    if (reduce) {
      revealEls.forEach((el) => el.classList.add('is-in'))
      return
    }

    // ── Reveal ────────────────────────────────────────────────────────────
    // threshold 0 + bottom-rootMargin 120px: triggert zodra element de
    // viewport-bodem nadert, niet pas als 15 % erin staat.
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
    revealEls.forEach((el) => io.observe(el))

    // ── Parallax ─────────────────────────────────────────────────────────
    // offset = (viewportMidden - elementMidden) / viewport * height * strength.
    // rAF-throttled: één update per frame, zelfs bij flutter-scroll.
    let onScroll: (() => void) | null = null
    let onResize: (() => void) | null = null

    if (parallaxEls.length > 0) {
      let ticking = false
      const update = () => {
        const vh = window.innerHeight
        const vhHalf = vh / 2
        parallaxEls.forEach((el) => {
          const r = el.getBoundingClientRect()
          const centerY = r.top + r.height / 2
          const dist = (vhHalf - centerY) / vh
          const strength = parseFloat(el.dataset.mwParallaxStrength ?? '0.15')
          const offset = dist * r.height * strength
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
        })
        ticking = false
      }
      onScroll = () => {
        if (!ticking) {
          requestAnimationFrame(update)
          ticking = true
        }
      }
      onResize = onScroll
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize, { passive: true })
      update()
    }

    return () => {
      io.disconnect()
      if (onScroll) window.removeEventListener('scroll', onScroll)
      if (onResize) window.removeEventListener('resize', onResize)
    }
  }, [pathname])

  return null
}
