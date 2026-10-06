'use client'

import { useEffect, useState } from 'react'

// Het boekingspaneel staat op desktop in de zijkolom en op mobiel inline.
// Deze knop scrollt naar de variant die op dit scherm zichtbaar is.
export function NaarBoekenKnop({
  doelIds,
  label,
  className,
}: {
  doelIds: string[]
  label: string
  className: string
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() =>
        doelIds
          .map((id) => document.getElementById(id))
          .find((el) => el?.offsetParent)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    >
      {label}
    </button>
  )
}

// Op mobiel staat het boekingspaneel ergens halverwege de pagina. Deze balk
// houdt prijs en actie in beeld tot het paneel zelf zichtbaar is.
export function MobielBoekBalk({
  doelId,
  prijsLabel,
  knopLabel,
}: {
  doelId: string
  prijsLabel: string | null
  knopLabel: string
}) {
  const [paneelZichtbaar, setPaneelZichtbaar] = useState(true)

  useEffect(() => {
    const doel = document.getElementById(doelId)
    if (!doel) return
    const obs = new IntersectionObserver(([e]) => setPaneelZichtbaar(e.isIntersecting), {
      rootMargin: '0px 0px -20% 0px',
    })
    obs.observe(doel)
    return () => obs.disconnect()
  }, [doelId])

  return (
    <div
      className={[
        'lg:hidden fixed inset-x-0 bottom-0 z-40 border-t border-moroww-rule bg-white/95 backdrop-blur px-mw-4 py-3',
        'flex items-center justify-between gap-mw-3 transition-transform duration-200 motion-reduce:transition-none',
        paneelZichtbaar ? 'translate-y-full' : 'translate-y-0',
      ].join(' ')}
      aria-hidden={paneelZichtbaar}
    >
      {prijsLabel && <p className="text-body text-moroww-dark">{prijsLabel}</p>}
      <button
        type="button"
        tabIndex={paneelZichtbaar ? -1 : 0}
        onClick={() =>
          document.getElementById(doelId)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
        className="ml-auto rounded-full px-mw-4 py-3 font-semibold bg-moroww-orange text-moroww-dark hover:bg-moroww-orange/85 transition-colors"
      >
        {knopLabel}
      </button>
    </div>
  )
}
