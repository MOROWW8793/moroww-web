'use client'

import { useEffect } from 'react'

/**
 * Observers voor de motion-primitives uit hallmark.css.
 *   data-anim="rise|lines|stagger|timeline"   → krijgt .is-in bij intersection
 *   data-count-to="<getal>"                   → telt van 0 naar het getal
 *     optioneel:
 *       data-count-prefix="€ "
 *       data-count-suffix=" %"
 *       data-count-decimals="1"               → komma-notatie via nl-BE
 *       data-count-duration="1400"            → in ms
 *
 * Alleen één keer per element; na intersectie wordt unobserved. Reduced-motion
 * en scripting-off tonen content direct in eindstaat.
 */
export function Motion() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    // Reveal-observer: data-anim → .is-in
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-anim]'))
    if (reduce) {
      revealEls.forEach((el) => el.classList.add('is-in'))
    } else {
      const revealIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            entry.target.classList.add('is-in')
            revealIO.unobserve(entry.target)
          })
        },
        { threshold: 0.18, rootMargin: '0px 0px -8% 0px' },
      )
      revealEls.forEach((el) => revealIO.observe(el))
    }

    // Count-up: data-count-to → telt op
    const counterEls = Array.from(document.querySelectorAll<HTMLElement>('[data-count-to]'))
    const formatter = (val: number, decimals: number) =>
      val.toLocaleString('nl-BE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

    const finalize = (el: HTMLElement) => {
      const to = parseFloat(el.dataset.countTo ?? '0')
      const prefix = el.dataset.countPrefix ?? ''
      const suffix = el.dataset.countSuffix ?? ''
      const decimals = parseInt(el.dataset.countDecimals ?? '0', 10)
      el.textContent = `${prefix}${formatter(to, decimals)}${suffix}`
    }

    if (reduce) {
      counterEls.forEach(finalize)
    } else {
      counterEls.forEach((el) => {
        const decimals = parseInt(el.dataset.countDecimals ?? '0', 10)
        const prefix = el.dataset.countPrefix ?? ''
        const suffix = el.dataset.countSuffix ?? ''
        // Begin zichtbaar op 0 zodat er geen sprong is bij intersectie.
        el.textContent = `${prefix}${formatter(0, decimals)}${suffix}`
      })

      const counterIO = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return
            const el = entry.target as HTMLElement
            counterIO.unobserve(el)

            const to = parseFloat(el.dataset.countTo ?? '0')
            const prefix = el.dataset.countPrefix ?? ''
            const suffix = el.dataset.countSuffix ?? ''
            const decimals = parseInt(el.dataset.countDecimals ?? '0', 10)
            const duration = parseInt(el.dataset.countDuration ?? '1600', 10)
            const start = performance.now()
            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

            const tick = (now: number) => {
              const p = Math.min(1, (now - start) / duration)
              const val = to * easeOutCubic(p)
              el.textContent = `${prefix}${formatter(val, decimals)}${suffix}`
              if (p < 1) requestAnimationFrame(tick)
            }
            requestAnimationFrame(tick)
          })
        },
        { threshold: 0.4 },
      )
      counterEls.forEach((el) => counterIO.observe(el))
    }
  }, [])

  return null
}
