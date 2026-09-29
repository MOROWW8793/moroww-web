'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

/**
 * Merkloop als afsluiter — het moroww-woord en het bladlogo dat er
 * bovenop groeit. Muted, autoplay, loop, playsInline, met een JPG-poster
 * als eerste paint.
 *
 * Bron is een 45 MB gif; hier komen alleen de output-varianten binnen
 * (mp4 273 kB, webm 45 kB, poster 27 kB in public/videos/).
 *
 * prefers-reduced-motion: tonen alleen de poster (statisch), geen video
 * mounten. Zonder JS: video-tag rendert direct met poster; als bandbreedte
 * hem laadt, speelt hij, anders blijft de poster staan.
 */

type Props = {
  className?: string
  alt: string
}

export function BrandLoop({ className, alt }: Props) {
  const [reduced, setReduced] = useState<boolean | null>(null)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  // Voor het antwoord uit useEffect binnen is: toon de poster. Voorkomt
  // dat we op de eerste render de video mounten en er dan bij motion=off
  // toch autoplay start.
  if (reduced === null || reduced === true) {
    return (
      <div className={className}>
        <Image
          src="/videos/moroww-logo-poster.jpg"
          alt={alt}
          width={1280}
          height={720}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 720px"
        />
      </div>
    )
  }

  return (
    <div className={className}>
      <video
        muted
        autoPlay
        loop
        playsInline
        preload="metadata"
        poster="/videos/moroww-logo-poster.jpg"
        aria-label={alt}
        className="w-full h-auto block"
      >
        <source src="/videos/moroww-logo.webm" type="video/webm" />
        <source src="/videos/moroww-logo.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
