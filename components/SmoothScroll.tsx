'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Lenis smooth-scroll, wereldwijd. Default-instellingen (duration 1.2, een
 * zachte expo-easing): voelt soepel zonder over te doen. Reduced motion
 * schakelt Lenis volledig uit — dan draait de browser zijn native scroll.
 *
 * Pauzeert als een overlay body.overflow:hidden zet (mobiel menu, modals,
 * galerij). Zonder die pauze zou de pagina onder de overlay door blijven
 * scrollen.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis()
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    const observer = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') lenis.stop()
      else lenis.start()
    })
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
