'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Subtle 3D tilt die het element laat kantelen richting de muiscursor.
 * Perspective 1200 px, max rotatie 6 graden. Alleen op muis-apparaten
 * (hover + fine pointer); touch-screens krijgen niets. Reduced motion
 * zet het ook uit. Gebruikt rAF-throttle zodat er maar één update per
 * frame draait, ongeacht de muis-snelheid.
 */

interface Props {
  children: ReactNode
  max?: number
  className?: string
}

export function Tilt3D({ children, max = 6, className }: Props) {
  const wrap = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrap.current
    const target = inner.current
    if (!el || !target) return

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!mq.matches || reduce) return

    let pendingX = 0
    let pendingY = 0
    let active = false
    let ticking = false

    const update = () => {
      if (!target) return
      if (active) {
        target.style.transform = `perspective(1200px) rotateX(${pendingY.toFixed(2)}deg) rotateY(${pendingX.toFixed(2)}deg)`
      } else {
        target.style.transform = 'perspective(1200px) rotateX(0) rotateY(0)'
      }
      ticking = false
    }
    const schedule = () => {
      if (!ticking) {
        requestAnimationFrame(update)
        ticking = true
      }
    }

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      pendingX = (x - 0.5) * max * 2
      pendingY = (0.5 - y) * max * 2
      active = true
      schedule()
    }
    const onLeave = () => {
      active = false
      schedule()
    }

    el.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)
    return () => {
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [max])

  return (
    <div ref={wrap} className={className} style={{ perspective: '1200px' }}>
      <div
        ref={inner}
        style={{
          transformStyle: 'preserve-3d',
          transition: 'transform 500ms cubic-bezier(.2,.7,.2,1)',
          willChange: 'transform',
        }}
      >
        {children}
      </div>
    </div>
  )
}
