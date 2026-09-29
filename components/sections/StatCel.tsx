'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Één cel in de Statrij: cijfer boven, label onder. Telt eenmalig op van
 * 0 naar `cijfer` in ≤ 1200 ms met cubic-out easing, zodra de cel voor
 * 40% in view komt. One-shot via useRef.
 *
 * Server-rendert het eindcijfer meteen (initial state = cijfer wanneer
 * de teller nog niet mag lopen), zodat de gebruiker zonder JS het juiste
 * getal ziet en er geen layout-shift is bij hydratatie.
 *
 * Reduced-motion: teller toont het eindcijfer direct, geen animatie.
 */

const DURATION_MS = 1200

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3)
}

export function StatCel({ cijfer, label }: { cijfer: string; label: string }) {
  // De prop is een string omdat sommige cellen bv. '129' of '4.9'
  // kunnen bevatten. Voor de teller parsen we het numerieke deel;
  // niet-numerieke waarden slaan de animatie over en tonen de string.
  const numeric = Number.parseInt(cijfer, 10)
  const isCountable = Number.isFinite(numeric) && String(numeric) === cijfer.trim()

  const containerRef = useRef<HTMLDivElement | null>(null)
  const doneRef = useRef(false)
  // Initial state = eindcijfer. Zonder JS blijft dat staan. Met JS zet
  // useEffect de teller op 0 en start bij in-view.
  const [display, setDisplay] = useState<number>(isCountable ? numeric : 0)

  useEffect(() => {
    if (!isCountable) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      setDisplay(numeric)
      doneRef.current = true
      return
    }

    // JS beschikbaar én motion oké: reset naar 0 en wacht op in-view.
    setDisplay(0)

    const node = containerRef.current
    if (!node) return

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting && !doneRef.current) {
          doneRef.current = true
          io.disconnect()
          const start = performance.now()
          let raf = 0
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / DURATION_MS)
            setDisplay(Math.round(easeOutCubic(p) * numeric))
            if (p < 1) raf = requestAnimationFrame(tick)
          }
          raf = requestAnimationFrame(tick)
          return () => cancelAnimationFrame(raf)
        }
      }
    }, { threshold: 0.4 })
    io.observe(node)
    return () => io.disconnect()
  }, [isCountable, numeric])

  return (
    <div ref={containerRef} className="px-4 py-3 md:px-8 text-center">
      <div
        className="font-bold text-moroww-orange leading-none tabular-nums"
        style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.75rem)', letterSpacing: '-0.02em' }}
      >
        {isCountable ? display : cijfer}
      </div>
      <div className="text-white/60 mt-3" style={{ fontSize: 13, letterSpacing: 0.5 }}>
        {label}
      </div>
    </div>
  )
}
