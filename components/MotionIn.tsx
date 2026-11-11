'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Twee micro-motion lagen voor de hele site:
 *
 *   data-mw-reveal              → krijgt .is-in bij intersection (één keer)
 *   data-mw-lines               → zelfde trigger; CSS laat per span-regel rijzen
 *   data-mw-stagger             → zelfde trigger; CSS stagger direct children
 *   data-mw-parallax            → translateY op basis van positie in viewport
 *   data-mw-parallax-strength   → optioneel, default 0.15
 *
 * MotionIn zit in LocaleLayout; bij client-side navigatie blijft layout
 * gemount, dus useEffect moet opnieuw draaien bij elke route-wissel.
 * Daarom usePathname als dep.
 *
 * Defensive-in-depth tegen edge cases (iOS Safari, Lenis-rAF-race,
 * IntersectionObserver die niet vuurt): elementen die al in viewport
 * staan bij mount krijgen meteen .is-in; na 1500 ms krijgt sowieso
 * alles .is-in als fallback, zodat content nooit permanent onzichtbaar
 * blijft hangen.
 */
export function MotionIn() {
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const revealEls = Array.from(
      document.querySelectorAll<HTMLElement>('[data-mw-reveal], [data-mw-lines], [data-mw-stagger]'),
    )
    const parallaxEls = Array.from(document.querySelectorAll<HTMLElement>('[data-mw-parallax]'))

    if (reduce) {
      revealEls.forEach((el) => el.classList.add('is-in'))
      return
    }

    // ── Reveal — direct in-viewport + IO + safety net ────────────────────
    const markIfVisible = (el: HTMLElement): boolean => {
      const r = el.getBoundingClientRect()
      if (r.top < window.innerHeight && r.bottom > 0) {
        el.classList.add('is-in')
        return true
      }
      return false
    }
    const pending = revealEls.filter((el) => !markIfVisible(el))

    let io: IntersectionObserver | null = null
    if (typeof IntersectionObserver !== 'undefined') {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-in')
            io?.unobserve(entry.target)
          })
        },
        { threshold: 0, rootMargin: '0px 0px 120px 0px' },
      )
      pending.forEach((el) => io!.observe(el))
    } else {
      // Geen IO: direct alles zichtbaar.
      pending.forEach((el) => el.classList.add('is-in'))
    }

    // Safety net: na 1500 ms toch alles zichtbaar maken wat nog niet
    // getriggerd is. Beschermt tegen iOS Safari + Lenis-race en tegen
    // alle andere edge cases waar IO niet vuurt.
    const safetyTimer = window.setTimeout(() => {
      revealEls.forEach((el) => el.classList.add('is-in'))
    }, 1500)

    // ── Parallax ─────────────────────────────────────────────────────────
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
      io?.disconnect()
      window.clearTimeout(safetyTimer)
      if (onScroll) window.removeEventListener('scroll', onScroll)
      if (onResize) window.removeEventListener('resize', onResize)
    }
  }, [pathname])

  return null
}
