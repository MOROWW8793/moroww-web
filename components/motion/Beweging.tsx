'use client'

import { usePathname } from 'next/navigation'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/SplitText'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP)

// Wat bij het laden al in beeld staat, blijft staan. Het pas na hydratatie
// verbergen zou een flits geven van inhoud die er al stond.
function onderDeVouw(selector: string) {
  return gsap.utils
    .toArray<HTMLElement>(selector)
    .filter((el) => el.getBoundingClientRect().top > window.innerHeight)
}

/**
 * Eén plek voor alle scrollbeweging. Server components zetten alleen een
 * data-attribuut; dit component zoekt ze per route op:
 *   data-onthul   blok komt zacht omhoog
 *   data-beeld    beeldcontainer (overflow-hidden) opent van onder, beeld zakt van 112% naar 100%
 *   data-regels   kop komt regel per regel van onder een rand
 *   data-parallax overmaatse beeldlaag beweegt trager dan de pagina
 */
export function Beweging() {
  const pad = usePathname()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const blokken = onderDeVouw('[data-onthul]')
        gsap.set(blokken, { opacity: 0, y: 24 })
        ScrollTrigger.batch(blokken, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) =>
            gsap.to(batch, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', stagger: 0.1, overwrite: true }),
        })

        const beelden = onderDeVouw('[data-beeld]')
        gsap.set(beelden, { clipPath: 'inset(100% 0% 0% 0%)' })
        // De CSS-hover-transition op het beeld zou elke GSAP-frame naijlen;
        // na afloop gaat alles terug naar de klassen zodat hover weer werkt.
        const beeldVan = (el: Element) => el.querySelector('img')
        gsap.set(beelden.map(beeldVan), { scale: 1.12, transition: 'none' })
        ScrollTrigger.batch(beelden, {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => {
            // clipPath weg na afloop: anders knipt hij de focus-outline rond de link af.
            gsap.to(batch, {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 1.3,
              ease: 'expo.out',
              stagger: 0.12,
              clearProps: 'clipPath',
            })
            gsap.to(batch.map(beeldVan), {
              scale: 1,
              duration: 1.8,
              ease: 'expo.out',
              stagger: 0.12,
              clearProps: 'transform,transition',
            })
          },
        })

        onderDeVouw('[data-regels]').forEach((kop) => {
          SplitText.create(kop, {
            type: 'lines',
            mask: 'lines',
            autoSplit: true,
            onSplit: (self) =>
              gsap.from(self.lines, {
                yPercent: 105,
                duration: 1.1,
                ease: 'expo.out',
                stagger: 0.08,
                scrollTrigger: { trigger: kop, start: 'top 90%', once: true },
              }),
          })
        })

        gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((laag) => {
          gsap.fromTo(
            laag,
            { yPercent: -6 },
            {
              yPercent: 6,
              ease: 'none',
              scrollTrigger: { trigger: laag.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
            },
          )
        })
      })
    },
    { dependencies: [pad], revertOnUpdate: true },
  )

  return null
}
