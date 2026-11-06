'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import 'lenis/dist/lenis.css'

gsap.registerPlugin(ScrollTrigger)

export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // Lenis draait op de GSAP-ticker zodat ScrollTrigger en het scrollen
    // hetzelfde frame zien; een eigen rAF-lus laat reveals haperen.
    const lenis = new Lenis({ autoRaf: false })
    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    // Het mobiele menu en de galerij-lightbox blokkeren scrollen via
    // body.style.overflow. Lenis negeert dat en zou de pagina onder de
    // overlay laten doorschuiven, dus volgen we die vlag hier.
    const volgSlot = () =>
      document.body.style.overflow === 'hidden' ? lenis.stop() : lenis.start()
    const observer = new MutationObserver(volgSlot)
    observer.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      observer.disconnect()
      gsap.ticker.remove(tick)
      lenis.destroy()
    }
  }, [])

  return null
}
