'use client'

import { useRef, type ReactNode } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Onthul({
  children,
  items,
  className,
}: {
  children: ReactNode
  /** Selector binnen de wrapper; die elementen komen één voor één in beeld. Zonder: de wrapper zelf. */
  items?: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const root = ref.current
        if (!root) return
        const doelen = items
          ? gsap.utils.toArray<HTMLElement>(root.querySelectorAll(items))
          : [root]

        // Wat bij het laden al in beeld staat, blijft staan. Het pas na
        // hydratatie verbergen zou een flits geven van inhoud die er al stond.
        const onderDeVouw = doelen.filter(
          (el) => el.getBoundingClientRect().top > window.innerHeight,
        )
        if (!onderDeVouw.length) return

        // Alleen opacity, geen visibility: verborgen links moeten
        // bereikbaar blijven met de tab-toets.
        gsap.set(onderDeVouw, { opacity: 0, y: 24 })
        ScrollTrigger.batch(onderDeVouw, {
          start: 'top 88%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: 'power2.out',
              stagger: 0.12,
              overwrite: true,
            }),
        })
      })
    },
    { scope: ref },
  )

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
